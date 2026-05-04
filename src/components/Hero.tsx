import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative h-screen min-h-[700px] flex items-center overflow-hidden" id="hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=2070" 
          alt="Texas Highway"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-block px-3 py-1 bg-clay/20 text-clay text-[10px] font-bold uppercase tracking-[0.3em] mb-6 rounded-sm border border-clay/30">
            Independent Agent • Texas
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-bone leading-[0.9] tracking-tighter mb-8 italic">
            YOUR AGENT.<br />
            <span className="text-clay">YOUR COVERAGE.</span>
          </h1>
          <p className="text-lg md:text-xl text-bone/60 leading-relaxed mb-10 max-w-xl font-light">
            Providing specialized protection for your home, vehicles, and business assets across the Lone Star State.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-clay text-bone font-bold uppercase tracking-widest hover:bg-bone hover:text-obsidian transition-all duration-500 rounded-sm"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 border border-bone/20 text-bone font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-300 rounded-sm"
            >
              Explore Solutions
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative side text */}
      <div className="absolute bottom-12 right-12 hidden lg:block opacity-20 rotate-90 origin-bottom-right">
        <span className="text-xs font-bold tracking-[1em] text-bone uppercase">ESTABLISHED MMXXIV</span>
      </div>
    </header>
  );
}
