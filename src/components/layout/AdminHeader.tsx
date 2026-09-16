import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';
import { LogOut, Shield, AlertCircle, X } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  const { user, role, loginAsRole, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const roleOptions: { role: UserRole; label: string }[] = [
    { role: 'super_admin', label: 'Super Admin' },
    { role: 'kepala_desa', label: 'Kepala Desa' },
    { role: 'sekretaris_desa', label: 'Sekretaris Desa' },
    { role: 'kasi_pemerintahan', label: 'Kasi Pemerintahan' },
    { role: 'kasi_kesejahteraan', label: 'Kasi Kesejahteraan' },
    { role: 'kasi_pelayanan', label: 'Kasi Pelayanan' },
    { role: 'kaur_keuangan', label: 'Kaur Keuangan' },
    { role: 'kaur_perencanaan', label: 'Kaur Perencanaan' },
    { role: 'kaur_tu_umum', label: 'Kaur TU & Umum' },
    { role: 'kepala_dusun', label: 'Kepala Dusun' },
  ];

  const handleConfirmLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <>
      <header className="h-20 bg-slate-900/80 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">Panel Administrasi SID Wawasan</h2>
          <p className="text-xs text-slate-400">Sistem Informasi Desa & Tata Kelola Digital Desa</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Quick Role Switcher for Testing */}
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] text-slate-400 font-semibold">Simulasi Role:</span>
            <select
              value={role}
              onChange={(e) => loginAsRole(e.target.value as UserRole)}
              className="bg-transparent text-xs font-bold text-cyan-300 focus:outline-none cursor-pointer"
            >
              {roleOptions.map((opt) => (
                <option key={opt.role} value={opt.role} className="bg-slate-900 text-slate-200">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Badge */}
          <div className="flex items-center space-x-3 pl-2">
            <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs">
              {user?.nama_lengkap.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="hidden md:block">
              <span className="text-xs font-semibold text-white block">{user?.nama_lengkap}</span>
              <span className="text-[10px] text-slate-400 block">{user?.nik}</span>
            </div>
          </div>

          {/* Leave / Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            title="Keluar dari Sistem"
            className="flex items-center space-x-1.5 px-3 py-2 text-slate-300 hover:text-white bg-rose-500/10 hover:bg-rose-600/30 border border-rose-500/30 hover:border-rose-500/60 rounded-xl transition-all font-semibold text-xs shadow-sm"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Floating Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="glass-card bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Konfirmasi Keluar Sistem</h3>
                <p className="text-xs text-slate-400">Panel Administrasi SID Desa Wawasan</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
              Apakah Anda yakin ingin <span className="text-rose-400 font-bold">Log Out</span> dan mengakhiri sesi akses sebagai <span className="text-cyan-300 font-bold">{user?.nama_lengkap} ({role})</span>?
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Ya, Log Out Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
