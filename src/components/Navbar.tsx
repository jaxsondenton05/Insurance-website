import { motion } from "motion/react";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-white/10" id="navbar">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <span className="font-display font-bold text-xl tracking-tight text-bone uppercase">Quote</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {["Services", "About", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-bone/60 hover:text-clay transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2 bg-bone text-obsidian text-xs font-bold uppercase tracking-widest hover:bg-clay hover:text-bone transition-all duration-300 rounded-sm"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  );
}
