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
        const mm = gsap.matchMedia();

        // Desktop: 3D card tilt & subtle stack perspective (only triggers once Journey ascends near the center)
        mm.add("(min-width: 1024px)", () => {
          gsap.to(cardRef.current, {
            scale: 0.95,
            rotateX: 3.0,
            y: -20,
            filter: "brightness(0.8)",
            opacity: 0.9,
            transformOrigin: "center top",
            ease: "power1.out",
            scrollTrigger: {
              trigger: "#journey",
              start: "top 45%",
              end: "top 15%",
              scrub: 0.8,
            },
          });
        });

        // Mobile: Preserve 100% brightness, full opacity, and clean scale without premature dimming
        mm.add("(max-width: 1023px)", () => {
          gsap.to(cardRef.current, {
            scale: 1,
            y: 0,
            filter: "none",
            opacity: 1,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: "#journey",
              start: "top 40%",
              end: "top 10%",
              scrub: 0.8,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="relative z-10 w-full min-h-[100svh] flex flex-col justify-center overflow-visible pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-24 select-text pointer-events-auto"
      style={{ perspective: "1200px", userSelect: "text", WebkitUserSelect: "text" }}
      aria-labelledby="identity-heading"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)] w-full select-text">
        {/* ─── De-boxified Organic Architecture: Section 01 Stage ─── */}
        <div
          ref={cardRef}
          className="relative transition-all duration-300 will-change-transform select-text"
        >
          {/* Subtle Ambient Radial Lighting for Seamless Canvas Depth */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[840px] h-72 bg-accent/[0.035] blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 -right-24 w-80 h-80 bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

          {/* Section Header */}
          <div className="identity-reveal max-w-[820px] mb-8 sm:mb-12 relative z-10 select-text">
            <div className="eyebrow text-accent font-semibold flex items-center gap-2 select-text">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>01 / Identity &amp; Architecture</span>
            </div>
            {/* Space Grotesk 500 high-conviction headline */}
            <h2
              id="identity-heading"
              className="font-display font-medium text-[clamp(1.85rem,4.2vw,3.1rem)] tracking-[-0.01em] mt-3 sm:mt-4 leading-[1.1] text-paper select-text cursor-text"
              style={{ userSelect: "text", WebkitUserSelect: "text" }}
            >
              Taking systems from vague asks to{" "}
              <span className="text-accent font-medium select-text">live production</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 items-start relative z-10 select-text">
            {/* Left: Focused Architecture Summary & Telemetry Chips */}
            <div className="identity-reveal space-y-6 select-text">
              <p 
                className="text-[clamp(0.95rem,1.25vw,1.1rem)] font-light text-stone-300 leading-relaxed select-text cursor-text"
                style={{ userSelect: "text", WebkitUserSelect: "text" }}
              >
                {PROFILE.summary}
              </p>
            </div>

            {/* Right: 2x2 Sleek Architectural Telemetry Stats */}
            <div className="identity-reveal grid grid-cols-2 gap-3.5 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-accent/40 active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group">
                <span className="font-display font-semibold text-3xl sm:text-4xl text-accent tracking-tight group-hover:scale-105 transition-transform origin-left">
                  {PROJECTS.length}
                </span>
                <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">
                  Shipped Systems
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-accent/40 active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group">
                <span className="font-display font-semibold text-3xl sm:text-4xl text-accent tracking-tight group-hover:scale-105 transition-transform origin-left">
                  {String(SKILL_DOMAINS.length).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">
                  Skill Domains
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-accent/40 active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group">
                <span className="font-display font-semibold text-3xl sm:text-4xl text-accent tracking-tight group-hover:scale-105 transition-transform origin-left">
                  40+
                </span>
                <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">
                  Core Technologies
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-accent/40 active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group">
                <span className="font-display font-semibold text-3xl sm:text-4xl text-accent tracking-tight group-hover:scale-105 transition-transform origin-left">
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
