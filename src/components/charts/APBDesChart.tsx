import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import type { APBDesItem } from '../../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const APBDesChart: React.FC<{ items: APBDesItem[] }> = ({ items }) => {
  const belanjaItems = items.filter((i) => i.kategori === 'belanja');

  const data = {
    labels: belanjaItems.map((i) => i.rincian_akun),
    datasets: [
      {
        label: 'Pagu Belanja 2025 (Rp)',
        data: belanjaItems.map((i) => i.jumlah_anggaran),
        backgroundColor: 'rgba(4, 13, 191, 0.7)',
        borderRadius: 6,
      },
      {
        label: 'Realisasi Belanja 2025 (Rp)',
        data: belanjaItems.map((i) => i.jumlah_realisasi),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="h-80 w-full">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#64748b' },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const val = context.parsed.y ?? 0;
                  return `${context.dataset.label}: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)}`;
                }
              }
            }
          },
          scales: {
            x: { ticks: { color: '#64748b', maxRotation: 25, minRotation: 0 }, grid: { display: false } },
            y: { 
              ticks: { 
                color: '#64748b',
                callback: (val) => `Rp ${(Number(val) / 1000000).toFixed(0)} Jt`
              }, 
              grid: { color: 'rgba(0,0,0,0.05)' } 
            },
          },
        }}
      />
    </div>
  );
};

export const AnggaranOverviewChart: React.FC<{
  paguPendapatan: number;
  paguBelanja: number;
  realisasiBelanja: number;
}> = ({ paguPendapatan, paguBelanja, realisasiBelanja }) => {
  const data = {
    labels: ['Pagu Pendapatan', 'Pagu Belanja', 'Realisasi Belanja'],
    datasets: [
      {
        label: 'Nominal APBDes 2025 (Rp)',
        data: [paguPendapatan, paguBelanja, realisasiBelanja],
        backgroundColor: [
          'rgba(4, 13, 191, 0.85)',   // Navy/Blue
          'rgba(5, 199, 242, 0.85)',   // Cyan
          'rgba(16, 185, 129, 0.85)',  // Emerald
        ],
        borderColor: [
          '#040DBF',
          '#05C7F2',
          '#10B981',
        ],
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="h-72 w-full">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const val = context.parsed.y ?? 0;
                  return `Nominal: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 2 }).format(val)}`;
                }
              }
            }
          },
          scales: {
            x: { ticks: { color: '#475569', font: { weight: 'bold' } }, grid: { display: false } },
            y: { 
              ticks: { 
                color: '#64748b',
                callback: (val) => `Rp ${(Number(val) / 1000000).toFixed(0)} Jt`
              }, 
              grid: { color: 'rgba(0,0,0,0.05)' } 
            },
          },
        }}
      />
    </div>
  );
};

export const RealisasiPieChart: React.FC = () => {
  const data = {
    labels: ['Realisasi Belanja (71,38%)', 'Belum Terealisasi (28,62%)'],
    datasets: [
      {
        data: [71.38, 28.62],
        backgroundColor: [
          'rgba(16, 185, 129, 0.85)', // Emerald
          'rgba(241, 245, 249, 0.9)',  // Slate-100
        ],
        borderColor: [
          '#10B981',
          '#cbd5e1',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-64 flex items-center justify-center relative">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#475569', boxWidth: 14, font: { size: 11, weight: 'bold' } }
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed}%`
              }
            }
          },
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
        <span className="text-2xl font-extrabold text-emerald-600">71,38%</span>
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Terealisasi</span>
      </div>
    </div>
  );
};
