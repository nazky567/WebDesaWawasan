import React, { useEffect, useState } from 'react';
import { PieChart, BarChart3, AlertCircle, TrendingUp } from 'lucide-react';
import { PageHeroSlider } from '../../components/layout/PageHeroSlider';
import { APBDesChart, AnggaranOverviewChart, RealisasiPieChart } from '../../components/charts/APBDesChart';
import { dataService } from '../../services/dataService';
import type { APBDesItem, ProgramDesa } from '../../types';

export const Transparansi: React.FC = () => {
  const [apbdes, setApbdes] = useState<APBDesItem[]>([]);
  const [programs, setPrograms] = useState<ProgramDesa[]>([]);

  useEffect(() => {
    dataService.getAPBDes().then(setApbdes);
    dataService.getProgramDesa().then(setPrograms);
  }, []);

  // Anggaran 2025 Resmi
  const paguPendapatan = 1332276616;
  const paguBelanja = 1212040159.48;
  const realisasiBelanja = 865226220;
  const persentaseRealisasi = ((realisasiBelanja / paguBelanja) * 100).toFixed(2); // 71.38%
  const persentaseSisa = (100 - Number(persentaseRealisasi)).toFixed(2); // 28.62%

  const formatRupiah = (val: number, maxDigits: number = 0) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: maxDigits > 0 ? 2 : 0,
      maximumFractionDigits: maxDigits 
    }).format(val);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* FLOATING PAGE HERO SLIDER */}
      <PageHeroSlider
        badge="Transparansi Publik"
        title="Anggaran Pendapatan & Belanja Desa (APBDes) 2025"
        subtitle="Wujud keterbukaan informasi publik dan akuntabilitas pengelolaan Dana Desa (DD) serta Alokasi Dana Desa (ADD) Desa Wawasan."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Catatan Khusus Anggaran 2025 */}
        <div className="bg-amber-50/90 border border-amber-200 border-l-4 border-l-amber-500 p-5 rounded-2xl shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-amber-100/80 text-amber-700 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-amber-900">
                Catatan Anggaran 2025
              </h4>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                Pada tahun 2025, Dana Desa tahap 2 tidak cair atau tidak dikucurkan ke Desa Wawasan.
              </p>
            </div>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="light-card p-6 rounded-3xl space-y-2 border-t-4 border-t-[#040DBF]">
            <span className="text-xs text-slate-500 font-semibold block">Pagu Pendapatan Desa 2025</span>
            <span className="text-2xl font-extrabold brand-gradient-text block">{formatRupiah(paguPendapatan)}</span>
            <span className="text-[11px] text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded font-semibold inline-block">
              Dana Desa + ADD + Bagi Hasil
            </span>
          </div>

          <div className="light-card p-6 rounded-3xl space-y-2 border-t-4 border-t-[#05C7F2]">
            <span className="text-xs text-slate-500 font-semibold block">Pagu Belanja Desa 2025</span>
            <span className="text-2xl font-extrabold text-slate-800 block">{formatRupiah(paguBelanja, 2)}</span>
            <span className="text-[11px] text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded font-semibold inline-block">
              Total Plafon Seluruh Bidang
            </span>
          </div>

          <div className="light-card p-6 rounded-3xl space-y-2 border-t-4 border-t-emerald-500">
            <span className="text-xs text-slate-500 font-semibold block">Realisasi Belanja Desa 2025</span>
            <span className="text-2xl font-extrabold text-emerald-600 block">{formatRupiah(realisasiBelanja)}</span>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded font-semibold inline-block">
              {persentaseRealisasi.replace('.', ',')}% Terealisasi
            </span>
          </div>
        </div>

        {/* Visualisasi Perbandingan & Realisasi Belanja */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Perbandingan Anggaran Bar Chart */}
          <div className="lg:col-span-7 light-card p-6 sm:p-8 rounded-3xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#040DBF]" />
                Perbandingan Pagu & Realisasi Anggaran 2025
              </h3>
            </div>
            <AnggaranOverviewChart
              paguPendapatan={paguPendapatan}
              paguBelanja={paguBelanja}
              realisasiBelanja={realisasiBelanja}
            />
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Pagu Pendapatan</span>
                <span className="text-xs font-bold text-blue-900">{formatRupiah(paguPendapatan)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Pagu Belanja</span>
                <span className="text-xs font-bold text-cyan-800">{formatRupiah(paguBelanja, 2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Realisasi Belanja</span>
                <span className="text-xs font-bold text-emerald-600">{formatRupiah(realisasiBelanja)}</span>
              </div>
            </div>
          </div>

          {/* Persentase Realisasi Belanja Pie/Gauge */}
          <div className="lg:col-span-5 light-card p-6 sm:p-8 rounded-3xl space-y-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-600" />
                Persentase Realisasi Belanja
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Rasio serapan realisasi terhadap pagu belanja desa 2025
              </p>
            </div>

            <RealisasiPieChart />

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Realisasi Belanja:
                </span>
                <span className="font-bold text-emerald-700">
                  {formatRupiah(realisasiBelanja)} ({persentaseRealisasi.replace('.', ',')}%)
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                  Belum Terealisasi:
                </span>
                <span className="font-bold text-slate-600">
                  {formatRupiah(paguBelanja - realisasiBelanja, 2)} ({persentaseSisa.replace('.', ',')}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* APBDes per Bidang Chart Visualizer */}
        <div className="light-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#040DBF]" />
              Alokasi & Realisasi Anggaran per Bidang Belanja 2025
            </h3>
            <span className="text-xs text-slate-500 font-medium">Tahun Anggaran 2025</span>
          </div>
          <APBDesChart items={apbdes} />
        </div>

        {/* Progress Pembangunan Desa */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#040DBF]">Pembangunan Fisik & Non-Fisik</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Progress Program Pembangunan Desa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((prog) => (
              <div key={prog.id} className="light-card p-6 rounded-2xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-800 leading-snug">{prog.nama_program}</h4>
                    <span className="text-xs text-slate-500 block mt-0.5">{prog.lokasi} • {prog.sumber_dana}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    prog.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-blue-50 text-[#040DBF] border border-blue-200'
                  }`}>
                    {prog.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                    <span>Persentase Pengerjaan</span>
                    <span className="text-[#040DBF] font-bold">{prog.persentase_progres}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div 
                      className="h-full brand-gradient rounded-full transition-all duration-500"
                      style={{ width: `${prog.persentase_progres}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Alokasi Pagu:</span>
                  <span className="font-bold text-slate-800">{formatRupiah(prog.anggaran)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
