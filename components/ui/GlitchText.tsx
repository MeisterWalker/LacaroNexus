"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

const GLITCH_CHARS = ["░", "▒", "█", "⌖"];

export const GlitchText = ({
  text,
  className = "",
  as: Component = "span",
}: GlitchTextProps) => {
  const [displayChars, setDisplayChars] = useState<string[]>(text.split(""));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerGlitch = useCallback(() => {
    // Only target letters and numbers
    const validIndices = text
      .split("")
      .map((char, index) => (/[a-zA-Z0-9]/.test(char) ? index : -1))
      .filter((index) => index !== -1);

    if (validIndices.length > 0) {
      // 1 to 2 random characters
      const charsToGlitch = Math.min(Math.floor(Math.random() * 2) + 1, validIndices.length);
      const shuffledIndices = [...validIndices].sort(() => 0.5 - Math.random());
      const selectedIndices = shuffledIndices.slice(0, charsToGlitch);

      setDisplayChars((prev) => {
        const next = [...prev];
        selectedIndices.forEach((idx) => {
          next[idx] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        });
        return next;
      });

      // Restore immediately after 60ms
      setTimeout(() => {
        setDisplayChars(text.split(""));
      }, 60);
    }
  }, [text]);

  const scheduleNext = useCallback(() => {
    // 12 to 18 seconds
    const delay = 12000 + Math.random() * 6000;
    timeoutRef.current = setTimeout(() => {
      triggerGlitch();
      scheduleNext(); // Schedule the next one after firing
    }, delay);
  }, [triggerGlitch]);

  useEffect(() => {
    scheduleNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scheduleNext]);

  return (
    <Component className={className} aria-label={text}>
      {displayChars.map((char, i) => (
        <span key={i}>{char}</span>
      ))}
    </Component>
  );
};
