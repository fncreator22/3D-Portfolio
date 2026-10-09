"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTransitionEnabled } from "@/lib/motion-flags";

interface LetterPortalTransitionProps {
  children: React.ReactNode;
}

export function LetterPortalTransition({ children }: LetterPortalTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const maskCircleRef = useRef<SVGCircleElement>(null);
  const leftLettersRef = useRef<HTMLSpanElement>(null);
  const focalLetterRef = useRef<HTMLSpanElement>(null);
  const rightLettersRef = useRef<HTMLSpanElement>(null);
  const shaderVignetteRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const conduitBeamRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const enabled = isTransitionEnabled("HERO_TO_IDENTITY_PORTAL");

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const targetScale = isMobile ? 18 : 28;
      const targetRadius = isMobile ? 850 : 1400;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial resting state: 0% opacity prevents ghost bleed inside resting aperture hole
      gsap.set(shaderVignetteRef.current, { opacity: 0 });
      gsap.set(contentWrapperRef.current, { scale: 0.82, opacity: 0, transformOrigin: "50% 45%" });
      if (conduitBeamRef.current) {
        gsap.set(conduitBeamRef.current, { scaleY: 0 });
      }

      // 1. Entrance Conduit Beam illumination (Connecting Hero to Portal)
      if (conduitBeamRef.current) {
        tl.to(
          conduitBeamRef.current,
          { scaleY: 1, duration: 0.15, ease: "none" },
          0
        );
      }

      // 2. Sub-badge and Outer letters disperse outward horizontally and fade out
      tl.to(
        badgeRef.current,
        { opacity: 0, y: -24, duration: 0.22, ease: "power2.in" },
        0.02
      );
      tl.to(
        leftLettersRef.current,
        { opacity: 0, x: -180, duration: 0.35, ease: "power2.in" },
        0.04
      );
      tl.to(
        rightLettersRef.current,
        { opacity: 0, x: 180, duration: 0.35, ease: "power2.in" },
        0.04
      );

      // 3. Focal Aperture: SVG Mask Hole and Letter 'O' Rim expand concentrically
      tl.to(
        focalLetterRef.current,
        {
          scale: targetScale,
          transformOrigin: "50% 50%",
          duration: 0.85,
          ease: "power2.inOut",
        },
        0.05
      );
      if (maskCircleRef.current) {
        tl.to(
          maskCircleRef.current,
          {
            attr: { r: targetRadius },
            duration: 0.85,
            ease: "power2.inOut",
          },
          0.05
        );
      }

      // 4. Subtle ambient vignette at outer perimeter
      tl.fromTo(
        shaderVignetteRef.current,
        { opacity: 0, scale: 1.15 },
        { opacity: 0.6, scale: 1, duration: 0.4, ease: "power1.inOut" },
        0.08
      );

      // 5. Revealed Section Content (The REAL Section 01):
      // Smoothly emerges from within the expanding aperture hole, zooming organically into view!
      tl.fromTo(
        contentWrapperRef.current,
        { scale: 0.82, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.62, ease: "power2.out" },
        0.12
      );

      // Stagger internal Identity elements to align with aperture reveal
      tl.fromTo(
        ".identity-reveal",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.48, stagger: 0.07, ease: "power2.out" },
        0.22
      );

      // 6. As 'O' expands past viewport bounds, shader vignette and aperture overlay dissolve smoothly
      tl.to(
        shaderVignetteRef.current,
        { opacity: 0, duration: 0.25, ease: "power1.out" },
        0.72
      );
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.2, ease: "power1.out" },
        0.78
      );
    }, containerRef);

    return () => ctx.revert();
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      id="identity-portal"
      className="relative w-full overflow-hidden bg-bg select-none"
      aria-label="Typographic Aperture Portal Transition"
    >
      {/* Target Content: The REAL Section 01 (Identity) rendered directly without duplication */}
      <div
        ref={contentWrapperRef}
        className="relative z-10 w-full will-change-[transform,opacity]"
      >
        {children}
      </div>

      {/* Fullscreen Aperture Overlay: Pinned on top of Identity */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden will-change-[opacity]"
      >
        {/* Top Connecting Conduit Beam */}
        <div
          ref={conduitBeamRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-24 bg-gradient-to-b from-accent to-transparent origin-top pointer-events-none z-40"
        />

        {/* Cyber Background Grid for Atmospheric Depth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42, 40, 34, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 40, 34, 0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Subtle Ambient Vignette for Atmospheric Depth */}
        <div
          ref={shaderVignetteRef}
          className="absolute inset-0 pointer-events-none z-15 will-change-[opacity,transform]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 35%, rgba(11, 10, 9, 0.6) 70%, #0b0a09 100%)",
          }}
        />

        {/* SVG Aperture Mask Layer: Punches circular hole in dark overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        >
          <defs>
            <mask id="letter-o-aperture-mask">
              {/* Fill entire canvas with white (solid overlay) */}
              <rect width="100%" height="100%" fill="white" />
              {/* Focal circular counter hole (cutout through which Identity is revealed) */}
              <circle
                ref={maskCircleRef}
                cx="50%"
                cy="50%"
                r="36"
                fill="black"
              />
            </mask>
          </defs>
          {/* Dark base surface masked with the aperture hole */}
          <rect
            width="100%"
            height="100%"
            fill="#0b0a09"
            mask="url(#letter-o-aperture-mask)"
          />
        </svg>

        {/* Main Typographic Stage: Word 'AUTONOMOUS' dead-centered in viewport */}
        <div className="relative z-40 flex items-center justify-center w-full px-4 select-none">
          {/* Sub-label above word, positioned absolutely so the word remains dead-centered at 50% Y */}
          <div
            ref={badgeRef}
            className="absolute bottom-full mb-3.5 sm:mb-5 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] sm:text-xs tracking-[0.25em] text-accent uppercase font-semibold flex items-center gap-2 will-change-transform whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>AUTONOMOUS SYSTEMS ARCHITECTURE</span>
          </div>

          {/* The Word with Focal Aperture Letter 'O' - 100% Mathematically Concentric */}
          <div className="flex items-center justify-center w-full font-display font-medium tracking-[0.06em] sm:tracking-[0.14em] text-[clamp(2.4rem,7vw,6.5rem)] text-paper uppercase">
            {/* Left Block: AUTON (pinned right-aligned to center) */}
            <div className="flex-1 flex justify-end">
              <span
                ref={leftLettersRef}
                className="inline-block tracking-tight text-paper will-change-transform pr-[0.04em]"
              >
                AUTON
              </span>
            </div>

            {/* Focal Letter 'O' Rim (Terracotta circular lens concentric with mask hole) */}
            <div className="shrink-0 flex items-center justify-center">
              <span
                ref={focalLetterRef}
                className="w-[1.04em] h-[1.04em] aspect-square inline-flex items-center justify-center relative mx-[0.04em] will-change-transform"
                style={{ transformOrigin: "50% 50%" }}
              >
                {/* Geometrically Perfect Circular Lens Ring representing 'O' */}
                <svg
                  className="w-full h-full text-accent select-none relative z-10"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="11"
                  aria-hidden="true"
                >
                  <circle cx="50" cy="50" r="40" />
                </svg>
                {/* Concentric aperture glowing ring - 100% symmetric circle */}
                <span
                  className="absolute inset-0 rounded-full border border-accent/60 scale-95 pointer-events-none shadow-[0_0_24px_rgba(193,99,59,0.55)]"
                  aria-hidden="true"
                />
              </span>
            </div>

            {/* Right Block: MOUS (pinned left-aligned to center) */}
            <div className="flex-1 flex justify-start">
              <span
                ref={rightLettersRef}
                className="inline-block tracking-tight text-paper will-change-transform pl-[0.04em]"
              >
                MOUS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterPortalTransition;
