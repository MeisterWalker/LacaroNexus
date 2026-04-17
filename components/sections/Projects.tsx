"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../lib/data";
import { ProjectCard } from "../ui/ProjectCard";
import { GlitchText } from "../ui/GlitchText";

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(".project-elem", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-16 project-elem">
          <h2 className="font-mono text-xs text-accentMint tracking-[0.3em] uppercase mb-4">
            <GlitchText text="01 // Selected Works" />
          </h2>
          <div className="h-[1px] w-24 bg-borderHighlight" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className="project-elem h-full">
              <ProjectCard {...project} index={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
