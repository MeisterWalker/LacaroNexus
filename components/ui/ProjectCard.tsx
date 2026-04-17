"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  techStack: string[];
}

export const ProjectCard = ({
  index,
  title,
  description,
  techStack,
}: ProjectCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const revealTimeouts = useRef<NodeJS.Timeout[]>([]);

  // Generate redacted version mapping word length to blocks
  const generateRedaction = (text: string) => {
    return text
      .split(" ")
      .map((word) => "█".repeat(word.length))
      .join(" ");
  };

  const idleDesc = generateRedaction(description);
  const [displayDesc, setDisplayDesc] = useState<string[]>(idleDesc.split(""));

  const handleMouseEnter = () => {
    setIsRevealed(true);

    // Clear previous timeouts just in case
    revealTimeouts.current.forEach(clearTimeout);
    revealTimeouts.current = [];

    const charArray = description.split("");
    const newDisplay = idleDesc.split("");

    // Staggered reveal
    charArray.forEach((char, i) => {
      // Don't animate spaces or if it's already the real char
      if (char === " " || newDisplay[i] === char) {
        newDisplay[i] = char;
        return;
      }

      const delay = Math.random() * 300; // 0-300ms random delay per character

      const timeout = setTimeout(() => {
        setDisplayDesc((prev) => {
          const next = [...prev];
          next[i] = char;
          return next;
        });
      }, delay);

      revealTimeouts.current.push(timeout);
    });

    // We can pre-set the ones that don't need animation
    setDisplayDesc(newDisplay);
  };

  const handleMouseLeave = () => {
    setIsRevealed(false);
    
    // Cancel any ongoing reveals
    revealTimeouts.current.forEach(clearTimeout);
    revealTimeouts.current = [];
    
    // Instantly snap back to redacted state
    setDisplayDesc(idleDesc.split(""));
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative border-l border-r border-b px-8 pb-8 pt-6 transition-all duration-400 h-full flex flex-col ${
        isRevealed 
          ? "border-t-[rgba(79,255,176,0.4)] border-borderHighlight bg-bgSecondary/30" 
          : "border-t-transparent border-borderHighlight/50 bg-bgSecondary/10"
      }`}
      style={{ borderTopWidth: '1px', borderTopStyle: 'solid' }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="font-mono text-xs text-textDim tracking-widest block mb-2">
            // {index.toString().padStart(3, "0")}
          </span>
          <h3 className="text-2xl font-light text-textPrimary tracking-wide">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ x: isRevealed ? 5 : 0, y: isRevealed ? -5 : 0 }}
          transition={{ duration: 0.3 }}
          className={`transition-colors ${isRevealed ? "text-accentCyan" : "text-textMuted"}`}
        >
          <ArrowUpRight size={24} strokeWidth={1} />
        </motion.div>
      </div>

      <div className="flex-grow flex flex-col justify-start mb-8 relative">
        <div 
          className={`font-mono text-[10px] tracking-[0.2em] text-[#4FFFB0] opacity-40 mb-2 transition-opacity duration-300 ${
            isRevealed ? "opacity-0" : "opacity-40"
          }`}
        >
          [ CLASSIFIED ]
        </div>
        
        <p 
          className="font-light leading-relaxed whitespace-pre-wrap break-words"
          style={{
            color: isRevealed ? "rgba(226,232,240,0.5)" : "rgba(79,255,176,0.15)",
            transition: "color 0.2s",
            letterSpacing: isRevealed ? "normal" : "0.05em"
          }}
        >
          {displayDesc.join("")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mt-auto">
        {techStack.map((tech) => (
          <span
            key={tech}
            className={`font-mono text-xs border px-2 py-1 tracking-wider transition-all duration-300 ${
              isRevealed 
                ? "text-textMuted border-accentMint/30 opacity-100" 
                : "text-textDim border-textDim/20 opacity-30"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
