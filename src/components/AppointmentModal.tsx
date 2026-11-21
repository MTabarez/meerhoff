import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import type { AppointmentSubmissionRecord } from '../utils/validation';
import { AppointmentForm } from './AppointmentForm';

interface AppointmentModalProps {
  isOpen: boolean;
  initialSpecialty?: string;
  onClose: () => void;
  onSubmitted: (record: AppointmentSubmissionRecord) => void;
  submittedCount: number;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  initialSpecialty,
  onClose,
  onSubmitted,
  submittedCount,
}) => {
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      className="fixed inset-0 z-50 bg-[#343448]/55 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[680px] bg-[#F4F0E8] text-[#343448] border border-[#D9D7D2] p-6 sm:p-10 my-auto">
        <div className="flex items-start justify-between gap-4 pb-6 mb-6 border-b border-[#D9D7D2]">
          <div>
            <h2
              id="appointment-modal-title"
              className="text-[28px] sm:text-[36px] leading-[1.06] tracking-[-0.025em] font-normal text-[#343448]"
            >
              Solicitar una consulta
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de solicitud de consulta"
            className="w-10 h-10 rounded-full bg-white border border-[#D9D7D2] inline-flex items-center justify-center text-[#343448] hover:bg-[#343448] hover:text-white transition-colors duration-200 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <AppointmentForm
          idPrefix="modal-appointment"
          initialSpecialty={initialSpecialty}
          onSubmitted={onSubmitted}
          submittedCount={submittedCount}
        />

        <div className="mt-6 pt-5 border-t border-[#D9D7D2] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#777783]">
          <span>{CLINIC_INFO.fullAddress}</span>
          <a
            href={CLINIC_INFO.phoneHref}
            className="text-[#343448] font-medium hover:underline underline-offset-4"
          >
            Tel. {CLINIC_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};
