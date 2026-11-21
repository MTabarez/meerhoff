import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { BrandEmblem, OfficialClinicLogo } from './BrandMark';

interface HeaderProps {
  mode: 'hero' | 'light';
  onGoHome: () => void;
  onOpenMenu: () => void;
  onOpenAppointment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onGoHome,
  onOpenMenu,
  onOpenAppointment,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isOverDarkHero = mode === 'hero' && !scrolled;

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-40 transition-colors duration-300',
        scrolled
          ? 'bg-[#F4F0E8]/92 backdrop-blur-md border-b border-[#D9D7D2]/80'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
        {/* Left: Minimal institutional emblem */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onGoHome}
            aria-label="Ir al inicio de Clínica Prof. Albrecht Meerhoff"
            className={[
              'inline-flex items-center justify-center p-1 -m-1 rounded-full transition-colors duration-300 cursor-pointer',
              isOverDarkHero
                ? 'text-white hover:opacity-80'
                : 'text-[#343448] hover:opacity-75',
            ].join(' ')}
          >
            <BrandEmblem className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
          </button>
        </div>

        {/* Center: Official Clínica Prof. Albrecht Meerhoff logo */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onGoHome}
            aria-label="Clínica Prof. Albrecht Meerhoff — Inicio"
            className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
          >
            <OfficialClinicLogo
              tone={isOverDarkHero ? 'light' : 'dark'}
              size="header"
            />
          </button>
        </div>

        {/* Right: Floating white pill controls (Menú + Appointment icon) */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Abrir menú de navegación"
            className={[
              'px-4 sm:px-5 h-9 sm:h-10 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 cursor-pointer',
              'transition-colors duration-300 ease-out',
              'bg-white text-[#343448] hover:bg-[#343448] hover:text-white',
              scrolled || mode === 'light' ? 'border border-[#D9D7D2]' : 'border border-white/20',
            ].join(' ')}
          >
            Menú
          </button>

          <button
            type="button"
            onClick={onOpenAppointment}
            aria-label="Solicitar consulta o turno"
            title="Solicitar consulta"
            className={[
              'w-9 h-9 sm:w-10 sm:h-10 rounded-full inline-flex items-center justify-center shrink-0 cursor-pointer',
              'transition-colors duration-300 ease-out',
              'bg-white text-[#343448] hover:bg-[#85ADE2] hover:text-[#343448]',
              scrolled || mode === 'light' ? 'border border-[#D9D7D2]' : 'border border-white/20',
            ].join(' ')}
          >
            <Calendar className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};
