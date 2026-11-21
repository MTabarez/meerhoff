import React, { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import type { DoctorProfile } from '../data/clinicData';
import { PillButton } from './Button';

interface DoctorProfileModalProps {
  doctor: DoctorProfile | null;
  onClose: () => void;
  onSelectSpecialty: (slug: string) => void;
  onRequestAppointment: (specialtyTitle?: string) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onSelectSpecialty,
  onRequestAppointment,
}) => {
  useEffect(() => {
    if (!doctor) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [doctor, onClose]);

  if (!doctor) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-modal-title"
      className="fixed inset-0 z-50 bg-[#343448]/55 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[640px] bg-[#F4F0E8] text-[#343448] border border-[#D9D7D2] p-6 sm:p-10 my-auto">
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#D9D7D2]">
          <div className="flex items-center gap-5">
            <div className="w-20 h-24 overflow-hidden rounded-none bg-[#E6E1D7] shrink-0">
              <img
                src={doctor.photoSrc}
                alt={doctor.photoAlt}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h2
                id="doctor-modal-title"
                className="text-[28px] sm:text-[36px] leading-[1.04] tracking-[-0.025em] font-normal text-[#343448]"
              >
                {doctor.name}
              </h2>
              <p className="mt-1.5 text-[14px] text-[#777783]">{doctor.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={`Cerrar perfil de ${doctor.name}`}
            className="w-10 h-10 rounded-full bg-white border border-[#D9D7D2] inline-flex items-center justify-center text-[#343448] hover:bg-[#343448] hover:text-white transition-colors duration-200 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="py-6 space-y-6">
          <div>
            <span className="block text-[11px] text-[#777783] mb-1.5">Trayectoria académica</span>
            <p className="text-[15px] text-[#343448] leading-relaxed">{doctor.academicNote}</p>
          </div>

          <div>
            <span className="block text-[11px] text-[#777783] mb-1.5">Enfoque clínico</span>
            <p className="text-[15px] text-[#343448]/85 leading-relaxed">{doctor.shortBio}</p>
          </div>

          <div className="pt-4 border-t border-[#D9D7D2]">
            <span className="block text-[11px] text-[#777783] mb-3">Áreas de especialización</span>
            <ul className="divide-y divide-[#D9D7D2]/80">
              {doctor.specialties.map((area, index) => {
                const matchingSlug = doctor.specialtySlugs[index];
                return (
                  <li key={area} className="py-2.5 flex items-center justify-between gap-4">
                    <span className="text-[15px] text-[#343448]">{area}</span>
                    {matchingSlug && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectSpecialty(matchingSlug);
                        }}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#343448] hover:text-[#85ADE2] transition-colors cursor-pointer"
                      >
                        <span>Ver especialidad</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#D9D7D2] flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] text-[#777783] hover:text-[#343448] cursor-pointer"
          >
            Volver al equipo
          </button>
          <PillButton
            variant="primary"
            size="md"
            showArrow
            onClick={() => {
              onClose();
              onRequestAppointment(doctor.specialties[0]);
            }}
          >
            Solicitar consulta
          </PillButton>
        </div>
      </div>
    </div>
  );
};
