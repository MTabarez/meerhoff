import { resolveAssetPath } from '../utils/assets';

export interface EditorialAsset {
  src: string;
  alt: string;
  isIllustrativePlaceholder: boolean;
  caption?: string;
}

export interface SpecialtyItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: 'Quirúrgica' | 'Clínica y Diagnóstico' | 'Pediátrica';
  summary: string;
  introParagraphs: string[];
  treats: string[];
  diagnosticApproach: string[];
  technologyHighlights: string[];
  doctorIds: string[];
  relatedSlugs: string[];
  thumbnail: EditorialAsset;
  heroImage: EditorialAsset;
  secondaryImage: EditorialAsset;
  verificationNote?: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  role: string;
  academicNote: string;
  shortBio: string;
  specialties: string[];
  specialtySlugs: string[];
  photoSrc: string;
  photoAlt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  group: 'Médicos Oftalmólogos' | 'Anestesistas' | 'Licenciados en Oftalmología' | 'Enfermería';
  photoSrc: string;
  photoAlt: string;
}

export interface TechnologyItem {
  id: string;
  name: string;
  description: string;
}

export interface HistoryMilestone {
  id: string;
  period: string;
  title: string;
  description: string;
}

export const CLINIC_INFO = {
  name: 'Clínica Prof. Albrecht Meerhoff',
  shortName: 'Clínica Meerhoff',
  logoSrc: resolveAssetPath('assets/clinic/logoHeader.png'),
  tagline: 'Precisión, visión y experiencia humana.',
  address: 'Av. Luis Alberto de Herrera 2044',
  neighborhood: 'Parque Batlle',
  city: 'Montevideo, Uruguay',
  fullAddress: 'Av. Luis Alberto de Herrera 2044, Montevideo, Uruguay',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Luis+Alberto+de+Herrera+2044,+Montevideo,+Uruguay',
  phoneDisplay: '2481 1200',
  phoneHref: 'tel:+59824811200',
  internationalPhone: '(+598) 2481 1200',
  email: 'info@clinicameerhoff.com.uy',
  emailHref: 'mailto:info@clinicameerhoff.com.uy',
  hoursSummary: 'Lunes a viernes de 09:00 a 19:00 hs · Sábados de 09:00 a 14:00 hs',
  hoursNote: 'Atención con agenda previa. Confirmar horarios vigentes al comunicarse con la clínica.',
  officialWebsite: 'http://www.clinicameerhoff.com.uy/',
} as const;

