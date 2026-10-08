"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTIONS = [
  { id: "hero", label: "Intro", code: "00" },
  { id: "identity", label: "Identity", code: "01" },
  { id: "journey", label: "Journey", code: "02" },
  { id: "skills", label: "Skills", code: "03" },
  { id: "projects", label: "Work", code: "04" },
  { id: "thinking", label: "Think", code: "05" },
  { id: "invariants", label: "Contact", code: "06" },
  { id: "connect", label: "Connect", code: "07" },
];

export function ScrollSpine() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const spineFillRef = useRef<HTMLDivElement>(null);
  const horizontalBarRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let rafId: number;

    const updateSpine = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      // 1. Update Top Horizontal Bar
      if (horizontalBarRef.current) {
        horizontalBarRef.current.style.width = `${progress * 100}%`;
      }

      // 2. Update Right Vertical Spine Fill
      if (spineFillRef.current) {
        spineFillRef.current.style.height = `${progress * 100}%`;
      }

      setScrollPercent(Math.round(progress * 100));

      // Only evaluate section anchors if on the homepage
      if (!isHome) return;

      // Checkpoint at 45% of viewport height
      const checkpoint = window.innerHeight * 0.45;

      // Bottom boundary check
      if (progress >= 0.94) {
        const lastIdx = SECTIONS.length - 1;
        if (activeIdxRef.current !== lastIdx) {
          activeIdxRef.current = lastIdx;
          setActiveIdx(lastIdx);
        }
        return;
      }

      // Top boundary check
      if (scrollY < 180) {
        if (activeIdxRef.current !== 0) {
          activeIdxRef.current = 0;
          setActiveIdx(0);
        }
        return;
      }

      // Scan sections from bottom to top to identify which one contains checkpoint
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section bounding box envelopes the checkpoint
          if (rect.top <= checkpoint && rect.bottom >= checkpoint) {
            if (activeIdxRef.current !== i) {
              activeIdxRef.current = i;
              setActiveIdx(i);
            }
            return;
          }
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateSpine);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial evaluation
    updateSpine();

    // Re-evaluate after GSAP pinned containers calculate their spacers
    const timer = setTimeout(updateSpine, 400);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [isHome]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. TOP HORIZONTAL READING BAR (Fixed 2px, Orange Progress)     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 w-full h-[2px] pointer-events-none bg-line/25"
        style={{ zIndex: 100 }}
        role="progressbar"
        aria-valuenow={scrollPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          ref={horizontalBarRef}
          className="h-full bg-accent shadow-[0_0_10px_rgba(193,99,59,0.95)] origin-left transition-[width] duration-75 ease-out"
          style={{ width: "0%" }}
        />
      </div>

      {isHome && (
        <>
          {/* ───────────────────────────────────────────────────────── */}
          {/* 2. RIGHT SIDE STRICT VERTICAL SPINE (8 Interactive Dots)  */}
          {/* Sits unobtrusively in right margin (right-2 on mobile, clamp on desktop) with zero button overlap */}
          {/* ───────────────────────────────────────────────────────── */}
          <div className="fixed right-2 md:right-[clamp(1rem,3vw,2.6rem)] top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none pointer-events-auto">
            <div className="relative w-[2px] h-[190px] md:h-[280px] bg-line/80 rounded-full">
              {/* Fill bar showing true scroll progression */}
              <div
                ref={spineFillRef}
                className="absolute top-0 left-0 w-full h-0 bg-accent rounded-full origin-top transition-[height] duration-75 ease-out shadow-[0_0_10px_rgba(193,99,59,0.7)]"
              />

              {/* Section Dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] flex flex-col justify-between py-1">
                {SECTIONS.map((sec, i) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    aria-label={`Scroll to ${sec.label}`}
                    className={`w-[6px] h-[6px] md:w-[9px] md:h-[9px] rounded-full border cursor-pointer -translate-x-[2px] md:-translate-x-[3.5px] relative transition-all duration-200 group ${
                      activeIdx === i
                        ? "bg-accent border-accent scale-125 shadow-[0_0_12px_rgba(193,99,59,0.95)]"
                        : "bg-bg border-line hover:border-accent hover:scale-110"
                    }`}
                  >
                    {/* Tooltip Label (Desktop only) */}
                    <div
                      className={`hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 font-mono text-[0.62rem] tracking-wider uppercase whitespace-nowrap transition-all duration-200 pointer-events-none items-center gap-1.5 ${
                        activeIdx === i
                          ? "opacity-100 text-paper font-semibold translate-x-0 bg-bg-raise/95 border border-line px-2 py-0.5 rounded shadow-md"
                          : "opacity-0 group-hover:opacity-100 text-stone-400 translate-x-1 group-hover:translate-x-0 bg-bg/90 px-1.5 py-0.5 rounded border border-line/60"
                      }`}
                    >
                      <span className="text-accent font-semibold">{sec.code}</span>
                      <span>{sec.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ScrollSpine;
