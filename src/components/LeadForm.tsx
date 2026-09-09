import React from "react";
import { ShieldCheck, CheckCircle2, ShieldAlert } from "lucide-react";
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
            <p className="text-base sm:text-lg text-[#7A6E65] font-light max-w-xl mx-auto leading-relaxed mb-8">
              Fill out the quote sheet below! Once submitted, I'll contact you soon to continue the quoting process and get you set up with the carrier you want.
            </p>

            {/* Keep in Mind Information Box */}
            <div className="max-w-2xl mx-auto bg-white border border-[#E3D9CC] rounded-xl p-5 sm:p-6 shadow-sm text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-clay" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#16110D]">
                    Keep in Mind
                  </span>
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                  Soft-Pull Only • Zero Score Impact
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#7A6E65] font-light mb-3 leading-relaxed">
                Accurate carrier rating requires these essential verification records:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#16110D]/90">
                <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-2 rounded-lg border border-[#EBE4D8]">
                  <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                  <span>Full Legal Name & Date of Birth</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-2 rounded-lg border border-[#EBE4D8]">
                  <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                  <span>Phone, Email & Residential Address</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-2 rounded-lg border border-[#EBE4D8]">
                  <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                  <span>Driver's License Number</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-2 rounded-lg border border-[#EBE4D8]">
                  <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                  <span>Social Security # (Soft-pull only)</span>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2 bg-[#FAF7F2] px-3 py-2 rounded-lg border border-[#EBE4D8]">
                  <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                  <span>Current Policy Declarations Page (if applicable)</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-[#EAE3D9] flex items-start gap-2.5 text-xs text-[#5C5047] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                <p>
                  <strong className="font-semibold text-[#16110D]">You are not required to submit your SSN or Declarations Page upfront.</strong>{" "}
                  Our quote sheet is completely encrypted, and our usage of this data is verified, but you are welcome to provide what you are comfortable with and Jaxson will walk you through the rest when he reaches out to you!
                </p>
              </div>
            </div>
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