export const EDITORIAL_ASSETS = {
  hero: {
    src: resolveAssetPath('src/assets/images/hero_ophthalmology_editorial_1795299805241.jpg'),
    alt: 'Consulta oftalmológica personalizada en ambiente clínico luminoso',
    isIllustrativePlaceholder: true,
    caption: 'Fotografía editorial ilustrativa de consulta oftalmológica',
  },
  reception: {
    src: resolveAssetPath('src/assets/images/clinic_reception_architecture_1795299805179.jpg'),
    alt: 'Arquitectura contemporánea e interior sereno de recepción clínica',
    isIllustrativePlaceholder: true,
    caption: 'Imagen arquitectónica ilustrativa — pendiente de reemplazo por fotografía oficial de sede',
  },
  macroEye: {
    src: resolveAssetPath('src/assets/images/macro_human_eye_editorial_1795299805662.jpg'),
    alt: 'Fotografía macro editorial de ojo humano bajo luz natural',
    isIllustrativePlaceholder: true,
    caption: 'Estudio visual de precisión ocular',
  },
  slitLamp: {
    src: resolveAssetPath('src/assets/images/diagnostic_slitlamp_precision_1795299806590.jpg'),
    alt: 'Lámpara de hendidura oftalmológica de alta precisión en consultorio',
    isIllustrativePlaceholder: true,
    caption: 'Equipamiento diagnóstico oftalmológico (imagen editorial ilustrativa)',
  },
  surgicalSuite: {
    src: resolveAssetPath('src/assets/images/surgical_3d_technology_1795299805512.jpg'),
    alt: 'Quirófano oftalmológico moderno con microscopio y visualización en pantalla 4K',
    isIllustrativePlaceholder: true,
    caption: 'Ambiente quirúrgico oftalmológico de alta complejidad (imagen editorial ilustrativa)',
  },
  consultation: {
    src: resolveAssetPath('src/assets/images/consultation_dialogue_editorial_1795299805515.jpg'),
    alt: 'Diálogo médico cercano en escritorio de consulta oftalmológica',
    isIllustrativePlaceholder: true,
    caption: 'Atención humana y seguimiento personalizado (imagen ilustrativa)',
  },
  opticalLenses: {
    src: resolveAssetPath('src/assets/images/optical_clarity_detail_1795299805733.jpg'),
    alt: 'Lentes de prueba oftalmológicos y montura óptica sobre piedra travertino',
    isIllustrativePlaceholder: true,
    caption: 'Instrumental óptico y precisión diagnóstica',
  },
  pediatricCare: {
    src: resolveAssetPath('src/assets/images/pediatric_vision_care_1795299805379.jpg'),
    alt: 'Control visual pediátrico tranquilo y amigable con luz natural',
    isIllustrativePlaceholder: true,
    caption: 'Evaluación visual infantil en ambiente cálido (imagen ilustrativa)',
  },
} satisfies Record<string, EditorialAsset>;

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'gabriela-de-feo',
    name: 'Dra. Gabriela De Feo',
    role: 'Directora Médica · Médico Oftalmólogo',
    academicNote: 'Exdocente de la Facultad de Medicina — Universidad de la República (UdelaR)',
    shortBio:
      'Especialista en córnea y superficie ocular, trasplantes de córnea, cirugía refractiva y cirugía de cataratas.',
    specialties: [
      'Córnea y superficie ocular',
      'Trasplantes de córnea',
      'Cirugía refractiva',
      'Cirugía de cataratas',
    ],
    specialtySlugs: [
      'cornea-y-superficie-ocular',
      'trasplantes-de-cornea',
      'cirugia-refractiva',
      'cirugia-de-cataratas',
    ],
    photoSrc: resolveAssetPath('assets/clinic/staff/GabrielaDeFeo.jpg'),
    photoAlt: 'Retrato de la Dra. Gabriela De Feo',
  },
  {
    id: 'martin-meerhoff',
    name: 'Dr. Martín Meerhoff',
    role: 'Director Médico · Médico Oftalmólogo',
    academicNote: 'Exdocente de la Facultad de Medicina — Universidad de la República (UdelaR)',
    shortBio:
      'Especialista en cirugía de cataratas, cirugía vítreo-retinal, glaucoma, tumores y otras cirugías complejas.',
    specialties: [
      'Cirugía de cataratas',
      'Cirugía vítreo-retinal',
      'Glaucoma',
      'Tumores oculares',
    ],
    specialtySlugs: ['cirugia-de-cataratas', 'retina-y-cirugia-vitreo-retinal', 'glaucoma'],
    photoSrc: resolveAssetPath('assets/clinic/staff/MartinMeerhoff.jpg'),
    photoAlt: 'Retrato del Dr. Martín Meerhoff',
  },
  {
    id: 'ricardo-vaczy',
    name: 'Dr. Ricardo Vaczy',
    role: 'Director Médico · Médico Oftalmólogo',
    academicNote: 'Exdocente de la Facultad de Medicina — Universidad de la República (UdelaR)',
    shortBio:
      'Especialista en cirugía de cataratas, cirugía vítreo-retinal, glaucoma y tratamientos láser retinales.',
    specialties: [
      'Cirugía de cataratas',
      'Cirugía vítreo-retinal',
      'Glaucoma',
      'Tratamientos láser retinales',
    ],
    specialtySlugs: ['cirugia-de-cataratas', 'retina-y-cirugia-vitreo-retinal', 'glaucoma'],
    photoSrc: resolveAssetPath('assets/clinic/staff/RicardoVaczy.jpg'),
    photoAlt: 'Retrato del Dr. Ricardo Vaczy',
  },
];

