export interface AppointmentFormValues {
  fullName: string;
  email: string;
  phone: string;
  specialty: string;
  preferredShift: 'Mañana (09:00–13:00)' | 'Tarde (13:00–19:00)' | 'Sábado (09:00–14:00)' | 'Indistinto';
  message: string;
}

export interface AppointmentValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  specialty?: string;
}

export interface AppointmentSubmissionRecord extends AppointmentFormValues {
  referenceCode: string;
  submittedAt: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGIT_MIN = 7;

export function validateAppointmentForm(
  values: AppointmentFormValues
): AppointmentValidationErrors {
  const errors: AppointmentValidationErrors = {};

  const trimmedName = values.fullName.trim();
  if (trimmedName.length < 3) {
    errors.fullName = 'Ingresá tu nombre y apellido completo.';
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Ingresá un correo electrónico válido.';
  }

  const digitsOnly = values.phone.replace(/\D/g, '');
  if (digitsOnly.length < PHONE_DIGIT_MIN) {
    errors.phone = 'Ingresá un teléfono de contacto válido (al menos 7 dígitos).';
  }

  if (!values.specialty.trim()) {
    errors.specialty = 'Seleccioná una especialidad o motivo de consulta.';
  }

  return errors;
}

export function hasValidationErrors(errors: AppointmentValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function validateNewsletterEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed || !EMAIL_PATTERN.test(trimmed)) {
    return 'Ingresá un correo electrónico válido para suscribirte.';
  }
  return null;
}

export function generateRequestReference(sequenceNumber: number): string {
  const padded = String(Math.max(1, sequenceNumber)).padStart(4, '0');
  return `CM-${padded}`;
}
