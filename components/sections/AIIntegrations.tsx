"use client";

import React from "react";
import Image from "next/image";
import { aiIntegrations } from "../../lib/data";

export const AIIntegrations = () => {
  // Triple the items to ensure seamless loop
  const marqueeItems = [...aiIntegrations, ...aiIntegrations, ...aiIntegrations];

  return (
    <section className="py-32 relative z-10 w-full bg-bgPrimary overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="font-mono text-xs text-accentMint tracking-[0.3em] uppercase mb-4">
          AI INTEGRATIONS
        </div>
        <h2 className="text-4xl md:text-5xl font-light text-textPrimary tracking-tight mb-6">
          Platforms & APIs
        </h2>
        <p className="text-[13px] text-[rgba(226,232,240,0.35)] max-w-[420px] leading-[1.8] font-light">
          Tools and models I have integrated into production applications.
        </p>
      </div>

      <div className="pause-on-hover relative w-full overflow-hidden border-y border-[rgba(79,255,176,0.1)]">
        {/* Animated Inner Container */}
        <div className="animate-marquee flex w-fit">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex-shrink-0 w-[240px] md:w-[320px] h-[140px] md:h-[180px] bg-bgPrimary border-r border-[rgba(79,255,176,0.1)] relative flex flex-col items-center justify-center group transition-colors duration-300 hover:bg-[#050A0F]"
            >
              {/* Hover border top */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-accentMint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center">
                <div className="relative h-8 w-24 mb-4 transition-all duration-300 brightness-0 invert opacity-40 group-hover:opacity-100">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    style={{ objectFit: "contain" }}
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "block";
                    }}
                  />
                  <span className="hidden font-mono text-xs text-textMuted uppercase tracking-widest">
                    {item.name}
                  </span>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="font-mono text-[10px] text-[rgba(226,232,240,0.4)] tracking-[0.1em] uppercase max-w-[90%] mx-auto leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
