"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../../lib/data";
import { SkillBadge } from "../ui/SkillBadge";
import { GlitchText } from "../ui/GlitchText";

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(".skill-elem", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-16 skill-elem">
          <h2 className="font-mono text-xs text-accentMint tracking-[0.3em] uppercase mb-4">
            <GlitchText text="03 // Capabilities" />
          </h2>
          <div className="h-[1px] w-24 bg-borderHighlight" />
        </div>
        
        <div className="flex flex-wrap gap-4">
          {skills.map((skill) => (
            <div key={skill} className="skill-elem">
              <SkillBadge skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
