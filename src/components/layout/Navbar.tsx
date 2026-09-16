import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, Newspaper, PieChart, BarChart3, 
  MapPin, Store, Menu, X, Shield, User, LogOut, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/', icon: Building2 },
    { name: 'Profil', path: '/profil', icon: Building2 },
    { name: 'Berita', path: '/berita', icon: Newspaper },
    { name: 'Transparansi', path: '/transparansi', icon: PieChart },
    { name: 'Statistik', path: '/statistik', icon: BarChart3 },
    { name: 'Peta', path: '/peta', icon: MapPin },
    { name: 'Potensi', path: '/potensi', icon: Store },
  ];

  const getRoleLabel = (r: string) => {
    switch (r) {
      case 'super_admin': return 'Super Admin';
      case 'kepala_desa': return 'Kepala Desa';
      case 'sekretaris_desa': return 'Sekretaris Desa';
      case 'kasi_pemerintahan': return 'Kasi Pemerintahan';
      case 'kasi_pelayanan': return 'Kasi Pelayanan';
      case 'kasi_kesejahteraan': return 'Kasi Kesejahteraan';
      case 'kepala_dusun': return 'Kepala Dusun';
      default: return 'Warga';
    }
  };

  const handleConfirmLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white border-b transition-shadow duration-300 ${scrolled ? 'border-slate-200 shadow-md' : 'border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Title */}
            <Link to="/" className="flex items-center group py-1 shrink-0 mr-4">
              <img 
                src="./images/Group 38986.png" 
                alt="Desa Wawasan" 
                className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-[#040DBF] border border-blue-200 shadow-sm'
                        : 'text-slate-600 hover:text-[#040DBF] hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#040DBF]' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Auth Controls */}
            <div className="hidden lg:flex items-center space-x-3 shrink-0 ml-2">
              {user && role !== 'warga' ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 brand-gradient text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/25 hover:opacity-90 transition-all whitespace-nowrap"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Dashboard ({getRoleLabel(role)})</span>
                  </Link>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    title="Keluar"
                    className="p-2.5 text-slate-400 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 rounded-xl transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-slate-50 hover:bg-blue-50 text-slate-700 border border-slate-200 hover:border-blue-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm whitespace-nowrap"
                >
                  <User className="w-4 h-4 text-[#040DBF]" />
                  <span>Login Portal</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 hover:text-[#040DBF] focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#040DBF] border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#040DBF]'
                  }`}
                >
                  <Icon className="w-5 h-5 text-[#040DBF]" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-200 space-y-2">
              {user && role !== 'warga' ? (
                <div className="space-y-2">
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full brand-gradient text-white font-semibold py-3 rounded-xl"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Dashboard ({getRoleLabel(role)})</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="flex items-center justify-center space-x-2 w-full bg-rose-50 text-rose-600 font-semibold py-2.5 rounded-xl border border-rose-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar dari Sistem</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl"
                >
                  <User className="w-5 h-5 text-[#040DBF]" />
                  <span>Portal Masuk / Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Floating Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Konfirmasi Keluar</h3>
                <p className="text-xs text-slate-500">Sistem Informasi Desa Wawasan</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              Apakah Anda yakin ingin <span className="text-rose-600 font-bold">Log Out</span> dan mengakhiri akses sebagai <span className="text-[#040DBF] font-bold">{user?.nama_lengkap} ({getRoleLabel(role)})</span>?
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
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
