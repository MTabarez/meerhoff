import React from 'react';
import { HISTORY_MILESTONES } from '../data/clinicData';
import { useReveal } from '../hooks/useMotion';

export const HistorySection: React.FC = () => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="trayectoria"
      ref={ref}
      aria-labelledby="history-heading"
      className="bg-white text-[#343448] py-20 sm:py-28 lg:py-36"
    >
      <div
        data-visible={isVisible}
        className="reveal-block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        {/* Header split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-7">
            <h2
              id="history-heading"
              className="text-[36px] sm:text-[48px] lg:text-[62px] leading-[1.01] tracking-[-0.028em] font-normal text-[#343448]"
            >
              Una trayectoria que mira hacia adelante.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#343448]/85">
              Casi cien años de historia familiar vinculada a la oftalmología en Uruguay, tres
              generaciones de médicos y una evolución institucional sostenida sobre el rigor
              científico y la innovación clínica.
            </p>
          </div>
        </div>

        {/* Editorial timeline rows — zero rounded cards, hairline dividers */}
        <ol className="divide-y divide-[#D9D7D2] border-t border-b border-[#D9D7D2]">
          {HISTORY_MILESTONES.map((milestone) => (
            <li
              key={milestone.id}
              className="py-8 sm:py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-baseline"
            >
              <div className="lg:col-span-3">
                <span className="text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.05] tracking-[-0.025em] font-normal text-[#343448] tabular-nums">
                  {milestone.period}
                </span>
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-[20px] sm:text-[23px] leading-[1.2] tracking-[-0.015em] font-normal text-[#343448]">
                  {milestone.title}
                </h3>
              </div>

              <div className="lg:col-span-5">
                <p className="text-[14px] sm:text-[15px] leading-[1.65] text-[#343448]/80 max-w-[48ch]">
                  {milestone.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
