"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteData } from "../../lib/data";
import { GlitchText } from "../ui/GlitchText";

const CONTACT_LINES = [
  "> ESTABLISH CONNECTION",
  "────────────────────────────────",
  `> SIGNAL DETECTED // ${siteData.location.toUpperCase()}`,
  `> OPERATOR: ${siteData.owner.toUpperCase()}`,
  "> STATUS: AVAILABLE FOR FREELANCE + REMOTE",
  "> AWAITING INPUT...",
];

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState<
    { text: string; fullyTyped: boolean; currentText: string }[]
  >([]);
  const [showInput, setShowInput] = useState(false);
  
  const [email, setEmail] = useState("");
  const [errorLine, setErrorLine] = useState("");
  const [successLines, setSuccessLines] = useState<string[]>([]);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let isCancelled = false;

    const runSequence = async () => {
      for (let i = 0; i < CONTACT_LINES.length; i++) {
        if (isCancelled) return;
        const line = CONTACT_LINES[i];

        setVisibleLines((prev) => [
          ...prev,
          { text: line, fullyTyped: false, currentText: "" },
        ]);

        for (let c = 0; c <= line.length; c++) {
          if (isCancelled) return;
          setVisibleLines((prev) => {
            const next = [...prev];
            next[next.length - 1].currentText = line.substring(0, c);
            if (c === line.length) {
              next[next.length - 1].fullyTyped = true;
            }
            return next;
          });
          await new Promise((res) => setTimeout(res, 10)); // Faster type speed
        }
        await new Promise((res) => setTimeout(res, 200)); // Delay between lines
      }
      
      if (!isCancelled) {
        setShowInput(true);
      }
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, [hasStarted]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleTransmit = async () => {
    setErrorLine("");
    if (!validateEmail(email)) {
      setErrorLine("> INVALID SIGNAL. CHECK INPUT FORMAT.");
      return;
    }

    setIsTransmitting(true);
    
    // Simulate line by line API call success
    setSuccessLines(["> SIGNAL RECEIVED.............. OK"]);
    await new Promise((res) => setTimeout(res, 600));

    setSuccessLines((prev) => [...prev, "> VERIFYING OPERATOR........... OK"]);
    await new Promise((res) => setTimeout(res, 600));

    setSuccessLines((prev) => [...prev, "> CONNECTION ESTABLISHED. STANDING BY."]);
    await new Promise((res) => setTimeout(res, 600));

    // Here we'd actually call /api/contact or similar
    
    setIsComplete(true);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="py-32 relative z-10 min-h-[60vh] flex flex-col justify-center bg-[#04080C] bg-grid-pattern relative"
    >
      {/* Dark overlay to make the grid faint */}
      <div className="absolute inset-0 bg-[#04080C]/90 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="font-mono text-xs text-accentMint tracking-[0.3em] uppercase mb-4">
            <GlitchText text="04 // Initialize Link" />
          </h2>
          <div className="h-[1px] w-24 bg-borderHighlight" />
        </div>
        
        <div className="max-w-2xl font-mono text-[13px] leading-loose">
          {/* Main Handshake text */}
          <div className="text-[rgba(226,232,240,0.7)] flex flex-col items-start whitespace-pre-wrap md:whitespace-pre break-all md:break-normal">
            {visibleLines.map((lineObj, idx) => {
              const text = lineObj.currentText;
              // Add accent to the `> ` prefix
              const renderedText = text.startsWith("> ") ? (
                <span>
                  <span className="text-[#4FFFB0] opacity-50">{"> "}</span>
                  {text.substring(2)}
                </span>
              ) : text.includes("───") ? (
                <span className="text-[rgba(79,255,176,0.15)]">{text}</span>
              ) : (
                text
              );

              return (
                <div key={idx} className="min-h-[26px]">
                  {renderedText}
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          {showInput && !isComplete && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center text-[rgba(226,232,240,0.7)] border-b border-[rgba(79,255,176,0.3)] pb-1 w-full sm:w-[320px]">
                <span className="mr-2 opacity-50">[</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isTransmitting}
                  placeholder="your@email.com"
                  className="bg-transparent border-none outline-none w-full font-mono placeholder:text-[rgba(226,232,240,0.3)] disabled:opacity-50"
                  onKeyDown={(e) => e.key === "Enter" && handleTransmit()}
                />
                <span className="ml-2 opacity-50">]</span>
              </div>
              <button
                onClick={handleTransmit}
                disabled={isTransmitting}
                className="border border-[rgba(79,255,176,0.3)] px-4 py-1.5 text-[rgba(226,232,240,0.7)] hover:bg-[rgba(79,255,176,0.06)] hover:text-[#4FFFB0] transition-colors disabled:opacity-50 uppercase tracking-widest"
              >
                [ TRANSMIT ]
              </button>
            </div>
          )}

          {/* Error Line */}
          {errorLine && !isTransmitting && !isComplete && (
            <div className="mt-4 text-red-400">
              <span className="opacity-50">{"> "}</span>
              {errorLine.substring(2)}
            </div>
          )}

          {/* Success Sequence lines */}
          {isTransmitting && !isComplete && (
            <div className="mt-8 flex flex-col text-[rgba(226,232,240,0.7)]">
              {successLines.map((line, i) => (
                <div key={i}>
                  <span className="text-[#4FFFB0] opacity-50">{"> "}</span>
                  {line.substring(2)}
                </div>
              ))}
            </div>
          )}

          {/* Complete message */}
          {isComplete && (
            <div className="mt-8 text-[#4FFFB0] opacity-90">
              <span className="opacity-50">{"> "}</span>
              TRANSMISSION COMPLETE. EXPECT CONTACT WITHIN 24–48H.
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-24 pt-8 border-t border-[rgba(79,255,176,0.05)] max-w-2xl flex flex-wrap gap-4 items-center text-[11px] font-mono tracking-widest uppercase">
          <a href="#" className="text-[rgba(226,232,240,0.3)] hover:text-[#4FFFB0] transition-colors">
            [ GITHUB ]
          </a>
          <span className="text-[rgba(226,232,240,0.15)]">·</span>
          <a href="#" className="text-[rgba(226,232,240,0.3)] hover:text-[#4FFFB0] transition-colors">
            [ LINKEDIN ]
          </a>
          <span className="text-[rgba(226,232,240,0.15)]">·</span>
          <a href="mailto:hello@example.com" className="text-[rgba(226,232,240,0.3)] hover:text-[#4FFFB0] transition-colors">
            [ EMAIL ]
          </a>
        </div>
      </div>
    </section>
  );
};
