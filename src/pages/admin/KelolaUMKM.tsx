import React, { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import type { UMKMItem } from '../../types';

export const KelolaUMKM: React.FC = () => {
  const [umkmList, setUmkmList] = useState<UMKMItem[]>([]);

  useEffect(() => {
    dataService.getUMKM().then(setUmkmList);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Kelola UMKM, Bansos & BUMDes</h1>
        <p className="text-xs text-slate-400">Pemberdayaan Usaha Warga, Pendataan Bantuan Sosial & Karang Taruna (Kasi Kesejahteraan)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {umkmList.map((u) => (
          <div key={u.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded uppercase">
              {u.kategori_usaha}
            </span>
            <h4 className="text-sm font-bold text-white">{u.nama_usaha}</h4>
            <span className="text-xs text-cyan-400 block font-semibold">Pemilik: {u.pemilik_nama}</span>
            <p className="text-xs text-slate-400">{u.deskripsi}</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{u.no_hp}</span>
              <span className="text-emerald-400 font-semibold">Binaan BUMDes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
