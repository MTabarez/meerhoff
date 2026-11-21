import React from 'react';
import { SPECIALTIES } from '../data/clinicData';
import { useReveal } from '../hooks/useMotion';
import { SpecialtyRow } from './SpecialtyRow';

interface SpecialtyListProps {
  onSelectSpecialty: (slug: string) => void;
}

export const SpecialtyList: React.FC<SpecialtyListProps> = ({ onSelectSpecialty }) => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="especialidades"
      ref={ref}
      aria-labelledby="specialties-heading"
      className="bg-[#F4F0E8] text-[#343448] pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-24"
    >
      {/* Editorial section header matching Jacques + Cie Services top rhythm */}
      <div
        data-visible={isVisible}
        className="reveal-block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-14 sm:mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-6">
            <h2
              id="specialties-heading"
              className="text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.02] tracking-[-0.028em] font-normal text-[#343448] max-w-[14ch]"
            >
              Atención especializada para cada mirada.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#343448]/85 max-w-[44ch]">
              Un equipo médico con experiencia en distintas áreas de la oftalmología, respaldado por
              tecnología avanzada y una formación profesional continua.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width editorial specialty rows */}
      <ul aria-label="Listado de especialidades oftalmológicas" className="w-full">
        {SPECIALTIES.map((specialty) => (
          <SpecialtyRow
            key={specialty.slug}
            specialty={specialty}
            onSelect={onSelectSpecialty}
          />
        ))}
      </ul>
    </section>
  );
};
