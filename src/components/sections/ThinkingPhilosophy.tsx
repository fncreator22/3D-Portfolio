"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTransitionEnabled } from "@/lib/motion-flags";

interface InvariantBeacon {
  id: string;
  step: string;
  label: string;
  tag: string;
  detail: string;
}

const INVARIANT_BEACONS: InvariantBeacon[] = [
  {
    id: "propose",
    step: "01",
    label: "Propose",
    tag: "Probabilistic",
    detail: "Generative models explore and hypothesize actions.",
  },
  {
    id: "witness",
    step: "02",
    label: "Witness",
    tag: "Deterministic",
    detail: "Structural AST proofs verify system invariants.",
  },
  {
    id: "enforce",
    step: "03",
    label: "Enforce",
    tag: "Atomic",
    detail: "Sandboxed state commits or guarantees instant rollback.",
  },
];

const MANIFESTO_LINES = [
  {
    text: "Never ship blind autonomy.",
    accent: false,
  },
  {
    text: "Every autonomous system requires a deterministic witness:",
    accent: false,
  },
  {
    text: "verify before trust, guarantee atomic rollback.",
    accent: true,
  },
];

export function ThinkingPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const horizonLineRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const meridianTrackRef = useRef<HTMLDivElement>(null);

  const [activeBeaconIndex, setActiveBeaconIndex] = useState<number>(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Bespoke Horizon & 3D Depth Entrance Transition from Section 04 (Horizontal Projects)
      // Card lifts gracefully with depth perspective while an ambient terracotta horizon flare draws across the card
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            y: 85,
            scale: 0.94,
            rotateX: -4,
            opacity: 0.75,
            transformOrigin: "center bottom",
          },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "top 40%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Radiant Horizon Seam Expansion
      if (horizonLineRef.current) {
        gsap.fromTo(
          horizonLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              end: "top 50%",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Kinetic Typography Scrub: Words illuminate organically with scroll progress
      const words = textContainerRef.current?.querySelectorAll(".creed-word");
      if (words && isTransitionEnabled("PROJECTS_TO_PHILOSOPHY_BLADE")) {
        gsap.to(words, {
          opacity: 1,
          color: "#efe9df",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 78%",
            end: "bottom 55%",
            scrub: true,
          },
        });
      }

      // 4. Kinetic Meridian Rail Scrub
      if (meridianTrackRef.current) {
        ScrollTrigger.create({
          trigger: meridianTrackRef.current,
          start: "top 85%",
          end: "bottom 45%",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              setActiveBeaconIndex(0);
            } else if (p < 0.72) {
              setActiveBeaconIndex(1);
            } else {
              setActiveBeaconIndex(2);
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeBeacon = INVARIANT_BEACONS[activeBeaconIndex];

  return (
    <section
      ref={sectionRef}
      id="thinking"
      className="min-h-[85vh] lg:min-h-[90vh] py-[clamp(4.5rem,8vw,8rem)] flex items-center justify-center relative z-10 overflow-visible max-w-full"
      style={{ perspective: "1200px" }}
      aria-labelledby="thinking-heading"
    >
      <div className="max-w-[1240px] w-full mx-auto px-[clamp(1rem,5vw,4rem)]">
        {/* ─── Architectural Obsidian Card (Clean, Classic, Animated) ─── */}
        <div
          ref={cardRef}
          className="rounded-[28px] sm:rounded-[38px] bg-bg-raise/95 border border-line/90 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(193,99,59,0.12)] p-7 sm:p-12 lg:p-16 relative overflow-hidden will-change-transform"
        >
          {/* Luminous Terracotta Horizon Seam (Draws smoothly across top edge) */}
          <div
            ref={horizonLineRef}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent origin-center shadow-[0_0_16px_rgba(193,99,59,0.9)] pointer-events-none"
          />

          {/* Ambient Radial Depth Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-64 bg-accent/[0.05] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-accent/[0.03] rounded-full blur-[90px] pointer-events-none" />

          {/* Section Eyebrow Header */}
          <div
            id="thinking-heading"
            className="eyebrow text-accent font-semibold flex items-center gap-2 relative z-10 mb-6 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>05 / Engineering Conviction</span>
          </div>

          {/* Monumental Kinetic Creed (Clean, Classic, Under 25 Words) */}
          <div
            ref={textContainerRef}
            className="max-w-[960px] relative z-10 space-y-3 sm:space-y-4"
          >
            <h2 className="font-display font-medium text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.12] tracking-[-0.02em] text-paper">
              {MANIFESTO_LINES[0].text.split(" ").map((w, i) => (
                <span
                  key={i}
                  className="creed-word opacity-40 transition-opacity inline-block mr-[0.25em]"
                >
                  {w}
                </span>
              ))}
            </h2>

            <p className="font-display font-light text-[clamp(1.3rem,2.8vw,2.1rem)] leading-[1.28] tracking-[-0.01em] text-stone-300">
              {MANIFESTO_LINES[1].text.split(" ").map((w, i) => (
                <span
                  key={i}
                  className="creed-word opacity-40 transition-opacity inline-block mr-[0.25em]"
                >
                  {w}
                </span>
              ))}
              <span className="text-accent font-medium inline">
                {" " + MANIFESTO_LINES[2].text}
              </span>
            </p>
          </div>

          {/* ─── Minimal Kinetic Invariant Meridian (Zero AI-Slop Boxes) ─── */}
          <div
            ref={meridianTrackRef}
            className="mt-10 sm:mt-14 pt-7 border-t border-line/60 relative z-10"
          >
            {/* Interactive Linear Meridian Rail */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left: 3 Precision Typographic Anchors along a continuous laser track */}
              <div className="flex items-center gap-6 sm:gap-8">
                {INVARIANT_BEACONS.map((beacon, idx) => {
                  const isActive = activeBeaconIndex === idx;

                  return (
                    <button
                      key={beacon.id}
                      type="button"
                      onClick={() => setActiveBeaconIndex(idx)}
                      className="group flex items-center gap-2 cursor-pointer transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-full py-1 text-left"
                      aria-label={`Select invariant principle ${beacon.step}: ${beacon.label}`}
                    >
                      {/* Status indicator dot */}
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-accent shadow-[0_0_12px_rgba(193,99,59,0.9)] scale-125"
                            : "bg-line/90 group-hover:bg-accent/60"
                        }`}
                      />

                      {/* Monospace Step + Label */}
                      <span
                        className={`font-mono text-xs sm:text-sm tracking-wider uppercase transition-colors ${
                          isActive
                            ? "text-paper font-semibold"
                            : "text-stone-400 group-hover:text-stone-300"
                        }`}
                      >
                        <span className="text-accent mr-1 font-normal">{beacon.step}</span>
                        {beacon.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Dynamic Single Monospace Precision Readout (No boxes, no cards) */}
              <div className="flex items-center gap-2 font-mono text-[0.72rem] sm:text-xs text-stone-300 py-1.5 px-3 rounded-full bg-white/[0.02] border border-line/50 w-fit backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span className="text-accent font-semibold uppercase tracking-wider">
                  [{activeBeacon.tag}]
                </span>
                <span className="text-stone-300 transition-all duration-200">
                  {activeBeacon.detail}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThinkingPhilosophy;
