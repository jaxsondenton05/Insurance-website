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
          <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group">
            <Logo size="md" withTagline={true} theme="dark" />
          </a>
          
          {/* Top Menu Options Running Across */}
          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-2">
            <a 
              href="#about"
              className="text-[11px] sm:text-xs font-semibold text-bone/80 hover:text-clay transition-colors uppercase tracking-wider sm:tracking-[0.18em] whitespace-nowrap px-1.5 py-1"
            >
              The Story
            </a>
            <a 
              href="#services"
              className="text-[11px] sm:text-xs font-semibold text-bone/80 hover:text-clay transition-colors uppercase tracking-wider sm:tracking-[0.18em] whitespace-nowrap px-1.5 py-1"
            >
              Coverage
            </a>
            <a 
              href="#business-card"
              className="text-[11px] sm:text-xs font-semibold text-bone/80 hover:text-clay transition-colors uppercase tracking-wider sm:tracking-[0.18em] whitespace-nowrap px-1.5 py-1"
            >
              Contact Card
            </a>

            <div className="hidden sm:block h-4 w-px bg-white/15 shrink-0" />

            <a 
              href="tel:9493970449" 
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-bone/90 hover:text-clay transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-clay" />
              <span>(949) 397-0449</span>
            </a>

            <a 
              href="#contact" 
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-clay text-bone text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-clay-hover transition-all duration-300 rounded-md shadow-md shadow-clay/20 whitespace-nowrap shrink-0"
            >
              <span>Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 hidden xs:inline" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
