import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Search, ArrowRight } from 'lucide-react';
import { PageHeroSlider } from '../../components/layout/PageHeroSlider';
import { dataService } from '../../services/dataService';
import type { BeritaItem, AgendaItem } from '../../types';

export const Berita: React.FC = () => {
  const [berita, setBerita] = useState<BeritaItem[]>([]);
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    dataService.getBerita().then(setBerita);
    dataService.getAgenda().then(setAgenda);
  }, []);

  const categories = ['Semua', 'Pemerintahan', 'Pembangunan', 'Pemberdayaan', 'Kegiatan Warga'];

  const filteredBerita = berita.filter((item) => {
    const matchesSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase()) || item.konten.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.kategori_berita?.nama_kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* FLOATING PAGE HERO SLIDER */}
      <PageHeroSlider
        badge="Portal Berita & Kegiatan"
        title="Kabar Terbaru Desa Wawasan"
        subtitle="Informasi resmi seputar pembangunan, program pemerintah desa, serta kalender agenda kegiatan warga."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'brand-gradient text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#040DBF]/50 focus:ring-1 focus:ring-[#040DBF]/20"
            />
          </div>
        </div>

        {/* Grid Content: News vs Agenda */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* News Stream */}
          <div className="lg:col-span-8 space-y-6">
            {filteredBerita.map((item) => (
              <div key={item.id} className="light-card rounded-2xl p-6 light-card-hover flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-56 h-40 rounded-xl overflow-hidden shrink-0">
                  <img src={item.thumbnail_url} alt={item.judul} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 mb-1">
                      <span className="bg-blue-50 text-[#040DBF] border border-blue-200 px-2 py-0.5 rounded font-semibold">
                        {item.kategori_berita?.nama_kategori || 'Pemerintahan'}
                      </span>
                      <span>{new Date(item.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views_count} x dibaca</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 leading-snug hover:text-[#040DBF] transition-colors">
                      {item.judul}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {item.konten}
                    </p>
                  </div>
                  <Link
                    to={`/berita/${item.slug}`}
                    className="text-xs font-bold text-[#040DBF] hover:text-[#05C7F2] inline-flex items-center space-x-1"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Agenda */}
          <div className="lg:col-span-4 space-y-6">
            <div className="light-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-[#040DBF] font-bold text-sm">
                <Calendar className="w-5 h-5" />
                <span>Agenda Kegiatan Desa</span>
              </div>
              
              <div className="space-y-4">
                {agenda.map((ag) => (
                  <div key={ag.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#040DBF] bg-blue-50 px-2 py-0.5 rounded">
                        {ag.tanggal_kegiatan} • {ag.waktu_mulai} WIB
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">{ag.judul_kegiatan}</h4>
                    <p className="text-[11px] text-slate-500">{ag.lokasi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
