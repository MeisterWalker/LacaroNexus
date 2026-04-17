import React from "react";
import { siteData } from "../../lib/data";

export const Footer = () => {
  return (
    <footer className="border-t border-borderHighlight bg-bgPrimary py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-textPrimary font-light tracking-widest text-lg mb-2">
              {siteData.owner}
            </h4>
            <p className="font-mono text-xs text-textMuted uppercase tracking-widest">
              {siteData.role}
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-textMuted hover:text-accentMint transition-colors">
              GitHub
            </a>
            <a href="#" className="font-mono text-xs text-textMuted hover:text-accentMint transition-colors">
              LinkedIn
            </a>
            <a href="#" className="font-mono text-xs text-textMuted hover:text-accentMint transition-colors">
              Twitter
            </a>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-textDim tracking-widest">
            &copy; {new Date().getFullYear()} // ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};