export const CLINICAL_STAFF: StaffMember[] = [
  {
    id: 'gabriela-sangenis',
    name: 'Dra. Gabriela Sangenis',
    role: 'Médico Oftalmólogo',
    group: 'Médicos Oftalmólogos',
    photoSrc: resolveAssetPath('assets/clinic/staff/GabrielaSangenis.jpg'),
    photoAlt: 'Retrato de la Dra. Gabriela Sangenis',
  },
  {
    id: 'lucia-aguirre',
    name: 'Dra. Lucía Aguirre',
    role: 'Médico Oftalmólogo',
    group: 'Médicos Oftalmólogos',
    photoSrc: resolveAssetPath('assets/clinic/staff/LuciaAguirre.jpg'),
    photoAlt: 'Retrato de la Dra. Lucía Aguirre',
  },
  {
    id: 'ginamaria-bueno',
    name: 'Dra. Ginamaria Bueno',
    role: 'Médico Oftalmólogo',
    group: 'Médicos Oftalmólogos',
    photoSrc: resolveAssetPath('assets/clinic/staff/GinaMariaBueno.jpeg'),
    photoAlt: 'Retrato de la Dra. Ginamaria Bueno',
  },
  {
    id: 'marcelo-lacano',
    name: 'Dr. Marcelo Lacaño',
    role: 'Médico Anestesista',
    group: 'Anestesistas',
    photoSrc: resolveAssetPath('assets/clinic/staff/MarceloLacano.jpeg'),
    photoAlt: 'Retrato del Dr. Marcelo Lacaño',
  },
  {
    id: 'juan-frugoni',
    name: 'Juan Frugoni',
    role: 'Licenciado en Oftalmología',
    group: 'Licenciados en Oftalmología',
    photoSrc: resolveAssetPath('assets/clinic/staff/JuanFrugoni.jpg'),
    photoAlt: 'Retrato del Lic. Juan Frugoni',
  },
  {
    id: 'brian-bustamante',
    name: 'Brian Bustamante',
    role: 'Licenciado en Oftalmología',
    group: 'Licenciados en Oftalmología',
    photoSrc: resolveAssetPath('assets/clinic/staff/BrianBustamante.jpeg'),
    photoAlt: 'Retrato del Lic. Brian Bustamante',
  },
  {
    id: 'john-sosa',
    name: 'John Sosa',
    role: 'Enfermero',
    group: 'Enfermería',
    photoSrc: resolveAssetPath('assets/clinic/staff/JohnSosa.jpg'),
    photoAlt: 'Retrato del enfermero John Sosa',
  },
];

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'cataratas',
    slug: 'cirugia-de-cataratas',
    title: 'Cirugía de cataratas',
    shortTitle: 'Cataratas',
    category: 'Quirúrgica',
    summary:
      'Evaluación integral del cristalino y procedimientos microquirúrgicos de alta precisión adaptados a las necesidades visuales de cada paciente.',
    introParagraphs: [
      'La cirugía de cataratas es uno de los pilares históricos y actuales de la Clínica Prof. Albrecht Meerhoff. Cada intervención parte de un estudio preoperatorio detallado para comprender la anatomía ocular y los requerimientos visuales cotidianos del paciente.',
      'Mediante microcirugía moderna y plataformas quirúrgicas de alta precisión, buscamos una recuperación visual segura, acompañada de un seguimiento cercano antes y después del procedimiento.',
    ],
    treats: [
      'Opacificación progresiva del cristalino asociada a la edad',
      'Cataratas secundarias a enfermedades sistémicas o traumatismos',
      'Disminución de la agudeza visual, encandilamiento y pérdida de contraste',
      'Evaluación y planificación de lentes intraoculares según indicación médica',
    ],
    diagnosticApproach: [
      'Examen biomicroscópico completo del segmento anterior y fondo de ojo.',
      'Cálculo biométrico personalizado y planificación quirúrgica individualizada.',
      'Acompañamiento postoperatorio estructurado con el equipo tratante.',
    ],
    technologyHighlights: [
      'Sistema Centurion para facoemulsificación de alta estabilidad y control quirúrgico.',
      'Visualización quirúrgica digital 3D en 4K (Sistema Ngenuity) para mayor profundidad de campo.',
    ],
    doctorIds: ['martin-meerhoff', 'ricardo-vaczy', 'gabriela-de-feo'],
    relatedSlugs: ['retina-y-cirugia-vitreo-retinal', 'cirugia-refractiva', 'glaucoma'],
    thumbnail: EDITORIAL_ASSETS.macroEye,
    heroImage: EDITORIAL_ASSETS.macroEye,
    secondaryImage: EDITORIAL_ASSETS.surgicalSuite,
  },
  {
    id: 'retina',
    slug: 'retina-y-cirugia-vitreo-retinal',
    title: 'Retina y cirugía vítreo-retinal',
    shortTitle: 'Retina',
    category: 'Quirúrgica',
    summary:
      'Diagnóstico y abordaje médico, láser y microquirúrgico de patologías complejas de la retina, mácula y segmento posterior.',
    introParagraphs: [
      'El estudio y tratamiento de las enfermedades de la retina exige máxima precisión diagnóstica y una sólida experiencia microquirúrgica. Nuestro equipo aborda tanto el seguimiento clínico como intervenciones vítreo-retinales de alta complejidad.',
      'La integración de visualización quirúrgica tridimensional en alta definición permite trabajar con claridad óptica superior sobre estructuras retinales delicadas, cuidando al mismo tiempo la exposición lumínica del ojo.',
    ],
    treats: [
      'Desprendimiento de retina y patología vitreorretiniana',
      'Retinopatía diabética y alteraciones vasculares retinales',
      'Patologías de la mácula y membrana epirretinal',
      'Tratamientos con láser retinal e indicación quirúrgica especializada',
    ],
    diagnosticApproach: [
      'Evaluación oftalmoscópica especializada del segmento posterior.',
      'Estudios diagnósticos orientados al seguimiento evolutivo de la mácula y retina.',
      'Coordinación interdisciplinaria entre tratamiento médico, láser y microcirugía.',
    ],
    technologyHighlights: [
      'Sistema de visualización quirúrgica 3D en 4K (Ngenuity), pionero en Uruguay.',
      'Equipamiento láser especializado y microcirugía vítreo-retinal de última generación.',
    ],
    doctorIds: ['martin-meerhoff', 'ricardo-vaczy'],
    relatedSlugs: ['cirugia-de-cataratas', 'glaucoma', 'cornea-y-superficie-ocular'],
    thumbnail: EDITORIAL_ASSETS.surgicalSuite,
    heroImage: EDITORIAL_ASSETS.surgicalSuite,
    secondaryImage: EDITORIAL_ASSETS.slitLamp,
  },
  {
    id: 'refractiva',
    slug: 'cirugia-refractiva',
    title: 'Cirugía refractiva',
    shortTitle: 'Refractiva',
    category: 'Quirúrgica',
    summary:
      'Estudio personalizado de defectos refractivos para valorar alternativas quirúrgicas seguras y acordes a cada perfil corneal y visual.',
    introParagraphs: [
      'Cada ojo posee una geometría corneal y una historia visual única. En nuestra clínica, la cirugía refractiva comienza siempre con una evaluación rigurosa para determinar si el paciente es candidato adecuado y cuál es la técnica más prudente.',
      'Priorizamos criterios médicos estrictos, transparencia en las expectativas visuales y control clínico exhaustivo en cada etapa.',
    ],
    treats: [
      'Miopía y dificultad para la visión a distancia',
      'Hipermetropía y fatiga visual asociada',
      'Astigmatismo corneal',
      'Valoración refractiva integral según edad y salud de la superficie ocular',
    ],
    diagnosticApproach: [
      'Evaluación refractiva completa y análisis detallado de la córnea.',
      'Estudio de estabilidad graduatoria y salud de la película lagrimal.',
      'Orientación clara sobre beneficios, alcances y cuidados postoperatorios.',
    ],
    technologyHighlights: [
      'Instrumental diagnóstico de precisión para evaluación corneal y óptica preoperatoria.',
    ],
    doctorIds: ['gabriela-de-feo'],
    relatedSlugs: ['cornea-y-superficie-ocular', 'cirugia-de-cataratas', 'trasplantes-de-cornea'],
    thumbnail: EDITORIAL_ASSETS.opticalLenses,
    heroImage: EDITORIAL_ASSETS.opticalLenses,
    secondaryImage: EDITORIAL_ASSETS.macroEye,
  },
  {
    id: 'cornea',
    slug: 'cornea-y-superficie-ocular',
    title: 'Córnea y superficie ocular',
    shortTitle: 'Córnea',
    category: 'Clínica y Diagnóstico',
    summary:
      'Diagnóstico y tratamiento especializado de las afecciones corneales, película lagrimal y trastornos de la superficie ocular.',
    introParagraphs: [
      'La córnea es la principal ventana óptica del ojo y su transparencia e integridad determinan directamente la calidad de la visión. Abordamos desde alteraciones frecuentes de la superficie ocular hasta patologías corneales complejas.',
      'El seguimiento especializado permite detectar cambios tempranos y definir conductas médicas o quirúrgicas conservadoras y oportunas.',
    ],
    treats: [
      'Ectasias corneales y queratocono',
      'Ojo seco y alteraciones de la película lagrimal',
      'Infecciones, inflamaciones y cicatrices corneales',
      'Distrofias y degeneraciones de la córnea',
    ],
    diagnosticApproach: [
      'Evaluación biomicroscópica de alta resolución de la superficie ocular.',
      'Seguimiento clínico longitudinal de la arquitectura y transparencia corneal.',
      'Planes terapéuticos adaptados a cada cuadro clínico.',
    ],
    technologyHighlights: [
      'Equipamiento biomicroscópico y diagnóstico dedicado al segmento anterior.',
    ],
    doctorIds: ['gabriela-de-feo'],
    relatedSlugs: ['trasplantes-de-cornea', 'cirugia-refractiva', 'cirugia-de-cataratas'],
    thumbnail: EDITORIAL_ASSETS.slitLamp,
    heroImage: EDITORIAL_ASSETS.slitLamp,
    secondaryImage: EDITORIAL_ASSETS.opticalLenses,
  },
  {
    id: 'glaucoma',
    slug: 'glaucoma',
    title: 'Glaucoma',
    shortTitle: 'Glaucoma',
    category: 'Clínica y Diagnóstico',
    summary:
      'Detección temprana, control longitudinal del nervio óptico y manejo médico, láser o quirúrgico de la presión intraocular.',
    introParagraphs: [
      'El glaucoma suele avanzar de forma silenciosa, por lo que el diagnóstico precoz y el control periódico resultan fundamentales para preservar el campo visual a largo plazo.',
      'Nuestro enfoque combina control clínico continuo, evaluación del nervio óptico y selección escalonada de tratamientos médicos, láser o quirúrgicos según la evolución de cada paciente.',
    ],
    treats: [
      'Glaucoma primario de ángulo abierto y ángulo cerrado',
      'Hipertensión ocular y seguimiento de pacientes con antecedentes familiares',
      'Control evolutivo del nervio óptico y campo visual',
      'Abordaje terapéutico médico, láser y quirúrgico',
    ],
    diagnosticApproach: [
      'Medición controlada de la presión intraocular y evaluación del ángulo camerular.',
      'Estudio estructural y funcional orientado al seguimiento en el tiempo.',
      'Plan de controles periódicos enfocado en la adherencia y preservación visual.',
    ],
    technologyHighlights: [
      'Equipamiento diagnóstico y láser oftalmológico para el manejo integral del glaucoma.',
    ],
    doctorIds: ['martin-meerhoff', 'ricardo-vaczy'],
    relatedSlugs: ['retina-y-cirugia-vitreo-retinal', 'cirugia-de-cataratas', 'cornea-y-superficie-ocular'],
    thumbnail: EDITORIAL_ASSETS.consultation,
    heroImage: EDITORIAL_ASSETS.consultation,
    secondaryImage: EDITORIAL_ASSETS.slitLamp,
  },
  {
    id: 'pediatrica',
    slug: 'oftalmologia-pediatrica',
    title: 'Oftalmología pediátrica',
    shortTitle: 'Pediátrica',
    category: 'Pediátrica',
    summary:
      'Acompañamiento visual desde la infancia para cuidar el desarrollo ocular y detectar a tiempo alteraciones refractivas o de la visión binocular.',
    introParagraphs: [
      'Durante los primeros años de vida se consolida el desarrollo del sistema visual. Una evaluación oftalmológica oportuna en la infancia permite identificar y tratar afecciones que influyen directamente en el aprendizaje y la calidad de vida.',
      'Ofrecemos un entorno sereno y respetuoso para acompañar a niñas, niños y sus familias en cada control visual.',
    ],
    treats: [
      'Controles visuales preventivos en edad preescolar y escolar',
      'Detección temprana de ambliopía (ojo perezoso)',
      'Defectos refractivos infantiles que requieren corrección óptica',
      'Seguimiento coordinado del desarrollo visual infantil',
    ],
    diagnosticApproach: [
      'Evaluación adaptada a la edad y colaboración de cada paciente pediátrico.',
      'Exploración de la agudeza visual, alineación ocular y salud del fondo de ojo.',
      'Orientación clara para padres y seguimiento periódico durante el crecimiento.',
    ],
    technologyHighlights: [
      'Consultorios equipados para evaluaciones oftalmológicas cuidadosas y precisas.',
    ],
    doctorIds: ['martin-meerhoff', 'ricardo-vaczy', 'gabriela-de-feo'],
    relatedSlugs: ['estrabismo', 'cirugia-refractiva', 'cornea-y-superficie-ocular'],
    thumbnail: EDITORIAL_ASSETS.pediatricCare,
    heroImage: EDITORIAL_ASSETS.pediatricCare,
    secondaryImage: EDITORIAL_ASSETS.consultation,
    verificationNote:
      'Consultar telefónicamente la disponibilidad de agenda específica para oftalmología pediátrica.',
  },
  {
    id: 'estrabismo',
    slug: 'estrabismo',
    title: 'Estrabismo',
    shortTitle: 'Estrabismo',
    category: 'Pediátrica',
    summary:
      'Evaluación clínica de la motilidad ocular y alineación visual en niños y adultos, orientada a recuperar el confort y la coordinación binocular.',
    introParagraphs: [
      'El estrabismo afecta la alineación paralela de los ojos y puede presentarse tanto en la infancia como en la edad adulta. Un diagnóstico preciso analiza los músculos extraoculares, la refracción y la visión binocular.',
      'Definimos conductas personalizadas que pueden incluir corrección óptica, seguimiento clínico o evaluación quirúrgica según cada cuadro.',
    ],
    treats: [
      'Desviaciones oculares convergentes, divergentes o verticales',
      'Evaluación de diplopía (visión doble) en adultos',
      'Seguimiento de la visión binocular y prevención de ambliopía',
      'Valoración integral de la motilidad ocular',
    ],
    diagnosticApproach: [
      'Estudio clínico de la motilidad ocular y medición de ángulos de desviación.',
      'Evaluación refractiva completa asociada a la alineación visual.',
      'Plan de seguimiento individualizado según edad y evolución.',
    ],
    technologyHighlights: [
      'Instrumental óptico de diagnóstico para evaluación precisa de la visión binocular.',
    ],
    doctorIds: ['martin-meerhoff', 'ricardo-vaczy'],
    relatedSlugs: ['oftalmologia-pediatrica', 'cirugia-refractiva', 'glaucoma'],
    thumbnail: EDITORIAL_ASSETS.hero,
    heroImage: EDITORIAL_ASSETS.hero,
    secondaryImage: EDITORIAL_ASSETS.pediatricCare,
    verificationNote:
      'Consultar telefónicamente la disponibilidad de agenda específica para evaluación de estrabismo.',
  },
  {
    id: 'trasplantes-cornea',
    slug: 'trasplantes-de-cornea',
    title: 'Trasplantes de córnea',
    shortTitle: 'Trasplantes',
    category: 'Quirúrgica',
    summary:
      'Cirugía corneal reconstructiva de alta especialización orientada a restaurar la transparencia óptica y la integridad ocular.',
    introParagraphs: [
      'Cuando una enfermedad, distrofia o cicatriz compromete de forma irreversible la transparencia de la córnea, el trasplante corneal constituye una herramienta quirúrgica de alta especialización para rehabilitar la visión.',
      'En la Clínica Prof. Albrecht Meerhoff realizamos la evaluación preoperatoria, la planificación técnica y el seguimiento prolongado indispensable para el cuidado del injerto corneal.',
    ],
    treats: [
      'Queratocono avanzado sin respuesta a otras opciones ópticas',
      'Distrofias corneales endoteliales y estromales',
      'Opacidades o cicatrices corneales postinfecciosas o postraumáticas',
      'Seguimiento postoperatorio especializado de injertos corneales',
    ],
    diagnosticApproach: [
      'Evaluación exhaustiva de las capas corneales y del segmento anterior.',
      'Selección de la estrategia quirúrgica acorde al compromiso específico de la córnea.',
      'Acompañamiento médico cercano y continuo en el largo plazo.',
    ],
    technologyHighlights: [
      'Microcirugía oftalmológica de precisión y control biomicroscópico especializado.',
    ],
    doctorIds: ['gabriela-de-feo'],
    relatedSlugs: ['cornea-y-superficie-ocular', 'cirugia-de-cataratas', 'cirugia-refractiva'],
    thumbnail: EDITORIAL_ASSETS.reception,
    heroImage: EDITORIAL_ASSETS.reception,
    secondaryImage: EDITORIAL_ASSETS.slitLamp,
  },
];

