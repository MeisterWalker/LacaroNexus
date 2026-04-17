"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MoneyfestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal-container",
          start: "top 80%",
        },
      });

      gsap.from(".hero-text", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-bgPrimary text-textPrimary selection:bg-accentMint/30">
      {/* Cinematic Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects/moneyfest-hero.png"
            alt="Moneyfest Interface Mockup"
            fill
            className="object-cover opacity-40 brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl hero-text">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-accentMint" />
              <span className="font-mono text-xs text-accentMint tracking-[0.4em] uppercase">
                BREAD_AND_BUTTER_PROJECT
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-8 leading-[0.9]">
              Moneyfest <br />
              <span className="text-accentMint italic">Lending</span>
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {["Next.js", "Supabase", "Groq AI", "PostgreSQL", "Tailwind"].map((tech) => (
                <span key={tech} className="px-4 py-2 bg-bgSecondary border border-border rounded-full font-mono text-[10px] tracking-widest text-textMuted uppercase">
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xl md:text-2xl text-textMuted max-w-2xl leading-relaxed font-light mb-12">
              An enterprise-grade lending ecosystem designed to automate the entire loan lifecycle—from AI-driven application auditing to automated repayment scoring.
            </p>

            <Link href="/#projects" className="group flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase transition-all hover:text-accentMint">
              <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accentMint transition-colors">
                ←
              </span>
              [ RETURN_TO_HQ ]
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-32 reveal-container">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-item">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8">
                The <span className="text-accentMint italic">Protocol</span>
              </h2>
              <div className="space-y-8 text-textMuted leading-relaxed">
                <p>
                  Moneyfest was built to solve the operational bottlenecks of manual micro-lending. By integrating AI verification and a robust PostgreSQL core, the system transforms a complex financial workflow into a hands-free automated engine.
                </p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="text-accentMint font-mono text-xs mt-1">01</span>
                    <div>
                      <h4 className="text-textPrimary font-mono text-sm uppercase mb-1">AI Audit Engine</h4>
                      <p className="text-sm">Utilizes Groq Vision for real-time receipt verification, reducing administrative overhead by 90% and ensuring 100% data integrity.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accentMint font-mono text-xs mt-1">02</span>
                    <div>
                      <h4 className="text-textPrimary font-mono text-sm uppercase mb-1">Risk-Based Scoring</h4>
                      <p className="text-sm">Automated credit scoring algorithm that adjusts borrower limits based on repayment performance and tenure, protecting capital liquidity.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accentMint font-mono text-xs mt-1">03</span>
                    <div>
                      <h4 className="text-textPrimary font-mono text-sm uppercase mb-1">Forecasting Console</h4>
                      <p className="text-sm">Custom-built financial projection engine that simulates ROI and capital growth across multi-year cycles with reinvestment toggles.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="reveal-item relative aspect-square lg:aspect-video rounded-2xl overflow-hidden border border-border bg-[#060D14] p-8">
              {/* Terminal View of Schema */}
              <div className="font-mono text-[10px] md:text-xs text-accentMint/80 leading-relaxed overflow-auto h-full scrollbar-hide">
                <div className="mb-4 opacity-40 italic">// SUPABASE_RELATIONAL_SCHEMA_V1.0</div>
                <div className="text-textPrimary font-bold mb-2 uppercase tracking-widest text-[11px] md:text-[13px] border-b border-accentMint/20 pb-2">Central_Control_Database</div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between border-b border-border/50 py-1">
                    <span>CREATE TABLE public.loans (</span>
                    <span className="text-textDim">[OK]</span>
                  </div>
                  <div className="pl-4 py-1 flex justify-between">
                    <span>borrower_id UUID,</span>
                    <span className="text-textDim">FK</span>
                  </div>
                  <div className="pl-4 py-1 flex justify-between">
                    <span>loan_amount NUMERIC,</span>
                    <span className="text-textDim">FLT</span>
                  </div>
                  <div className="pl-4 py-1 flex justify-between">
                    <span>risk_score TEXT,</span>
                    <span className="text-textDim">STR</span>
                  </div>
                  <div className="pl-4 py-1 flex justify-between">
                    <span>lifecycle_status STATUS,</span>
                    <span className="text-textDim">ENUM</span>
                  </div>
                  <div className="py-1">);</div>
                  <div className="h-4" />
                  <div className="flex justify-between border-b border-border/50 py-1">
                    <span>CREATE TABLE audit_logs (</span>
                    <span className="text-textDim">[OK]</span>
                  </div>
                  <div className="pl-4 py-1">action_type ACTION,</div>
                  <div className="pl-4 py-1">system_module MOD,</div>
                  <div className="py-1">);</div>
                </div>
                {/* Visual Data Overlay */}
                <div className="absolute bottom-12 right-12 w-32 h-32 md:w-48 md:h-48 rounded-full border-[10px] border-accentMint/20 flex items-center justify-center animate-pulse">
                   <div className="text-center font-mono">
                      <div className="text-[10px] text-textMuted">ROI_PROJECTED</div>
                      <div className="text-xl md:text-3xl text-accentMint font-bold">14.2%</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="py-32 bg-bgSecondary border-y border-border reveal-container">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Admin Dashboard",
                desc: "Real-time liquidity monitoring, capital growth tracking, and automated cutoff processing.",
                tag: "CONTROL_HUB"
              },
              {
                title: "Borrower Portal",
                desc: "Personalized access for real-time balances, installment schedules, and one-click proof uploads.",
                tag: "FRONTEND_EXPERIENCE"
              },
              {
                title: "Audit History",
                desc: "Comprehensive immutable logs of every system action for full financial accountability.",
                tag: "INTEGRITY_LOG"
              }
            ].map((feature, i) => (
              <div key={i} className="reveal-item bg-bgPrimary p-8 border border-border group hover:border-accentMint/30 transition-colors">
                <div className="font-mono text-[10px] text-accentMint mb-6 tracking-widest">{feature.tag}</div>
                <h3 className="text-xl font-light mb-4 uppercase italic tracking-tight">{feature.title}</h3>
                <p className="text-sm text-textMuted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 reveal-container">
         <div className="container mx-auto px-6 text-center">
            <div className="reveal-item max-w-2xl mx-auto">
               <div className="font-mono text-xs text-accentMint mb-6 tracking-[0.3em] uppercase">SYSTEM_STATE</div>
               <h2 className="text-4xl md:text-6xl font-light mb-12 tracking-tighter">Ready for <span className="text-accentMint italic">Production</span></h2>
               <p className="text-textMuted leading-relaxed mb-12">
                  Moneyfest is currently in production, managing high-volume loan cycles with zero manual intervention needed for verification. It serves as the primary case study for end-to-end full-stack automation.
               </p>
               <div className="flex justify-center flex-wrap gap-8">
                  <div className="text-center">
                     <div className="text-4xl font-bold text-accentMint mb-2 tracking-tighter">100%</div>
                     <div className="font-mono text-[10px] text-textDim uppercase tracking-widest">Automation_Level</div>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl font-bold text-accentMint mb-2 tracking-tighter">&lt; 1s</div>
                     <div className="font-mono text-[10px] text-textDim uppercase tracking-widest">Audit_Latency</div>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl font-bold text-accentMint mb-2 tracking-tighter">Zero</div>
                     <div className="font-mono text-[10px] text-textDim uppercase tracking-widest">Manual_Review</div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
