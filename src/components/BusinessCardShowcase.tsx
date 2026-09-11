import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  CreditCard, 
  FileText, 
  PhoneCall, 
  Scale, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Check, 
  Fingerprint
} from 'lucide-react';
import { ShieldCheckLogoIcon } from './Logo';

export default function BusinessCardShowcase() {

  const guarantees = [
    {
      icon: UserCheck,
      title: "Info Exclusively Handled by Federally Vetted Agent",
      badge: "Federal Background Checked",
      desc: "All submitted records are encrypted and accessed solely by Jaxson Denton — a licensed Property and Casualty agent who has completed and passed a rigorous federal background check. Your information is never transferred to junior staff or third-party call centers."
    },
    {
      icon: Lock,
      title: "Zero Data Brokers",
      badge: "Zero Spam / Zero Selling",
      desc: "We will never sell, rent, or distribute your personal details. Denton Insurance, LLC uses your information solely to: (1) calculate the quote you requested, (2) contact you regarding your quote or policy, and (3) send policy renewal reminders and updates with your consent."
    },
    {
      icon: CreditCard,
      title: "Soft Credit Pulls Only",
      badge: "Zero Credit Score Impact",
      desc: "To deliver exact, locked-in pricing, carriers require verified identity details (full legal name, DOB, contact info, address, driver's license number, current declarations page, and SSN). Any credit check run by carriers is strictly a 'soft pull' that will never affect your credit score."
    },
    {
      icon: PhoneCall,
      title: "Submit SSN and Declarations Page at Your Pace",
      badge: "No Pressure Submission",
      desc: "You are not required to submit every piece of information upfront. Provide what you are comfortable with on the quote sheet, and Jaxson will reach out personally to walk through any remaining details needed to ensure full coverage accuracy."
    },
    {
      icon: Scale,
      title: "Our Commitment",
      badge: "Client Rights Protected",
      desc: "We take your privacy with the utmost gravity. You retain full consumer rights under state and federal law, and our confidentiality standards are legally binding. We treat your personal information with the same care we would our own."
    }
  ];

  return (
    <section 
      className="py-20 md:py-28 bg-[#18120D] text-bone relative overflow-hidden border-y border-[#35271F]" 
      id="privacy"
    >
      {/* Anchor target fallback for business-card */}
      <span id="business-card" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E06A3B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E06A3B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-clay/15 text-clay text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full border border-clay/30 mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Client Privacy & Data Protection Guarantee
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-bone tracking-tight mb-4 leading-tight">
            Your Data Goes From <span className="text-clay italic">You</span>, To <span className="text-clay italic">Me</span>, <br className="hidden sm:inline" />
            To My Quoting System.
          </h2>
          <div className="w-20 h-1 bg-clay rounded-full mx-auto mb-6" />
          <p className="text-bone/80 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Third party corporations will never get your sensitive information from me. I am an independent, licensed agent, and I protect your records like my own.
          </p>
        </div>

        {/* Visual Data Flow Pipeline: Transparent & Direct */}
        <div className="max-w-5xl mx-auto mb-16 bg-[#130E0A] border border-[#35271F] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-bone">
              How the Process Works
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-[#1E1712] border border-[#3E2E25] rounded-xl p-5 text-center flex flex-col items-center justify-between relative group hover:border-clay/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-clay/15 border border-clay/30 flex items-center justify-center text-clay mb-3">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-clay">Step 01</span>
                <h4 className="font-semibold text-sm text-bone mt-1 mb-1.5">You Provide Details</h4>
                <p className="text-xs text-bone/60 leading-relaxed font-light">
                  Direct submission via our secure, encrypted quote sheet.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 w-full text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> 256-Bit Encrypted
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1E1712] border border-[#3E2E25] rounded-xl p-5 text-center flex flex-col items-center justify-between relative group hover:border-clay/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-clay/15 border border-clay/30 flex items-center justify-center text-clay mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-clay">Step 02</span>
                <h4 className="font-semibold text-sm text-bone mt-1 mb-1.5">I Contact You</h4>
                <p className="text-xs text-bone/60 leading-relaxed font-light">
                  Direct reach out to discuss your specific needs and timeline.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 w-full text-[11px] text-clay font-medium flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Direct Agent Contact
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1E1712] border border-[#3E2E25] rounded-xl p-5 text-center flex flex-col items-center justify-between relative group hover:border-clay/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-clay/15 border border-clay/30 flex items-center justify-center text-clay mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-clay">Step 03</span>
                <h4 className="font-semibold text-sm text-bone mt-1 mb-1.5">Info Goes into Quoting System</h4>
                <p className="text-xs text-bone/60 leading-relaxed font-light">
                  I personally enter your info into my licensed carrier rating engine.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 w-full text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Soft Pull Only
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#1E1712] border border-[#3E2E25] rounded-xl p-5 text-center flex flex-col items-center justify-between relative group hover:border-clay/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-clay/15 border border-clay/30 flex items-center justify-center text-clay mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-clay">Step 04</span>
                <h4 className="font-semibold text-sm text-bone mt-1 mb-1.5">We Choose Your Preferred Rate & Carrier Together</h4>
                <p className="text-xs text-bone/60 leading-relaxed font-light">
                  I walk you through the options transparently so you can pick the right fit.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 w-full text-[11px] text-clay font-medium flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Tailored Choice
              </div>
            </div>

            {/* Step 5 (Centered on its own line below) */}
            <div className="sm:col-span-2 lg:col-span-4 w-full max-w-sm mx-auto bg-[#1E1712] border border-clay/40 rounded-xl p-5 text-center flex flex-col items-center justify-between relative shadow-lg shadow-clay/10">
              <div className="w-10 h-10 rounded-full bg-clay text-bone flex items-center justify-center mb-3">
                <ShieldCheckLogoIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-clay">Step 05</span>
                <h4 className="font-semibold text-sm text-bone mt-1 mb-1.5">I Get You Set Up with Your New Carrier</h4>
                <p className="text-xs text-bone/70 leading-relaxed font-light">
                  Seamless policy activation with your new carrier.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 w-full text-[11px] text-clay font-semibold flex items-center justify-center gap-1">
                <Check className="w-3 h-3" /> Policy Active
              </div>
            </div>
          </div>
        </div>

        {/* Core Guarantees Grid (Based directly on the legal disclosure) */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-left mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bone tracking-tight">
              Client Privacy and Trust
            </h3>
            <p className="text-bone/70 text-sm sm:text-base font-light mt-1">
              Here is how we use and protect your personal information:
            </p>
          </div>

          {/* Core Guarantees in balanced 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {guarantees.slice(0, 4).map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#150F0B] border border-[#35271F] rounded-xl p-6 flex flex-col justify-between hover:border-clay/40 transition-all duration-300 shadow-lg group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-clay/10 border border-clay/20 flex items-center justify-center text-clay group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-clay bg-clay/10 border border-clay/20 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-bone mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-bone/70 text-xs sm:text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Guaranteed by Denton Insurance, LLC</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered "Our Commitment" Square */}
          {guarantees[4] && (() => {
            const item = guarantees[4];
            const IconComponent = item.icon;
            return (
              <div className="flex justify-center">
                <div className="w-full md:max-w-[calc(50%-12px)] bg-[#150F0B] border border-[#35271F] rounded-xl p-6 flex flex-col justify-between hover:border-clay/40 transition-all duration-300 shadow-lg group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-clay/10 border border-clay/20 flex items-center justify-center text-clay group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-clay bg-clay/10 border border-clay/20 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-bone mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-bone/70 text-xs sm:text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Guaranteed by Denton Insurance, LLC</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Contact Me Directly Section */}
        <div className="max-w-3xl mx-auto text-center pt-10 border-t border-[#2E221B]">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bone">
              Contact Me Directly
            </h3>
            <p className="text-bone/70 text-sm font-light mt-2 max-w-lg mx-auto">
              Have questions about your coverage or want to discuss quotes one-on-one? Reach out directly via phone or email.
            </p>
          </div>

          {/* Direct action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="tel:9493970449"
              className="inline-flex items-center gap-2 px-6 py-3 bg-clay text-bone font-semibold text-xs uppercase tracking-wider rounded-md hover:bg-clay-hover transition-colors shadow-lg shadow-clay/20"
            >
              <Phone className="w-4 h-4" />
              Call (949) 397-0449
            </a>
            <a
              href="mailto:jaxson@dentoninsurance.org"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#241B15] text-bone font-semibold text-xs uppercase tracking-wider rounded-md hover:bg-[#35271F] transition-colors border border-[#35271F]"
            >
              <Mail className="w-4 h-4 text-clay" />
              Email jaxson@dentoninsurance.org
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
