import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Globe, Check, Copy, Shield, ShieldCheck, Sparkles } from 'lucide-react';
import { ShieldCheckLogoIcon } from './Logo';

export default function BusinessCardShowcase() {
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="py-20 bg-[#1A130E] relative overflow-hidden border-y border-[#35271F]" id="business-card">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E06A3B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E06A3B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-clay/15 text-clay text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full border border-clay/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Direct Agent Access
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bone tracking-tight mb-3">
            No Call Centers. <span className="text-clay italic">Just Talk to Me.</span>
          </h2>
          <p className="text-bone/70 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            I don't hide behind 1-800 phone menus. Save my card or tap below to call, text, or email directly.
          </p>

          {/* Toggle pill buttons */}
          <div className="inline-flex items-center p-1.5 bg-[#120D0A] rounded-full border border-[#35271F] mt-6">
            <button
              onClick={() => setActiveSide('front')}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeSide === 'front'
                  ? 'bg-clay text-bone shadow-md shadow-clay/20'
                  : 'text-bone/60 hover:text-bone'
              }`}
            >
              digital business card (dark)
            </button>
            <button
              onClick={() => setActiveSide('back')}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeSide === 'back'
                  ? 'bg-bone text-[#16110D] shadow-md'
                  : 'text-bone/60 hover:text-bone'
              }`}
            >
              digital business card (light)
            </button>
          </div>
        </div>

        {/* Business Card Container */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {activeSide === 'front' ? (
              /* ================= DARK BUSINESS CARD (IMG_0209) ================= */
              <motion.div
                key="front-card"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative aspect-[16/9] min-h-[300px] sm:min-h-[350px] bg-[#16110D] rounded-xl sm:rounded-2xl p-6 sm:p-9 border border-[#35271F] shadow-2xl shadow-black/80 overflow-hidden flex flex-col justify-between"
              >
                {/* Authentic Ambient Corner Glows */}
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#E06A3B]/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#E06A3B]/20 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header: Shield Logo + Denton Insurance */}
                <div>
                  <div className="flex items-center gap-3.5">
                    <div className="text-clay">
                      <ShieldCheckLogoIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bone tracking-tight">
                      Denton Insurance
                    </h3>
                  </div>
                  {/* Terracotta Horizontal Line */}
                  <div className="w-14 h-1 bg-clay rounded-full mt-3" />
                </div>

                {/* Card Body: Contact Items */}
                <div className="space-y-3 my-auto pt-3">
                  {/* Phone */}
                  <div className="flex items-center justify-between group">
                    <a
                      href="tel:9493970449"
                      className="flex items-center gap-3.5 text-bone/90 hover:text-clay transition-colors text-sm sm:text-base font-medium"
                    >
                      <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-clay shrink-0" />
                      <span>949-397-0449</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard('949-397-0449', 'phone')}
                      className="p-1.5 text-bone/40 hover:text-clay transition-colors"
                      title="Copy phone"
                      aria-label="Copy phone number"
                    >
                      {copiedField === 'phone' ? (
                        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Copied
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between group">
                    <a
                      href="mailto:jaxson@crgia.com"
                      className="flex items-center gap-3.5 text-bone/90 hover:text-clay transition-colors text-sm sm:text-base font-medium"
                    >
                      <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-clay shrink-0" />
                      <span>jaxson@crgia.com</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard('jaxson@crgia.com', 'email')}
                      className="p-1.5 text-bone/40 hover:text-clay transition-colors"
                      title="Copy email"
                      aria-label="Copy email address"
                    >
                      {copiedField === 'email' ? (
                        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Copied
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Website */}
                  <div className="flex items-center justify-between group">
                    <a
                      href="https://dentoninsurance.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 text-bone/90 hover:text-clay transition-colors text-sm sm:text-base font-medium"
                    >
                      <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-clay shrink-0" />
                      <span>dentoninsurance.org</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard('dentoninsurance.org', 'web')}
                      className="p-1.5 text-bone/40 hover:text-clay transition-colors"
                      title="Copy web address"
                      aria-label="Copy website URL"
                    >
                      {copiedField === 'web' ? (
                        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Copied
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Footer: AUTO / HOME / BUSINESS Pills & CRGIA Affiliation */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-clay/60 text-clay bg-clay/5">
                      AUTO
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-clay/60 text-clay bg-clay/5">
                      HOME
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-clay/60 text-clay bg-clay/5">
                      BUSINESS
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-bone/50 tracking-wider">
                    A part of CRGIA
                  </span>
                </div>
              </motion.div>
            ) : (
              /* ================= LIGHT BUSINESS CARD (IMG_0210) ================= */
              <motion.div
                key="back-card"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative aspect-[16/9] min-h-[300px] sm:min-h-[350px] bg-[#FAF7F2] text-[#16110D] rounded-xl sm:rounded-2xl p-6 sm:p-9 border border-[#E8E0D5] shadow-2xl shadow-black/40 overflow-hidden flex flex-col justify-between"
              >
                {/* Left Terracotta Vertical Stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-2.5 sm:w-3 bg-clay" />

                {/* Concentric Rings Watermark */}
                <svg
                  className="absolute right-0 top-0 bottom-0 h-full w-2/3 pointer-events-none opacity-40"
                  viewBox="0 0 400 300"
                  fill="none"
                >
                  <circle cx="340" cy="80" r="140" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.25" />
                  <circle cx="340" cy="240" r="170" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.2" />
                  <circle cx="340" cy="240" r="100" stroke="#E06A3B" strokeWidth="1" strokeOpacity="0.15" />
                </svg>

                {/* Header: Logo, Brand & Tagline */}
                <div className="pl-3">
                  <div className="flex items-center gap-3">
                    <div className="text-clay">
                      <ShieldCheckLogoIcon className="w-9 h-9 sm:w-11 sm:h-11" filled={false} />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16110D] tracking-tight leading-none">
                        Denton Insurance
                      </h3>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.26em] text-clay mt-1">
                        PROTECTION YOU CAN TRUST
                      </p>
                    </div>
                  </div>
                  {/* Terracotta Horizontal Line */}
                  <div className="w-14 h-1 bg-clay rounded-full mt-3" />
                </div>

                {/* Main Content: Jaxson Denton & Title */}
                <div className="pl-3 my-auto pt-4">
                  <h4 className="font-serif text-3xl sm:text-4xl font-bold text-[#16110D] tracking-tight">
                    Jaxson Denton
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#8C7E74] mt-1">
                    INDEPENDENT INSURANCE AGENT
                  </p>
                </div>

                {/* Footer details */}
                <div className="pl-3 pt-3 border-t border-[#E8E0D5] flex items-center justify-between text-xs text-[#8C7E74]">
                  <span className="font-medium">Texas & Louisiana • CRG Insurance Agency</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 font-semibold text-clay hover:underline"
                  >
                    Free Quote &rarr;
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick action buttons below card */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="tel:9493970449"
            className="inline-flex items-center gap-2 px-6 py-3 bg-clay text-bone font-semibold text-xs uppercase tracking-wider rounded-md hover:bg-clay-hover transition-colors shadow-lg shadow-clay/20"
          >
            <Phone className="w-4 h-4" />
            Call (949) 397-0449
          </a>
          <a
            href="mailto:jaxson@crgia.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#241B15] text-bone font-semibold text-xs uppercase tracking-wider rounded-md hover:bg-[#35271F] transition-colors border border-[#35271F]"
          >
            <Mail className="w-4 h-4 text-clay" />
            Email jaxson@crgia.com
          </a>
        </div>
      </div>
    </section>
  );
}
