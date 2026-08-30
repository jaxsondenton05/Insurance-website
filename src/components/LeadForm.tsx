import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import JotFormEmbed from "./JotFormEmbed";

export default function LeadForm() {
  return (
    <section className="py-20 bg-[#FAF7F2] text-[#16110D] relative overflow-hidden" id="contact">
      {/* Subtle Concentric Rings Watermark (Matching Light Card) */}
      <svg
        className="absolute left-0 bottom-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle cx="100" cy="400" r="300" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.25" />
        <circle cx="100" cy="400" r="200" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.2" />
        <circle cx="100" cy="400" r="100" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.15" />
      </svg>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-clay/10 text-clay text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full border border-clay/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Free • No Obligation
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#16110D] tracking-tight mb-4">
              Let's Go Save You Some <span className="italic text-clay">Money</span>
            </h2>
            <p className="text-base sm:text-lg text-[#7A6E65] font-light max-w-xl mx-auto leading-relaxed">
              Fill out the quote sheet below! Once submitted, I'll contact you soon to continue the quoting process and get you set up with the carrier you want.
            </p>
          </div>

          {/* Secure Form Wrapper */}
          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-[#E8E0D5] p-4 sm:p-7 md:p-9 relative overflow-hidden">
            {/* Left Terracotta Accent Stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-clay" />

            {/* Reassurance Banner */}
            <div className="mb-5 pb-3.5 border-b border-[#E8E0D5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#7A6E65]">
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Confidential & Secure</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                Directly reviewed by Jaxson Denton
              </span>
            </div>

            <JotFormEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
