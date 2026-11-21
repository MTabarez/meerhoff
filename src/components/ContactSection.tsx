import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { useReveal } from '../hooks/useMotion';
import type { AppointmentSubmissionRecord } from '../utils/validation';
import { AppointmentForm } from './AppointmentForm';
import { PillButton } from './Button';

interface ContactSectionProps {
  onSubmitted: (record: AppointmentSubmissionRecord) => void;
  submittedCount: number;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onSubmitted,
  submittedCount,
}) => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="contacto"
      ref={ref}
      aria-labelledby="contact-heading"
      className="bg-white text-[#343448] py-20 sm:py-28 lg:py-36 border-t border-[#D9D7D2]"
    >
      <div
        data-visible={isVisible}
        className="reveal-block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-start"
      >
        {/* Left: Conversion headline, CTAs & verified clinic contact information */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <h2
              id="contact-heading"
              className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.02] tracking-[-0.028em] font-normal text-[#343448]"
            >
              Tu salud visual merece atención especializada.
            </h2>
            <p className="text-[16px] sm:text-[18px] leading-[1.55] text-[#343448]/85 max-w-[38ch]">
              Estamos para acompañarte en el cuidado de tu visión.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <PillButton variant="primary" size="lg" showArrow href={CLINIC_INFO.phoneHref}>
                Contactar con la clínica
              </PillButton>
              <PillButton
                variant="outline"
                size="lg"
                href={CLINIC_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />}
              >
                Cómo llegar
              </PillButton>
            </div>
          </div>

          {/* Verified clinic contact block */}
          <dl className="pt-8 border-t border-[#D9D7D2] grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px]">
            <div>
              <dt className="text-[11px] text-[#777783] mb-1.5">Dirección</dt>
              <dd className="text-[#343448] leading-relaxed">
                {CLINIC_INFO.address}
                <br />
                {CLINIC_INFO.neighborhood}, {CLINIC_INFO.city}
              </dd>
            </div>

            <div>
              <dt className="text-[11px] text-[#777783] mb-1.5">Teléfono</dt>
              <dd className="text-[#343448] tabular-nums">
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="hover:underline underline-offset-4 font-medium"
                >
                  {CLINIC_INFO.internationalPhone}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-[11px] text-[#777783] mb-1.5">Correo electrónico</dt>
              <dd className="text-[#343448]">
                <a
                  href={CLINIC_INFO.emailHref}
                  className="hover:underline underline-offset-4 break-all"
                >
                  {CLINIC_INFO.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-[11px] text-[#777783] mb-1.5">Horarios habituales</dt>
              <dd className="text-[#343448] leading-relaxed">
                {CLINIC_INFO.hoursSummary}
                <span className="block mt-1 text-[11px] text-[#777783]">
                  {CLINIC_INFO.hoursNote}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Right: Embedded interactive appointment request form */}
        <div className="lg:col-span-6 lg:col-start-7 bg-[#F4F0E8] p-6 sm:p-10 border border-[#D9D7D2]">
          <div className="mb-7 pb-5 border-b border-[#D9D7D2]">
            <h3 className="text-[24px] sm:text-[28px] leading-[1.15] tracking-[-0.02em] font-normal text-[#343448]">
              Solicitá tu turno o consulta informativa
            </h3>
          </div>

          <AppointmentForm
            idPrefix="contact-section"
            onSubmitted={onSubmitted}
            submittedCount={submittedCount}
          />
        </div>
      </div>
    </section>
  );
};
