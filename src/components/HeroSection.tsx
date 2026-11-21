import React from 'react';
import { EDITORIAL_ASSETS } from '../data/clinicData';
import { PillButton } from './Button';

interface HeroSectionProps {
  onExploreClinic: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClinic,
}) => {
  return (
    <section
      aria-label="Presentación institucional"
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#2D2D3D]"
    >
      {/* Full-bleed editorial photograph */}
      <div className="absolute inset-0">
        <img
          src={EDITORIAL_ASSETS.hero.src}
          alt={EDITORIAL_ASSETS.hero.alt}
          loading="eager"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_24%] scale-[1.01]"
        />
        {/* Measured multi-stop editorial scrim preserving warmth & ensuring high text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#232333]/55 via-[#232333]/35 to-[#232333]/78"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#232333]/55 via-transparent to-[#232333]/35"
        />
      </div>

      {/* Top spacer clearing the floating header */}
      <div className="relative z-10 h-24 sm:h-28 lg:h-32" aria-hidden="true" />

      {/* Main hero editorial canvas */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 lg:pb-20">
        {/* Asymmetric headline (left) and supporting copy + pill CTA (lower-right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <h1 className="text-white text-[46px] sm:text-[64px] lg:text-[86px] xl:text-[102px] leading-[0.93] tracking-[-0.032em] font-normal max-w-[13ch]">
              Una mirada hacia el futuro de la oftalmología.
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pl-8 xl:pl-12 lg:pb-2 flex flex-col items-start gap-7">
            <p className="text-white/95 text-[16px] sm:text-[18px] lg:text-[19px] leading-[1.48] font-normal max-w-[38ch]">
              Experiencia médica, precisión quirúrgica y tecnología de vanguardia al servicio de la
              salud visual en Montevideo.
            </p>

            <div>
              <PillButton variant="secondary" size="lg" showArrow onClick={onExploreClinic}>
                Conocé nuestra clínica
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
