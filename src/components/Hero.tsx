import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck } from "lucide-react";
import heroBg from "../assets/images/professional_hero_bg_1780265987302.png";
import jaxHeadshot from "../assets/images/jax_headshot.png";

export default function Hero() {
  return (
    <header className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-[#16110D]" id="hero">

      {/* Background Image with Warm Espresso Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Professional Architecture"
          className="w-full h-full object-cover opacity-55 filter brightness-90 contrast-105 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Gradients tailored to highlight the architecture while preserving high-contrast text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#16110D]/95 via-[#16110D]/75 to-[#16110D]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16110D] via-[#16110D]/30 to-transparent" />
        {/* Ambient Corner Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E06A3B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E06A3B]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Eyebrow Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E06A3B]/15 border border-[#E06A3B]/30 rounded-full mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-clay" />
              <span className="text-clay text-[11px] font-semibold uppercase tracking-[0.24em]">
                100% Free Quotes • Zero Pushy Sales
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-bone leading-[1.08] tracking-tight mb-5">
              Tired of Over-Paying <br />
              <span className="italic text-clay">For Your Car & Home</span> <br />
              Insurance?
            </h1>

            {/* Signature Terracotta Horizontal Accent Bar */}
            <div className="w-16 h-1 bg-clay rounded-full mb-5" />

            {/* Short, punchy conversational intro */}
            <div className="space-y-3 text-base sm:text-lg text-bone/80 font-light leading-relaxed max-w-xl mb-6">
              <p>
                Hi, I'm <strong className="text-bone font-medium">Jaxson Denton</strong>.
              </p>
              <p>
                I'm an independent insurance agent serving Texas and Louisiana, and I help people find real, honest savings on their insurance without the confusing sales jargon.
              </p>
              <p className="text-sm sm:text-base text-bone/70">
                Because I'm independent, I don't work for one single insurance company. I compare dozens of top-rated carriers so you get the best price for your budget.
              </p>
            </div>

            {/* Core Coverage Pillars from Business Card */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-semibold text-bone/50 uppercase tracking-widest mr-1">
                Coverage:
              </span>
              {["AUTO", "HOME", "BUSINESS"].map((line) => (
                <a
                  key={line}
                  href="#services"
                  className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-clay/50 text-clay bg-clay/5 hover:bg-clay hover:text-bone transition-all duration-200"
                >
                  {line}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <a 
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-clay text-bone font-bold text-xs uppercase tracking-widest hover:bg-clay-hover transition-all duration-200 rounded-md shadow-lg shadow-clay/20"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="tel:9493970449"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-[#35271F] bg-[#1E1712]/80 text-bone font-semibold text-xs uppercase tracking-widest hover:bg-[#2A2019] hover:border-clay/40 transition-all duration-200 rounded-md"
              >
                <Phone className="w-4 h-4 text-clay" />
                <span>Call or Text (949) 397-0449</span>
              </a>
            </div>

            {/* Micro reassurance badges */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-bone/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-clay" /> Free, no-obligation quotes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-clay" /> No spam calls
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-clay" /> Licensed in Texas & Louisiana
              </span>
            </div>
          </motion.div>

          {/* Hero Side Column: Professional Headshot */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Warm Ambient Glow Behind Portrait */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-clay/30 via-clay/10 to-transparent rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
                {/* Framed Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#3E2E25] bg-[#1E1712] shadow-2xl">
                {/* Image Container with Custom Zoom and Crop Positioning */}
                <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px] overflow-hidden bg-[#16110D]">
                  <img
                    src={jaxHeadshot}
                    alt="Jaxson Denton - Licensed Independent Insurance Agent"
                    className="w-full h-full object-cover"
                    style={{
                      transform: "scale(1.25)",
                      transformOrigin: "50% 20%",
                      objectPosition: "50% 20%",
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Subtle Gradient Shadow at the bottom of the photo */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#140E0A] via-[#140E0A]/60 to-transparent pointer-events-none" />

                {/* Agent Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#1A130F]/90 backdrop-blur-md border border-[#3E2E25] rounded-xl flex items-center justify-between shadow-lg">
                  <div>
                    <h4 className="font-serif text-base font-bold text-bone">Jaxson Denton</h4>
                    <p className="text-[11px] font-medium text-clay tracking-wide uppercase">
                      Independent Insurance Agent
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#E06A3B]/15 border border-[#E06A3B]/30 text-[10px] font-semibold text-clay uppercase tracking-wider">
                      TX & LA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
