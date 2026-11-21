import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSectionHash,
  buildSpecialtyHash,
  filterSpecialtiesByCategory,
  getDoctorsForSpecialty,
  getRelatedSpecialties,
  getSpecialtyBySlug,
  parseHashRoute,
} from './navigation';
import {
  generateRequestReference,
  hasValidationErrors,
  validateAppointmentForm,
  validateNewsletterEmail,
} from './validation';
import { SPECIALTIES } from '../data/clinicData';
import { resolveAssetPath } from './assets';

test('parseHashRoute resolves home, valid specialty slugs, sections, and invalid slugs safely', () => {
  assert.deepEqual(parseHashRoute(''), { view: 'home' });
  assert.deepEqual(parseHashRoute('#/'), { view: 'home' });
  assert.deepEqual(parseHashRoute('#/especialidades/cirugia-de-cataratas'), {
    view: 'specialty',
    slug: 'cirugia-de-cataratas',
  });
  assert.deepEqual(parseHashRoute('#/seccion/tecnologia'), {
    view: 'home',
    section: 'tecnologia',
  });
  assert.deepEqual(parseHashRoute('#/especialidades/slug-inexistente'), {
    view: 'home',
  });
});

test('hash builders and specialty lookup helpers return consistent records', () => {
  assert.equal(buildSpecialtyHash('glaucoma'), '#/especialidades/glaucoma');
  assert.equal(buildSectionHash('contacto'), '#/seccion/contacto');

  const cataracts = getSpecialtyBySlug('cirugia-de-cataratas');
  assert.ok(cataracts);
  assert.equal(cataracts.title, 'Cirugía de cataratas');

  const related = getRelatedSpecialties(cataracts);
  assert.equal(related.length, 3);
  assert.ok(related.every((item) => item.slug !== cataracts.slug));

  const doctors = getDoctorsForSpecialty(cataracts);
  assert.equal(doctors.length, 3);
});

test('filterSpecialtiesByCategory returns expected counts across categories', () => {
  assert.equal(filterSpecialtiesByCategory(SPECIALTIES, 'Todas').length, 8);
  assert.equal(filterSpecialtiesByCategory(SPECIALTIES, 'Quirúrgica').length, 4);
  assert.equal(filterSpecialtiesByCategory(SPECIALTIES, 'Clínica y Diagnóstico').length, 2);
  assert.equal(filterSpecialtiesByCategory(SPECIALTIES, 'Pediátrica').length, 2);
});

test('validateAppointmentForm flags missing or malformed fields and accepts valid input', () => {
  const emptyErrors = validateAppointmentForm({
    fullName: '',
    email: 'invalid-email',
    phone: '123',
    specialty: '',
    preferredShift: 'Indistinto',
    message: '',
  });
  assert.equal(hasValidationErrors(emptyErrors), true);
  assert.ok(emptyErrors.fullName);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.phone);
  assert.ok(emptyErrors.specialty);

  const validErrors = validateAppointmentForm({
    fullName: 'María Fernández',
    email: 'maria.fernandez@correo.uy',
    phone: '099 481 200',
    specialty: 'Cirugía de cataratas',
    preferredShift: 'Mañana (09:00–13:00)',
    message: 'Consulta de control anual',
  });
  assert.equal(hasValidationErrors(validErrors), false);
});

test('validateNewsletterEmail and generateRequestReference work deterministically', () => {
  assert.ok(validateNewsletterEmail('not-an-email'));
  assert.equal(validateNewsletterEmail('paciente@montevideo.uy'), null);
  assert.equal(generateRequestReference(1), 'CM-0001');
  assert.equal(generateRequestReference(42), 'CM-0042');
});

test('resolveAssetPath adapts local paths for root, relative, and GitHub Pages subpath bases', () => {
  assert.equal(
    resolveAssetPath('assets/clinic/logoHeader.png', '/'),
    '/assets/clinic/logoHeader.png'
  );
  assert.equal(
    resolveAssetPath('/assets/clinic/logoHeader.png', './'),
    './assets/clinic/logoHeader.png'
  );
  assert.equal(
    resolveAssetPath('src/assets/images/hero.jpg', '/clinica-meerhoff/'),
    '/clinica-meerhoff/src/assets/images/hero.jpg'
  );
  assert.equal(
    resolveAssetPath('assets/clinic/staff/MartinMeerhoff.jpg', '/clinica-meerhoff'),
    '/clinica-meerhoff/assets/clinic/staff/MartinMeerhoff.jpg'
  );
  assert.equal(
    resolveAssetPath('https://example.com/photo.jpg', '/clinica-meerhoff/'),
    'https://example.com/photo.jpg'
  );
});
