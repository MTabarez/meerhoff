import { useCallback, useEffect, useState } from 'react';
import { type DoctorProfile } from './data/clinicData';
import {
  type AppRoute,
  buildSectionHash,
  buildSpecialtyHash,
  getSpecialtyBySlug,
  parseHashRoute,
} from './utils/navigation';
import type { AppointmentSubmissionRecord } from './utils/validation';
import { AppointmentModal } from './components/AppointmentModal';
import { ContactSection } from './components/ContactSection';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { EditorialIntro } from './components/EditorialIntro';
import { EducationSection } from './components/EducationSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HistorySection } from './components/HistorySection';
import { ImageComposition } from './components/ImageComposition';
import { LegalModal } from './components/LegalModal';
import { NavigationOverlay } from './components/NavigationOverlay';
import { SpecialtyDetailTemplate } from './components/SpecialtyDetailTemplate';
import { SpecialtyList } from './components/SpecialtyList';
import { TeamSection } from './components/TeamSection';
import { TechnologySection } from './components/TechnologySection';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window !== 'undefined' ? parseHashRoute(window.location.hash) : { view: 'home' }
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointmentSpecialty, setAppointmentSpecialty] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [legalModalMode, setLegalModalMode] = useState<'privacy' | 'legal' | null>(null);
  const [submittedRequests, setSubmittedRequests] = useState<AppointmentSubmissionRecord[]>([]);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHashRoute(window.location.hash);
      setRoute(parsed);
      if (parsed.view === 'specialty') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const attemptScroll = () => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (route.view !== 'home') {
      window.location.hash = buildSectionHash(sectionId);
      setRoute({ view: 'home', section: sectionId });
      window.setTimeout(attemptScroll, 80);
    } else {
      attemptScroll();
    }
  }, [route.view]);

  const handleGoHome = useCallback(() => {
    window.location.hash = '#/';
    setRoute({ view: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectSpecialty = useCallback((slug: string) => {
    window.location.hash = buildSpecialtyHash(slug);
    setRoute({ view: 'specialty', slug });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleOpenAppointment = useCallback((specialtyTitle = '') => {
    setAppointmentSpecialty(specialtyTitle);
    setAppointmentModalOpen(true);
  }, []);

  const handleRecordSubmission = useCallback((record: AppointmentSubmissionRecord) => {
    setSubmittedRequests((prev) => [record, ...prev]);
  }, []);

  const activeSpecialty =
    route.view === 'specialty' ? getSpecialtyBySlug(route.slug) : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E8] text-[#343448]">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#343448] focus:text-white focus:rounded-full"
      >
        Saltar al contenido principal
      </a>

      <Header
        mode={activeSpecialty ? 'light' : 'hero'}
        onGoHome={handleGoHome}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenAppointment={() => handleOpenAppointment(activeSpecialty?.title ?? '')}
      />

      <NavigationOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigateSection={scrollToSection}
        onNavigateSpecialty={handleSelectSpecialty}
        onOpenAppointment={() => handleOpenAppointment(activeSpecialty?.title ?? '')}
      />

      <main id="contenido-principal" className="flex-1">
        {activeSpecialty ? (
          <SpecialtyDetailTemplate
            specialty={activeSpecialty}
            onGoHome={handleGoHome}
            onSelectSpecialty={handleSelectSpecialty}
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            onOpenAppointment={handleOpenAppointment}
          />
        ) : (
          <>
            <HeroSection
              onExploreClinic={() => scrollToSection('historia')}
            />
            <EditorialIntro onExploreHistory={() => scrollToSection('trayectoria')} />
            <ImageComposition />
            <SpecialtyList onSelectSpecialty={handleSelectSpecialty} />
            <TechnologySection onOpenAppointment={() => handleOpenAppointment('')} />
            <TeamSection onSelectDoctor={(doc) => setSelectedDoctor(doc)} />
            <HistorySection />
            <EducationSection onOpenAppointment={() => scrollToSection('contacto')} />
            <ContactSection
              onSubmitted={handleRecordSubmission}
              submittedCount={submittedRequests.length}
            />
          </>
        )}
      </main>

      <Footer
        onGoHome={handleGoHome}
        onNavigateSection={scrollToSection}
        onNavigateSpecialty={handleSelectSpecialty}
        onOpenAppointment={() => handleOpenAppointment(activeSpecialty?.title ?? '')}
        onOpenLegal={(mode) => setLegalModalMode(mode)}
      />

      <AppointmentModal
        isOpen={appointmentModalOpen}
        initialSpecialty={appointmentSpecialty}
        onClose={() => setAppointmentModalOpen(false)}
        onSubmitted={handleRecordSubmission}
        submittedCount={submittedRequests.length}
      />

      <DoctorProfileModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onSelectSpecialty={handleSelectSpecialty}
        onRequestAppointment={handleOpenAppointment}
      />

      <LegalModal mode={legalModalMode} onClose={() => setLegalModalMode(null)} />
    </div>
  );
}
