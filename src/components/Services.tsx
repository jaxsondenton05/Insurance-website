import { motion } from "motion/react";
import { Home as HomeIcon, Car, Building2 } from "lucide-react";

const services = [
  {
    title: "Residential",
    icon: <HomeIcon className="w-6 h-6" />,
    description: "Protecting where your life happens. I shop multiple carriers to find coverage that secures your home, belongings, and peace of mind.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
  },
  {
    title: "Automotive",
    icon: <Car className="w-6 h-6" />,
    description: "Driving with you in mind. As an independent agent, I work for you—not the carrier—to find the best auto coverage for your family and your budget.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070"
  },
  {
    title: "Commercial",
    icon: <Building2 className="w-6 h-6" />,
    description: "Building resilience for your business. I provide comprehensive commercial solutions for auto, liability, and property that let you focus on growth.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-white text-obsidian" id="services">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 italic">
              SOLUTIONS <span className="text-clay">TAILORED</span> FOR YOU
            </h2>
            <p className="text-xl text-neutral-500 font-light leading-relaxed">
              I shop the market to find the best fit for your unique needs. Personalized insurance solutions built around your life and goals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full bg-bone rounded-sm overflow-hidden"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    service.title === "Automotive" 
                      ? "scale-110 group-hover:scale-125" 
                      : "group-hover:scale-110"
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 p-3 bg-white text-clay">
                  {service.icon}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col text-center">
                <p className="text-neutral-600 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
