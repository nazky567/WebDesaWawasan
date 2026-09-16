import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Award, ChevronRight,
  Users, Home as HomeIcon, MapPin, PieChart
} from 'lucide-react';
import { VillageMap } from '../../components/maps/VillageMap';
import { StatisticCard } from '../../components/home/StatisticCard';
import { StatisticModal } from '../../components/home/StatisticModal';
import { PageHeroSlider } from '../../components/layout/PageHeroSlider';
import { dataService } from '../../services/dataService';
import type { BeritaItem } from '../../types';

const homeSlides = [
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
    title: 'Selamat Datang di Portal Resmi',
    highlight: 'DESA WAWASAN',
    subtitle: 'Kecamatan Tanjung Sari, Kabupaten Lampung Selatan. Mewujudkan tatakelola pemerintahan desa yang transparan, akuntabel, dan informatif.',
  },
  {
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80',
    title: 'Informasi Desa',
    highlight: 'Lengkap & Terpercaya',
    subtitle: 'Akses informasi profil desa, data kependudukan, potensi UMKM, dan berita kegiatan Desa Wawasan.',
  },
  {
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80',
    title: 'Transparansi APBDes',
    highlight: 'Anggaran Terbuka',
    subtitle: 'Wujud keterbukaan informasi publik. Pantau realisasi anggaran Dana Desa dan Alokasi Dana Desa secara real-time.',
  },
];

export const Home: React.FC = () => {
  const [news, setNews] = useState<BeritaItem[]>([]);
  const [activeStatId, setActiveStatId] = useState<'penduduk' | 'kk' | 'dusun' | 'apbdes' | null>('penduduk');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dataService.getBerita().then(setNews);
  }, []);

  const handleCardClick = (id: 'penduduk' | 'kk' | 'dusun' | 'apbdes') => {
    setActiveStatId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-0 pb-20 bg-white">
      
      {/* 1. HERO SLIDER WITH BRAND BLUE SHADE & BUTTONS */}
      <PageHeroSlider
        title="Selamat Datang di Portal Resmi"
        highlight="DESA WAWASAN"
        subtitle="Kecamatan Tanjung Sari, Kabupaten Lampung Selatan. Mewujudkan tatakelola pemerintahan desa yang transparan, akuntabel, dan informatif."
        showButtons={true}
        slides={homeSlides}
      />

      {/* 2. HERO STATISTICS SECTION - SEPARATE WITH CLEAR MARGIN (NO OVERLAP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatisticCard
            id="penduduk"
            title="Jumlah Penduduk"
            value="3.318"
            subtitle="Jiwa terdaftar • Klik detail"
            icon={Users}
            isActive={activeStatId === 'penduduk'}
            onClick={() => handleCardClick('penduduk')}
          />

          <StatisticCard
            id="kk"
            title="Jumlah Kepala Keluarga"
            value="1.061"
            subtitle="KK • Klik rincian per dusun"
            icon={HomeIcon}
            isActive={activeStatId === 'kk'}
            onClick={() => handleCardClick('kk')}
          />

          <StatisticCard
            id="dusun"
            title="Wilayah Dusun"
            value="4 Dusun"
            subtitle="Asri, Budi, Cinta, Damai Jaya"
            icon={MapPin}
            isActive={activeStatId === 'dusun'}
            onClick={() => handleCardClick('dusun')}
          />

          <StatisticCard
            id="apbdes"
            title="Total Dana Desa (APBDes)"
            value="Rp 1,3 M"
            subtitle="Anggaran 2025 • Klik transparansi"
            icon={PieChart}
            isActive={activeStatId === 'apbdes'}
            onClick={() => handleCardClick('apbdes')}
          />
        </div>
      </section>

      {/* STATISTIC DETAIL MODAL POPUP */}
      <StatisticModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeId={activeStatId}
      />

      {/* 3. SAMBUTAN KEPALA DESA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="w-56 h-72 rounded-2xl overflow-hidden border-2 border-blue-200 shadow-2xl bg-slate-50">
                  <img 
                    src="./images/Profil Belum Update.png" 
                    alt="Foto Kepala Desa Wawasan" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-center shadow-lg whitespace-nowrap">
                  <span className="text-xs font-bold text-slate-800 block">Sutoyo Walijati</span>
                  <span className="text-[10px] text-[#040DBF] uppercase tracking-wider block font-semibold">Kepala Desa Wawasan</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-[#040DBF] text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Sambutan Resmi Kepala Desa</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
                "Mewujudkan Desa Wawasan Berkemajuan, Mandiri, dan Melayani"
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi Desa Wawasan. Melalui website ini, kami berkomitmen membuka akses informasi seluas-luasnya bagi seluruh warga mengenai profil desa, data kependudukan, transparansi anggaran, dan kegiatan desa.
              </p>
              <div className="pt-2 flex items-center space-x-4">
                <Link to="/profil" className="text-xs font-bold text-[#040DBF] hover:text-[#05C7F2] flex items-center space-x-1">
                  <span>Baca Selengkapnya Profil Pemdes</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TERKINI: BERITA & AGENDA */}
      <section className="section-alt py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#040DBF] block mb-1">Publikasi Desa</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Berita & Informasi Terbaru</h2>
            </div>
            <Link to="/berita" className="text-xs font-bold text-[#040DBF] hover:text-[#05C7F2] flex items-center space-x-1">
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="light-card rounded-2xl overflow-hidden light-card-hover flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.thumbnail_url} 
                    alt={item.judul} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 brand-gradient text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.kategori_berita?.nama_kategori || 'Berita'}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-2">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 leading-snug line-clamp-2 hover:text-[#040DBF] transition-colors">
                      {item.judul}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {item.konten}
                    </p>
                  </div>
                  <Link
                    to={`/berita/${item.slug}`}
                    className="text-xs font-bold text-[#040DBF] hover:text-[#05C7F2] inline-flex items-center space-x-1"
                  >
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PETA INTERAKTIF DESA WAWASAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#040DBF] block mb-1">Geospasial Desa</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Peta Interaktif Desa Wawasan</h2>
          </div>
          <Link to="/peta" className="text-xs font-bold text-[#040DBF] hover:text-[#05C7F2] flex items-center space-x-1">
            <span>Buka Peta Layar Penuh</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <VillageMap />
      </section>

    </div>
  );
};
