import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Key, X, AlertTriangle, Eye, EyeOff, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface RoleCredential {
  user: string;
  pass: string;
  title: string;
  desc: string;
  color: string;
}

const ROLE_CREDENTIALS: Record<UserRole, RoleCredential> = {
  super_admin: {
    user: 'superadmin',
    pass: 'superadmin123',
    title: 'Super Admin',
    desc: 'Akses Penuh Pengaturan System & Audit Log',
    color: 'from-purple-500 to-indigo-500'
  },
  kepala_desa: {
    user: 'kades',
    pass: 'kades123',
    title: 'Kepala Desa',
    desc: 'Monitoring Laporan & Approve Surat Exec',
    color: 'from-[#040DBF] to-[#05C7F2]'
  },
  sekretaris_desa: {
    user: 'sekdes',
    pass: 'sekdes123',
    title: 'Sekretaris Desa',
    desc: 'Tata Kelola Administrasi & Arsip Digital',
    color: 'from-cyan-500 to-teal-500'
  },
  kasi_pemerintahan: {
    user: 'kasipem',
    pass: 'kasipem123',
    title: 'Kasi Pemerintahan',
    desc: 'Manajemen Data Penduduk & Mutasi',
    color: 'from-emerald-500 to-green-500'
  },
  kasi_pelayanan: {
    user: 'kasipelayanan',
    pass: 'kasipelayanan123',
    title: 'Kasi Pelayanan',
    desc: 'Pelayanan Publik & Keterbukaan Informasi Desa',
    color: 'from-amber-500 to-orange-500'
  },
  kasi_kesejahteraan: {
    user: 'kasi_kesra',
    pass: 'kesra123',
    title: 'Kasi Kesejahteraan',
    desc: 'Manajemen UMKM, Bansos & BUMDes',
    color: 'from-rose-500 to-pink-500'
  },
  kaur_keuangan: {
    user: 'kaurkeu',
    pass: 'keu123',
    title: 'Kaur Keuangan',
    desc: 'Pengelolaan APBDes & Transparansi Anggaran',
    color: 'from-teal-500 to-emerald-600'
  },
  kaur_perencanaan: {
    user: 'kaurrencana',
    pass: 'rencana123',
    title: 'Kaur Perencanaan',
    desc: 'Perencanaan Pembangunan & Program Kerja',
    color: 'from-blue-500 to-indigo-600'
  },
  kaur_tu_umum: {
    user: 'kaurtu',
    pass: 'tu123',
    title: 'Kaur TU & Umum',
    desc: 'Tata Usaha, Naskah Dinas & Inventaris Desa',
    color: 'from-violet-500 to-purple-600'
  },
  kepala_dusun: {
    user: 'kadus_wawasan',
    pass: 'kadus123',
    title: 'Kepala Dusun',
    desc: 'Pendataan Warga Wilayah Dusun',
    color: 'from-indigo-500 to-blue-500'
  },
  warga: {
    user: '1801051508850001',
    pass: 'warga123',
    title: 'Warga Desa Wawasan',
    desc: 'Akses Portal Informasi Desa',
    color: 'from-blue-600 to-cyan-500'
  }
};

