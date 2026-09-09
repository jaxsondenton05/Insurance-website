import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import GoogleReviews from "../components/GoogleReviews";
import Footer from "../components/Footer";
import BusinessCardShowcase from "../components/BusinessCardShowcase";
import { motion, useScroll, useSpring } from "motion/react";

export default function ReviewsPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative bg-[#16110D] text-bone font-sans min-h-screen">
      {/* Scroll Progress Bar in Terracotta Accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-clay origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <div className="pt-20">
        <GoogleReviews isStandalone={true} />
        <BusinessCardShowcase />
      </div>

      <Footer />
    </main>
  );
}