export const TECHNOLOGIES: TechnologyItem[] = [
  {
    id: 'ngenuity-3d',
    name: 'Visualización quirúrgica 3D en 4K (Ngenuity)',
    description:
      'Pioneros en Uruguay en incorporar visualización quirúrgica tridimensional en alta definición, aportando mayor profundidad, claridad y menor exposición lumínica directa en cirugías delicadas de retina y segmento anterior.',
  },
  {
    id: 'centurion-cataratas',
    name: 'Plataforma Centurion para cirugía de cataratas',
    description:
      'Equipamiento de facoemulsificación de última generación que acompaña la destreza del cirujano con estabilidad constante y precisión en cada fase del procedimiento.',
  },
  {
    id: 'vitreo-retinal-laser',
    name: 'Cirugía vítreo-retinal y láser especializado',
    description:
      'Infraestructura quirúrgica y sistemas láser orientados al tratamiento preciso de patologías retinales y del glaucoma de creciente complejidad.',
  },
  {
    id: 'diagnostico-precision',
    name: 'Diagnóstico oftalmológico de alta precisión',
    description:
      'Evaluación clínica apoyada en equipamiento diagnóstico actualizado para sustentar decisiones médicas conservadoras, personalizadas y basadas en evidencia.',
  },
];

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    id: 'legado',
    period: 'Casi un siglo',
    title: 'Una vocación familiar en la oftalmología uruguaya',
    description:
      'El nombre de la clínica rinde homenaje al Prof. Dr. Albrecht Arnold Meerhoff Werner, referente histórico de la medicina y la oftalmología en el Uruguay, dando origen a una trayectoria que ya abarca tres generaciones de médicos.',
  },
  {
    id: 'docencia',
    period: 'Tradición docente',
    title: 'Conocimiento clínico y vínculo universitario',
    description:
      'La formación en la Universidad de la República (UdelaR) y el ejercicio docente marcaron una cultura institucional basada en el rigor científico, el criterio médico y la actualización permanente.',
  },
  {
    id: 'fundacion-2001',
    period: '2001',
    title: 'Apertura de la clínica en su sede actual',
    description:
      'La Clínica Prof. Albrecht Meerhoff abre formalmente sus puertas en Montevideo en su formato actual, consolidándose como un centro oftalmológico especializado de alta complejidad en la zona de Parque Batlle.',
  },
  {
    id: 'innovacion-actual',
    period: 'Presente',
    title: 'Innovación quirúrgica con mirada humana',
    description:
      'Con la incorporación pionera de visualización quirúrgica 3D y plataformas de última generación, la institución continúa proyectando su legado hacia el futuro de la salud visual.',
  },
];

export const EDUCATION_PILLARS = [
  {
    id: 'docencia-universitaria',
    label: 'Formación profesional',
    title: 'Docencia universitaria y transmisión del criterio médico',
    description:
      'El cuerpo directivo de la clínica cuenta con trayectoria docente en la Facultad de Medicina de la Universidad de la República, sosteniendo una práctica clínica rigurosa donde la enseñanza y el aprendizaje continuo forman parte del quehacer cotidiano.',
    image: EDITORIAL_ASSETS.consultation,
  },
  {
    id: 'actividad-cientifica',
    label: 'Actualización científica',
    title: 'Innovación clínica y conocimiento compartido',
    description:
      'La participación constante en instancias académicas y la incorporación temprana de herramientas como la visualización quirúrgica en 3D fortalecen tanto la precisión clínica como la formación de nuevas generaciones de especialistas.',
    image: EDITORIAL_ASSETS.opticalLenses,
  },
] as const;
