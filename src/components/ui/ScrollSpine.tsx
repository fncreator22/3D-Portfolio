"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "identity", label: "Identity" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "thinking", label: "Think" },
  { id: "invariants", label: "Profile" },
  { id: "connect", label: "Connect" },
];

export function ScrollSpine() {
  const [activeIdx, setActiveIdx] = useState(0);
  const spineFillRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let rafId: number;

    const updateSpine = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      if (spineFillRef.current) {
        spineFillRef.current.style.height = `${progress * 100}%`;
      }

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
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-[clamp(1rem,3vw,2.6rem)] top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none">
      <div className="relative w-[1.5px] h-[260px] bg-line/80 rounded-full">
        {/* Fill bar showing true scroll progression */}
        <div
          ref={spineFillRef}
          className="absolute top-0 left-0 w-full h-0 bg-accent rounded-full origin-top transition-[height] duration-75 ease-out"
        />

        {/* Section Dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[1px] flex flex-col justify-between py-1">
          {SECTIONS.map((sec, i) => (
            <div
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`w-[8px] h-[8px] rounded-full border cursor-pointer -translate-x-[3.5px] relative transition-all duration-300 group ${
                activeIdx === i
                  ? "bg-accent border-accent scale-125 shadow-[0_0_10px_rgba(193,99,59,0.7)]"
                  : "bg-bg border-line hover:border-accent"
              }`}
            >
              {/* Tooltip Label */}
              <span
                className={`absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[0.62rem] tracking-wider uppercase whitespace-nowrap transition-all duration-200 pointer-events-none ${
                  activeIdx === i
                    ? "opacity-100 text-paper font-semibold translate-x-0"
                    : "opacity-0 group-hover:opacity-100 text-stone-400 translate-x-1 group-hover:translate-x-0"
                }`}
              >
                {sec.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollSpine;
