"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "../../lib/data";
import { CertCard } from "../ui/CertCard";
import { GlitchText } from "../ui/GlitchText";

export const Certifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(".cert-elem", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={containerRef} className="py-32 relative z-10 bg-bgSecondary/10 mix-blend-screen">
      <div className="container mx-auto px-6">
        <div className="mb-16 cert-elem">
          <h2 className="font-mono text-xs text-accentMint tracking-[0.3em] uppercase mb-4">
            <GlitchText text="02 // Credentials" />
          </h2>
          <div className="h-[1px] w-24 bg-borderHighlight" />
        </div>
        
        <div className="flex flex-col">
          {certifications.map((cert) => (
            <div key={cert.id} className="cert-elem">
              <CertCard {...cert} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
