"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { currentlyBuilding } from "../../lib/data";

export const CurrentlyBuilding = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after boot sequence (e.g., assuming boot takes ~2s max overall finish to slide in)
    const timeout = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-50 font-mono text-[11px]"
        >
          <motion.div
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            animate={{ width: isExpanded ? 300 : 130 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden whitespace-nowrap bg-[rgba(4,8,12,0.9)] border border-[rgba(79,255,176,0.2)] px-4 py-2 text-[rgba(226,232,240,0.6)] backdrop-blur-md cursor-default flex items-center"
          >
            <div className="flex-shrink-0 flex items-center h-full mr-3 relative w-1.5 h-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FFFB0] opacity-75 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4FFFB0]" />
            </div>

            <div className="flex flex-col justify-center min-w-[300px]">
              <div>
                <span className="text-[#4FFFB0] tracking-widest">{">"} BUILDING</span>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-2 uppercase text-textMuted tracking-wider"
                    >
                      {currentlyBuilding.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="mt-2 text-[10px]"
                >
                  <div className="text-[rgba(226,232,240,0.8)] whitespace-normal max-w-[260px] leading-relaxed">
                    [ {currentlyBuilding.description} ]
                  </div>
                  <div className="text-textDim tracking-widest mt-1">
                    STARTED: {currentlyBuilding.startedAt.toUpperCase()}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
