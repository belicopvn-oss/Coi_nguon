import React, { useState } from 'react';

interface BrandSealProps {
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * Minimalist Vietnamese Heritage Emblem:
 * Stylized Lotus (Hoa Sen) framed inside a concentric Dong Son bronze ring.
 */
export const BrandSeal: React.FC<BrandSealProps> = ({ className = 'w-10 h-10', variant = 'dark' }) => {
  const strokeMain = variant === 'dark' ? '#B28A45' : '#203D32';
  const fillBg = variant === 'dark' ? '#162B23' : '#F5F0E5';
  const accentFill = '#B28A45';

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Dong Son architectural frame */}
      <rect x="2" y="2" width="44" height="44" rx="10" fill={fillBg} stroke={strokeMain} strokeWidth="1.5" />
      <rect x="5.5" y="5.5" width="37" height="37" rx="7" stroke={strokeMain} strokeWidth="0.75" strokeOpacity="0.45" />
      {/* Subtle 8-point concentric heritage halo */}
      <circle cx="24" cy="24" r="14" stroke={accentFill} strokeWidth="0.75" strokeDasharray="2 3" strokeOpacity="0.55" />
      {/* Stylized Lotus Petals */}
      <path
        d="M24 12C21.6 16.5 20.8 21.2 24 27.5C27.2 21.2 26.4 16.5 24 12Z"
        fill={accentFill}
        fillOpacity="0.92"
      />
      <path
        d="M24 27.5C18.8 26.2 15.2 22.8 14.2 17.5C18.4 18.6 21.8 21.8 24 27.5Z"
        stroke={accentFill}
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={accentFill}
        fillOpacity="0.22"
      />
      <path
        d="M24 27.5C29.2 26.2 32.8 22.8 33.8 17.5C29.6 18.6 26.2 21.8 24 27.5Z"
        stroke={accentFill}
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={accentFill}
        fillOpacity="0.22"
      />
      {/* Traditional architectural base bar */}
      <path d="M16 32.5H32" stroke={accentFill} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19.5 35.5H28.5" stroke={accentFill} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.65" />
    </svg>
  );
};

interface HeritageDividerProps {
  className?: string;
}

/**
 * Restrained horizontal editorial divider with a small geometric lotus diamond.
 */
export const HeritageDivider: React.FC<HeritageDividerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#B28A45]/45" />
      <svg viewBox="0 0 28 16" className="w-7 h-4 text-[#B28A45]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2L17 8L14 14L11 8L14 2Z" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.18" />
        <path d="M4 8H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M19 8H24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
      </svg>
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#B28A45]/45" />
    </div>
  );
};

interface DongSonBackdropProps {
  className?: string;
}

/**
 * Subtle geometric Dong Son bronze drum concentric ring motif for deep moss-green banners.
 */
export const DongSonBackdrop: React.FC<DongSonBackdropProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="300" cy="300" r="280" stroke="#B28A45" strokeWidth="1" strokeOpacity="0.16" />
      <circle cx="300" cy="300" r="245" stroke="#B28A45" strokeWidth="0.75" strokeDasharray="4 8" strokeOpacity="0.2" />
      <circle cx="300" cy="300" r="195" stroke="#B28A45" strokeWidth="1" strokeOpacity="0.14" />
      <circle cx="300" cy="300" r="140" stroke="#B28A45" strokeWidth="0.75" strokeDasharray="2 6" strokeOpacity="0.2" />
      <circle cx="300" cy="300" r="78" stroke="#B28A45" strokeWidth="1" strokeOpacity="0.16" />
      {/* 12-ray Dong Son star center */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 300 + Math.cos(angle) * 32;
        const y1 = 300 + Math.sin(angle) * 32;
        const x2 = 300 + Math.cos(angle) * 74;
        const y2 = 300 + Math.sin(angle) * 74;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#B28A45"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
        );
      })}
    </svg>
  );
};

interface MemberAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<MemberAvatarProps['size']>, string> = {
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-24 h-24 text-2xl',
};

function getInitials(name: string): string {
  const cleaned = name
    .replace(/^(Cụ bà|Cụ ông|Cụ|Ông|Bà)\s+/i, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'CN';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const MemberAvatar: React.FC<MemberAvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`${SIZE_CLASSES[size]} rounded-full bg-[#EFE5D0] text-[#203D32] border border-[#B28A45]/50 font-serif font-semibold flex items-center justify-center shrink-0 select-none ${className}`}
        aria-label={name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${SIZE_CLASSES[size]} rounded-full object-cover border border-[#B28A45]/45 shrink-0 bg-[#EFE5D0] ${className}`}
    />
  );
};
