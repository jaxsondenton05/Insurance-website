import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import BusinessCardShowcase from "../components/BusinessCardShowcase";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";
import { motion, useScroll, useSpring } from "motion/react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative bg-[#16110D] text-bone font-sans min-h-screen">
      {/* Scroll Progress Bar in Terracotta Accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-clay origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <Hero />
      <About />
      <Services />
      <BusinessCardShowcase />
      <LeadForm />
      <Footer />

      {/* Subtle architectural vertical grid lines for ultra-wide displays */}
      <div className="fixed left-6 top-0 bottom-0 w-px bg-white/5 pointer-events-none hidden 2xl:block z-40" />
      <div className="fixed right-6 top-0 bottom-0 w-px bg-white/5 pointer-events-none hidden 2xl:block z-40" />
    </main>
  );
}
