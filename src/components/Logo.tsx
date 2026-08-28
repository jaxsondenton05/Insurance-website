import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  withTagline?: boolean;
  withAccentBar?: boolean;
  theme?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg';
}

export function ShieldCheckLogoIcon({ className = "w-8 h-8", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Shield Path with soft rounded curves matching business cards */}
      <path
        d="M24 4.5C30.5 8 38 8.8 40.5 9.5C41.2 14.5 41.5 24 37 32.5C33.5 39 26.5 43.5 24 44.5C21.5 43.5 14.5 39 11 32.5C6.5 24 6.8 14.5 7.5 9.5C10 8.8 17.5 8 24 4.5Z"
        fill={filled ? "currentColor" : "rgba(224, 106, 59, 0.12)"}
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Checkmark */}
      <path
        d="M17 23.5L22 28.5L31.5 19"
        stroke={filled ? "#FFFFFF" : "currentColor"}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({
  className = "",
  iconOnly = false,
  withTagline = false,
  withAccentBar = false,
  theme = 'auto',
  size = 'md'
}: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12"
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl md:text-2xl",
    lg: "text-3xl md:text-4xl"
  };

  const textColor = 
    theme === 'dark' 
      ? 'text-[#FAF7F2]' 
      : theme === 'light' 
      ? 'text-[#16110D]' 
      : 'text-current';

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-3.5">
        <div className="text-clay shrink-0 transition-transform duration-300 group-hover:scale-105">
          <ShieldCheckLogoIcon className={iconSizes[size]} />
        </div>
        
        {!iconOnly && (
          <div className="flex flex-col justify-center">
            <span 
              className={`font-serif font-bold tracking-tight ${titleSizes[size]} ${textColor} leading-none`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Denton Insurance
            </span>
            {withTagline && (
              <span className="text-[9px] md:text-[10px] uppercase font-semibold text-clay tracking-[0.28em] mt-1.5 leading-none">
                Protection You Can Trust
              </span>
            )}
          </div>
        )}
      </div>

      {withAccentBar && (
        <div className="w-12 h-1 bg-clay rounded-full mt-3" />
      )}
    </div>
  );
}
