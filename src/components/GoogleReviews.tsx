import React, { useState, useEffect, useRef } from "react";
import { 
  Star, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  PenSquare,
  ExternalLink,
  Play,
  Pause
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ReviewScreenshot, 
  getAllScreenshots 
} from "../utils/reviewStorage";

interface GoogleReviewsProps {
  id?: string;
  isStandalone?: boolean;
}

export default function GoogleReviews({ id = "reviews", isStandalone = false }: GoogleReviewsProps) {
  const [screenshots, setScreenshots] = useState<ReviewScreenshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Load screenshots from storage
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await getAllScreenshots();
        setScreenshots(data);
      } catch (err) {
        console.error("Failed to load screenshots", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => 
          prev !== null && prev < screenshots.length - 1 ? prev + 1 : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => 
          prev !== null && prev > 0 ? prev - 1 : screenshots.length - 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, screenshots.length]);

  // Construct duplicated items array for a seamless infinite loop sliding left to right
  const uniqueCount = screenshots.length;
  // Duplicate base items so each set has at least 5 items, then double it for [Set A, Set B]
  const repeatFactor = uniqueCount > 0 ? Math.max(2, Math.ceil(5 / uniqueCount)) : 1;
  const singleSet = uniqueCount > 0 ? Array(repeatFactor).fill(screenshots).flat() : [];
  const displayItems = uniqueCount > 0 ? [...singleSet, ...singleSet] : [];

  // Duration scales comfortably with number of items - much slower and gentler glide
  const animDuration = Math.max(75, singleSet.length * 16);

  // Manual nudge scroll functions
  const handleNudge = (direction: "left" | "right") => {
    if (carouselContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      carouselContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section 
      id={id} 
      className={`relative bg-[#16110D] text-bone border-b border-[#35271F] overflow-hidden ${
        isStandalone ? "py-24" : "py-12 sm:py-16"
      }`}
    >
      <style>{`
        @keyframes slideLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-carousel-slide {
          animation: slideLeftToRight ${animDuration}s linear infinite;
        }
        .animate-carousel-slide:hover,
        .carousel-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-clay/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 mb-8 sm:mb-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Google Badge Header */}
          <div className="text-center max-w-3xl mx-auto">
            {/* Small "Reviews" Label */}
            <div className="flex items-center justify-center gap-2 mb-2.5">
              <span className="w-5 h-px bg-clay/50" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-clay">
                Reviews
              </span>
              <span className="w-5 h-px bg-clay/50" />
            </div>

            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1E1712] border border-[#35271F] shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                />
              </svg>
              <span className="text-xs font-semibold text-bone/90 uppercase tracking-wider">
                Google Business Profile Reviews
              </span>
              <span className="flex items-center gap-0.5 text-amber-400 pl-1 border-l border-[#35271F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
            </div>

            {/* Carousel Control Strip */}
            {screenshots.length > 0 && (
              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-bone/50">
                <button
                  onClick={() => handleNudge("left")}
                  aria-label="Slide reviews left"
                  className="p-1.5 rounded-full bg-[#1E1712] border border-[#35271F] hover:border-clay hover:text-clay transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1712] border border-[#35271F] hover:border-clay hover:text-clay transition-colors text-[11px] cursor-pointer"
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3 h-3 text-clay fill-clay" />
                      <span>Resume Carousel</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 text-clay" />
                      <span>Pause Carousel</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleNudge("right")}
                  aria-label="Slide reviews right"
                  className="p-1.5 rounded-full bg-[#1E1712] border border-[#35271F] hover:border-clay hover:text-clay transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Full-width Carousel Slider (Left-to-Right) */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6">
        {/* Soft edge gradient masks for cinematic entrance/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#16110D] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#16110D] to-transparent z-20 pointer-events-none" />

        {isLoading ? (
          <div className="py-16 text-center text-bone/50 text-sm">
            Loading Google review screenshots...
          </div>
        ) : screenshots.length === 0 ? (
          <div className="py-12 text-center text-bone/40 text-xs uppercase tracking-widest">
            Verified Client Reviews
          </div>
        ) : (
          /* Animated Sliding Ribbon Track (Moving from Left to Right) */
          <div 
            ref={carouselContainerRef}
            className="w-full overflow-x-hidden flex items-center"
          >
            <div 
              className={`flex items-center gap-6 sm:gap-8 w-max animate-carousel-slide ${
                isPaused ? "carousel-paused" : ""
              }`}
            >
              {displayItems.map((item, index) => {
                const originalIndex = index % screenshots.length;

                return (
                  <div
                    key={`${item.id}-${index}`}
                    onClick={() => setSelectedImageIndex(originalIndex)}
                    className="w-[290px] sm:w-[350px] shrink-0 group relative bg-[#1E1712] border border-[#35271F] rounded-xl overflow-hidden hover:border-clay/70 hover:shadow-2xl hover:shadow-clay/10 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
                  >
                    {/* Card Header */}
                    {item.reviewerName && (
                      <div className="px-4 py-2.5 bg-[#241B15] border-b border-[#35271F] flex items-center justify-between text-xs text-bone/70">
                        <div className="flex items-center gap-1.5 truncate">
                          <ShieldCheck className="w-3.5 h-3.5 text-clay shrink-0" />
                          <span className="font-medium text-bone/90 truncate">
                            {item.reviewerName}
                          </span>
                        </div>
                        {item.dateAdded && (
                          <span className="text-[10px] text-bone/50 shrink-0">{item.dateAdded}</span>
                        )}
                      </div>
                    )}

                    {/* Screenshot Image */}
                    <div className="relative bg-black/40 overflow-hidden flex items-center justify-center p-3 min-h-[220px] max-h-[380px]">
                      <img 
                        src={item.imageData} 
                        alt={item.caption || "Google Review Screenshot"} 
                        className="w-full h-auto max-h-[360px] object-contain rounded transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                        draggable={false}
                      />
                      
                      {/* Zoom Indicator on Hover */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2.5 rounded-full bg-clay text-bone shadow-md group-hover:scale-110 transition-transform">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Optional Caption Footer */}
                    {item.caption && (
                      <div className="p-3 bg-[#1E1712] border-t border-[#35271F]">
                        <p className="text-xs text-bone/80 truncate">
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* "Write a Review!" Link Container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-10 sm:mt-12 text-center">
        <a
          href="https://g.page/r/CYSCyJvMu5NHEAE/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1E1712] hover:bg-[#261D17] border border-[#35271F] hover:border-clay/60 text-bone hover:text-clay text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-clay/10 group cursor-pointer"
        >
          <PenSquare className="w-4 h-4 text-clay group-hover:scale-110 transition-transform" />
          <span>Write a review!</span>
          <ExternalLink className="w-3.5 h-3.5 text-bone/40 group-hover:text-clay transition-colors" />
        </a>
      </div>

      {/* Lightbox / Fullscreen Zoom Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && screenshots[selectedImageIndex] && (
          <div 
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-[#1E1712] border border-[#35271F] text-bone hover:text-clay transition-colors z-20 cursor-pointer"
              aria-label="Close zoomed review"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {screenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => 
                    prev !== null && prev > 0 ? prev - 1 : screenshots.length - 1
                  );
                }}
                className="absolute left-4 sm:left-6 p-3 rounded-full bg-[#1E1712] border border-[#35271F] text-bone hover:text-clay transition-colors z-20 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {screenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => 
                    prev !== null && prev < screenshots.length - 1 ? prev + 1 : 0
                  );
                }}
                className="absolute right-4 sm:right-6 p-3 rounded-full bg-[#1E1712] border border-[#35271F] text-bone hover:text-clay transition-colors z-20 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center z-10"
            >
              <img
                src={screenshots[selectedImageIndex].imageData}
                alt="Enlarged Google Review Screenshot"
                className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl border border-[#35271F]"
              />

              {/* Optional Caption Bar */}
              {(screenshots[selectedImageIndex].reviewerName || screenshots[selectedImageIndex].caption) && (
                <div className="mt-4 px-6 py-2 rounded-full bg-[#1E1712] border border-[#35271F] text-center text-xs text-bone/90">
                  {screenshots[selectedImageIndex].reviewerName && (
                    <span className="font-semibold text-clay mr-2">
                      {screenshots[selectedImageIndex].reviewerName}:
                    </span>
                  )}
                  <span>{screenshots[selectedImageIndex].caption}</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
