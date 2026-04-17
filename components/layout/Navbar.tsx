"use client";

import React, { useEffect, useState } from "react";
import { GlitchText } from "../ui/GlitchText";

export const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-bgPrimary/80 backdrop-blur-md border-borderHighlight py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div 
        className="absolute top-0 left-0 h-[1px] bg-accentMint transition-[width] duration-100 linear z-[101] opacity-70"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center text-accentMint hover:text-accentCyan transition-colors">
          <span className="font-mono text-sm tracking-widest font-bold">
            <GlitchText text="[ LNX ]" />
          </span>
        </a>
        
        <nav className="hidden md:flex gap-8">
          {["Projects", "Certifications", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-xs text-textMuted hover:text-textPrimary tracking-widest transition-colors uppercase"
            >
              <GlitchText text={`// ${item}`} />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
