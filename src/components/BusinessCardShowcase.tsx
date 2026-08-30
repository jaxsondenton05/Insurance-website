import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  CreditCard, 
  FileText, 
  PhoneCall, 
  Scale, 
  CheckCircle2, 
  ArrowRight,
  Phone, 
  Mail, 
  Globe, 
  Copy, 
  Check, 
  ShieldAlert,
  Fingerprint
} from 'lucide-react';
import { ShieldCheckLogoIcon } from './Logo';

export default function BusinessCardShowcase() {
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
      desc: "We will never sell, rent, or distribute your personal details. Denton Insurance uses your information solely to: (1) calculate the quote you requested, (2) contact you regarding your quote or policy, and (3) send policy renewal reminders and updates with your consent."
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
              Our Five Ironclad Guarantees
            </h3>
            <p className="text-bone/70 text-sm sm:text-base font-light mt-1">
              Here is how we use and protect your personal information:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((item, idx) => {
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
                    <span>Guaranteed by Denton Insurance</span>
                  </div>
                </div>
              );
            })}

            {/* Quick Underwriting Checklist Card */}
            <div className="bg-gradient-to-br from-[#1E1712] to-[#140E0B] border border-[#3E2E25] rounded-xl p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-clay" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-bone">
                    Keep in Mind
                  </span>
                </div>
                <p className="text-xs text-bone/60 mb-3 font-light leading-relaxed">
                  Accurate carrier rating requires these essential verification records:
                </p>
                <ul className="space-y-1.5 text-xs text-bone/80 font-light">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                    <span>Full Legal Name & Date of Birth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                    <span>Phone, Email & Residential Address</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                    <span>Driver's License Number</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                    <span>Social Security # (Soft-pull only)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                    <span>Current Policy Declarations Page (if applicable)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10">
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-clay hover:underline"
                >
                  <span>Ready to start? Fill out the quote sheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Digital Card Verification (Interactive dark/light card) */}
        <div className="max-w-3xl mx-auto text-center pt-8 border-t border-[#2E221B]">
          <div className="mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bone">
              Contact Me Directly
            </h3>
            <p className="text-bone/70 text-sm font-light mt-1">
              Save my digital card or contact me directly with any questions about your quote.
            </p>

            {/* Toggle pill buttons */}
            <div className="inline-flex items-center p-1.5 bg-[#120D0A] rounded-full border border-[#35271F] mt-5">
              <button
                onClick={() => setActiveSide('front')}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeSide === 'front'
                    ? 'bg-clay text-bone shadow-md shadow-clay/20'
                    : 'text-bone/60 hover:text-bone'
                }`}
              >
                digital card (dark)
              </button>
              <button
                onClick={() => setActiveSide('back')}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeSide === 'back'
                    ? 'bg-bone text-[#16110D] shadow-md'
                    : 'text-bone/60 hover:text-bone'
                }`}
              >
                digital card (light)
              </button>
            </div>
          </div>

          {/* Business Card Container */}
          <div className="max-w-2xl mx-auto text-left">
            <AnimatePresence mode="wait">
              {activeSide === 'front' ? (
                /* DARK DIGITAL CARD */
                <motion.div
                  key="front-card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative aspect-[16/9] min-h-[300px] sm:min-h-[340px] bg-[#16110D] rounded-xl sm:rounded-2xl p-6 sm:p-9 border border-[#35271F] shadow-2xl shadow-black/80 overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#E06A3B]/25 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#E06A3B]/20 rounded-full blur-3xl pointer-events-none" />

                  <div>
                    <div className="flex items-center gap-3.5">
                      <div className="text-clay">
                        <ShieldCheckLogoIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bone tracking-tight">
                        Denton Insurance
                      </h3>
                    </div>
                    <div className="w-14 h-1 bg-clay rounded-full mt-3" />
                  </div>

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
                /* LIGHT DIGITAL CARD */
                <motion.div
                  key="back-card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative aspect-[16/9] min-h-[300px] sm:min-h-[340px] bg-[#FAF7F2] text-[#16110D] rounded-xl sm:rounded-2xl p-6 sm:p-9 border border-[#E8E0D5] shadow-2xl shadow-black/40 overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2.5 sm:w-3 bg-clay" />

                  <svg
                    className="absolute right-0 top-0 bottom-0 h-full w-2/3 pointer-events-none opacity-40"
                    viewBox="0 0 400 300"
                    fill="none"
                  >
                    <circle cx="340" cy="80" r="140" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.25" />
                    <circle cx="340" cy="240" r="170" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.2" />
                    <circle cx="340" cy="240" r="100" stroke="#E06A3B" strokeWidth="1" strokeOpacity="0.15" />
                  </svg>

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
                    <div className="w-14 h-1 bg-clay rounded-full mt-3" />
                  </div>

                  <div className="pl-3 my-auto pt-4">
                    <h4 className="font-serif text-3xl sm:text-4xl font-bold text-[#16110D] tracking-tight">
                      Jaxson Denton
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#8C7E74] mt-1">
                      INDEPENDENT INSURANCE AGENT
                    </p>
                  </div>

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
              href="mailto:jaxson@crgia.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#241B15] text-bone font-semibold text-xs uppercase tracking-wider rounded-md hover:bg-[#35271F] transition-colors border border-[#35271F]"
            >
              <Mail className="w-4 h-4 text-clay" />
              Email jaxson@crgia.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
