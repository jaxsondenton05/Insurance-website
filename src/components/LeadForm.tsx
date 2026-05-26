import React from "react";
import JotFormEmbed from "./JotFormEmbed";

export default function LeadForm() {
  return (
    <section className="py-24 bg-bone text-obsidian" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 italic uppercase">
              Request A <span className="text-clay">Quote</span>
            </h2>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-black/5">
            <JotFormEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
