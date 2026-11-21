import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { CLINIC_INFO, SPECIALTIES } from '../data/clinicData';
import {
  type AppointmentFormValues,
  type AppointmentSubmissionRecord,
  type AppointmentValidationErrors,
  generateRequestReference,
  hasValidationErrors,
  validateAppointmentForm,
} from '../utils/validation';
import { PillButton } from './Button';

interface AppointmentFormProps {
  initialSpecialty?: string;
  idPrefix?: string;
  onSubmitted?: (record: AppointmentSubmissionRecord) => void;
  submittedCount: number;
}

const SHIFTS: AppointmentFormValues['preferredShift'][] = [
  'Indistinto',
  'Mañana (09:00–13:00)',
  'Tarde (13:00–19:00)',
  'Sábado (09:00–14:00)',
];

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialSpecialty = '',
  idPrefix = 'appointment',
  onSubmitted,
  submittedCount,
}) => {
  const [values, setValues] = useState<AppointmentFormValues>({
    fullName: '',
    email: '',
    phone: '',
    specialty: initialSpecialty,
    preferredShift: 'Indistinto',
    message: '',
  });
  const [errors, setErrors] = useState<AppointmentValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<AppointmentSubmissionRecord | null>(null);

  useEffect(() => {
    if (initialSpecialty) {
      setValues((prev) => ({ ...prev, specialty: initialSpecialty }));
    }
  }, [initialSpecialty]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateAppointmentForm(values);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    const record: AppointmentSubmissionRecord = {
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      referenceCode: generateRequestReference(submittedCount + 1),
      submittedAt: new Date().toLocaleTimeString('es-UY', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSubmittedRecord(record);
    onSubmitted?.(record);
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setErrors({});
    setValues({
      fullName: '',
      email: '',
      phone: '',
      specialty: initialSpecialty,
      preferredShift: 'Indistinto',
      message: '',
    });
  };

  if (submittedRecord) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#F4F0E8] border border-[#D9D7D2] p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#343448] text-white flex items-center justify-center shrink-0">
            <Check className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div className="space-y-1.5">
            <p className="text-[12px] text-[#777783]">
              Solicitud registrada · Referencia{' '}
              <span className="font-medium text-[#343448] tabular-nums">
                {submittedRecord.referenceCode}
              </span>
            </p>
            <h4 className="text-[22px] sm:text-[26px] leading-[1.15] tracking-[-0.02em] font-normal text-[#343448]">
              Recibimos tu solicitud de consulta
            </h4>
          </div>
        </div>

        <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#343448]/85">
          Gracias, <strong>{submittedRecord.fullName}</strong>. Nuestro equipo de recepción se
          pondrá en contacto al teléfono <strong>{submittedRecord.phone}</strong> o al correo{' '}
          <strong>{submittedRecord.email}</strong> para confirmar disponibilidad de agenda en{' '}
          <strong>{submittedRecord.specialty}</strong> ({submittedRecord.preferredShift}).
        </p>

        <div className="pt-4 border-t border-[#D9D7D2] flex flex-wrap items-center justify-between gap-4">
          <p className="text-[12px] text-[#777783]">
            Para consultas inmediatas: Tel. {CLINIC_INFO.phoneDisplay}
          </p>
          <PillButton variant="outline" size="sm" onClick={handleReset}>
            Enviar otra solicitud
          </PillButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="block text-[12px] font-medium text-[#343448] mb-2"
          >
            Nombre y apellido *
          </label>
          <input
            id={`${idPrefix}-name`}
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, fullName: e.target.value }));
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            placeholder="Ej. Laura Pereyra"
            aria-invalid={Boolean(errors.fullName)}
            className="w-full h-11 px-3.5 bg-white border border-[#D9D7D2] text-[14px] text-[#343448] placeholder:text-[#777783]/70 focus:border-[#343448] focus:outline-none rounded-none"
          />
          {errors.fullName && (
            <p role="alert" className="mt-1.5 text-[12px] text-[#9A3412]">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="block text-[12px] font-medium text-[#343448] mb-2"
          >
            Teléfono de contacto *
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, phone: e.target.value }));
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder="Ej. 099 123 456"
            aria-invalid={Boolean(errors.phone)}
            className="w-full h-11 px-3.5 bg-white border border-[#D9D7D2] text-[14px] text-[#343448] placeholder:text-[#777783]/70 focus:border-[#343448] focus:outline-none rounded-none"
          />
          {errors.phone && (
            <p role="alert" className="mt-1.5 text-[12px] text-[#9A3412]">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${idPrefix}-email`}
            className="block text-[12px] font-medium text-[#343448] mb-2"
          >
            Correo electrónico *
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, email: e.target.value }));
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="nombre@correo.com"
            aria-invalid={Boolean(errors.email)}
            className="w-full h-11 px-3.5 bg-white border border-[#D9D7D2] text-[14px] text-[#343448] placeholder:text-[#777783]/70 focus:border-[#343448] focus:outline-none rounded-none"
          />
          {errors.email && (
            <p role="alert" className="mt-1.5 text-[12px] text-[#9A3412]">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-specialty`}
            className="block text-[12px] font-medium text-[#343448] mb-2"
          >
            Especialidad o motivo *
          </label>
          <select
            id={`${idPrefix}-specialty`}
            name="specialty"
            value={values.specialty}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, specialty: e.target.value }));
              if (errors.specialty) setErrors((prev) => ({ ...prev, specialty: undefined }));
            }}
            aria-invalid={Boolean(errors.specialty)}
            className="w-full h-11 px-3.5 bg-white border border-[#D9D7D2] text-[14px] text-[#343448] focus:border-[#343448] focus:outline-none rounded-none"
          >
            <option value="">Seleccionar especialidad</option>
            <option value="Consulta oftalmológica general">Consulta oftalmológica general</option>
            {SPECIALTIES.map((spec) => (
              <option key={spec.slug} value={spec.title}>
                {spec.title}
              </option>
            ))}
          </select>
          {errors.specialty && (
            <p role="alert" className="mt-1.5 text-[12px] text-[#9A3412]">
              {errors.specialty}
            </p>
          )}
        </div>
      </div>

      <div>
        <span className="block text-[12px] font-medium text-[#343448] mb-2">
          Franja horaria preferida
        </span>
        <div className="flex flex-wrap gap-2">
          {SHIFTS.map((shift) => {
            const active = values.preferredShift === shift;
            return (
              <button
                key={shift}
                type="button"
                onClick={() => setValues((prev) => ({ ...prev, preferredShift: shift }))}
                className={[
                  'px-3.5 py-2 text-[12px] rounded-full border transition-colors duration-200 cursor-pointer whitespace-nowrap',
                  active
                    ? 'bg-[#343448] text-white border-[#343448]'
                    : 'bg-white text-[#343448] border-[#D9D7D2] hover:border-[#343448]',
                ].join(' ')}
              >
                {shift}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-message`}
          className="block text-[12px] font-medium text-[#343448] mb-2"
        >
          Comentarios adicionales (opcional)
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={3}
          value={values.message}
          onChange={(e) => setValues((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Indicá si ya sos paciente de la clínica o el motivo breve de tu consulta."
          className="w-full p-3.5 bg-white border border-[#D9D7D2] text-[14px] text-[#343448] placeholder:text-[#777783]/70 focus:border-[#343448] focus:outline-none rounded-none resize-y"
        />
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[12px] text-[#777783] max-w-sm">
          La solicitud queda sujeta a confirmación telefónica o por correo según disponibilidad de
          agenda.
        </p>
        <PillButton type="submit" variant="primary" size="lg" showArrow>
          Enviar solicitud
        </PillButton>
      </div>
    </form>
  );
};
