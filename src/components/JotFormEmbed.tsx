import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export default function JotFormEmbed() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full min-h-[600px] md:min-h-[800px] flex flex-col items-center justify-start bg-white rounded-sm overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 py-12">
          <Loader2 className="w-8 h-8 animate-spin text-clay mb-3" />
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Loading secure application...
          </p>
        </div>
      )}
      
      <iframe
        id="JotFormIFrame-260916790898072"
        title="Insurance Application"
        src="https://form.jotform.com/260916790898072"
        frameBorder="0"
        onLoad={() => setLoading(false)}
        className="w-full h-[650px] md:h-[850px] border-none shadow-none"
        style={{
          width: "100%",
          minWidth: "100%",
          border: "none",
        }}
        allowFullScreen={true}
        allow="geolocation; microphone; camera"
      />
    </div>
  );
}
