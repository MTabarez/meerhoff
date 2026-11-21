import { DOCTORS, SPECIALTIES, type DoctorProfile, type SpecialtyItem } from '../data/clinicData';

export type AppRoute =
  | { view: 'home'; section?: string }
  | { view: 'specialty'; slug: string };

export function parseHashRoute(hash: string): AppRoute {
  const cleaned = hash.replace(/^#/, '').trim();
  if (!cleaned || cleaned === '/') {
    return { view: 'home' };
  }

  const specialtyMatch = cleaned.match(/^\/?especialidades\/([a-z0-9-]+)\/?$/i);
  if (specialtyMatch) {
    const slug = specialtyMatch[1].toLowerCase();
    const exists = SPECIALTIES.some((item) => item.slug === slug);
    if (exists) {
      return { view: 'specialty', slug };
    }
    return { view: 'home' };
  }

  const sectionMatch = cleaned.match(/^\/?seccion\/([a-z0-9-]+)\/?$/i);
  if (sectionMatch) {
    return { view: 'home', section: sectionMatch[1].toLowerCase() };
  }

  return { view: 'home' };
}

export function buildSpecialtyHash(slug: string): string {
  return `#/especialidades/${slug}`;
}

export function buildSectionHash(sectionId: string): string {
  return `#/seccion/${sectionId}`;
}

export function getSpecialtyBySlug(slug: string): SpecialtyItem | undefined {
  return SPECIALTIES.find((item) => item.slug === slug);
}

export function getRelatedSpecialties(specialty: SpecialtyItem): SpecialtyItem[] {
  return specialty.relatedSlugs
    .map((slug) => SPECIALTIES.find((item) => item.slug === slug))
    .filter((item): item is SpecialtyItem => Boolean(item));
}

export function getDoctorsForSpecialty(specialty: SpecialtyItem): DoctorProfile[] {
  return specialty.doctorIds
    .map((id) => DOCTORS.find((doc) => doc.id === id))
    .filter((doc): doc is DoctorProfile => Boolean(doc));
}

export function filterSpecialtiesByCategory(
  specialties: SpecialtyItem[],
  category: 'Todas' | SpecialtyItem['category']
): SpecialtyItem[] {
  if (category === 'Todas') {
    return specialties;
  }
  return specialties.filter((item) => item.category === category);
}
