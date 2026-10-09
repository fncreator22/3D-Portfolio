"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTransitionEnabled } from "@/lib/motion-flags";

export function LetterPortalTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftLettersRef = useRef<HTMLSpanElement>(null);
  const focalLetterRef = useRef<HTMLSpanElement>(null);
  const rightLettersRef = useRef<HTMLSpanElement>(null);
  const shaderVignetteRef = useRef<HTMLDivElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);
  const conduitBeamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isTransitionEnabled("HERO_TO_IDENTITY_PORTAL")) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const targetScale = isMobile ? 18 : 28;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial State: outer letters at rest, shader hidden, preview card scaled back
      gsap.set(shaderVignetteRef.current, { opacity: 0 });
      gsap.set(previewCardRef.current, { opacity: 0, scale: 0.72 });
      if (conduitBeamRef.current) {
        gsap.set(conduitBeamRef.current, { scaleY: 0 });
      }

      // 1. Entrance Conduit Beam illumination (Connecting Hero to Portal)
      if (conduitBeamRef.current) {
        tl.to(conduitBeamRef.current, {
          scaleY: 1,
          duration: 0.2,
          ease: "none",
        }, 0);
      }

      // 2. Outer letters disperse outward horizontally and fade out
      tl.to(leftLettersRef.current, {
        opacity: 0,
        x: -150,
        duration: 0.35,
        ease: "power2.in",
      }, 0.05);

      tl.to(rightLettersRef.current, {
        opacity: 0,
        x: 150,
        duration: 0.35,
        ease: "power2.in",
      }, 0.05);

      // 3. Focal Letter 'O' expands massively to take over the screen
      tl.to(focalLetterRef.current, {
        scale: targetScale,
        transformOrigin: "50% 50%",
        duration: 0.85,
        ease: "power2.inOut",
      }, 0.05);

      // 4. Sudden Shader Vignette sweeps in from all 4 sides of the screen
      tl.fromTo(
        shaderVignetteRef.current,
        { opacity: 0, scale: 1.15 },
        { opacity: 0.95, scale: 1, duration: 0.45, ease: "power1.inOut" },
        0.1
      );

      // 5. Revealed Section content emerges from INSIDE the expanding letter 'O'
      tl.fromTo(
        previewCardRef.current,
        { opacity: 0, scale: 0.7, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.35
      );

      // 6. As 'O' expands past viewport bounds, shader smoothly dissolves to reveal Identity
      tl.to(shaderVignetteRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
      }, 0.78);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isTransitionEnabled("HERO_TO_IDENTITY_PORTAL")) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-bg flex items-center justify-center z-20 select-none"
      aria-label="Typographic Portal Transition"
    >
      {/* Top Connecting Conduit Beam */}
      <div
        ref={conduitBeamRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-gradient-to-b from-accent to-transparent origin-top pointer-events-none z-10"
      />

      {/* Cyber Background Grid for Atmospheric Depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(42, 40, 34, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 40, 34, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Sudden Shader Vignette (Closes in from all sides of the screen) */}
      <div
        ref={shaderVignetteRef}
        className="absolute inset-0 pointer-events-none z-30 will-change-[opacity,transform]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(11, 10, 9, 0.75) 55%, #0b0a09 95%)",
          boxShadow: "inset 0 0 140px 80px rgba(11, 10, 9, 0.95)",
        }}
      />

      {/* Main Typographic Stage: Word 'AUTONOMOUS' */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
        {/* Sub-label above word */}
        <div className="font-mono text-[0.65rem] sm:text-xs tracking-[0.25em] text-accent uppercase font-semibold mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>APERTURE TRANSITION 01</span>
        </div>

        {/* The Word with Focal Aperture Letter 'O' */}
        <div className="flex items-center justify-center font-display font-medium tracking-[0.06em] sm:tracking-[0.14em] text-[clamp(2.4rem,7vw,6.5rem)] text-paper uppercase select-none">
          {/* Left Block: AUTON */}
          <span
            ref={leftLettersRef}
            className="inline-block tracking-tight text-paper will-change-transform"
          >
            AUTON
          </span>

          {/* Focal Letter 'O' (Expands 28x into fullscreen portal aperture) */}
          <span
            ref={focalLetterRef}
            className="inline-flex items-center justify-center relative mx-[0.04em] will-change-transform"
            style={{ transformOrigin: "50% 50%" }}
          >
            <span className="font-display font-semibold text-accent relative z-10">
              O
            </span>
            {/* Concentric aperture glowing ring inside letter counter */}
            <span
              className="absolute inset-0 rounded-full border border-accent/40 scale-90 animate-pulse pointer-events-none"
              aria-hidden="true"
            />
          </span>

          {/* Right Block: MOUS */}
          <span
            ref={rightLettersRef}
            className="inline-block tracking-tight text-paper will-change-transform"
          >
            MOUS
          </span>
        </div>
      </div>

      {/* Revealed Section Preview (Emerges from INSIDE the expanding letter 'O') */}
      <div
        ref={previewCardRef}
        className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none p-4 sm:p-8"
      >
        <div className="max-w-[780px] w-full p-6 sm:p-10 rounded-[28px] bg-bg-raise/95 border border-accent/50 shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(193,99,59,0.2)] text-center backdrop-blur-xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/40 mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-[0.65rem] tracking-widest text-accent uppercase font-semibold">
              SECTION 01 / ARCHITECTURAL IDENTITY
            </span>
          </div>

          <h2 className="font-display font-medium text-[clamp(1.65rem,4vw,2.75rem)] tracking-tight text-paper leading-[1.12] mb-3">
            Engineering Systems From Vague Asks to <span className="text-accent">Live Production</span>.
          </h2>

          <p className="text-stone-300 font-light text-xs sm:text-sm max-w-[540px] mx-auto leading-relaxed mb-5">
            High-conviction architectures that evaluate, verify, and execute deterministically under real production constraints.
          </p>

          {/* Empirical Telemetry Architecture Chips */}
          <div className="flex flex-wrap justify-center gap-2 max-w-[520px] mx-auto">
            <span className="font-mono text-[0.62rem] sm:text-xs px-2.5 py-1 rounded-lg bg-bg border border-line text-stone-300 font-medium">
              ⚡ &lt;150ms P99 Voice
            </span>
            <span className="font-mono text-[0.62rem] sm:text-xs px-2.5 py-1 rounded-lg bg-bg border border-line text-stone-300 font-medium">
              🛡️ Deterministic Evals
            </span>
            <span className="font-mono text-[0.62rem] sm:text-xs px-2.5 py-1 rounded-lg bg-bg border border-line text-stone-300 font-medium">
              📦 16 Shipped Systems
            </span>
            <span className="font-mono text-[0.62rem] sm:text-xs px-2.5 py-1 rounded-lg bg-bg border border-line text-stone-300 font-medium">
              🔒 Multi-Agent Sandboxing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterPortalTransition;
