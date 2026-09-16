import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a1628] text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-xl shadow-md">
              <img 
                src="./images/Group 38986.png" 
                alt="Desa Wawasan" 
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Portal Website Resmi Desa Wawasan, Kecamatan Tanjung Sari, Kabupaten Lampung Selatan. Informasi desa & transparansi anggaran publik.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Terintegrasi Supabase Serverless</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Navigasi Utama</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/profil" className="hover:text-[#05C7F2] transition-colors">Profil & Sejarah Desa</Link></li>
              <li><Link to="/berita" className="hover:text-[#05C7F2] transition-colors">Berita & Agenda Kegiatan</Link></li>
              <li><Link to="/transparansi" className="hover:text-[#05C7F2] transition-colors">Transparansi Anggaran APBDes</Link></li>
              <li><Link to="/statistik" className="hover:text-[#05C7F2] transition-colors">Statistik Kependudukan</Link></li>
              <li><Link to="/potensi" className="hover:text-[#05C7F2] transition-colors">Potensi Desa & BUMDes</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Kontak & Operasional</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#05C7F2] shrink-0 mt-0.5" />
                <span>Balai Desa Wawasan, Kec. Tanjung Sari, Kab. Lampung Selatan, Lampung 35361</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#05C7F2] shrink-0" />
                <span>0852 1555 9711 (Sekretariat Desa)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#05C7F2] shrink-0" />
                <span>desawawasan01@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#05C7F2] shrink-0" />
                <span>Senin - Jumat: 08.00 – 15.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Links External */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Tautan Pemerintah</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="https://lampungselatankab.go.id" target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 hover:text-[#05C7F2] transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Pemkab Lampung Selatan</span>
                </a>
              </li>
              <li>
                <a href="https://kemendesa.go.id" target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 hover:text-[#05C7F2] transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Kementerian Desa PDTT</span>
                </a>
              </li>
              <li>
                <a href="https://kemendagri.go.id" target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 hover:text-[#05C7F2] transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Kementerian Dalam Negeri</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Pemerintah Desa Wawasan. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center space-x-1">
            <span>Dikembangkan bersama Tim KKN Desa Wawasan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
