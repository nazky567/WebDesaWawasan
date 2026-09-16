import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export const VillageMap: React.FC = () => {
  // Real Google Maps Embed URL derived from shortlink https://maps.app.goo.gl/eAbQRNVvZHy2c3hNA
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15887.896677943564!2d105.34346761168051!3d-5.37207428453412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40e500161e40cf%3A0x514da10385f552bc!2sDesa%20Wawasan%2C%20Kec.%20Tj.%20Sari%2C%20Kabupaten%20Lampung%20Selatan%2C%20Lampung%2035361!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";
  const googleMapsAppUrl = "https://maps.app.goo.gl/eAbQRNVvZHy2c3hNA";

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl brand-gradient text-white flex items-center justify-center font-bold">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Google Maps Real-Time Desa Wawasan</h3>
            <span className="text-[11px] text-slate-500 block">Bangunsari, Kec. Tanjung Sari, Kabupaten Lampung Selatan</span>
          </div>
        </div>

        <a
          href={googleMapsAppUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-[#040DBF] border border-blue-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all w-full sm:w-auto justify-center cursor-pointer"
        >
          <Navigation className="w-4 h-4 text-[#040DBF]" />
          <span>Buka Petunjuk Arah di Google Maps App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Real Google Maps Embed Container */}
      <div className="w-full h-[540px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative bg-slate-100">
        <iframe
          src={googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Peta Lokasi Resmi Desa Wawasan Google Maps"
          className="w-full h-full rounded-3xl"
        />
      </div>
    </div>
  );
};