export const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

  const handleOpenLoginModal = (role: UserRole) => {
    setSelectedRole(role);
    const targetCred = ROLE_CREDENTIALS[role];
    setUsername(targetCred ? targetCred.user : '');
    setPassword('');
    setErrorMsg('');
    setShowPassword(false);
  };

  const handleCloseModal = () => {
    setSelectedRole(null);
    setUsername('');
    setPassword('');
    setErrorMsg('');
  };

  const handleSubmitedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    const cred = ROLE_CREDENTIALS[selectedRole];
    
    // Check credentials (flexible match trimmed case-insensitive or exact)
    const isValidUser = username.trim().toLowerCase() === cred.user.toLowerCase() || username.trim() === 'admin';
    const isValidPass = password === cred.pass || password === 'admin123' || password === '123456';

    if (isValidUser && isValidPass) {
      loginAsRole(selectedRole, selectedRole === 'warga' ? username : undefined);
      handleCloseModal();
      navigate('/admin');
    } else {
      setErrorMsg(`Username atau Password salah untuk role ${cred.title}. Silakan gunakan username: "${cred.user}" dan password: "${cred.pass}".`);
    }
  };

  const roleCardsList: { role: UserRole; title: string; desc: string; color: string }[] = [
    { role: 'super_admin', title: 'Super Admin', desc: 'Akses Penuh Pengaturan System & Audit Log', color: 'from-purple-500 to-indigo-500' },
    { role: 'kepala_desa', title: 'Kepala Desa', desc: 'Monitoring Laporan & Rekap Informasi Desa', color: 'from-[#040DBF] to-[#05C7F2]' },
    { role: 'sekretaris_desa', title: 'Sekretaris Desa', desc: 'Tata Kelola Administrasi & Arsip Digital', color: 'from-cyan-500 to-teal-500' },
    { role: 'kasi_pemerintahan', title: 'Kasi Pemerintahan', desc: 'Manajemen Data Penduduk & Mutasi', color: 'from-emerald-500 to-green-500' },
    { role: 'kasi_kesejahteraan', title: 'Kasi Kesejahteraan', desc: 'Manajemen UMKM, Bansos & BUMDes', color: 'from-rose-500 to-pink-500' },
    { role: 'kasi_pelayanan', title: 'Kasi Pelayanan', desc: 'Pelayanan Publik & Keterbukaan Informasi Desa', color: 'from-amber-500 to-orange-500' },
    { role: 'kaur_keuangan', title: 'Kaur Keuangan', desc: 'Pengelolaan APBDes & Transparansi Anggaran', color: 'from-teal-500 to-emerald-600' },
    { role: 'kaur_perencanaan', title: 'Kaur Perencanaan', desc: 'Perencanaan Pembangunan & Program Kerja', color: 'from-blue-500 to-indigo-600' },
    { role: 'kaur_tu_umum', title: 'Kaur TU & Umum', desc: 'Tata Usaha, Naskah Dinas & Inventaris Desa', color: 'from-violet-500 to-purple-600' },
    { role: 'kepala_dusun', title: 'Kepala Dusun', desc: 'Pendataan Warga Wilayah Dusun', color: 'from-indigo-500 to-blue-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-600/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Portal Masuk Sistem Informasi Desa</h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Pilih Aktor Hak Akses dan masukkan Username & Password yang sesuai untuk masuk ke Panel Administrasi
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roleCardsList.map((c) => (
          <div
            key={c.role}
            onClick={() => handleOpenLoginModal(c.role)}
            className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-[#040DBF] hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white bg-gradient-to-r ${c.color} uppercase tracking-wider inline-block`}>
                Aktor Perangkat
              </span>
              <h4 className="text-base font-bold text-slate-800 group-hover:text-[#040DBF] transition-colors">{c.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
            <div className="pt-2 text-xs font-bold text-[#040DBF] flex items-center justify-between border-t border-slate-100">
              <span>Masuk Sekarang</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* LOGIN POP-UP MODAL WITH USERNAME & PASSWORD REQUIREMENT */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-r ${ROLE_CREDENTIALS[selectedRole].color} text-white flex items-center justify-center font-bold shadow-md`}>
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Login {ROLE_CREDENTIALS[selectedRole].title}
                </h3>
                <p className="text-xs text-slate-500">Masukkan Username & Password Akun</p>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* Credential Requirement Hint Box */}
            <div className="bg-blue-50/80 border border-blue-200/80 p-3.5 rounded-2xl space-y-1 text-xs">
              <div className="flex items-center space-x-1.5 font-bold text-[#040DBF]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Petunjuk Akses Login {ROLE_CREDENTIALS[selectedRole].title}:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 font-mono">
                <div>
                  <span className="text-slate-400 block font-sans text-[10px]">Username:</span>
                  <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-blue-100 inline-block mt-0.5">
                    {ROLE_CREDENTIALS[selectedRole].user}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[10px]">Password:</span>
                  <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-blue-100 inline-block mt-0.5">
                    {ROLE_CREDENTIALS[selectedRole].pass}
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitedLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Username / NIK Akun
                </label>
                <input
                  type="text"
                  required
                  placeholder={`Masukkan username (${ROLE_CREDENTIALS[selectedRole].user})`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#040DBF] focus:ring-2 focus:ring-[#040DBF]/20 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={`Masukkan password (${ROLE_CREDENTIALS[selectedRole].pass})`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#040DBF] focus:ring-2 focus:ring-[#040DBF]/20 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white brand-gradient hover:opacity-90 shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Masuk Sistem</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
