import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CLINICAL_STAFF,
  DOCTORS,
  type DoctorProfile,
  type StaffMember,
} from '../data/clinicData';
import { useReveal } from '../hooks/useMotion';

interface TeamSectionProps {
  onSelectDoctor: (doctor: DoctorProfile) => void;
}

const STAFF_GROUPS: Array<'Todos' | StaffMember['group']> = [
  'Todos',
  'Médicos Oftalmólogos',
  'Anestesistas',
  'Licenciados en Oftalmología',
  'Enfermería',
];

export const TeamSection: React.FC<TeamSectionProps> = ({ onSelectDoctor }) => {
  const [selectedGroup, setSelectedGroup] = useState<'Todos' | StaffMember['group']>('Todos');
  const { ref, isVisible } = useReveal<HTMLElement>();

  const visibleStaff =
    selectedGroup === 'Todos'
      ? CLINICAL_STAFF
      : CLINICAL_STAFF.filter((member) => member.group === selectedGroup);

  return (
    <section
      id="equipo"
      ref={ref}
      aria-labelledby="team-heading"
      className="bg-[#F4F0E8] text-[#343448] py-20 sm:py-28 lg:py-36"
    >
      <div
        data-visible={isVisible}
        className="reveal-block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        {/* Asymmetric editorial intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-6">
            <h2
              id="team-heading"
              className="text-[36px] sm:text-[50px] lg:text-[64px] leading-[1.01] tracking-[-0.028em] font-normal text-[#343448]"
            >
              Experiencia médica. Compromiso humano.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#343448]/85 max-w-[46ch]">
              La dirección médica de la Clínica Prof. Albrecht Meerhoff está integrada por
              especialistas referentes en distintas subespecialidades oftalmológicas, con pasado
              docente en la Universidad de la República y un equipo clínico y quirúrgico dedicado al
              cuidado integral de cada paciente.
            </p>
          </div>
        </div>

        {/* Directores Médicos — asymmetric staggered editorial portraits */}
        <div className="mb-20 sm:mb-28">
          <div className="pb-5 mb-10 border-b border-[#D9D7D2] flex items-baseline justify-between">
            <h3 className="text-[22px] sm:text-[26px] tracking-[-0.02em] font-normal text-[#343448]">
              Directores Médicos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {DOCTORS.map((doctor, index) => (
              <article
                key={doctor.id}
                className={[
                  'group flex flex-col justify-between',
                  index === 1 ? 'md:mt-10' : '',
                  index === 2 ? 'md:mt-20' : '',
                ].join(' ')}
              >
                <div>
                  <div className="w-full aspect-[4/4.6] overflow-hidden rounded-none bg-[#E6E1D7] mb-6">
                    <img
                      src={doctor.photoSrc}
                      alt={doctor.photoAlt}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>

                  <p className="text-[12px] text-[#777783] mb-1.5">{doctor.role}</p>
                  <h4 className="text-[26px] sm:text-[30px] leading-[1.1] tracking-[-0.02em] font-normal text-[#343448] mb-2">
                    {doctor.name}
                  </h4>
                  <p className="text-[13px] text-[#777783] mb-4">{doctor.academicNote}</p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#343448]/85 pb-5">
                    {doctor.shortBio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9D7D2]">
                  <button
                    type="button"
                    onClick={() => onSelectDoctor(doctor)}
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-[#343448] hover:text-[#85ADE2] transition-colors duration-200 cursor-pointer"
                  >
                    <span>Ver perfil profesional</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Staff Clínico y Quirúrgico */}
        <div>
          <div className="pb-6 mb-10 border-b border-[#D9D7D2] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h3 className="text-[22px] sm:text-[26px] tracking-[-0.02em] font-normal text-[#343448]">
              Staff clínico y quirúrgico
            </h3>

            <div
              role="group"
              aria-label="Filtrar equipo por área"
              className="flex flex-wrap items-center gap-2"
            >
              {STAFF_GROUPS.map((group) => {
                const isActive = selectedGroup === group;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setSelectedGroup(group)}
                    aria-pressed={isActive}
                    className={[
                      'px-4 py-2 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer',
                      isActive
                        ? 'bg-[#343448] text-white'
                        : 'bg-white text-[#343448] border border-[#D9D7D2] hover:border-[#343448]',
                    ].join(' ')}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-10">
            {visibleStaff.map((member) => (
              <article key={member.id} className="group flex flex-col">
                <div className="w-full aspect-[4/4.6] overflow-hidden rounded-none bg-[#E6E1D7] mb-4">
                  <img
                    src={member.photoSrc}
                    alt={member.photoAlt}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-3 border-t border-[#D9D7D2]">
                  <h4 className="text-[20px] leading-[1.2] tracking-[-0.015em] font-normal text-[#343448]">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-[13px] text-[#777783]">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
