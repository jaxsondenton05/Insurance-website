import { motion } from "motion/react";
import { ShieldCheck, Target, Award } from "lucide-react";

export default function About() {
  return (
    <section className="py-24 bg-obsidian text-bone overflow-hidden" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center md:text-left">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 italic uppercase leading-tight">
                Your <span className="text-clay">Partner</span> In Protection
              </h2>
            </div>
            
            <div className="space-y-8 text-lg text-bone/70 font-light leading-relaxed italic">
              <p>
                I'm <span className="text-bone font-medium">Jaxson Denton</span> — a licensed independent insurance agent based right here in Texas. Being independent means I don't work for one insurance company — <span className="text-clay font-medium italic">I work for you.</span>
              </p>
              
              <p>
                I shop the market across multiple top-rated carriers to find the coverage that actually fits your life, your property, and your budget. No sales pressure, no one-size-fits-all policies — just honest guidance from someone who understands what it means to build something worth protecting in the Lone Star State.
              </p>
              
              <p>
                Whether you're insuring your first home, your growing business, or your family's future, I'm here to make the process straightforward and personal.
              </p>
            </div>

            <div className="pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 italic">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center text-clay shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-bone mb-1">Unbiased Advocacy</h4>
                  <p className="text-xs text-bone/40 leading-relaxed">Access to dozens of top-rated carriers for the best fit.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center text-clay shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-bone mb-1">Personalized Support</h4>
                  <p className="text-xs text-bone/40 leading-relaxed">Direct access to me whenever you need guidance.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
