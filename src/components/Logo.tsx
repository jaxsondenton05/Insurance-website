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
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Shield Path matching the exact curves of General Logo */}
      <path
        d="M256 120 C296 142 344 148 376 154 C382 220 382 290 338 354 C304 404 268 424 256 428 C244 424 208 404 174 354 C130 290 130 220 136 154 C168 148 216 142 256 120 Z"
        fill={filled ? "currentColor" : "rgba(224, 106, 59, 0.12)"}
        stroke="currentColor"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Checkmark */}
      <path
        d="M204 274 L244 316 L318 226"
        stroke={filled ? "#FFFFFF" : "currentColor"}
        strokeWidth="34"
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
        <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
          <img
            src="/general-logo.png"
            alt="Denton Insurance Logo"
            className={`${iconSizes[size]} object-contain rounded-xl shadow-md shadow-clay/20`}
          />
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
