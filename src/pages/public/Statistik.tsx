import React from 'react';
import { Users, Briefcase, GraduationCap, Heart, Home, ShieldAlert } from 'lucide-react';
import { PageHeroSlider } from '../../components/layout/PageHeroSlider';
import { GenderChart, EducationChart, WorkChart } from '../../components/charts/PopulationChart';

export const Statistik: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      
      {/* FLOATING PAGE HERO SLIDER */}
      <PageHeroSlider
        badge="Portal Kependudukan"
        title="Statistik & Demografi Desa Wawasan"
        subtitle="Visualisasi data kependudukan realtime berdasarkan jenis kelamin, pendidikan, mata pencaharian, dan distribusi per dusun."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="light-card p-6 rounded-2xl text-center">
            <Users className="w-8 h-8 text-[#040DBF] mx-auto mb-2" />
            <span className="text-2xl font-extrabold text-slate-800 block">3.318</span>
            <span className="text-xs text-slate-500">Total Penduduk</span>
          </div>
          <div className="light-card p-6 rounded-2xl text-center">
            <Home className="w-8 h-8 text-[#05C7F2] mx-auto mb-2" />
            <span className="text-2xl font-extrabold text-slate-800 block">1.061</span>
            <span className="text-xs text-slate-500">Kepala Keluarga (KK)</span>
          </div>
          <div className="light-card p-6 rounded-2xl text-center">
            <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <span className="text-2xl font-extrabold text-slate-800 block">184</span>
            <span className="text-xs text-slate-500">Penerima Bansos / BLT</span>
          </div>
          <div className="light-card p-6 rounded-2xl text-center">
            <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <span className="text-2xl font-extrabold text-slate-800 block">18</span>
            <span className="text-xs text-slate-500">Disabilitas Terdata</span>
          </div>
        </div>

        {/* Chart Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Gender Doughnut */}
          <div className="lg:col-span-4 light-card p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#040DBF]" />
              Distribusi Jenis Kelamin
            </h3>
            <GenderChart />
            <div className="flex justify-around text-xs text-slate-600 font-semibold pt-2 border-t border-slate-200">
              <span className="text-blue-600">Laki-laki: 1.603 (48,3%)</span>
              <span className="text-pink-500">Perempuan: 1.715 (51,7%)</span>
            </div>
          </div>

          {/* Education Bar */}
          <div className="lg:col-span-8 light-card p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#040DBF]" />
              Tingkat Pendidikan Terakhir
            </h3>
            <EducationChart />
          </div>

          {/* Work Bar */}
          <div className="lg:col-span-12 light-card p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#040DBF]" />
              Mata Pencaharian Utama Warga
            </h3>
            <WorkChart />
          </div>

        </div>
      </div>

    </div>
  );
};
