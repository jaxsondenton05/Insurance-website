import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";
import { motion, useScroll, useSpring } from "motion/react";
import { testConnection } from "../services/quoteService";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <main className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-clay origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <Hero />
      
      <div className="relative">
        <div className="absolute inset-0 bg-obsidian z-[-1]" />
        <Services />
        <About />
        <LeadForm />
      </div>

      <Footer />

      {/* Decorative vertical line */}
      <div className="fixed left-6 top-0 bottom-0 w-px bg-white/5 hidden xl:block" />
      <div className="fixed right-6 top-0 bottom-0 w-px bg-white/5 hidden xl:block" />
    </main>
  );
}
