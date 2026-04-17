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
    <div ref={containerRef} className="min-h-screen bg-bgPrimary text-textPrimary selection:bg-accentMint/30 pb-20">
      {/* Subtle Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects/moneyfest-overview.png"
            alt="Moneyfest Overview"
            fill
            className="object-cover opacity-20 blur-xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary via-transparent to-bgPrimary/50" />
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

            <p className="text-xl md:text-2xl text-textMuted max-w-2xl leading-relaxed font-light mb-12 italic">
              "Automating financial trust through high-speed Vision-Language Models."
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

      {/* Narrative Section: The AI Integration */}
      <section className="py-32 reveal-container">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-24 reveal-item">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              The AI <span className="text-accentMint italic">Audit Engine</span>
            </h2>
            <p className="text-lg text-textMuted leading-relaxed mb-8">
              The core innovation of Moneyfest is its **automated proof-of-payment auditing**. Instead of manual review by administrators, I implemented a Vision-Language Model (VLM) pipeline that performs financial verification in under 1.5 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12 reveal-item">
              <div>
                <h4 className="font-mono text-xs text-accentMint uppercase tracking-widest mb-4">// Extraction_Protocol</h4>
                <p className="text-textMuted leading-relaxed">
                  Using **Llama-3-70b-Vision via the Groq API**, the system processes uploaded GCash and Maya screenshots. It extracts high-criticality fields such as:
                </p>
                <ul className="mt-4 space-y-2 font-mono text-[11px] text-accentMint/70">
                  <li className="flex gap-2"><span>[+]</span> BANK_REF_NUMBER (Primary Key for Deduplication)</li>
                  <li className="flex gap-2"><span>[+]</span> TRANSACTION_DATE (Payment Timeliness Check)</li>
                  <li className="flex gap-2"><span>[+]</span> PAID_AMOUNT (Validation against Installment Due)</li>
                  <li className="flex gap-2"><span>[+]</span> RECEIVER_IDENTITY (Security Verification)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs text-accentMint uppercase tracking-widest mb-4">// Verification_Logic</h4>
                <p className="text-textMuted leading-relaxed">
                  Once data is extracted, a custom backend logic cross-references the AI output with our **PostgreSQL/Supabase** records. If the amount matches and the reference number is unique, the loan installment is automatically marked as **PAID** and the borrower's credit score is updated in real-time.
                </p>
              </div>
            </div>

            <div className="reveal-item bg-[#060D14] p-8 border border-border rounded-xl font-mono text-[11px] md:text-xs">
               <div className="flex justify-between items-center mb-6 text-textDim uppercase tracking-tighter">
                  <span>SYSTEM_PROMPT.md</span>
                  <span className="text-[9px]">ENCRYPTION_MODE: AES-256</span>
               </div>
               <div className="text-accentMint/80 space-y-4">
                  <p className="text-textPrimary brightness-125"># TASK: Extract payment details from the provided financial receipt.</p>
                  <p className="opacity-60">
                    Parse the following image and return ONLY a JSON object: <br />
                    &#123; <br />
                    &nbsp;&nbsp; &quot;amount&quot;: number, <br />
                    &nbsp;&nbsp; &quot;ref_no&quot;: string, <br />
                    &nbsp;&nbsp; &quot;date&quot;: date_iso, <br />
                    &nbsp;&nbsp; &quot;is_valid_receipt&quot;: boolean <br />
                    &#125;
                  </p>
                  <div className="h-[1px] bg-border my-6" />
                  <p className="text-textPrimary brightness-125">// AI_INFERENCE_OUTPUT (Lat: 1.25s)</p>
                  <p className="text-[#FBBF24]">
                    &#123; <br />
                    &nbsp;&nbsp; &quot;amount&quot;: 2500.00, <br />
                    &nbsp;&nbsp; &quot;ref_no&quot;: &quot;9028-112-9833&quot;, <br />
                    &nbsp;&nbsp; &quot;date&quot;: &quot;2026-03-20&quot;, <br />
                    &nbsp;&nbsp; &quot;is_valid_receipt&quot;: true <br />
                    &#125;
                  </p>
                  <p className="text-xs text-green-500 font-bold mt-4 animate-pulse">
                    &gt; MATCH_FOUND: DB_INSTALLMENT_V3 // STATUS: AUTO_CONFIRMED
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Contextual Stats */}
      <section className="py-32 bg-bgSecondary/30 border-y border-border reveal-container">
         <div className="container mx-auto px-6 text-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { label: "Audit Latency", val: "1.25s" },
                  { label: "Data Integrity", val: "100%" },
                  { label: "AI Model", val: "Llama-V3" },
                  { label: "Pipeline", val: "Vision-LLM" }
               ].map((stat, i) => (
                  <div key={i} className="reveal-item">
                     <div className="font-mono text-[10px] text-textDim uppercase tracking-widest mb-2">{stat.label}</div>
                     <div className="text-3xl font-bold text-accentMint tracking-tighter">{stat.val}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Architecture Detail */}
      <section className="py-32 reveal-container">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-item order-2 lg:order-1 relative aspect-video bg-bgSecondary border border-border rounded-2xl p-8 flex flex-col justify-center">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-4 h-4 rounded-full border-2 border-accentMint" />
                     <div className="h-[1px] w-full bg-border" />
                     <div className="w-4 h-4 rounded-full bg-accentMint" />
                  </div>
                  <div className="flex justify-between font-mono text-[9px] text-textDim uppercase tracking-widest">
                     <span>Borrower_Upload</span>
                     <span>Inference_Engine</span>
                     <span>DB_Ledger</span>
                  </div>
                  <p className="text-xs text-textMuted italic pt-4">
                    The horizontal pipeline ensures that no payment is processed without a cryptographic cross-check against the AI's JSON output.
                  </p>
               </div>
            </div>

            <div className="reveal-item order-1 lg:order-2">
              <h2 className="text-3xl font-light tracking-tight mb-8 uppercase italic">Technical <span className="text-accentMint tracking-normal not-italic underline decoration-accentMint/30">Architecture</span></h2>
              <p className="text-textMuted leading-relaxed mb-6">
                The implementation leverages **Next.js Edge Functions** to handle high-speed API calls to Groq, ensuring the user experience remains fluid even during peak collection days (5th and 20th of each month). 
              </p>
              <p className="text-textMuted leading-relaxed">
                By offloading the "Visual Audit" to an LLM, the platform eliminates the need for 24/7 human supervision, allowing the system to scale predictably with the borrower base.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
