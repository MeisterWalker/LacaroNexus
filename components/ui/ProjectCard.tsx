"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  id: string;
  slug?: string;
  title: string;
  description: string;
  techStack: string[];
  index: number;
  featured?: boolean;
}

export const ProjectCard = ({
  slug,
  title,
  description,
  techStack,
  featured = false,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  const updateRedactedText = useCallback(() => {
    if (isHovered) {
      // Character-by-character reveal
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText((current) => {
          return description
            .split("")
            .map((char, index) => {
              if (index < iteration) return char;
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        });

        if (iteration >= description.length) {
          clearInterval(interval);
        }
        iteration += 1;
      }, 20);
      return () => clearInterval(interval);
    } else {
      // Masked state (using blocks)
      const masked = description
        .split("")
        .map((char) => (char === " " ? " " : "█"))
        .join("");
      setDisplayText(masked);
    }
  }, [description, isHovered]);

  useEffect(() => {
    updateRedactedText();
  }, [updateRedactedText]);

  const CardContent = (
    <div
      className={`group relative overflow-hidden bg-bgPrimary border border-border transition-all duration-300 pointer-events-auto h-full ${
        featured ? "md:flex p-1" : "flex flex-col"
      } hover:border-accentMint/40`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scanline Overlay for Card */}
      <div className="absolute inset-0 bg-scanline opacity-[0.03] pointer-events-none z-10" />

      {/* Featured Banner */}
      {featured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="w-2 h-2 bg-accentMint rounded-full animate-ping" />
          <span className="font-mono text-[10px] text-accentMint tracking-[0.2em] uppercase bg-bgPrimary/80 px-2 py-1 border border-accentMint/20 backdrop-blur-md">
            Featured Case Study
          </span>
        </div>
      )}

      {/* Image Area */}
      <div
        className={`relative ${
          featured ? "md:w-1/2 h-[300px] md:h-auto" : "h-[200px]"
        } overflow-hidden bg-[#060D14]`}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
          <span className="font-mono text-xs text-textMuted uppercase tracking-[0.4em]">
            [ VISUAL_REDACTED ]
          </span>
        </div>
        {/* Placeholder Gradient if no image provided */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-bgSecondary to-transparent opacity-50" 
          style={{ 
            backgroundImage: featured 
              ? "radial-gradient(circle at 20% 20%, rgba(79,255,176,0.1) 0%, transparent 50%)" 
              : "none" 
          }}
        />
      </div>

      {/* Text Area */}
      <div
        className={`relative z-10 p-8 flex flex-col h-full bg-bgPrimary ${
          featured ? "md:w-1/2 justify-center" : "flex-1"
        }`}
      >
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-light text-textPrimary tracking-tight mb-2 uppercase italic">
            {title}
          </h3>
          <div className="w-12 h-[1px] bg-accentMint/30" />
        </div>

        <div className="flex-1 mb-8">
          <p className="font-mono text-[11px] leading-relaxed text-textMuted tracking-wider overflow-hidden">
            {displayText}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[9px] font-mono border border-border text-textMuted uppercase tracking-widest hover:border-accentMint/40 hover:text-accentMint transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="font-mono text-[10px] text-accentMint tracking-widest uppercase group-hover:translate-x-1 transition-transform">
              {featured ? "> REVIEW_DETAILED_LOGS" : "> VIEW_RECORDS"}
            </span>
            <span className="font-mono text-[10px] text-textDim uppercase">
              ID: 0x{Math.random().toString(16).slice(2, 6).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
        <div className="absolute top-2 right-2 w-[1px] h-4 bg-accentMint/20" />
        <div className="absolute top-2 right-2 w-4 h-[1px] bg-accentMint/20" />
      </div>
    </div>
  );

  return slug ? (
    <Link href={`/projects/${slug}`} className="block h-full cursor-pointer">
      {CardContent}
    </Link>
  ) : (
    <div className="h-full">{CardContent}</div>
  );
};
