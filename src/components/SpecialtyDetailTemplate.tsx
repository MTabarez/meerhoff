import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { DoctorProfile, SpecialtyItem } from '../data/clinicData';
import { getDoctorsForSpecialty, getRelatedSpecialties } from '../utils/navigation';
import { PillButton } from './Button';
import { EditorialImage } from './EditorialImage';
import { SpecialtyRow } from './SpecialtyRow';

interface SpecialtyDetailTemplateProps {
  specialty: SpecialtyItem;
  onGoHome: () => void;
  onSelectSpecialty: (slug: string) => void;
  onSelectDoctor: (doctor: DoctorProfile) => void;
  onOpenAppointment: (specialtyTitle: string) => void;
}

export const SpecialtyDetailTemplate: React.FC<SpecialtyDetailTemplateProps> = ({
  specialty,
  onGoHome,
  onSelectSpecialty,
  onSelectDoctor,
  onOpenAppointment,
}) => {
  const doctors = getDoctorsForSpecialty(specialty);
  const relatedSpecialties = getRelatedSpecialties(specialty);

  return (
    <article className="bg-[#F4F0E8] text-[#343448] pt-28 sm:pt-36">
      {/* Top breadcrumb & return control */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#D9D7D2]">
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#343448] hover:text-[#85ADE2] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            <span>Volver al inicio</span>
          </button>
        </div>
      </div>

      {/* HERO DETAIL COMPOSITION */}
      <header className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          {/* Left large image */}
          <div className="lg:col-span-5">
            <EditorialImage
              asset={specialty.heroImage}
              loading="eager"
              className="w-full aspect-[4/4.3]"
            />
          </div>

          {/* Right: Oversized editorial title + right-aligned CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-10 lg:pl-6">
            <div>
              <h1 className="text-[42px] sm:text-[60px] lg:text-[76px] xl:text-[88px] leading-[0.94] tracking-[-0.032em] font-normal text-[#343448]">
                {specialty.title}
              </h1>
            </div>

            <div className="pt-4 border-t border-[#D9D7D2] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <p className="text-[16px] sm:text-[18px] leading-[1.55] text-[#343448]/85 max-w-[42ch]">
                {specialty.summary}
              </p>

              <div className="shrink-0">
                <PillButton
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={() => onOpenAppointment(specialty.title)}
                >
                  Solicitar consulta
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 1. Introductory explanation */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#D9D7D2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-[28px] sm:text-[36px] leading-[1.08] tracking-[-0.025em] font-normal text-[#343448]">
              Evaluación precisa y atención individualizada.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-5">
            {specialty.introParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-[16px] sm:text-[18px] leading-[1.65] text-[#343448]/88 max-w-[62ch]"
              >
                {paragraph}
              </p>
            ))}

            {specialty.verificationNote && (
              <p className="pt-3 text-[13px] text-[#777783] border-t border-[#D9D7D2]">
                {specialty.verificationNote}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. Large editorial photograph */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <EditorialImage
            asset={specialty.secondaryImage}
            className="w-full aspect-[16/8.5] max-h-[620px]"
          />
          {specialty.secondaryImage.caption && (
            <p className="mt-2.5 text-[11px] text-[#777783]">{specialty.secondaryImage.caption}</p>
          )}
        </div>
      </section>

      {/* 3 & 4. What the specialty treats + Diagnostic and treatment approach */}
      <section className="bg-[#F4F0E8] py-16 sm:py-24 border-t border-[#D9D7D2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 className="text-[30px] sm:text-[40px] leading-[1.06] tracking-[-0.025em] font-normal text-[#343448] mb-8">
              Qué aborda esta especialidad
            </h2>

            <ul className="divide-y divide-[#D9D7D2] border-t border-b border-[#D9D7D2]">
              {specialty.treats.map((item) => (
                <li key={item} className="py-4 sm:py-5">
                  <span className="text-[15px] sm:text-[16px] leading-relaxed text-[#343448]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 space-y-10">
            <div>
              <h2 className="text-[30px] sm:text-[40px] leading-[1.06] tracking-[-0.025em] font-normal text-[#343448] mb-8">
                Proceso de atención
              </h2>

              <ul className="space-y-5">
                {specialty.diagnosticApproach.map((step, idx) => (
                  <li
                    key={idx}
                    className="pb-5 border-b border-[#D9D7D2] text-[15px] leading-relaxed text-[#343448]/85"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Technology used (verified) */}
            <div className="bg-[#85ADE2] text-[#343448] p-7 sm:p-8 space-y-4">
              <h3 className="text-[16px] font-medium text-[#343448]">Respaldo tecnológico</h3>
              <ul className="space-y-3 text-[15px] leading-relaxed">
                {specialty.technologyHighlights.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Associated medical professionals with real portraits */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#D9D7D2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-10 sm:mb-14">
            <h2 className="text-[30px] sm:text-[42px] leading-[1.05] tracking-[-0.025em] font-normal text-[#343448]">
              Dirección médica en esta área
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group border-t border-[#D9D7D2] pt-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="w-full aspect-[4/4.4] overflow-hidden rounded-none bg-[#E6E1D7] mb-4">
                    <img
                      src={doctor.photoSrc}
                      alt={doctor.photoAlt}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="block text-[12px] text-[#777783]">{doctor.role}</span>
                  <h3 className="text-[24px] leading-[1.15] tracking-[-0.02em] font-normal text-[#343448]">
                    {doctor.name}
                  </h3>
                  <p className="text-[13px] text-[#777783]">{doctor.academicNote}</p>
                  <p className="text-[14px] leading-relaxed text-[#343448]/85 pt-1">
                    {doctor.shortBio}
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => onSelectDoctor(doctor)}
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-[#343448] hover:text-[#85ADE2] transition-colors cursor-pointer"
                  >
                    <span>Ver perfil</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Related specialties */}
      <section className="bg-[#F4F0E8] pt-16 sm:pt-24 pb-8 border-t border-[#D9D7D2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-10">
          <h2 className="text-[30px] sm:text-[42px] leading-[1.05] tracking-[-0.025em] font-normal text-[#343448]">
            Especialidades relacionadas
          </h2>
        </div>

        <ul>
          {relatedSpecialties.map((item) => (
            <SpecialtyRow
              key={item.slug}
              specialty={item}
              onSelect={onSelectSpecialty}
            />
          ))}
        </ul>
      </section>

      {/* 8. Appointment CTA band */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#D9D7D2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3 max-w-[54ch]">
            <h2 className="text-[32px] sm:text-[44px] leading-[1.04] tracking-[-0.025em] font-normal text-[#343448]">
              Consultá con nuestro equipo sobre {specialty.title.toLowerCase()}.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <PillButton
              variant="primary"
              size="lg"
              showArrow
              onClick={() => onOpenAppointment(specialty.title)}
            >
              Solicitar consulta
            </PillButton>
            <PillButton variant="outline" size="lg" onClick={onGoHome}>
              Ver todas las especialidades
            </PillButton>
          </div>
        </div>
      </section>
    </article>
  );
};
