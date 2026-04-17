"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteData } from "../../lib/data";
import { GlitchText } from "../ui/GlitchText";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(".hero-elem", {
        y: 40,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <p className="hero-elem font-mono text-accentMint tracking-widest text-sm mb-6 uppercase">
            <GlitchText text={`INIT // ${siteData.location}`} />
          </p>
          
          <h1 className="hero-elem text-5xl md:text-7xl lg:text-8xl font-light text-textPrimary tracking-tight leading-tight mb-8">
            <GlitchText text="Building Systems" className="hero-line-1 inline-block" /> <br />
            <GlitchText text="That Scale." className="hero-line-2 text-textMuted italic inline-block" />
          </h1>
          
          <p className="hero-elem text-lg md:text-2xl text-textMuted font-light max-w-2xl leading-relaxed mb-12">
            I'm <span className="text-textPrimary">{siteData.owner}</span>, a {siteData.role} focused on high-performance interfaces and scalable backend infrastructure.
          </p>
          
          <div className="hero-elem flex gap-6 items-center">
            <a
              href="#projects"
              className="group flex items-center gap-4 bg-textPrimary text-bgPrimary px-8 py-4 font-mono text-sm tracking-widest hover:bg-accentMint transition-colors duration-300"
            >
              EXPLORE WORK
            </a>
            <a
              href="#contact"
              className="group font-mono text-sm text-textMuted hover:text-accentCyan tracking-widest transition-colors duration-300"
            >
              <GlitchText text="[ GET IN TOUCH ]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
