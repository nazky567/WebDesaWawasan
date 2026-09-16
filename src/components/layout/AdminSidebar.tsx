import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, PieChart, Newspaper, 
  Store, Settings, ShieldCheck, Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface SidebarMenu {
  title: string;
  path: string;
  icon: any;
  allowedRoles: UserRole[];
}

export const AdminSidebar: React.FC = () => {
  const { role } = useAuth();
  const location = useLocation();

  const menus: SidebarMenu[] = [
    {
      title: 'Ikhtisar Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      allowedRoles: ['super_admin', 'kepala_desa', 'sekretaris_desa', 'kasi_pemerintahan', 'kasi_pelayanan', 'kasi_kesejahteraan', 'kaur_keuangan', 'kaur_perencanaan', 'kaur_tu_umum', 'kepala_dusun']
    },
    {
      title: 'Data Kependudukan',
      path: '/admin/penduduk',
      icon: Users,
      allowedRoles: ['super_admin', 'kepala_desa', 'sekretaris_desa', 'kasi_pemerintahan', 'kaur_tu_umum', 'kepala_dusun']
    },
    {
      title: 'Manajemen Surat Online',
      path: '/admin/surat',
      icon: FileText,
      allowedRoles: ['super_admin', 'kepala_desa', 'sekretaris_desa', 'kasi_pelayanan', 'kaur_tu_umum']
    },
    {
      title: 'Keuangan & APBDes',
      path: '/admin/apbdes',
      icon: PieChart,
      allowedRoles: ['super_admin', 'kepala_desa', 'sekretaris_desa', 'kaur_keuangan', 'kaur_perencanaan']
    },
    {
      title: 'Kesejahteraan & UMKM',
      path: '/admin/umkm',
      icon: Store,
      allowedRoles: ['super_admin', 'kepala_desa', 'kasi_kesejahteraan', 'kaur_perencanaan']
    },
    {
      title: 'Publikasi Berita',
      path: '/admin/berita',
      icon: Newspaper,
      allowedRoles: ['super_admin', 'kepala_desa', 'sekretaris_desa', 'kaur_tu_umum']
    },
    {
      title: 'Pengaturan Sistem',
      path: '/admin/settings',
      icon: Settings,
      allowedRoles: ['super_admin']
    }
  ];

  const filteredMenus = menus.filter(m => m.allowedRoles.includes(role));

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 shrink-0 min-h-screen flex flex-col">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-white block">PANEL SID</span>
            <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">Desa Wawasan</span>
          </div>
        </Link>
      </div>

      {/* Role Badge */}
      <div className="p-4 mx-4 my-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Aktor Saat Ini:</span>
        <span className="text-xs font-bold text-cyan-300 capitalize block mt-0.5">
          {role.replace('_', ' ')}
        </span>
      </div>

      {/* Menu List */}
      <nav className="px-3 space-y-1 flex-1">
        {filteredMenus.map((menu) => {
          const Icon = menu.icon;
          const isActive = location.pathname === menu.path;
          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{menu.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Return to Public Website */}
      <div className="p-4 border-t border-slate-900">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Website Utama</span>
        </Link>
      </div>
    </aside>
  );
};
