import React from 'react';
import { EDITORIAL_ASSETS } from '../data/clinicData';
import { useScrollParallax } from '../hooks/useMotion';

export const ImageComposition: React.FC = () => {
  const mainParallax = useScrollParallax(0.08);
  const floatRightParallax = useScrollParallax(-0.14);
  const floatLeftParallax = useScrollParallax(-0.1);

  return (
    <section
      ref={mainParallax.containerRef}
      aria-label="Composición visual oftalmológica"
      className="relative w-full bg-[#343448] overflow-hidden"
    >
      {/* Main full-bleed horizontal macro eye canvas */}
      <div className="relative w-full min-h-[540px] sm:min-h-[680px] lg:min-h-[840px]">
        <div
          className="absolute inset-0 -top-12 -bottom-12 will-change-transform"
          style={{ transform: `translate3d(0, ${mainParallax.offset}px, 0)` }}
        >
          <img
            src={EDITORIAL_ASSETS.macroEye.src}
            alt={EDITORIAL_ASSETS.macroEye.alt}
            loading="eager"
                  decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#252536]/20"
          />
        </div>

        {/* Subtle translucent horizontal editorial strip across lower half (Jacques + Cie signature) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[42%] bottom-0 bg-[#343448]/38 backdrop-blur-[1px]"
        />

        {/* Overlapping editorial blocks over the composition */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 min-h-[540px] sm:min-h-[680px] lg:min-h-[840px] flex flex-col justify-between">
          {/* Upper right overlapping vertical image (diagnostic slit-lamp) */}
          <div className="grid grid-cols-12 gap-4 items-start">
            <div
              ref={floatRightParallax.containerRef}
              className="col-span-7 col-start-6 sm:col-span-5 sm:col-start-8 lg:col-span-3 lg:col-start-10 will-change-transform"
              style={{ transform: `translate3d(0, ${floatRightParallax.offset}px, 0)` }}
            >
              <div className="overflow-hidden rounded-none bg-[#E6E1D7] shadow-sm">
                <img
                  src={EDITORIAL_ASSETS.slitLamp.src}
                  alt={EDITORIAL_ASSETS.slitLamp.alt}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[3/3.6] object-cover block"
                />
              </div>
            </div>
          </div>

          {/* Lower-left overlapping consultation + optical lenses detail blocks */}
          <div
            ref={floatLeftParallax.containerRef}
            className="grid grid-cols-12 gap-4 sm:gap-6 items-end mt-8 lg:mt-0 will-change-transform"
            style={{ transform: `translate3d(0, ${floatLeftParallax.offset}px, 0)` }}
          >
            <div className="col-span-8 sm:col-span-5 lg:col-span-4">
              <div className="overflow-hidden rounded-none bg-[#E6E1D7]">
                <img
                  src={EDITORIAL_ASSETS.consultation.src}
                  alt={EDITORIAL_ASSETS.consultation.alt}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3.1] object-cover object-top block"
                />
              </div>
            </div>

            <div className="hidden sm:block sm:col-span-4 lg:col-span-3">
              <div className="overflow-hidden rounded-none bg-[#E6E1D7]">
                <img
                  src={EDITORIAL_ASSETS.opticalLenses.src}
                  alt={EDITORIAL_ASSETS.opticalLenses.alt}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3.1] object-cover block"
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:text-right pt-2">
              <p className="text-[12px] text-white/85 max-w-xs lg:ml-auto leading-relaxed">
                Cada estudio visual combina tecnología óptica contemporánea con el acompañamiento
                directo de médicos especialistas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
