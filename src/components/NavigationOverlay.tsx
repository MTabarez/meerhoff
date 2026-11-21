import React, { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { CLINIC_INFO, SPECIALTIES } from '../data/clinicData';
import { OfficialClinicLogo } from './BrandMark';
import { PillButton } from './Button';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateSpecialty: (slug: string) => void;
  onOpenAppointment: () => void;
}

const PRIMARY_SECTIONS = [
  { id: 'historia', label: 'Nuestra historia' },
  { id: 'especialidades', label: 'Especialidades' },
  { id: 'tecnologia', label: 'Tecnología' },
  { id: 'equipo', label: 'Equipo médico' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'conocimiento', label: 'Docencia y conocimiento' },
  { id: 'contacto', label: 'Contacto' },
];

export const NavigationOverlay: React.FC<NavigationOverlayProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onNavigateSpecialty,
  onOpenAppointment,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal de navegación"
      className="fixed inset-0 z-50 bg-[#F4F0E8] text-[#343448] overflow-y-auto"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 min-h-screen flex flex-col justify-between">
        {/* Top bar inside overlay */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#D9D7D2]">
          <OfficialClinicLogo tone="dark" size="header" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-white border border-[#D9D7D2] text-[13px] font-medium text-[#343448] hover:bg-[#343448] hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span>Cerrar</span>
            <X className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {/* Main navigation grid */}
        <div className="py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 flex-1 items-start">
          {/* Primary editorial links */}
          <nav aria-label="Secciones institucionales" className="lg:col-span-7 flex flex-col">
            <ul className="divide-y divide-[#D9D7D2]/70">
              {PRIMARY_SECTIONS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateSection(item.id);
                    }}
                    className="group w-full py-3.5 sm:py-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.04] tracking-[-0.025em] font-normal text-[#343448] transition-transform duration-300 group-hover:translate-x-2">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className="w-6 h-6 text-[#777783] transition-all duration-300 group-hover:text-[#343448] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Secondary column: Specialties + Clinic info */}
          <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-[#D9D7D2] flex flex-col justify-between gap-10">
            <div>
              <h3 className="text-[13px] font-medium text-[#777783] mb-4">Especialidades médicas</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {SPECIALTIES.map((specialty) => (
                  <li key={specialty.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateSpecialty(specialty.slug);
                      }}
                      className="text-[16px] text-[#343448] hover:text-[#85ADE2] transition-colors duration-200 text-left cursor-pointer"
                    >
                      {specialty.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-[#D9D7D2] space-y-5">
              <div className="space-y-1.5 text-[14px] text-[#343448]">
                <p className="font-medium">{CLINIC_INFO.address}</p>
                <p className="text-[#777783]">
                  {CLINIC_INFO.neighborhood} · {CLINIC_INFO.city}
                </p>
                <p className="pt-1">
                  <a
                    href={CLINIC_INFO.phoneHref}
                    className="underline decoration-[#D9D7D2] underline-offset-4 hover:decoration-[#343448]"
                  >
                    Tel. {CLINIC_INFO.phoneDisplay}
                  </a>
                  <span className="mx-2 text-[#777783]">·</span>
                  <a
                    href={CLINIC_INFO.emailHref}
                    className="underline decoration-[#D9D7D2] underline-offset-4 hover:decoration-[#343448]"
                  >
                    {CLINIC_INFO.email}
                  </a>
                </p>
              </div>

              <div className="pt-2">
                <PillButton
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={() => {
                    onClose();
                    onOpenAppointment();
                  }}
                >
                  Solicitar consulta
                </PillButton>
              </div>
            </div>
          </div>
        </div>

        {/* Footer line inside overlay */}
        <div className="pt-6 border-t border-[#D9D7D2] flex flex-wrap items-center justify-between gap-4 text-[12px] text-[#777783]">
          <span>{CLINIC_INFO.name}</span>
          <span>{CLINIC_INFO.hoursSummary}</span>
        </div>
      </div>
    </div>
  );
};
