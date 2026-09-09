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
import { DEFAULT_GOOGLE_REVIEWS } from "../data/defaultReviews";

interface GoogleReviewsProps {
  id?: string;
  isStandalone?: boolean;
}

function GoogleColoredLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

export default function GoogleReviews({ id = "reviews", isStandalone = false }: GoogleReviewsProps) {
  // Initialize with DEFAULT_GOOGLE_REVIEWS immediately so carousel is never blank
  const [screenshots, setScreenshots] = useState<ReviewScreenshot[]>(DEFAULT_GOOGLE_REVIEWS);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Load screenshots from storage (IndexedDB / localStorage)
  useEffect(() => {
    async function load() {
      try {
        const data = await getAllScreenshots();
        if (data && data.length > 0) {
          setScreenshots(data);
        }
      } catch (err) {
        console.error("Failed to load screenshots:", err);
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
  const repeatFactor = uniqueCount > 0 ? Math.max(2, Math.ceil(5 / uniqueCount)) : 1;
  const singleSet = uniqueCount > 0 ? Array(repeatFactor).fill(screenshots).flat() : [];
  const displayItems = uniqueCount > 0 ? [...singleSet, ...singleSet] : [];

  // Gentle, slow glide speed
  const animDuration = Math.max(45, singleSet.length * 10);

  // Manual nudge scroll functions
  const handleNudge = (direction: "left" | "right") => {
    if (carouselContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
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
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-clay">
                Client Testimonials
              </span>
              <span className="w-5 h-px bg-clay/50" />
            </div>

            {/* Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-bone mb-3">
              What Clients Say About Denton Insurance
            </h2>

            {/* Trust badge with Google 5.0 Rating */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#1E1712] border border-[#35271F] shadow-inner mb-4">
              <GoogleColoredLogo className="w-4 h-4 shrink-0" />
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-bone">
                <span className="text-white">Google Reviews</span>
                <span className="text-bone/50">•</span>
                <span className="text-amber-400 font-bold">5.0</span>
              </div>
              <span className="flex text-amber-400">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </span>
            </div>

            {/* Carousel Control Strip */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5 text-xs text-bone/50">
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
          </div>

        </div>
      </div>

      {/* Full-width Carousel Slider (Left-to-Right) */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6">
        {/* Soft edge gradient masks for cinematic entrance/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#16110D] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#16110D] to-transparent z-20 pointer-events-none" />

        {/* Animated Sliding Ribbon Track (Moving from Left to Right) */}
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
                  className="w-[310px] sm:w-[380px] shrink-0 group relative bg-[#1E1712] border border-[#35271F] rounded-xl overflow-hidden hover:border-clay/70 hover:shadow-2xl hover:shadow-clay/10 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
                >
                  {item.reviewText ? (
                    /* Authentic Pixel-Perfect Google Review Card */
                    <div className="p-5 flex flex-col justify-between h-full min-h-[260px]">
                      <div>
                        {/* Top Header with Avatar & Google Logo */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-base shadow-sm shrink-0"
                              style={{ backgroundColor: item.avatarBg || "#1976D2" }}
                            >
                              {item.avatarInitial || item.reviewerName?.[0] || "D"}
                            </div>
                            <div className="truncate">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-bone text-sm truncate">
                                  {item.reviewerName}
                                </span>
                                <ShieldCheck className="w-3.5 h-3.5 text-clay shrink-0" />
                              </div>
                              <p className="text-[11px] text-bone/50 truncate">
                                {item.location || "Verified Client"} • {item.serviceType || "Insurance Review"}
                              </p>
                            </div>
                          </div>
                          <GoogleColoredLogo className="w-5 h-5 shrink-0" />
                        </div>

                        {/* Stars + Relative Time */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex text-[#FBBC04]">
                            {Array(5).fill(0).map((_, starIdx) => (
                              <Star key={starIdx} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-[11px] text-bone/50">
                            {item.relativeTime || "Recent review"}
                          </span>
                        </div>

                        {/* Review text */}
                        <p className="text-xs sm:text-[13px] text-bone/85 leading-relaxed line-clamp-4">
                          "{item.reviewText}"
                        </p>
                      </div>

                      {/* Optional Owner Response */}
                      {item.ownerReply && (
                        <div className="mt-4 pt-3 border-t border-[#35271F]/80 text-[11px] bg-[#17120E] -mx-5 -mb-5 px-5 py-2.5">
                          <div className="flex items-center gap-1 text-clay font-medium text-[10px] uppercase tracking-wider mb-0.5">
                            <span>Response from Denton Insurance, LLC</span>
                          </div>
                          <p className="text-bone/70 line-clamp-1 italic text-[11px]">
                            "{item.ownerReply}"
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Uploaded Image Screenshot Card */
                    <div>
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

                      <div className="relative bg-black/40 overflow-hidden flex items-center justify-center p-3 min-h-[220px] max-h-[380px]">
                        <img 
                          src={item.imageData} 
                          alt={item.caption || "Google Review Screenshot"} 
                          className="w-full h-auto max-h-[360px] object-contain rounded transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="p-2.5 rounded-full bg-clay text-bone shadow-md group-hover:scale-110 transition-transform">
                            <Maximize2 className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      {item.caption && (
                        <div className="p-3 bg-[#1E1712] border-t border-[#35271F]">
                          <p className="text-xs text-bone/80 truncate">
                            {item.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
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

            {/* Modal Review Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full z-10"
            >
              {screenshots[selectedImageIndex].reviewText ? (
                <div className="bg-[#1E1712] border border-[#35271F] rounded-2xl p-6 sm:p-8 shadow-2xl">
                  {/* Google Modal Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-sm shrink-0"
                        style={{ backgroundColor: screenshots[selectedImageIndex].avatarBg || "#1976D2" }}
                      >
                        {screenshots[selectedImageIndex].avatarInitial || screenshots[selectedImageIndex].reviewerName?.[0] || "D"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-bone text-base sm:text-lg">
                            {screenshots[selectedImageIndex].reviewerName}
                          </h3>
                          <ShieldCheck className="w-4 h-4 text-clay" />
                        </div>
                        <p className="text-xs text-bone/50">
                          {screenshots[selectedImageIndex].location} • {screenshots[selectedImageIndex].serviceType}
                        </p>
                      </div>
                    </div>
                    <GoogleColoredLogo className="w-6 h-6 shrink-0" />
                  </div>

                  {/* Stars + Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex text-[#FBBC04]">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-bone/60">
                      {screenshots[selectedImageIndex].relativeTime || "Verified Google Review"}
                    </span>
                  </div>

                  {/* Full review text */}
                  <blockquote className="text-sm sm:text-base text-bone/90 leading-relaxed italic mb-6">
                    "{screenshots[selectedImageIndex].reviewText}"
                  </blockquote>

                  {/* Owner Response */}
                  {screenshots[selectedImageIndex].ownerReply && (
                    <div className="p-4 rounded-xl bg-[#17120E] border border-[#35271F] text-xs sm:text-sm">
                      <p className="text-clay font-semibold uppercase tracking-wider text-[10px] mb-1">
                        Response from Denton Insurance, LLC (Owner)
                      </p>
                      <p className="text-bone/75 italic">
                        "{screenshots[selectedImageIndex].ownerReply}"
                      </p>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-[#35271F] flex items-center justify-between text-xs text-bone/40">
                    <span>Verified on Google Business Profile</span>
                    <a
                      href="https://g.page/r/CYSCyJvMu5NHEAE/review"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-clay hover:underline flex items-center gap-1"
                    >
                      Write your own review <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img
                    src={screenshots[selectedImageIndex].imageData}
                    alt="Enlarged Google Review Screenshot"
                    className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl border border-[#35271F]"
                  />
                  {screenshots[selectedImageIndex].reviewerName && (
                    <div className="mt-4 px-6 py-2 rounded-full bg-[#1E1712] border border-[#35271F] text-center text-xs text-bone/90">
                      <span className="font-semibold text-clay mr-2">
                        {screenshots[selectedImageIndex].reviewerName}:
                      </span>
                      <span>{screenshots[selectedImageIndex].caption}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
