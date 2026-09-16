import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface StatisticCardProps {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left p-5 sm:p-6 rounded-[20px] border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#040DBF] ${
        isActive
          ? 'brand-gradient text-white border-transparent shadow-xl shadow-blue-600/30 scale-[1.02] z-10'
          : 'bg-white/95 backdrop-blur-md border-blue-100 hover:border-[#040DBF] text-slate-800 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5'
      }`}
      aria-pressed={isActive}
    >
      {/* Active State Badge */}
      {isActive && (
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white tracking-wider uppercase animate-fade-in">
          <CheckCircle2 className="w-3 h-3 text-white" />
          <span>Aktif</span>
        </div>
      )}

      <div className="flex items-start space-x-4">
        {/* Icon Wrapper */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
            isActive
              ? 'bg-white/20 text-white'
              : 'bg-blue-50 text-[#040DBF] border border-blue-100'
          }`}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <span
            className={`text-xs font-semibold block truncate ${
              isActive ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            {title}
          </span>
          <span
            className={`text-2xl sm:text-3xl font-extrabold block my-0.5 tracking-tight ${
              isActive ? 'text-white' : 'brand-gradient-text'
            }`}
          >
            {value}
          </span>
          <p
            className={`text-[11px] leading-tight truncate ${
              isActive ? 'text-blue-100 font-medium' : 'text-slate-400'
            }`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </button>
  );
};
