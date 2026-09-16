import React from 'react';
import { PageHeroSlider } from '../../components/layout/PageHeroSlider';
import { VillageMap } from '../../components/maps/VillageMap';

export const PetaDesa: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      
      {/* FLOATING PAGE HERO SLIDER */}
      <PageHeroSlider
        badge="Lokasi & Geospasial Resmi"
        title="Peta Lokasi Google Maps Desa Wawasan"
        subtitle="Peta wilayah resmi Desa Wawasan, Kecamatan Tanjung Sari, Kabupaten Lampung Selatan. Dilengkapi rute dan petunjuk arah."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VillageMap />
      </div>

    </div>
  );
};
