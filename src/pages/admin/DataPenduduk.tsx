import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { dataService } from '../../services/dataService';
import type { Penduduk } from '../../types';

export const DataPenduduk: React.FC = () => {
  const [penduduk, setPenduduk] = useState<Penduduk[]>([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [tempatLahir] = useState('Lampung Selatan');
  const [tanggalLahir, setTanggalLahir] = useState('1995-05-20');
  const [jk, setJk] = useState<'L' | 'P'>('L');

  useEffect(() => {
    dataService.getPenduduk().then(setPenduduk);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nik || !nama) return;

    const newP = await dataService.addPenduduk({
      nik,
      nama_lengkap: nama,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      jenis_kelamin: jk,
      agama: 'Islam',
      status_perkawinan: 'belum_menikah',
      status_hubungan_keluarga: 'Kepala Keluarga',
      is_disabilitas: false,
      is_penerima_bansos: false,
      is_miskin: false
    });

    setPenduduk([newP, ...penduduk]);
    setShowAddModal(false);
    setNik('');
    setNama('');
  };

  const filtered = penduduk.filter(p => 
    p.nama_lengkap.toLowerCase().includes(search.toLowerCase()) || 
    p.nik.includes(search)
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Kelola Data Kependudukan Desa</h1>
          <p className="text-xs text-slate-400">Pencatatan NIK, KK, Dusun & Status Bansos (Kasi Pemerintahan)</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Data Penduduk Baru</span>
        </button>
      </div>

      {/* Search & Export Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari NIK / Nama Penduduk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">NIK / KK</th>
                <th className="p-4">Nama Lengkap</th>
                <th className="p-4">TTL / L/P</th>
                <th className="p-4">Pekerjaan</th>
                <th className="p-4">Alamat / Dusun</th>
                <th className="p-4 text-center">Status Bansos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/60">
                  <td className="p-4">
                    <span className="font-bold text-white block">{p.nik}</span>
                    <span className="text-[10px] text-slate-500 block">KK: {p.no_kk || '-'}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-cyan-300 block">{p.nama_lengkap}</span>
                    <span className="text-[10px] text-slate-400 block">{p.status_hubungan_keluarga}</span>
                  </td>
                  <td className="p-4">
                    <span>{p.tempat_lahir}, {p.tanggal_lahir}</span>
                    <span className="text-[10px] text-slate-400 block font-semibold">Gender: {p.jenis_kelamin}</span>
                  </td>
                  <td className="p-4">{p.pekerjaan || 'Wiraswasta'}</td>
                  <td className="p-4">{p.alamat_detail || 'Dusun Asri Jaya'}</td>
                  <td className="p-4 text-center">
                    {p.is_penerima_bansos ? (
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">Penerima BLT</span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Reguler</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Tambah Data Penduduk Baru</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">NIK (16 Digit)</label>
                <input
                  type="text"
                  required
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Jenis Kelamin</label>
                  <select
                    value={jk}
                    onChange={(e) => setJk(e.target.value as 'L' | 'P')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 bg-slate-800 text-slate-300 font-semibold py-2.5 rounded-xl text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
