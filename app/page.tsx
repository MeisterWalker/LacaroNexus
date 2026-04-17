"use client";

import { useState } from "react";
import { ThreeBackground } from "../components/ui/ThreeBackground";
import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { AIIntegrations } from "../components/sections/AIIntegrations";
import { Certifications } from "../components/sections/Certifications";
import { Skills } from "../components/sections/Skills";
import { Contact } from "../components/sections/Contact";
import { BootScreen } from "../components/ui/BootScreen";
import { CurrentlyBuilding } from "../components/ui/CurrentlyBuilding";
import { PortfolioChat } from "../components/ui/PortfolioChat";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <div style={{ opacity: booted ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
        <ThreeBackground />
        <Hero />
        <Projects />
        <AIIntegrations />
        <Certifications />
        <Skills />
        <Contact />
        <CurrentlyBuilding />
        <PortfolioChat />
      </div>
    </>
  );
}
