import React from 'react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="50" cy="50" r="48" fill="white" />
      <circle cx="50" cy="50" r="46" stroke="#0A0A0A" strokeWidth="0.5" opacity="0.2" />
      <circle cx="50" cy="50" r="38" fill="#0A0A0A" />
      
      {/* Sun and Rays */}
      <circle cx="50" cy="48" r="8" fill="#E55A1C" />
      <g stroke="#E55A1C" strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="36" x2="50" y2="33" />
        <line x1="41" y1="39" x2="38.5" y2="36.5" />
        <line x1="59" y1="39" x2="61.5" y2="36.5" />
        <line x1="36" y1="48" x2="33" y2="48" />
        <line x1="64" y1="48" x2="67" y2="48" />
      </g>

      {/* Mountains */}
      <path 
        d="M32 60L50 48L68 60L75 68H25L32 60Z" 
        fill="white" 
      />
      <path 
        d="M50 48L60 55L55 58L50 48Z" 
        fill="#0A0A0A" 
        fillOpacity="0.2"
      />

      {/* Text Path Definitions */}
      <defs>
        <path id="topTextPath" d="M22,50 a28,28 0 1,1 56,0" />
        <path id="bottomTextPath" d="M22,50 a28,28 0 1,0 56,0" />
      </defs>

      {/* Top Text */}
      <text fill="#0A0A0A" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
        <textPath xlinkHref="#topTextPath" startOffset="50%" textAnchor="middle">
          DENTON
        </textPath>
      </text>

      {/* Bottom Text */}
      <text fill="#0A0A0A" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
        <textPath xlinkHref="#bottomTextPath" startOffset="50%" textAnchor="middle" dy="7">
          INSURANCE
        </textPath>
      </text>

      {/* Dots */}
      <circle cx="20" cy="50" r="1.5" fill="#0A0A0A" />
      <circle cx="80" cy="50" r="1.5" fill="#0A0A0A" />
    </svg>
  );
}
