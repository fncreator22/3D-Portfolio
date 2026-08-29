"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Avatar3DModel } from "@/components/ui/Avatar3DModel";

const TYPEWRITER_TEXT =
  "Built Sentinel — an MCP safety agent running inside Claude Desktop, Cursor, and CodeX, catching unsafe actions with a self-trained classifier at 76% cross-validation accuracy. Shipped 4 more production platforms since, from LMS grading engines to autonomous web agents.";

const PROJECT_CHIPS = [
  { label: "Sentinel MCP Guardrail", href: "/work/sentinel-mcp-guardrail" },
  { label: "BrowserPilot Agent", href: "/work/browserpilot-autonomous-web-agent" },
  { label: "Examly Enterprise", href: "/work/examly-enterprise" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillsVisible, setPillsVisible] = useState(false);

  const { displayed, done } = useTypewriter({
    text: TYPEWRITER_TEXT,
    speed: 28,
    startDelay: 350,
  });

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-svh flex flex-col overflow-hidden"
    >
      {/* Hero Layout */}
      <div className="flex-1 flex items-center pb-16 pt-24 sm:pt-28 md:pt-32">
        <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">

            {/* ─── Left: Text Content ─── */}
            <div className="flex flex-col max-w-xl">

              {/* Sharper 3-Tag Eyebrow */}
              <div className="eyebrow mb-3.5 sm:mb-4 text-[0.68rem] sm:text-xs">
                AI ENGINEER · MCP &amp; AGENTIC SYSTEMS · FULL-STACK ENGINEER
              </div>

              {/* High-Impact Headline */}
              <h1 className="font-display font-medium text-[clamp(2.2rem,5vw,4.3rem)] tracking-[-0.02em] leading-[1.04] text-paper mb-4 sm:mb-5">
                Engineering <span className="text-accent">Autonomous Systems</span> &amp; Production AI.
              </h1>

              {/* Fact-Anchored Subheadline Statement */}
              <p
                className="text-paper mb-6 sm:mb-7 font-body leading-[1.45]"
                style={{
                  fontSize: "clamp(14px, 2.1vw, 18px)",
                  fontWeight: 400,
                  minHeight: "68px",
                }}
              >
                {displayed}
                {!done && (
                  <span
                    className="inline-block align-middle ml-[2px]"
                    style={{
                      width: "2px",
                      height: "1.1em",
                      background: "var(--paper)",
                      animation: "blink 1s step-end infinite",
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </p>

              {/* Action Buttons & Project Chips */}
              <div
                className="flex flex-col gap-3.5 sm:gap-4"
                style={{
                  opacity: pillsVisible ? 1 : 0,
                  transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
              >
                {/* Primary Action Buttons */}
                <div className="flex flex-wrap gap-2.5 items-center">
                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center bg-paper text-bg border border-black/10 rounded-full font-body font-medium hover:bg-accent hover:text-paper hover:border-accent transition-colors duration-200 text-[0.8rem] sm:text-[0.88rem] px-4 py-2"
                  >
                    Explore 12 Systems
                  </Link>

                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center bg-accent text-bg font-medium rounded-full hover:bg-accent/90 hover:shadow-md transition-all text-[0.8rem] sm:text-[0.88rem] px-4 py-2 gap-1.5"
                  >
                    <span>Get in Touch</span>
                    <span className="text-xs">↓</span>
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-paper bg-transparent border border-paper/70 rounded-full font-body hover:bg-paper hover:text-bg hover:border-paper transition-colors duration-200 text-[0.8rem] sm:text-[0.88rem] px-4 py-2 gap-1.5"
                  >
                    <span>Resume</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>

                {/* Flagship Project Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-line/50">
                  <span className="font-mono text-[0.62rem] uppercase tracking-widest text-stone mr-1">
                    Flagship:
                  </span>
                  {PROJECT_CHIPS.map((chip) => (
                    <Link
                      key={chip.href}
                      href={chip.href}
                      className="inline-flex items-center gap-1 font-mono text-[0.7rem] sm:text-xs text-paper/80 bg-bg-raise/80 border border-line/70 hover:border-accent hover:text-accent rounded-lg px-2.5 py-1 transition-all"
                    >
                      <span>{chip.label}</span>
                      <span className="text-accent text-[0.65rem]">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Right: 3D Avatar ─── */}
            <div
              className="hero-avatar-area flex justify-center lg:justify-end mt-4 lg:mt-0"
              style={{
                opacity: pillsVisible ? 1 : 0,
                transform: pillsVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <Avatar3DModel />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{
          opacity: pillsVisible ? 0.55 : 0,
          transition: "opacity 0.6s ease 0.8s",
        }}
      >
        <span className="font-mono text-[0.58rem] sm:text-[0.62rem] tracking-[0.2em] uppercase text-stone">
          Scroll to begin
        </span>
        <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-stone to-transparent" />
      </div>
    </section>
  );
}
