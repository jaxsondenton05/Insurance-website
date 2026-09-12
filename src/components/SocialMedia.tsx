import React from "react";
import { 
  Facebook, 
  Instagram, 
  Music2, 
  AtSign, 
  Share2
} from "lucide-react";

interface SocialPlatform {
  name: string;
  handle: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: "Facebook",
    handle: "@DentonInsurance01",
    url: "https://www.facebook.com/DentonInsurance01/",
    icon: Facebook
  },
  {
    name: "Instagram",
    handle: "@dentoninsurance01",
    url: "https://www.instagram.com/dentoninsurance01/",
    icon: Instagram
  },
  {
    name: "TikTok",
    handle: "@dentoninsurance01",
    url: "https://www.tiktok.com/@dentoninsurance01",
    icon: Music2
  },
  {
    name: "Threads",
    handle: "@dentoninsurance01",
    url: "https://www.threads.com/@dentoninsurance01",
    icon: AtSign
  }
];

export default function SocialMedia({ id = "social" }: { id?: string }) {
  return (
    <section 
      id={id} 
      className="py-20 sm:py-24 bg-[#140E0B] text-bone border-t border-[#2E221B] relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-clay/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#E06A3B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-clay/10 text-clay text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full border border-clay/20 mb-4">
            <Share2 className="w-3.5 h-3.5" />
            Connect &amp; Learn
          </span>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bone tracking-tight mb-4">
            Social Media
          </h2>

          <p className="text-base sm:text-lg text-bone/70 font-light leading-relaxed">
            We have four active pages dedicated to explaining the insurance industry, defining confusing jargon, and correcting common misconceptions about all types of insurance.
            <span className="block mt-3 text-bone/90 font-medium">
              Follow us to learn more about what you&apos;re paying for!
            </span>
          </p>
        </div>

        {/* Clickable Social Media Graphics */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {socialPlatforms.map((platform) => {
            const IconComp = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Denton Insurance on ${platform.name}`}
                className="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-2 focus:outline-none"
              >
                {/* Platform Graphic */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center bg-[#1B140F] border border-[#3A2B21] text-bone/85 shadow-lg shadow-black/50 transition-all duration-300 group-hover:scale-105 group-hover:border-clay/60 group-hover:bg-[#251C16] group-hover:text-clay group-hover:shadow-clay/10">
                  <IconComp className="w-9 h-9 sm:w-11 sm:h-11 transition-colors duration-300" />
                </div>

                {/* Platform Label */}
                <div className="text-center">
                  <span className="block text-sm sm:text-base font-semibold text-bone group-hover:text-clay transition-colors">
                    {platform.name}
                  </span>
                  <span className="block text-xs font-mono text-bone/50 group-hover:text-bone/80 transition-colors">
                    {platform.handle}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
