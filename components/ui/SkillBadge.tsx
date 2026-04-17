import React from "react";
import { GlitchText } from "./GlitchText";

interface SkillBadgeProps {
  skill: string;
}

export const SkillBadge = ({ skill }: SkillBadgeProps) => {
  return (
    <div className="group border border-borderHighlight bg-bgSecondary/50 px-4 py-2 hover:bg-bgSecondary transition-all duration-300">
      <GlitchText
        text={skill}
        className="text-textMuted group-hover:text-accentCyan text-sm tracking-widest"
      />
    </div>
  );
};
