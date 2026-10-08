"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GlyphPortalProps {
  /** The central word or glyph scaled into the camera portal */
  word?: string;
  /** Eyebrow or domain label above the portal */
  eyebrow?: string;
  /** Subtitle or technical descriptor */
  subtext?: string;
  /** Scroll track length in pixels (determines portal scrub duration) */
  scrollDistance?: number;
  /** Optional content revealed within or directly following the portal */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export function GlyphPortal({
  word = "SAGAR",
  eyebrow = "00 / PORTAL TRANSITION",
  subtext = "SCROLL-DRIVEN CAMERA TRAVERSAL THROUGH LIVING ARCHITECTURE",
  scrollDistance = 2200,
  children,
  className,
}: GlyphPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalPinRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLHeadingElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const revealContentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    const pin = portalPinRef.current;
    const glyph = glyphRef.current;
    const aperture = apertureRef.current;
    const reveal = revealContentRef.current;
    const meta = metaRef.current;

    if (!container || !pin || !glyph) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial Phase: Meta labels fade away as camera pushes in
      if (meta) {
        tl.to(meta, {
          opacity: 0,
          y: -40,
          scale: 0.95,
          ease: "power2.inOut",
          duration: 0.25,
        }, 0);
      }

      // 2. Camera Zoom Phase: Massive Glyph expands from 1x to 45x into the aperture
      tl.to(glyph, {
        scale: 45,
        opacity: 0,
        transformOrigin: "center center",
        ease: "power3.in",
        duration: 0.75,
      }, 0);

      // 3. Aperture Warp: Radial portal flare widens, blinding through the counter-space
      if (aperture) {
        tl.fromTo(
          aperture,
          { scale: 0.4, opacity: 0.15 },
          { scale: 8, opacity: 1, ease: "power2.inOut", duration: 0.65 },
          0.1
        ).to(aperture, { opacity: 0, ease: "power2.out", duration: 0.25 }, 0.75);
      }

      // 4. Reveal Phase: Target content comes into sharp focus through the portal
      if (reveal) {
        tl.fromTo(
          reveal,
          { opacity: 0, scale: 0.8, y: 60, filter: "blur(12px)" },
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.35 },
          0.65
        );
      }
    }, container);

    return () => ctx.revert();
  }, [scrollDistance]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full bg-bg text-paper overflow-hidden select-none", className)}
    >
      <div
        ref={portalPinRef}
        className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Background Grid & Perspective Ray Field */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(193,99,59,0.25)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42, 40, 34, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 40, 34, 0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Central Aperture Glow Flare */}
        <div
          ref={apertureRef}
          className="absolute w-[240px] h-[240px] rounded-full bg-gradient-to-r from-accent via-paper to-accent blur-[60px] pointer-events-none opacity-0 z-10"
        />

        {/* Meta Label Block */}
        <div
          ref={metaRef}
          className="absolute top-16 sm:top-20 z-20 flex flex-col items-center text-center px-4"
        >
          <span className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-accent font-semibold mb-2">
            {eyebrow}
          </span>
          <span className="font-mono text-[0.62rem] tracking-wider text-stone-400 uppercase max-w-md">
            {subtext}
          </span>
        </div>

        {/* The Scalable Hero Glyph */}
        <h2
          ref={glyphRef}
          className="relative z-10 font-display font-black text-[clamp(6rem,22vw,18rem)] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-paper via-stone-200 to-stone-600 will-change-transform leading-none"
          style={{
            filter: "drop-shadow(0 0 40px rgba(193, 99, 59, 0.15))",
          }}
        >
          {word}
        </h2>

        {/* Revealed Destination Node */}
        {children && (
          <div
            ref={revealContentRef}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto opacity-0"
          >
            {children}
          </div>
        )}

        {/* Bottom Traversal Status Cue */}
        <div className="absolute bottom-10 z-20 font-mono text-[0.58rem] tracking-[0.25em] uppercase text-stone-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span>Traverse Portal ↓</span>
        </div>
      </div>
    </div>
  );
}

export default GlyphPortal;
