import React from 'react';
import { EDUCATION_PILLARS } from '../data/clinicData';
import { useReveal } from '../hooks/useMotion';
import { PillButton } from './Button';

interface EducationSectionProps {
  onOpenAppointment: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ onOpenAppointment }) => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="conocimiento"
      ref={ref}
      aria-labelledby="education-heading"
      className="bg-[#F4F0E8] text-[#343448] pt-20 sm:pt-28 lg:pt-36"
    >
      {/* Top editorial heading row matching Jacques + Cie Guides header */}
      <div
        data-visible={isVisible}
        className="reveal-block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-6">
            <h2
              id="education-heading"
              className="text-[36px] sm:text-[48px] lg:text-[58px] leading-[1.02] tracking-[-0.028em] font-normal text-[#343448]"
            >
              El conocimiento también se comparte.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex lg:justify-start">
            <PillButton variant="blue" size="md" showArrow onClick={onOpenAppointment}>
              Contactar con la clínica
            </PillButton>
          </div>
        </div>
      </div>

      {/* Exact Jacques + Cie two-column hairline split with large top-left titles and tucked bottom-right photos */}
      <div className="border-t border-[#D9D7D2]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          {EDUCATION_PILLARS.map((pillar, index) => (
            <article
              key={pillar.id}
              className={[
                'group px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 pb-12 sm:pb-16 flex flex-col justify-between min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]',
                index === 0 ? 'border-b lg:border-b-0 lg:border-r border-[#D9D7D2]' : '',
              ].join(' ')}
            >
              <div className="space-y-4 max-w-[44ch]">
                <h3 className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.06] tracking-[-0.025em] font-normal text-[#343448]">
                  {pillar.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#343448]/80 pt-2">
                  {pillar.description}
                </p>
              </div>

              {/* Tucked square-cornered editorial photograph in bottom-right */}
              <div className="mt-10 flex justify-end">
                <div className="w-[58%] sm:w-[46%] lg:w-[44%] aspect-[4/4.4] overflow-hidden rounded-none bg-[#E6E1D7]">
                  <img
                    src={pillar.image.src}
                    alt={pillar.image.alt}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
