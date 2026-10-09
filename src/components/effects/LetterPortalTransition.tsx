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
  const maskHoleRef = useRef<SVGGElement>(null);
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

      // Initial resting state
      gsap.set(shaderVignetteRef.current, { opacity: 0 });
      gsap.set(contentWrapperRef.current, { scale: 0.88, opacity: 0.35 });
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
        { opacity: 0, y: -30, duration: 0.25, ease: "power2.in" },
        0.02
      );
      tl.to(
        leftLettersRef.current,
        { opacity: 0, x: -160, duration: 0.35, ease: "power2.in" },
        0.05
      );
      tl.to(
        rightLettersRef.current,
        { opacity: 0, x: 160, duration: 0.35, ease: "power2.in" },
        0.05
      );

      // 3. Focal Aperture: SVG Mask Hole and Letter 'O' Rim expand massively
      tl.to(
        [maskHoleRef.current, focalLetterRef.current],
        {
          scale: targetScale,
          transformOrigin: "50% 50%",
          duration: 0.85,
          ease: "power2.inOut",
        },
        0.05
      );

      // 4. Sudden Shader Vignette sweeps in from all 4 sides of the screen
      tl.fromTo(
        shaderVignetteRef.current,
        { opacity: 0, scale: 1.15 },
        { opacity: 0.95, scale: 1, duration: 0.4, ease: "power1.inOut" },
        0.08
      );

      // 5. Revealed Section Content (The REAL Section 01) expands into full focus inside the expanding aperture
      tl.to(
        contentWrapperRef.current,
        { scale: 1, opacity: 1, duration: 0.65, ease: "power2.out" },
        0.18
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
        0.8
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

        {/* Sudden Shader Vignette (Closes in from all 4 sides of the screen) */}
        <div
          ref={shaderVignetteRef}
          className="absolute inset-0 pointer-events-none z-30 will-change-[opacity,transform]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(11, 10, 9, 0.8) 55%, #0b0a09 95%)",
            boxShadow: "inset 0 0 160px 90px rgba(11, 10, 9, 0.98)",
          }}
        />

        {/* SVG Aperture Mask Layer: Punches hole in dark overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="letter-o-aperture-mask">
              {/* Fill entire canvas with white (solid overlay) */}
              <rect width="100%" height="100%" fill="white" />
              {/* Focal letter 'O' counter hole (cutout through which Identity is visible!) */}
              <g
                ref={maskHoleRef}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              >
                <ellipse cx="50%" cy="50%" rx="32" ry="46" fill="black" />
              </g>
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

        {/* Main Typographic Stage: Word 'AUTONOMOUS' */}
        <div className="relative z-40 flex flex-col items-center justify-center w-full px-4 select-none">
          {/* Sub-label above word */}
          <div
            ref={badgeRef}
            className="font-mono text-[0.65rem] sm:text-xs tracking-[0.25em] text-accent uppercase font-semibold mb-3 flex items-center gap-2 will-change-transform"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>AUTONOMOUS SYSTEMS ARCHITECTURE</span>
          </div>

          {/* The Word with Focal Aperture Letter 'O' */}
          <div className="flex items-center justify-center font-display font-medium tracking-[0.06em] sm:tracking-[0.14em] text-[clamp(2.4rem,7vw,6.5rem)] text-paper uppercase">
            {/* Left Block: AUTON */}
            <span
              ref={leftLettersRef}
              className="inline-block tracking-tight text-paper will-change-transform"
            >
              AUTON
            </span>

            {/* Focal Letter 'O' Rim (Terracotta stroked lens perfectly aligned with the mask hole) */}
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
                className="absolute inset-0 rounded-full border border-accent/60 scale-95 pointer-events-none shadow-[0_0_20px_rgba(193,99,59,0.5)]"
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
      </div>
    </div>
  );
}

export default LetterPortalTransition;
