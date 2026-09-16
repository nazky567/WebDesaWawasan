import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, FileText, Store, Newspaper, Clock
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import type { PermohonanSurat, Penduduk, BeritaItem } from '../../types';

export const DashboardOverview: React.FC = () => {
  const { user, role } = useAuth();
  const [suratList, setSuratList] = useState<PermohonanSurat[]>([]);
  const [pendudukList, setPendudukList] = useState<Penduduk[]>([]);
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);

  useEffect(() => {
    dataService.getSuratRequests().then(setSuratList);
    dataService.getPenduduk().then(setPendudukList);
    dataService.getBerita().then(setBeritaList);
  }, []);

  const pendingSurat = suratList.filter((s) => s.status === 'pending' || s.status === 'diverifikasi');
  const disetujuiSurat = suratList.filter((s) => s.status === 'disetujui');

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
            Selamat Datang Kembali
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {user?.nama_lengkap}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Role Aktif: <span className="text-cyan-300 font-bold capitalize">{role.replace('_', ' ')}</span> • Desa Wawasan, Kec. Tanjung Sari
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-center">
            <span className="text-xs text-slate-400 block font-semibold">Surat Pending</span>
            <span className="text-xl font-extrabold text-amber-400 block">{pendingSurat.length}</span>
          </div>
          <div className="p-3 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl text-center">
            <span className="text-xs text-slate-400 block font-semibold">Surat Disetujui</span>
            <span className="text-xl font-extrabold text-emerald-400 block">{disetujuiSurat.length}</span>
          </div>
        </div>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Penduduk</span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-2xl font-extrabold text-white block">{pendudukList.length * 700}</span>
          <span className="text-[10px] text-cyan-400 font-semibold block">Terdata di 4 Dusun</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Permohonan Surat</span>
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-2xl font-extrabold text-white block">{suratList.length}</span>
          <span className="text-[10px] text-amber-400 font-semibold block">{pendingSurat.length} Perlu Verifikasi</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Artikel Berita</span>
            <Newspaper className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-2xl font-extrabold text-white block">{beritaList.length}</span>
          <span className="text-[10px] text-emerald-400 font-semibold block">Terpublikasi di Portal</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Usaha UMKM</span>
            <Store className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-white block">25</span>
          <span className="text-[10px] text-purple-400 font-semibold block">Mitra BUMDes Jaya</span>
        </div>
      </div>

      {/* Pending Surat Verification Stream */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          Permohonan Surat Terbaru Membutuhkan Tindakan
        </h3>

        <div className="space-y-3">
          {suratList.slice(0, 4).map((s) => (
            <div key={s.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-white">{s.pemohon_nama}</h4>
                  <span className="text-[10px] text-slate-400">({s.pemohon_nik})</span>
                </div>
                <span className="text-xs text-cyan-400 font-semibold block mt-0.5">{s.jenis_surat?.nama_surat || 'Surat Keterangan'}</span>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">Keperluan: {s.keperluan}</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase ${
                  s.status === 'disetujui' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
