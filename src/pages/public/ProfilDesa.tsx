import React from 'react';
import { Building2, MapPin, Users, Phone, Shield } from 'lucide-react';
import { PageHeroSlider } from '../../components/layout/PageHeroSlider';

export const ProfilDesa: React.FC = () => {
  const defaultFoto = './images/Profil Belum Update.png';

  const perangkatList = [
    { nama: 'Sutoyo Walijati', jabatan: 'Kepala Desa', kontak: '0852 1555 9711', foto: defaultFoto },
    { nama: 'Surya Adiyanto', jabatan: 'Sekretaris Desa', kontak: '0852 1555 9711', foto: './images/Surya Adiyanto Sekretaris Desa.png', fotoPos: 'object-top' },
    { nama: 'Indri Insani', jabatan: 'Kasi Pemerintahan', kontak: '0852 1555 9711', foto: defaultFoto },
    { nama: 'Leo Anggara', jabatan: 'Kasi Kesejahteraan', kontak: '0852 1555 9711', foto: defaultFoto },
    { nama: 'Sujarwo', jabatan: 'Kasi Pelayanan', kontak: '0852 1555 9711', foto: './images/Sujarwo Kasi Pelayanan.jpeg', fotoPos: 'object-top' },
    { nama: 'Dian Purwanti', jabatan: 'Kaur Keuangan', kontak: '0852 1555 9711', foto: './images/Dian Purwanti Kaur Keuangan.jpeg', fotoPos: 'object-top' },
    { nama: 'Yogi Adi Pangestu', jabatan: 'Kaur Perencanaan', kontak: '0852 1555 9711', foto: './images/Yogi Adi Pangestu Kaur Perencanaan.jpeg', fotoPos: 'object-top' },
    { nama: 'Afini Eka Putri', jabatan: 'Kaur TU & Umum', kontak: '0852 1555 9711', foto: defaultFoto },
  ];

  const kadusList = [
    { nama: 'Krisna Abi Pratama', jabatan: 'Kepala Dusun', dusun: 'Dusun Asri Jaya', kontak: '0852 1555 9711', foto: './images/Krisna Abi Pratama Kepala Dusun Asri Jaya.jpeg', fotoPos: 'object-top' },
    { nama: 'Wahyudi', jabatan: 'Kepala Dusun', dusun: 'Dusun Budi Jaya', kontak: '0852 1555 9711', foto: defaultFoto },
    { nama: 'Ashar Sodik', jabatan: 'Kepala Dusun', dusun: 'Dusun Cinta Jaya', kontak: '0852 1555 9711', foto: defaultFoto },
    { nama: 'Harsono', jabatan: 'Kepala Dusun', dusun: 'Dusun Damai Jaya', kontak: '0852 1555 9711', foto: defaultFoto },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* FLOATING PAGE HERO SLIDER (NO CTA BUTTONS) */}
      <PageHeroSlider
        badge="Tentang Desa Wawasan"
        title="Profil & Struktur Pemerintahan Desa"
        subtitle="Mengenal Sejarah, Visi Misi, Geografis, serta Aparatur Pemerintahan Desa Wawasan, Kecamatan Tanjung Sari, Kabupaten Lampung Selatan."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Grid Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="light-card p-6 rounded-2xl text-center">
            <MapPin className="w-8 h-8 text-[#040DBF] mx-auto mb-2" />
            <span className="text-2xl font-extrabold text-slate-800 block">474.5 Ha</span>
            <span className="text-xs text-slate-500">Luas Wilayah</span>
          </div>
          <div className="light-card p-6 rounded-2xl text-center">
            <Users className="w-8 h-8 text-[#05C7F2] mx-auto mb-2" />
            <span className="text-2xl font-extrabold text-slate-800 block">3.318 Jiwa</span>
            <span className="text-xs text-slate-500">Total Penduduk</span>
          </div>
          <div className="light-card p-6 rounded-2xl text-center">
            <Building2 className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <span className="text-2xl font-extrabold text-slate-800 block">4 Dusun</span>
            <span className="text-xs text-slate-500">Jumlah Dusun</span>
          </div>
          <div className="light-card p-6 rounded-2xl text-center">
            <Shield className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <span className="text-2xl font-extrabold text-slate-800 block">23 RT / 4 Kadus</span>
            <span className="text-xs text-slate-500">Struktur Wilayah</span>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="light-card p-8 rounded-3xl space-y-4 flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-white font-bold text-sm">
              VISI
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
              "BERSATU MEMBANGUN PEMERINTAHAN YANG ADIL DAN INOVATIF DEMI MEWUJUDKAN MASYARAKAT YANG MANDIRI DAN SEJAHTERA."
            </h3>
          </div>

          <div className="light-card p-8 rounded-3xl space-y-4 flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#05C7F2] flex items-center justify-center text-white font-bold text-sm">
              MISI
            </div>
            <ol className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-[#040DBF] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  1
                </span>
                <span className="leading-relaxed font-medium">BERUPAYA MENGOPTIMALKAN PELAYANAN PEMERINTAH DESA KEPADA MASYARAKAT</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-[#040DBF] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  2
                </span>
                <span className="leading-relaxed font-medium">BERUPAYA MENGEDEPANKAN MUSYAWARAH MUFAKAT DENGAN PEMERINTAH MAUPUN MASYARAKAT</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-[#040DBF] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  3
                </span>
                <span className="leading-relaxed font-medium">BERUPAYA MEWUJUDKAN SARANA DAN PRASARANA YANG MEMADAI</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-[#040DBF] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  4
                </span>
                <span className="leading-relaxed font-medium">BERUPAYA MEMPERTAJAM POTENSI PEMUDA & OLAHRAGA</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-[#040DBF] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  5
                </span>
                <span className="leading-relaxed font-medium">BERUPAYA MENINGKATKAN KEHIDUPAN DESA YANG DINAMIS DALAM SEGI KEAGAMAAN & KEBUDAYAAN</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Struktur Organisasi Pemdes */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#040DBF]">Aparatur Desa</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Pemerintah Desa / Perangkat Desa</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Perangkat Pemerintahan Desa Wawasan, Kecamatan Tanjung Sari, Kabupaten Lampung Selatan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perangkatList.map((p, idx) => (
              <div key={idx} className="light-card rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center space-y-4 light-card-hover">
                <img 
                  src={p.foto} 
                  alt={p.nama} 
                  className={`w-24 h-24 rounded-full object-cover ${p.fotoPos || 'object-top'} border-2 border-blue-200 shadow-xl bg-slate-50`}
                />
                <div>
                  <h4 className="text-base font-bold text-slate-800">{p.nama}</h4>
                  <span className="text-xs font-semibold text-[#040DBF] block mt-0.5">{p.jabatan}</span>
                </div>
                <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.kontak}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kepala Dusun Section */}
        <div className="space-y-8 pt-6 border-t border-slate-200">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#05C7F2]">Kepala Dusun</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Kepala Dusun (Kadus)</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Kepala Dusun penanggung jawab wilayah di Desa Wawasan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kadusList.map((k, idx) => (
              <div key={idx} className="light-card rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center space-y-4 light-card-hover border-t-4 border-t-[#05C7F2]">
                <img 
                  src={k.foto} 
                  alt={k.nama} 
                  className={`w-24 h-24 rounded-full object-cover ${k.fotoPos || 'object-top'} border-2 border-cyan-200 shadow-xl bg-slate-50`}
                />
                <div>
                  <h4 className="text-base font-bold text-slate-800">{k.nama}</h4>
                  <span className="text-xs font-bold text-[#040DBF] block mt-0.5">{k.jabatan}</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-1">{k.dusun}</span>
                </div>
                <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{k.kontak}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
