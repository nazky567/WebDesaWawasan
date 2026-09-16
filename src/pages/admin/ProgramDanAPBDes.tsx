import React, { useEffect, useState } from 'react';
import { PieChart, TrendingUp } from 'lucide-react';
import { dataService } from '../../services/dataService';
import type { APBDesItem, ProgramDesa } from '../../types';

export const ProgramDanAPBDes: React.FC = () => {
  const [apbdes, setApbdes] = useState<APBDesItem[]>([]);
  const [programs, setPrograms] = useState<ProgramDesa[]>([]);

  useEffect(() => {
    dataService.getAPBDes().then(setApbdes);
    dataService.getProgramDesa().then(setPrograms);
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Kelola APBDes & Program Pembangunan</h1>
        <p className="text-xs text-slate-400">Transparansi Anggaran Dana Desa (DD) & Realisasi Program (Kades & Sekdes)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* APBDes List */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-cyan-400" />
            Rincian APBDes 2025
          </h3>
          <div className="space-y-3">
            {apbdes.map((i) => (
              <div key={i.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{i.rincian_akun}</span>
                  <span className="text-[10px] text-cyan-400 uppercase font-semibold">{i.kategori}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-400 block">{formatRupiah(i.jumlah_anggaran)}</span>
                  <span className="text-[10px] text-slate-500">Realisasi: {formatRupiah(i.jumlah_realisasi)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Desa */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Program Pembangunan Fisik / Non-Fisik
          </h3>
          <div className="space-y-3">
            {programs.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white">{p.nama_program}</h4>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                    {p.persentase_progres}% Progres
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{p.lokasi} • {p.sumber_dana}</p>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${p.persentase_progres}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
