import React from "react";

interface CertCardProps {
  id: string;
  issuer: string;
  course: string;
  date: string;
}

export const CertCard = ({ id, issuer, course, date }: CertCardProps) => {
  return (
    <div className="group border-b border-borderHighlight py-8 hover:px-4 duration-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden bg-bgPrimary hover:bg-bgSecondary/30">
      <div className="absolute left-0 top-0 h-full w-[2px] bg-accentMint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div>
        <p className="font-mono text-xs text-accentMint mb-2">{issuer}</p>
        <h3 className="text-xl text-textPrimary font-light tracking-wide">
          {course}
        </h3>
      </div>
      
      <div className="text-left md:text-right">
        <p className="font-mono text-sm text-textMuted">{date}</p>
        <p className="font-mono text-xs text-textDim tracking-widest mt-1">
          {id}
        </p>
      </div>
    </div>
  );
};
