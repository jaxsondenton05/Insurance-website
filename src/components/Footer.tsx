import React from "react";
import { Mail, Phone, Globe } from "lucide-react";
import { ShieldCheckLogoIcon } from "./Logo";

export default function Footer() {
  return (
    <footer className="py-16 bg-[#120D0A] text-bone border-t border-[#2E221B] relative overflow-hidden" id="footer">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E06A3B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="text-clay">
                <ShieldCheckLogoIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-bone tracking-tight leading-none">
                  Denton Insurance
                </h3>
                <p className="text-[10px] uppercase font-semibold text-clay tracking-[0.26em] mt-1">
                  PROTECTION YOU CAN TRUST
                </p>
              </div>
            </div>

            <div className="w-12 h-1 bg-clay rounded-full" />

            {/* Badges from business card */}
            <div className="flex items-center gap-2 pt-1">
              {["AUTO", "HOME", "BUSINESS"].map((line) => (
                <span
                  key={line}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider border border-clay/50 text-clay bg-clay/5"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-clay">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              {[
                { name: "Home", href: "#" },
                { name: "The Honest Story", href: "#about" },
                { name: "Coverage Options", href: "#services" },
                { name: "Direct Contact Card", href: "#business-card" },
                { name: "Free Quote Sheet", href: "#contact" }
              ].map(item => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-bone/70 hover:text-clay transition-colors inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Agent Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <div className="space-y-3 text-sm font-light text-bone/80">
              <div>
                <p className="font-serif text-lg font-bold text-bone">Jaxson Denton</p>
                <p className="text-xs uppercase font-medium text-bone/50 tracking-wider">
                  Independent Insurance Agent
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-clay shrink-0" />
                <a href="tel:9493970449" className="hover:text-clay transition-colors font-medium">
                  (949) 397-0449
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-clay shrink-0" />
                <a href="mailto:jaxson@crgia.com" className="hover:text-clay transition-colors font-medium">
                  jaxson@crgia.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-clay shrink-0" />
                <a 
                  href="https://dentoninsurance.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-clay transition-colors font-medium"
                >
                  dentoninsurance.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#2E221B] flex justify-center items-center text-center">
          <p className="text-xs text-bone/40 font-light tracking-wide leading-relaxed">
            Licensed Independent Insurance Agent in Texas & Louisiana • Proud Producer of CRG Insurance Agency (CRGIA)
          </p>
        </div>
      </div>
    </footer>
  );
}
