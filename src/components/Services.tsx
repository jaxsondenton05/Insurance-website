import React from "react";
import { motion } from "motion/react";
import { Home as HomeIcon, Car, Building2, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

const services = [
  {
    id: "auto",
    badge: "AUTO",
    title: "Car Insurance",
    icon: <Car className="w-6 h-6" />,
    description: "I love cars, and I hate overpaying for them. Whether you just need cheap state minimums or full collision & comprehensive, I'll shop the market to get you the lowest rate.",
    highlights: [
      "Young driver & good student savings",
      "Cheapest state-minimum options",
      "Full collision & comprehensive",
      "Roadside assistance & rental coverage"
    ],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070"
  },
  {
    id: "home",
    badge: "HOME",
    title: "Home & Renters",
    icon: <HomeIcon className="w-6 h-6" />,
    description: "Texas and Louisiana weather doesn't mess around. I make sure your house, roof, and belongings are covered against storms and unexpected accidents without pushing useless add-ons.",
    highlights: [
      "Dwelling & roof replacement",
      "Personal property & theft protection",
      "Renters & apartment policies",
      "Home + Auto bundle discounts"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
  },
  {
    id: "business",
    badge: "BUSINESS",
    title: "Commercial & Business",
    icon: <Building2 className="w-6 h-6" />,
    description: "I help self-starters and commercial business owners in Texas and Louisiana find rates for vehicle, property, and general liability policies quickly and efficiently.",
    highlights: [
      "General Liability & Business Owner's Policies",
      "Commercial work vehicles & fleet",
      "Tools, equipment & inland marine",
      "Custom coverage for your budget"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-[#FAF7F2] text-[#16110D] relative overflow-hidden" id="services">
      {/* Decorative concentric rings (matching business card) */}
      <svg
        className="absolute right-0 top-12 w-96 h-96 pointer-events-none opacity-30"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.3" />
        <circle cx="200" cy="200" r="120" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.25" />
        <circle cx="200" cy="200" r="60" stroke="#E06A3B" strokeWidth="1.5" strokeOpacity="0.2" />
      </svg>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-clay/10 text-clay text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full border border-clay/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            What I Shop For You
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#16110D] tracking-tight mb-3">
            Coverage and Pricing <span className="italic text-clay">You Want</span>
          </h2>
          <div className="w-16 h-1 bg-clay rounded-full mb-4" />
          <p className="text-base sm:text-lg text-[#7A6E65] font-light leading-relaxed">
            Tell me what you need and what budget you want to hit and I'll find a carrier that matches.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full bg-white rounded-xl border border-[#E8E0D5] shadow-md hover:shadow-xl hover:border-clay/40 transition-all duration-300 overflow-hidden"
            >
              {/* Card Image Header with Badge */}
              <div className="aspect-[16/10] relative overflow-hidden bg-[#1E1712]">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  data-search-disable="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-auto" />
                
                {/* Badge from business card */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-clay text-bone text-[11px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    {service.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 p-2.5 bg-white/90 backdrop-blur-sm text-clay rounded-lg shadow">
                  {service.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#16110D] tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#7A6E65] leading-relaxed mb-5 font-light">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-[#E8E0D5]">
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#2D241E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-clay shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#FAF7F2] text-[#16110D] group-hover:bg-clay group-hover:text-bone text-xs font-bold uppercase tracking-wider rounded-md border border-[#E8E0D5] group-hover:border-clay transition-all duration-200 mt-2"
                >
                  <span>Start {service.badge} on Quote Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bundle Note */}
        <div className="mt-12 p-6 sm:p-7 rounded-xl bg-white border border-[#E8E0D5] max-w-2xl mx-auto text-center shadow-sm">
          <p className="font-serif text-lg sm:text-xl font-bold text-[#16110D] mb-1">
            Need Auto + Home Together?
          </p>
          <p className="text-xs sm:text-sm text-[#7A6E65] mb-4 font-light">
            Bundling can unlock major discounts!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-clay hover:bg-clay-hover text-bone rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-[1.02]"
          >
            <span>Go to Quote Sheet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
