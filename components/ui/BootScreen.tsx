"use client";

import React, { useEffect, useState } from "react";
import { siteData } from "../../lib/data";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "SYSTEM BOOT v2.0.25",
  "────────────────────────────────",
  "> LOCATING NODE...............  CEBU CITY, PH",
  "> LOADING MODULES..............  NEXT.JS / REACT",
  "> MOUNTING AI SERVICES.........  GROQ / GEMINI",
  "> ESTABLISHING NODE MESH.......  80 NODES ACTIVE",
  `> AUTHENTICATING OPERATOR......  ${siteData.owner.toUpperCase()}`,
  "────────────────────────────────",
  "> ALL SYSTEMS NOMINAL",
  "> INITIALIZING INTERFACE...",
];

export const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<
    { text: string; fullyTyped: boolean; currentText: string }[]
  >([]);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const runSequence = async () => {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (isCancelled) return;

        const line = BOOT_LINES[i];

        // Add the line object
        setVisibleLines((prev) => [
          ...prev,
          { text: line, fullyTyped: false, currentText: "" },
        ]);

        // Typewriter effect
        for (let c = 0; c <= line.length; c++) {
          if (isCancelled) return;
          setVisibleLines((prev) => {
            const newLines = [...prev];
            newLines[newLines.length - 1].currentText = line.substring(0, c);
            if (c === line.length) {
              newLines[newLines.length - 1].fullyTyped = true;
            }
            return newLines;
          });
          // Typewriter speed
          await new Promise((resolve) => setTimeout(resolve, 15));
        }

        // Delay between lines
        const delay = Math.random() * 200 + 300; // 300-500ms
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      if (isCancelled) return;
      await new Promise((resolve) => setTimeout(resolve, 600)); // Pause

      setFadingOut(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Fade out duration
      
      if (!isCancelled) onComplete();
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999] bg-[#04080c] flex flex-col justify-start items-start p-8 md:p-16 transition-opacity duration-500 font-mono ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="max-w-full overflow-hidden text-[11px] md:text-[13px] leading-loose text-[#e2e8f0b3]">
        {visibleLines.map((lineObj, idx) => {
          // Check if it's one of the lines that should have a [ OK ] tag
          const textToRender = lineObj.currentText;
          const isTaskLine = textToRender.includes(".....");
          
          return (
            <div key={idx} className="whitespace-pre-wrap md:whitespace-pre break-all md:break-normal">
              {textToRender}
              {lineObj.fullyTyped && isTaskLine && (
                <span className="text-[#4FFFB0] ml-4 animate-pulse">
                  [ OK ]
                </span>
              )}
              {/* Blinking cursor on the active typing line */}
              {idx === visibleLines.length - 1 && !lineObj.fullyTyped && (
                <span className="inline-block w-2 bg-[#e2e8f0b3] h-[13px] ml-1 animate-[pulse_0.5s_infinite]" />
              )}
              {/* If it's the last line and it's fully typed (before fadeOut) */}
              {idx === visibleLines.length - 1 && lineObj.fullyTyped && (
                <span className="inline-block w-2 bg-[#e2e8f0b3] h-[13px] ml-1 animate-[pulse_0.5s_infinite]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
