import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Users, Home, MapPin, PieChart, TrendingUp, BarChart2
} from 'lucide-react';
import { GenderChart, EducationChart } from '../charts/PopulationChart';
import { APBDesChart } from '../charts/APBDesChart';
import { INITIAL_APBDES } from '../../services/mockData';

interface StatisticModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeId: 'penduduk' | 'kk' | 'dusun' | 'apbdes' | null;
}

export const StatisticModal: React.FC<StatisticModalProps> = ({
  isOpen,
  onClose,
  activeId,
}) => {
  // ESC Key Listener & Body Scroll Lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !activeId) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 mt-16 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={onClose}
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/40"
        />

        {/* Modal Window Container - Compact Size & Balanced Spacing */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl lg:max-w-3xl max-h-[65vh] sm:max-h-[68vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-10"
        >
          {/* Simple Clean Header (White background, no bright blue gradient) */}
          <div className="bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#040DBF] shrink-0">
                {activeId === 'penduduk' && <Users className="w-4 h-4" />}
                {activeId === 'kk' && <Home className="w-4 h-4" />}
                {activeId === 'dusun' && <MapPin className="w-4 h-4" />}
                {activeId === 'apbdes' && <PieChart className="w-4 h-4" />}
              </div>
              <div>
                <h3 id="modal-title" className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                  {activeId === 'penduduk' && 'Detail Demografi & Kependudukan'}
                  {activeId === 'kk' && 'Data Kepala Keluarga (KK) & Rumah Tangga'}
                  {activeId === 'dusun' && 'Profil Wilayah Dusun Desa Wawasan'}
                  {activeId === 'apbdes' && 'Rincian Transparansi Anggaran APBDes 2025'}
                </h3>
                <p className="text-[11px] text-slate-500 font-normal">
                  Pemerintah Desa Wawasan • Kec. Tanjung Sari • Lampung Selatan
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shrink-0"
              aria-label="Tutup Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-slate-700">
            
            {/* TAB 1: DETAIL PENDUDUK */}
            {activeId === 'penduduk' && (
              <div className="space-y-4">
                {/* Summary Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  <div className="bg-blue-50/80 p-2.5 rounded-lg border border-blue-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Total Penduduk</span>
                    <span className="text-lg sm:text-xl font-extrabold brand-gradient-text block">3.318</span>
                    <span className="text-[9px] text-blue-600 font-bold">Jiwa Terdaftar</span>
                  </div>
                  <div className="bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Laki-laki</span>
                    <span className="text-lg sm:text-xl font-extrabold text-blue-700 block">1.603</span>
                    <span className="text-[9px] text-blue-600 font-bold">48,31% Total</span>
                  </div>
                  <div className="bg-pink-50/80 p-2.5 rounded-lg border border-pink-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Perempuan</span>
                    <span className="text-lg sm:text-xl font-extrabold text-pink-600 block">1.715</span>
                    <span className="text-[9px] text-pink-500 font-bold">51,69% Total</span>
                  </div>
                  <div className="bg-purple-50/80 p-2.5 rounded-lg border border-purple-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Kepadatan</span>
                    <span className="text-lg sm:text-xl font-extrabold text-purple-700 block">699</span>
                    <span className="text-[9px] text-purple-600 font-bold">Jiwa / km²</span>
                  </div>
                </div>

                {/* Demografi Umur */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#040DBF]" />
                    Distribusi Usia Penduduk
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Balita (0-5)</span>
                      <span className="text-sm font-bold text-slate-800">245 Jiwa</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Anak (6-12)</span>
                      <span className="text-sm font-bold text-slate-800">530 Jiwa</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Remaja (13-17)</span>
                      <span className="text-sm font-bold text-slate-800">615 Jiwa</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Dewasa (18-59)</span>
                      <span className="text-sm font-bold text-slate-800">1.568 Jiwa</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Lansia (60+)</span>
                      <span className="text-sm font-bold text-slate-800">360 Jiwa</span>
                    </div>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 shadow-xs">
                    <h5 className="text-[11px] font-bold text-slate-800">Rasio Jenis Kelamin</h5>
                    <GenderChart />
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 shadow-xs">
                    <h5 className="text-[11px] font-bold text-slate-800">Tingkat Pendidikan Terakhir</h5>
                    <EducationChart />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DETAIL KK */}
            {activeId === 'kk' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  <div className="bg-blue-50/80 p-2.5 rounded-lg border border-blue-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Total Kepala Keluarga</span>
                    <span className="text-lg sm:text-xl font-extrabold brand-gradient-text block">1.061</span>
                    <span className="text-[9px] text-blue-600 font-bold">KK Terdaftar</span>
                  </div>
                  <div className="bg-indigo-50/80 p-2.5 rounded-lg border border-indigo-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Rata-Rata Anggota</span>
                    <span className="text-lg sm:text-xl font-extrabold text-indigo-700 block">3,1</span>
                    <span className="text-[9px] text-indigo-600 font-bold">Jiwa / KK</span>
                  </div>
                  <div className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Bangunan Rumah</span>
                    <span className="text-lg sm:text-xl font-extrabold text-amber-700 block">985</span>
                    <span className="text-[9px] text-amber-600 font-bold">Unit Terdata</span>
                  </div>
                  <div className="bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Penerima Bansos</span>
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-700 block">184</span>
                    <span className="text-[9px] text-emerald-600 font-bold">KK Terverifikasi</span>
                  </div>
                </div>

                {/* Dusun Breakdown KK */}
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-[#040DBF]" />
                    Persebaran Kepala Keluarga (KK) per Dusun
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span>Dusun Asri Jaya</span>
                        <span className="text-[#040DBF]">295 KK (27.8%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full brand-gradient rounded-full" style={{ width: '27.8%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span>Dusun Budi Jaya</span>
                        <span className="text-[#040DBF]">275 KK (25.9%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full brand-gradient rounded-full" style={{ width: '25.9%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span>Dusun Cinta Jaya</span>
                        <span className="text-[#040DBF]">255 KK (24.0%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full brand-gradient rounded-full" style={{ width: '24.0%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span>Dusun Damai Jaya</span>
                        <span className="text-[#040DBF]">236 KK (22.3%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full brand-gradient rounded-full" style={{ width: '22.3%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DETAIL DUSUN */}
            {activeId === 'dusun' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="text-[10px] font-bold text-[#040DBF] bg-blue-50 px-2 py-0.5 rounded-full">Asri Jaya</span>
                      <span className="text-[10px] text-slate-500 font-medium">Kadus: Krisna Abi Pratama</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">Dusun Asri Jaya</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Pusat pemerintahan desa, Balai Desa Wawasan, dan Balai Pertemuan.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-center text-[10px] pt-1 border-t border-slate-100">
                      <div><span className="text-slate-400 block text-[9px]">Penduduk</span><span className="font-bold text-slate-800">920</span></div>
                      <div><span className="text-slate-400 block text-[9px]">KK</span><span className="font-bold text-slate-800">295</span></div>
                      <div><span className="text-slate-400 block text-[9px]">RT</span><span className="font-bold text-slate-800">6 RT</span></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="text-[10px] font-bold text-[#040DBF] bg-blue-50 px-2 py-0.5 rounded-full">Budi Jaya</span>
                      <span className="text-[10px] text-slate-500 font-medium">Kadus: Wahyudi</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">Dusun Budi Jaya</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Sentra industri UMKM keripik pisang dan usaha mikro warga.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-center text-[10px] pt-1 border-t border-slate-100">
                      <div><span className="text-slate-400 block text-[9px]">Penduduk</span><span className="font-bold text-slate-800">860</span></div>
                      <div><span className="text-slate-400 block text-[9px]">KK</span><span className="font-bold text-slate-800">275</span></div>
                      <div><span className="text-slate-400 block text-[9px]">RT</span><span className="font-bold text-slate-800">6 RT</span></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="text-[10px] font-bold text-[#040DBF] bg-blue-50 px-2 py-0.5 rounded-full">Cinta Jaya</span>
                      <span className="text-[10px] text-slate-500 font-medium">Kadus: Ashar Sodik</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">Dusun Cinta Jaya</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Kawasan perkebunan aren, produksi gula aren, dan holtikultura.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-center text-[10px] pt-1 border-t border-slate-100">
                      <div><span className="text-slate-400 block text-[9px]">Penduduk</span><span className="font-bold text-slate-800">800</span></div>
                      <div><span className="text-slate-400 block text-[9px]">KK</span><span className="font-bold text-slate-800">255</span></div>
                      <div><span className="text-slate-400 block text-[9px]">RT</span><span className="font-bold text-slate-800">6 RT</span></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="text-[10px] font-bold text-[#040DBF] bg-blue-50 px-2 py-0.5 rounded-full">Damai Jaya</span>
                      <span className="text-[10px] text-slate-500 font-medium">Kadus: Harsono</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">Dusun Damai Jaya</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Wilayah persawahan padi, peternakan sapi, dan jaringan irigasi.
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-center text-[10px] pt-1 border-t border-slate-100">
                      <div><span className="text-slate-400 block text-[9px]">Penduduk</span><span className="font-bold text-slate-800">738</span></div>
                      <div><span className="text-slate-400 block text-[9px]">KK</span><span className="font-bold text-slate-800">236</span></div>
                      <div><span className="text-slate-400 block text-[9px]">RT</span><span className="font-bold text-slate-800">5 RT</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: DETAIL APBDES */}
            {activeId === 'apbdes' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  <div className="bg-blue-50/80 p-2.5 rounded-lg border border-blue-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Pagu Belanja 2025</span>
                    <span className="text-base font-extrabold brand-gradient-text block">Rp 1.212.040.159</span>
                    <span className="text-[9px] text-blue-600 font-bold">Pagu Anggaran Resmi</span>
                  </div>
                  <div className="bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Pagu Pendapatan 2025</span>
                    <span className="text-base font-extrabold text-emerald-700 block">Rp 1.332.276.616</span>
                    <span className="text-[9px] text-emerald-600 font-bold">Target Penerimaan</span>
                  </div>
                  <div className="bg-indigo-50/80 p-2.5 rounded-lg border border-indigo-100 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 block">Realisasi Belanja</span>
                    <span className="text-base font-extrabold text-indigo-700 block">71,38%</span>
                    <span className="text-[9px] text-indigo-600 font-bold">Rp 865.226.220</span>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-2.5 rounded-lg text-[11px] text-amber-900 leading-snug">
                  <span className="font-bold">Catatan Anggaran 2025:</span> Pada tahun 2025, Dana Desa tahap 2 tidak cair atau tidak dikucurkan ke Desa Wawasan.
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-[#040DBF]" />
                    Grafik Alokasi Anggaran Belanja Desa 2025
                  </h4>
                  <APBDesChart items={INITIAL_APBDES} />
                </div>
              </div>
            )}

          </div>

          {/* Footer Action - Simple Clean Bar */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
              Tekan <kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded text-[9px]">ESC</kbd> untuk menutup
            </span>
            <button
              onClick={onClose}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-1.5 rounded-lg transition-all cursor-pointer ml-auto"
            >
              Tutup
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
