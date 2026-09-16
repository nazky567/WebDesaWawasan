import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface SlideData {
  image: string;
  title: string;
  highlight?: string;
  subtitle: string;
}

interface PageHeroSliderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  showButtons?: boolean;
  slides?: SlideData[];
}

const defaultSlidesData: SlideData[] = [
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
    title: '',
    subtitle: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80',
    title: '',
    subtitle: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80',
    title: '',
    subtitle: '',
  },
];

export const PageHeroSlider: React.FC<PageHeroSliderProps> = ({
  badge,
  title,
  highlight,
  subtitle,
  showButtons = false,
  slides,
}) => {
  const activeSlides = slides || defaultSlidesData;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      {/* Floating Card Container with Rounded Corners & Soft Shadow */}
      <section className="relative overflow-hidden w-full bg-[#040DBF] rounded-3xl shadow-xl border border-blue-100/50">
        {/* Embla Carousel Container */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {activeSlides.map((slide, index) => {
              const slideTitle = slide.title || title;
              const slideHighlight = slide.highlight || highlight;
              const slideSubtitle = slide.subtitle || subtitle;

              return (
                <div
                  key={index}
                  className={`embla__slide relative ${
                    showButtons 
                      ? 'h-[310px] sm:h-[340px] md:h-[360px]' 
                      : 'h-[220px] sm:h-[250px] md:h-[270px]'
                  } flex items-center justify-center`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  />

                  {/* Brand Wawasan Blue Shade Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#040DBF]/90 via-[#040DBF]/75 to-[#05C7F2]/70" />
                  <div className="absolute inset-0 bg-[#040DBF]/25 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040DBF]/90 via-transparent to-black/15" />

                  {/* Content Overlay */}
                  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-2.5 py-4">
                    {badge && (
                      <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-100 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-0.5 rounded-full shadow-xs">
                        {badge}
                      </span>
                    )}

                    <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                      {slideTitle}{' '}
                      {slideHighlight && (
                        <span className="bg-gradient-to-r from-cyan-200 via-white to-blue-100 bg-clip-text text-transparent block sm:inline">
                          {slideHighlight}
                        </span>
                      )}
                    </h1>

                    <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium line-clamp-2">
                      {slideSubtitle}
                    </p>

                    {/* Buttons ONLY ON Beranda Slider */}
                    {showButtons && (
                      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                        <Link
                          to="/transparansi"
                          className="flex items-center space-x-2 bg-white text-[#040DBF] hover:bg-blue-50 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-950/30 hover:scale-105 transition-all cursor-pointer"
                        >
                          <PieChart className="w-4 h-4 text-[#040DBF]" />
                          <span>Transparansi Anggaran</span>
                        </Link>
                        <Link
                          to="/profil"
                          className="flex items-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/30 transition-all cursor-pointer"
                        >
                          <Building2 className="w-4 h-4" />
                          <span>Jelajahi Profil Desa</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Slide Sebelumnya"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Slide Berikutnya"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === idx
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
