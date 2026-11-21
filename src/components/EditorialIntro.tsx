import React from 'react';
import { EDITORIAL_ASSETS } from '../data/clinicData';
import { useReveal } from '../hooks/useMotion';
import { PillButton } from './Button';
import { EditorialImage } from './EditorialImage';

interface EditorialIntroProps {
  onExploreHistory: () => void;
}

export const EditorialIntro: React.FC<EditorialIntroProps> = ({ onExploreHistory }) => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="historia"
      ref={ref}
      aria-labelledby="intro-heading"
      className="bg-[#F4F0E8] text-[#343448] py-20 sm:py-28 lg:py-36"
    >
      <div
        data-visible={isVisible}
        className="reveal-block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-stretch"
      >
        {/* Left editorial column: Top label + giant light heading, bottom-aligned copy + Soft Blue pill CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-12 lg:gap-16 lg:pr-6">
          <div>
            <h2
              id="intro-heading"
              className="text-[36px] sm:text-[46px] lg:text-[54px] xl:text-[60px] leading-[1.03] tracking-[-0.028em] font-normal text-[#343448]"
            >
              Una historia dedicada a cuidar la visión.
            </h2>
          </div>

          <div className="space-y-6 max-w-[42ch]">
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#343448]/85">
              Con una trayectoria familiar de casi un siglo vinculada a la oftalmología en Uruguay,
              la Clínica Prof. Albrecht Meerhoff combina experiencia clínica, criterio científico y
              evolución tecnológica para ofrecer atención especializada en salud visual.
            </p>
            <div>
              <PillButton variant="blue" size="md" showArrow onClick={onExploreHistory}>
                Conocé nuestra historia
              </PillButton>
            </div>
          </div>
        </div>

        {/* Right architectural reception photograph — square corners (0px) */}
        <div className="lg:col-span-7">
          <div className="h-full flex flex-col">
            <EditorialImage
              asset={EDITORIAL_ASSETS.reception}
              className="w-full aspect-[4/3.4] lg:aspect-auto lg:h-full lg:min-h-[540px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
