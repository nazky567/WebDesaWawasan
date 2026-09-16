import React, { useEffect, useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { dataService } from '../../services/dataService';
import type { BeritaItem } from '../../types';

export const KelolaBerita: React.FC = () => {
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = () => {
    dataService.getBerita().then(setBeritaList);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !konten) return;

    await dataService.addBerita({
      judul,
      slug: judul.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      konten,
      thumbnail_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      is_published: true
    });

    setShowModal(false);
    setJudul('');
    setKonten('');
    fetchBerita();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Kelola Artikel Berita & Agenda Desa</h1>
          <p className="text-xs text-slate-400">Publikasi Informasi Resmi & Kalender Kegiatan Warga (Sekdes & Super Admin)</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Berita Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {beritaList.map((item) => (
          <div key={item.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-sm font-bold text-white leading-snug">{item.judul}</h4>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded shrink-0">
                Terbit
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">{item.konten}</p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-cyan-400" /> {item.views_count} views</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-base font-bold text-white">Tulis Berita Desa Baru</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Judul Artikel Berita</label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Isi Berita Lengkap</label>
                <textarea
                  rows={5}
                  required
                  value={konten}
                  onChange={(e) => setKonten(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 bg-slate-800 text-slate-300 font-semibold py-2.5 rounded-xl text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  Terbitkan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
