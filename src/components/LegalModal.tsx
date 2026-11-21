import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface LegalModalProps {
  mode: 'privacy' | 'legal' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ mode, onClose }) => {
  useEffect(() => {
    if (!mode) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode, onClose]);

  if (!mode) return null;

  const isPrivacy = mode === 'privacy';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 bg-[#343448]/55 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[600px] bg-[#F4F0E8] text-[#343448] border border-[#D9D7D2] p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-[#D9D7D2]">
          <div>
            <h2
              id="legal-modal-title"
              className="text-[26px] sm:text-[32px] leading-[1.1] tracking-[-0.02em] font-normal"
            >
              {isPrivacy ? 'Política de privacidad' : 'Aviso legal y transparencia fotográfica'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar aviso"
            className="w-9 h-9 rounded-full bg-white border border-[#D9D7D2] inline-flex items-center justify-center text-[#343448] hover:bg-[#343448] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 text-[14px] leading-relaxed text-[#343448]/85">
          {isPrivacy ? (
            <>
              <p>
                Los datos proporcionados en los formularios de solicitud de consulta de{' '}
                <strong>{CLINIC_INFO.name}</strong> se utilizan exclusivamente para gestionar la
                coordinación de turnos y responder inquietudes administrativas de los pacientes.
              </p>
              <p>
                La información médica y clínica se aborda únicamente en consulta presencial con un
                profesional oftalmólogo. Para consultas directas comuníquese al{' '}
                {CLINIC_INFO.internationalPhone} o a {CLINIC_INFO.email}.
              </p>
            </>
          ) : (
            <>
              <p>
                Los contenidos publicados en este sitio tienen carácter informativo e institucional y
                no sustituyen una consulta médica presencial ni constituyen diagnóstico o indicación
                terapéutica.
              </p>
              <p>
                <strong>Nota sobre material fotográfico:</strong> El logotipo institucional y los
                retratos del cuerpo médico y clínico corresponden a los archivos oficiales de{' '}
                {CLINIC_INFO.name}. Las imágenes ambientales de arquitectura y consultorio actúan
                como recursos editoriales ilustrativos.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
