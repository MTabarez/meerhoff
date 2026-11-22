import React, { useState } from 'react';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import { CLINIC_INFO, EDITORIAL_ASSETS, SPECIALTIES } from '../data/clinicData';
import { validateNewsletterEmail } from '../utils/validation';
import { BrandEmblem, OfficialClinicLogo } from './BrandMark';

interface FooterProps {
  onGoHome: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateSpecialty: (slug: string) => void;
  onOpenAppointment: () => void;
  onOpenLegal: (mode: 'privacy' | 'legal') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onGoHome,
  onNavigateSection,
  onNavigateSpecialty,
  onOpenAppointment,
  onOpenLegal,
}) => {
  const [showNewsletterInput, setShowNewsletterInput] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateNewsletterEmail(newsletterEmail);
    if (error) {
      setNewsletterError(error);
      return;
    }
    setNewsletterError(null);
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#85ADE2] text-[#343448] pt-16 sm:pt-20 pb-10 sm:pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top 4-column editorial footer grid matching Jacques + Cie blue footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 sm:pb-24">
          {/* Column 1: Editorial vertical photograph */}
          <div className="lg:col-span-3">
            <div className="w-full max-w-[260px] aspect-[4/4.6] overflow-hidden rounded-none bg-[#729AD1]">
              <img
                src={EDITORIAL_ASSETS.reception.src}
                alt={EDITORIAL_ASSETS.reception.alt}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-[#343448]/85 max-w-[26ch]">
              Precisión, visión y experiencia humana al servicio de la salud visual.
            </p>
          </div>

          {/* Column 2: Especialidades + Institución */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-[13px] font-semibold text-[#343448] mb-3.5">Especialidades</h3>
              <ul className="space-y-1.5 text-[13px] text-[#343448]/85">
                {SPECIALTIES.map((specialty) => (
                  <li key={specialty.slug}>
                    <button
                      type="button"
                      onClick={() => onNavigateSpecialty(specialty.slug)}
                      className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                    >
                      {specialty.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold text-[#343448] mb-3.5">Institución</h3>
              <ul className="space-y-1.5 text-[13px] text-[#343448]/85">
                {[
                  { id: 'historia', label: 'Nuestra historia' },
                  { id: 'tecnologia', label: 'Tecnología' },
                  { id: 'equipo', label: 'Equipo médico' },
                  { id: 'trayectoria', label: 'Trayectoria' },
                  { id: 'conocimiento', label: 'Docencia y conocimiento' },
                  { id: 'contacto', label: 'Contacto' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => onNavigateSection(link.id)}
                      className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Clínica + Contacto */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-[13px] font-semibold text-[#343448] mb-3.5">Clínica</h3>
              <address className="not-italic text-[13px] leading-relaxed text-[#343448]/85 space-y-0.5">
                <p>{CLINIC_INFO.address}</p>
                <p>{CLINIC_INFO.neighborhood}</p>
                <p>{CLINIC_INFO.city}</p>
                <p className="pt-2">
                  <a
                    href={CLINIC_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[#343448]/45 underline-offset-4 hover:decoration-[#343448]"
                  >
                    Ver ubicación en mapa
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold text-[#343448] mb-3.5">Contacto</h3>
              <ul className="space-y-1.5 text-[13px] text-[#343448]/85">
                <li>
                  <a
                    href={CLINIC_INFO.emailHref}
                    className="underline decoration-[#343448]/45 underline-offset-4 hover:decoration-[#343448] break-all"
                  >
                    {CLINIC_INFO.email}
                  </a>
                </li>
                <li className="tabular-nums">
                  Tel.{' '}
                  <a
                    href={CLINIC_INFO.phoneHref}
                    className="underline decoration-[#343448]/45 underline-offset-4 hover:decoration-[#343448]"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </li>
                <li className="pt-2 text-[12px] text-[#343448]/75 leading-relaxed">
                  {CLINIC_INFO.hoursSummary}
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Consultas + Novedades (exact Jacques + Cie pill outline buttons on Soft Blue) */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-[13px] font-semibold text-[#343448] mb-3.5">Consultas</h3>
              <button
                type="button"
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#343448]/65 text-[13px] font-medium text-[#343448] hover:bg-[#343448] hover:border-[#343448] hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                <span>Solicitar consulta</span>
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold text-[#343448] mb-3.5">Novedades</h3>
              {newsletterSuccess ? (
                <div
                  role="status"
                  className="inline-flex items-center gap-2 text-[13px] text-[#343448] bg-white/45 px-4 py-2.5"
                >
                  <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Suscripción registrada correctamente.</span>
                </div>
              ) : !showNewsletterInput ? (
                <button
                  type="button"
                  onClick={() => setShowNewsletterInput(true)}
                  className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#343448]/65 text-[13px] font-medium text-[#343448] hover:bg-[#343448] hover:border-[#343448] hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap"
                >
                  <span>Suscribirse</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-2.5 max-w-xs">
                  <label htmlFor="footer-newsletter" className="sr-only">
                    Correo electrónico para novedades institucionales
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="footer-newsletter"
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterError) setNewsletterError(null);
                      }}
                      placeholder="tu@correo.com"
                      className="flex-1 min-w-0 h-10 px-3.5 bg-white/85 border border-[#343448]/30 text-[13px] text-[#343448] placeholder:text-[#343448]/55 focus:border-[#343448] focus:outline-none rounded-none"
                    />
                    <button
                      type="submit"
                      aria-label="Confirmar suscripción"
                      className="h-10 px-4 rounded-full bg-[#343448] text-white text-[12px] font-medium hover:bg-[#232333] transition-colors cursor-pointer shrink-0"
                    >
                      Enviar
                    </button>
                  </div>
                  {newsletterError && (
                    <p role="alert" className="text-[12px] text-[#343448] font-medium">
                      {newsletterError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom signature bar matching Jacques + Cie footer bottom */}
        <div className="pt-8 border-t border-[#343448]/20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex items-center justify-center md:justify-start">
            <button
              type="button"
              onClick={onGoHome}
              aria-label="Volver al inicio"
              className="text-[#343448] hover:opacity-75 transition-opacity cursor-pointer"
            >
              <BrandEmblem className="w-8 h-8" />
            </button>
          </div>

          <div className="md:col-span-4 flex items-center justify-center">
            <button
              type="button"
              onClick={onGoHome}
              aria-label="Clínica Prof. Albrecht Meerhoff — Inicio"
              className="inline-flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <OfficialClinicLogo tone="dark" size="footer" />
            </button>
          </div>

          <div className="md:col-span-4 flex flex-wrap justify-center md:justify-end items-center gap-x-5 gap-y-2 text-[12px] text-[#343448]/85">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              Política de privacidad
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('legal')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              Aviso legal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
