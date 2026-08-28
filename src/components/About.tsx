import React from "react";
import { motion } from "motion/react";
import { Sparkles, Phone, Mail, ArrowRight, ShieldCheck, HeartHandshake, Check } from "lucide-react";
import { ShieldCheckLogoIcon } from "./Logo";

export default function About() {
  return (
    <section className="py-20 bg-[#16110D] text-bone relative overflow-hidden border-t border-[#35271F]" id="about">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#E06A3B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E06A3B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow & Main Title */}
          <div className="text-left mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-clay/15 text-clay text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full border border-clay/30 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              The Honest Story
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bone tracking-tight mb-3">
              I Entered the Industry to Solve <span className="italic text-clay">Real-World Problems</span>
            </h2>
            <div className="w-16 h-1 bg-clay rounded-full mb-4" />
          </div>

          {/* The Story Section: Short, rhythmic, easy-to-read paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6 text-base sm:text-lg text-bone/85 font-light leading-relaxed"
          >
            <p className="font-serif text-xl sm:text-2xl text-bone font-medium">
              Hi! My name is Jaxson Denton.
            </p>

            <p>
              Those of you who know me know that I love cars, am enrolled in college, working full-time, and that I'm starting my own insurance business at 20 years old.
            </p>

            <p>
              Yup, you read that right. 20 years old. Pretty young for this industry.
            </p>

            <p>
              I'm also young enough to have entered the adult world being smacked in the face by three realities:
            </p>

            {/* 3 Realities Box */}
            <div className="my-6 p-6 rounded-xl bg-[#1E1712] border border-[#35271F] space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-clay/20 text-clay font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Living in the 2020s is expensive.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-clay/20 text-clay font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Car insurance is legally required unless you want to get sued down to your skivvies.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-clay/20 text-clay font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>Young drivers pay more for car insurance than almost any other demographic.</span>
              </div>
            </div>

            <p>
              By the time I was paying my own car insurance, my monthly payment was <strong className="text-clay font-medium">$175 more</strong> than my then-fiancé's.
            </p>

            <p>
              And I thought that was pretty ridiculous.
            </p>

            <p>
              How was a guy like me supposed to pay off an engagement ring when car insurance was cutting 10% out of every single paycheck?
            </p>

            <p>
              So I started learning everything I could about insurance.
            </p>

            <p>
              I bought a course, built a rigorous study plan between work shifts, and earned my Texas and Louisiana Property and Casualty licenses so I could help people on a budget.
            </p>

            {/* Results Callout */}
            <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-[#241B15] to-[#1A130E] border border-clay/40 space-y-4">
              <div className="flex items-center gap-2 text-clay text-xs uppercase font-bold tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Real Results
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-lg bg-[#140E0A] border border-white/5">
                  <div className="text-2xl font-serif font-bold text-clay mb-1">$1,000 Saved</div>
                  <p className="text-xs text-bone/70">
                    Saved my in-laws $1,000 on their car insurance policy.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#140E0A] border border-white/5">
                  <div className="text-2xl font-serif font-bold text-clay mb-1">$108 / Month</div>
                  <p className="text-xs text-bone/70">
                    Got my coworker's monthly auto payment down to $108.
                  </p>
                </div>
              </div>
            </div>

            <p>
              See, rate cuts keep happening when I'm around.
            </p>

            <p className="italic text-bone">
              Coincidence? Nope. Just honest work.
            </p>

            <p>
              I do free quotes. Fill out my quote sheet. Let me shop the market for you to make sure you aren't over-paying for your car insurance. Or home insurance. Or both. (Bundles are great).
            </p>

            <p>
              And the best part? You lose nothing! Again, <strong className="text-clay font-medium">100% FREE quotes</strong>.
            </p>

            {/* The Independent Advantage */}
            <div className="my-8 p-6 rounded-xl bg-[#1E1712] border border-[#35271F] space-y-4">
              <h3 className="font-serif text-xl font-bold text-bone">
                Why An Independent Agent Is Different
              </h3>

              <div className="space-y-3 text-sm text-bone/80">
                <p>
                  Big carrier agents get paid more when you buy more expensive policies from their single brand.
                </p>
                <p>
                  But me? My agency is independent. The only way we succeed is if you are genuinely happy with your rate and policy.
                </p>
                <p>
                  If a carrier isn't giving you the cheap rate you want, I show you other options. If I find you a better price, we both win.
                </p>
                <p>
                  And before your policy ends, I'll check the market again so you keep saving.
                </p>
              </div>
            </div>

            <p>
              Want the cheapest state-minimums to keep you street-legal? I gotchu.
            </p>

            <p>
              Want to do your own rate shopping? That's cool too. I respect a savvy spender.
            </p>

            <p>
              Just know that I am authorized to pull dozens of accurate rates for you in a fraction of the time, with none of the corporate runaround.
            </p>

            <p className="font-serif text-xl sm:text-2xl text-bone font-medium pt-2">
              Let's go save you some money.
            </p>

            <div className="pt-2">
              <p className="font-serif text-xl font-bold text-clay">- Jaxson Denton</p>
              <p className="text-xs uppercase tracking-widest text-bone/50">Independent Insurance Agent • Texas & Louisiana</p>
            </div>

            {/* Quick Action */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-clay text-bone font-bold text-xs uppercase tracking-widest hover:bg-clay-hover transition-all duration-200 rounded-md shadow-lg shadow-clay/20"
              >
                <span>Request Your Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:9493970449"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#35271F] bg-[#1E1712] text-bone font-semibold text-xs uppercase tracking-widest hover:bg-[#2A2019] transition-colors rounded-md"
              >
                <Phone className="w-4 h-4 text-clay" />
                <span>(949) 397-0449</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
