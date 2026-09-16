import React, { useEffect, useState } from 'react';
import { Phone, MapPin } from 'lucide-react';
import { PageHeroSlider } from '../../components/layout/PageHeroSlider';
import { dataService } from '../../services/dataService';
import type { UMKMItem } from '../../types';

export const PotensiDesa: React.FC = () => {
  const [umkmList, setUmkmList] = useState<UMKMItem[]>([]);

  useEffect(() => {
    dataService.getUMKM().then(setUmkmList);
  }, []);

  return (
    <div className="space-y-12 pb-16">
      
      {/* PAGE HERO SLIDER */}
      <PageHeroSlider
        badge="Ekonomi & Pemberdayaan Warga"
        title="Potensi Desa & Produk Unggulan UMKM"
        subtitle="Katalog resmi produk lokal, usaha mikro masyarakat, hasil perkebunan aren, dan unit usaha BUMDes Wawasan Jaya."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Grid UMKM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {umkmList.map((item) => (
            <div key={item.id} className="light-card rounded-3xl overflow-hidden space-y-4 flex flex-col justify-between p-6 light-card-hover">
              <div className="space-y-4">
                <div className="h-48 rounded-2xl overflow-hidden relative">
                  <img src={item.foto_usaha_url} alt={item.nama_usaha} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.kategori_usaha}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{item.nama_usaha}</h3>
                  <span className="text-xs text-[#040DBF] font-semibold block mt-0.5">Pemilik: {item.pemilik_nama}</span>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.deskripsi}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#040DBF] shrink-0" />
                  <span className="line-clamp-1">{item.alamat_usaha}</span>
                </div>
                <a
                  href={`https://wa.me/${item.no_hp?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hubungi Penjual via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
