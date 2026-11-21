import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';

interface BrandEmblemProps {
  className?: string;
}

export const BrandEmblem: React.FC<BrandEmblemProps> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="15.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8.5 18C11.3 13.8 14.5 12 18 12C21.5 12 24.7 13.8 27.5 18C24.7 22.2 21.5 24 18 24C14.5 24 11.3 22.2 8.5 18Z"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <circle cx="18" cy="18" r="3.25" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  );
};

interface OfficialClinicLogoProps {
  tone?: 'light' | 'dark';
  size?: 'header' | 'footer';
  className?: string;
}

export const OfficialClinicLogo: React.FC<OfficialClinicLogoProps> = ({
  tone = 'dark',
  size = 'header',
  className = '',
}) => {
  const heightClass =
    size === 'footer' ? 'h-12 sm:h-14 w-auto' : 'h-9 sm:h-11 w-auto';
  const toneClass = tone === 'light' ? 'brightness-0 invert' : '';

  return (
    <img
      src={CLINIC_INFO.logoSrc}
      alt="Clínica Prof. Albrecht Meerhoff — Oftalmología"
      loading="eager"
      decoding="async"
      className={`object-contain select-none ${heightClass} ${toneClass} ${className}`}
    />
  );
};

