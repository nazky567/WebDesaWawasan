import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { Home } from '../pages/public/Home';
import { ProfilDesa } from '../pages/public/ProfilDesa';
import { Berita } from '../pages/public/Berita';
import { BeritaDetail } from '../pages/public/BeritaDetail';
import { Transparansi } from '../pages/public/Transparansi';
import { Statistik } from '../pages/public/Statistik';
import { PotensiDesa } from '../pages/public/PotensiDesa';
import { PetaDesa } from '../pages/public/PetaDesa';
import { Login } from '../pages/auth/Login';

// Admin Pages
import { DashboardOverview } from '../pages/admin/DashboardOverview';
import { DataPenduduk } from '../pages/admin/DataPenduduk';
import { ManajemenSurat } from '../pages/admin/ManajemenSurat';
import { ProgramDanAPBDes } from '../pages/admin/ProgramDanAPBDes';
import { KelolaBerita } from '../pages/admin/KelolaBerita';
import { KelolaUMKM } from '../pages/admin/KelolaUMKM';
import { SystemSettings } from '../pages/admin/SystemSettings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Facing Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="profil" element={<ProfilDesa />} />
        <Route path="berita" element={<Berita />} />
        <Route path="berita/:slug" element={<BeritaDetail />} />
        <Route path="transparansi" element={<Transparansi />} />
        <Route path="statistik" element={<Statistik />} />
        <Route path="potensi" element={<PotensiDesa />} />
        <Route path="peta" element={<PetaDesa />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Back-office Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="penduduk" element={<DataPenduduk />} />
        <Route path="surat" element={<ManajemenSurat />} />
        <Route path="apbdes" element={<ProgramDanAPBDes />} />
        <Route path="umkm" element={<KelolaUMKM />} />
        <Route path="berita" element={<KelolaBerita />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
