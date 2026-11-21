import React, { useState } from 'react';
import type { EditorialAsset } from '../data/clinicData';

interface EditorialImageProps {
  asset: EditorialAsset;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
  hoverZoom?: boolean;
  showCaption?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  asset,
  className = '',
  imgClassName = '',
  loading = 'eager',
  hoverZoom = false,
  showCaption = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`relative overflow-hidden rounded-none bg-[#E6E1D7] ${className}`}>
      {!hasError ? (
        <img
          src={asset.src}
          alt={asset.alt}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={[
            'w-full h-full object-cover block',
            hoverZoom
              ? 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]'
              : '',
            imgClassName,
          ].join(' ')}
        />
      ) : (
        <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center bg-[#E7E2D8] text-[#343448]">
          <span className="text-[11px] tracking-[0.04em] text-[#777783] mb-2">
            Clínica Prof. Albrecht Meerhoff
          </span>
          <span className="text-[14px] max-w-[260px] leading-snug">{asset.alt}</span>
        </div>
      )}

      {showCaption && asset.caption && (
        <figcaption className="mt-2 text-[11px] leading-snug text-[#777783]">
          {asset.caption}
        </figcaption>
      )}
    </figure>
  );
};
