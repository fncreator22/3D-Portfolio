"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE, PROJECTS, SKILL_DOMAINS } from "@/data/projects";
import { isTransitionEnabled } from "@/lib/motion-flags";

export function Identity() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1. Initial Content Reveal (Active when aperture portal is disabled)
      if (!isTransitionEnabled("HERO_TO_IDENTITY_PORTAL")) {
        gsap.from(".identity-reveal", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        });
      }

      // 2. Transition 02: 3D Deck Card Stacking & Tilt
      if (isTransitionEnabled("IDENTITY_TO_TRAJECTORY_STACK") && cardRef.current) {
        gsap.to(cardRef.current, {
          scale: 0.94,
          rotateX: 3.5,
          y: -24,
          filter: "brightness(0.75)",
          opacity: 0.85,
          transformOrigin: "center top",
          ease: "power1.out",
          scrollTrigger: {
            trigger: "#journey",
            start: "top 95%",
            end: "top 30%",
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="py-[clamp(3.5rem,7vw,7rem)] relative z-10 overflow-visible max-w-full"
      style={{ perspective: "1200px" }}
      aria-labelledby="identity-heading"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        {/* ─── 3D Card Deck: Section Card 01 ─── */}
        <div
          ref={cardRef}
          className="rounded-[28px] sm:rounded-[36px] bg-bg-raise/95 border border-line/80 shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(193,99,59,0.08)] p-6 sm:p-10 lg:p-14 transition-all duration-300 relative overflow-hidden will-change-transform"
        >
          {/* Subtle Ambient Rim Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-[90px] pointer-events-none" />

          {/* Section Header */}
          <div className="identity-reveal max-w-[820px] mb-8 sm:mb-12">
            <div className="eyebrow text-accent font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>01 / Identity &amp; Architecture</span>
            </div>
            {/* Space Grotesk 500 high-conviction headline without italic overload */}
            <h2
              id="identity-heading"
              className="font-display font-medium text-[clamp(1.85rem,4.2vw,3.1rem)] tracking-[-0.01em] mt-3 sm:mt-4 leading-[1.1] text-paper"
            >
              Taking systems from vague asks to{" "}
              <span className="text-accent font-medium">live production</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 items-start">
            {/* Left: Focused Architecture Summary & Telemetry Chips */}
            <div className="identity-reveal space-y-6">
              <p className="text-[clamp(0.95rem,1.25vw,1.1rem)] font-light text-stone-300 leading-relaxed">
                {PROFILE.summary}
              </p>

              {/* Empirical Telemetry Architecture Chips */}
              <div className="pt-2 border-t border-line/60">
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-stone-400 font-semibold mb-2.5">
                  Verified Engineering Invariants:
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono text-[0.68rem] sm:text-xs px-2.5 py-1 rounded-lg bg-bg border border-line text-stone-300 flex items-center gap-1.5">
                    <span className="text-accent font-bold">•</span>
                    <span>&lt;150ms P99 Voice Latency</span>
                  </span>
                  <span className="font-mono text-[0.68rem] sm:text-xs px-2.5 py-1 rounded-lg bg-bg border border-line text-stone-300 flex items-center gap-1.5">
                    <span className="text-accent font-bold">•</span>
                    <span>Deterministic Agent Evals</span>
                  </span>
                  <span className="font-mono text-[0.68rem] sm:text-xs px-2.5 py-1 rounded-lg bg-bg border border-line text-stone-300 flex items-center gap-1.5">
                    <span className="text-accent font-bold">•</span>
                    <span>Multi-Agent Sandboxing</span>
                  </span>
                  <span className="font-mono text-[0.68rem] sm:text-xs px-2.5 py-1 rounded-lg bg-bg border border-line text-stone-300 flex items-center gap-1.5">
                    <span className="text-accent font-bold">•</span>
                    <span>Zero-Breakdown CI Gates</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 2x2 Metric Grid with high-conviction typography */}
            <div className="identity-reveal grid grid-cols-2 gap-3.5 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-bg border border-line/90 hover:border-accent/60 active:scale-[0.98] shadow-md transition-all flex flex-col justify-between">
                <span className="font-display font-semibold text-3xl sm:text-4xl text-accent tracking-tight">
                  {PROJECTS.length}
                </span>
                <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">
                  Shipped Systems
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-bg border border-line/90 hover:border-accent/60 active:scale-[0.98] shadow-md transition-all flex flex-col justify-between">
                <span className="font-display font-semibold text-3xl sm:text-4xl text-accent tracking-tight">
                  {String(SKILL_DOMAINS.length).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">
                  Skill Domains
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-bg border border-line/90 hover:border-accent/60 active:scale-[0.98] shadow-md transition-all flex flex-col justify-between">
                <span className="font-display font-semibold text-3xl sm:text-4xl text-accent tracking-tight">
                  40+
                </span>
                <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">
                  Core Technologies
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-bg border border-line/90 hover:border-accent/60 active:scale-[0.98] shadow-md transition-all flex flex-col justify-between">
                <span className="font-display font-semibold text-3xl sm:text-4xl text-accent tracking-tight">
                  1+
                </span>
                <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">
                  Year Production Exp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Identity;
