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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const GenderChart: React.FC = () => {
  const data = {
    labels: ['Laki-laki', 'Perempuan'],
    datasets: [
      {
        data: [1603, 1715],
        backgroundColor: ['rgba(4, 13, 191, 0.8)', 'rgba(5, 199, 242, 0.8)'],
        borderColor: ['#040DBF', '#05C7F2'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-64 flex items-center justify-center">
      <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export const EducationChart: React.FC = () => {
  const data = {
    labels: ['Tidak / Belum Sekolah', 'SD / Sederajat', 'SMP / Sederajat', 'SMA / SMK', 'D3 / Diploma', 'S1 / Sarjana'],
    datasets: [
      {
        label: 'Jumlah Penduduk',
        data: [380, 920, 770, 995, 112, 141],
        backgroundColor: 'rgba(4, 13, 191, 0.7)',
        borderColor: '#040DBF',
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar data={data} options={{ 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { display: false } },
          y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(0,0,0,0.05)' } },
        }
      }} />
    </div>
  );
};

export const WorkChart: React.FC = () => {
  const data = {
    labels: ['Petani / Pekebun', 'Wiraswasta / UMKM', 'Ibu Rumah Tangga', 'Karyawan Swasta', 'PNS / TNI / Polri', 'Pelajar / Mahasiswa', 'Lainnya'],
    datasets: [
      {
        label: 'Jumlah Warga',
        data: [1115, 450, 735, 332, 53, 485, 148],
        backgroundColor: 'rgba(5, 199, 242, 0.7)',
        borderColor: '#05C7F2',
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar data={data} options={{ 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { display: false } },
          y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(0,0,0,0.05)' } },
        }
      }} />
    </div>
  );
};
