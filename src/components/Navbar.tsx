import React from "react";
import { Phone, ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#16110D]/95 backdrop-blur-md border-b border-[#35271F]" id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Nav Container */}
        <div className="h-20 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Lockup */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group">
            <Logo size="md" withTagline={true} theme="dark" />
          </a>
          
          {/* Top Menu Options Running Across */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 overflow-x-auto no-scrollbar py-2">
            {/* 1. Free Quote Button - FIRST on the list for instant mobile & desktop accessibility */}
            <a 
              href="/#contact" 
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-clay text-bone text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-clay-hover transition-all duration-300 rounded-md shadow-md shadow-clay/20 whitespace-nowrap shrink-0"
            >
              <span>Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Direct Condensed Menu Links */}
            <a 
              href="/#reviews"
              className="text-[11px] sm:text-xs font-semibold text-bone/80 hover:text-clay transition-colors uppercase tracking-wider sm:tracking-[0.16em] whitespace-nowrap px-1.5 py-1"
            >
              Reviews
            </a>
            <a 
              href="/#about"
              className="text-[11px] sm:text-xs font-semibold text-bone/80 hover:text-clay transition-colors uppercase tracking-wider sm:tracking-[0.16em] whitespace-nowrap px-1.5 py-1"
            >
              About
            </a>
            <a 
              href="/#services"
              className="text-[11px] sm:text-xs font-semibold text-bone/80 hover:text-clay transition-colors uppercase tracking-wider sm:tracking-[0.16em] whitespace-nowrap px-1.5 py-1"
            >
              Coverage
            </a>
            <a 
              href="/#social"
              className="text-[11px] sm:text-xs font-semibold text-bone/80 hover:text-clay transition-colors uppercase tracking-wider sm:tracking-[0.16em] whitespace-nowrap px-1.5 py-1"
            >
              Social
            </a>

            <div className="hidden sm:block h-4 w-px bg-white/15 shrink-0" />

            <a 
              href="tel:9493970449" 
              className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-bone/90 hover:text-clay transition-colors whitespace-nowrap shrink-0"
              title="Call Jaxson Denton directly"
            >
              <Phone className="w-3.5 h-3.5 text-clay shrink-0" />
              <span className="hidden lg:inline">(949) 397-0449</span>
              <span className="lg:hidden text-[10px] font-semibold uppercase tracking-wider text-clay">Call</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
