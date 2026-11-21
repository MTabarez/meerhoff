import React from 'react';
import { EDITORIAL_ASSETS, TECHNOLOGIES } from '../data/clinicData';
import { useReveal } from '../hooks/useMotion';
import { PillButton } from './Button';
import { EditorialImage } from './EditorialImage';

interface TechnologySectionProps {
  onOpenAppointment: () => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({ onOpenAppointment }) => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="tecnologia"
      ref={ref}
      aria-labelledby="technology-heading"
      className="bg-white text-[#343448] py-20 sm:py-28 lg:py-36"
    >
      <div
        data-visible={isVisible}
        className="reveal-block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        {/* Top asymmetric editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-14 sm:mb-20">
          <div className="lg:col-span-7">
            <h2
              id="technology-heading"
              className="text-[36px] sm:text-[48px] lg:text-[62px] leading-[1.01] tracking-[-0.028em] font-normal text-[#343448]"
            >
              Precisión que transforma la experiencia médica.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#343448]/85">
              La incorporación constante de tecnología de última generación permite abordar
              procedimientos oftalmológicos de creciente complejidad, acompañando la experiencia de
              nuestros profesionales con herramientas de precisión.
            </p>
          </div>
        </div>

        {/* Asymmetric photography + Soft Blue editorial statement block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-16 sm:mb-24">
          <div className="lg:col-span-8 flex flex-col">
            <EditorialImage
              asset={EDITORIAL_ASSETS.surgicalSuite}
              className="w-full aspect-[16/10] lg:h-full lg:min-h-[460px]"
            />
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="bg-[#85ADE2] text-[#343448] p-7 sm:p-9 flex flex-col justify-between flex-1">
              <div className="space-y-4">
                <p className="text-[24px] sm:text-[28px] leading-[1.15] tracking-[-0.02em] font-normal">
                  Pioneros en visualización quirúrgica 3D en 4K para microcirugía ocular.
                </p>
              </div>
              <div className="pt-8">
                <PillButton variant="outline" size="md" showArrow onClick={onOpenAppointment}>
                  Consultar sobre procedimientos
                </PillButton>
              </div>
            </div>

            <EditorialImage
              asset={EDITORIAL_ASSETS.slitLamp}
              className="w-full aspect-[4/3]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Verified technology highlights — clean editorial rows, zero rounded cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#D9D7D2]">
          {TECHNOLOGIES.map((tech, index) => (
            <article
              key={tech.id}
              className={[
                'py-8 sm:py-10 flex flex-col justify-between gap-5 border-b border-[#D9D7D2]',
                index % 4 !== 3 ? 'lg:border-r lg:pr-8' : '',
                index % 4 !== 0 ? 'lg:pl-8' : '',
                index % 2 === 0 ? 'md:pr-6 lg:pr-8' : 'md:pl-6 lg:pl-8',
              ].join(' ')}
            >
              <div className="space-y-3">
                <h3 className="text-[20px] sm:text-[22px] leading-[1.2] tracking-[-0.015em] font-normal text-[#343448]">
                  {tech.name}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[#343448]/80">{tech.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
