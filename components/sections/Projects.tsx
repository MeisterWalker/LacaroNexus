"use client";

import React from "react";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "../../lib/data";

export const Projects = () => {
  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 relative z-10 w-full bg-bgPrimary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <div className="font-mono text-xs text-accentMint tracking-[0.3em] uppercase mb-4">
            CLASSIFIED_RECORDS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-textPrimary tracking-tighter mb-8 leading-[0.9]">
            Development <span className="text-accentMint italic">Protocol</span>
          </h2>
          <p className="text-lg text-textMuted max-w-xl leading-relaxed font-light">
            A log of high-fidelity systems, architectural experiments, and AI
            integrations deployed into production environments.
          </p>
        </div>

        {/* Projects Grid Configuration */}
        <div className="space-y-12">
          {/* Hero Featured Slot */}
          {featuredProject && (
            <div className="w-full">
              <ProjectCard
                key={featuredProject.id}
                index={0}
                featured={true}
                {...featuredProject}
              />
            </div>
          )}

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {regularProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                index={idx + (featuredProject ? 1 : 0)} 
                {...project} 
              />
            ))}
          </div>
        </div>

        {/* Terminal Status Line */}
        <div className="mt-24 pt-8 border-t border-border flex items-center justify-between font-mono text-[10px] text-textDim uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accentMint animate-pulse" />
            <span>ENCRYPTED_DATA_STREAM_ACTIVE</span>
          </div>
          <div className="hidden md:block">
            LOCATION: CEBU_CITY_PH // SECTOR: DEVELOPMENT_CORE
          </div>
        </div>
      </div>
    </section>
  );
};
