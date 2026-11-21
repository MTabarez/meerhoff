import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { SpecialtyItem } from '../data/clinicData';

interface SpecialtyRowProps {
  specialty: SpecialtyItem;
  onSelect: (slug: string) => void;
}

export const SpecialtyRow: React.FC<SpecialtyRowProps> = ({ specialty, onSelect }) => {
  return (
    <li className="border-t border-[#D9D7D2] last:border-b">
      <button
        type="button"
        onClick={() => onSelect(specialty.slug)}
        aria-label={`Conocer más sobre ${specialty.title}`}
        className="group w-full text-left py-7 sm:py-9 lg:py-10 px-4 sm:px-6 lg:px-10 bg-[#F4F0E8] hover:bg-white transition-colors duration-300 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#343448]"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Left: Small vertical square-cornered thumbnail */}
          <div className="col-span-3 sm:col-span-2 lg:col-span-2">
            <div className="w-full max-w-[148px] aspect-[4/4.6] overflow-hidden rounded-none bg-[#E6E1D7]">
              <img
                src={specialty.thumbnail.src}
                alt={specialty.thumbnail.alt}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
            </div>
          </div>

          {/* Center: Oversized specialty name */}
          <div className="col-span-9 sm:col-span-7 lg:col-span-8 flex flex-col justify-center">
            <h3 className="text-[28px] sm:text-[42px] lg:text-[58px] xl:text-[68px] leading-[0.98] tracking-[-0.03em] font-normal text-[#343448] transition-transform duration-300 ease-out group-hover:translate-x-2">
              {specialty.title}
            </h3>
          </div>

          {/* Right: Compact white pill CTA transforming to Deep Navy on row hover */}
          <div className="col-span-12 sm:col-span-3 lg:col-span-2 flex sm:justify-end pt-2 sm:pt-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium whitespace-nowrap bg-white text-[#343448] border border-[#D9D7D2]/80 transition-colors duration-300 group-hover:bg-[#343448] group-hover:text-white group-hover:border-[#343448]">
              <span>Conocer más</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </button>
    </li>
  );
};
