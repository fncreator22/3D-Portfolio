"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Avatar3DModel } from "@/components/ui/Avatar3DModel";

const TYPEWRITER_TEXT =
  "I take projects from vague asks to production-grade systems — architecting Agentic AI pipelines, MCP safety guardrails, and full-stack platforms that verify themselves.";

const PILLS = [
  { label: "Sentinel MCP Guardrail", href: "/work/sentinel-mcp-guardrail" },
  { label: "BrowserPilot Agent", href: "/work/browserpilot-autonomous-web-agent" },
  { label: "Examly Enterprise", href: "/work/examly-enterprise" },
  { label: "Explore 12 Systems", href: "/work" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillsVisible, setPillsVisible] = useState(false);

  const { displayed, done } = useTypewriter({
    text: TYPEWRITER_TEXT,
    speed: 32,
    startDelay: 400,
  });

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 350);
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

              {/* Roles Eyebrow */}
              <div className="eyebrow mb-3.5 sm:mb-4 text-[0.68rem] sm:text-xs">
                AI Engineer · Software Developer · AI Automation Engineer · Full-Stack Developer
              </div>

              {/* High-Impact Headline */}
              <h1 className="font-display font-medium text-[clamp(2.2rem,5vw,4.3rem)] tracking-[-0.02em] leading-[1.04] text-paper mb-4 sm:mb-5">
                Engineering <span className="text-accent">Autonomous Systems</span> &amp; Production AI.
              </h1>

              {/* Typewriter Statement */}
              <p
                className="text-paper mb-6 sm:mb-7 font-body leading-[1.42]"
                style={{
                  fontSize: "clamp(15px, 2.3vw, 20px)",
                  fontWeight: 400,
                  minHeight: "56px",
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

              {/* Action Pill Buttons */}
              <div
                className="flex flex-wrap gap-2 sm:gap-2.5 items-center"
                style={{
                  opacity: pillsVisible ? 1 : 0,
                  transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
              >
                {/* Flagship Project Pills */}
                {PILLS.map((pill) => (
                  <Link
                    key={pill.href}
                    href={pill.href}
                    className="inline-flex items-center justify-center bg-paper text-bg border border-black/10 rounded-full font-body font-medium hover:bg-accent hover:text-paper hover:border-accent transition-colors duration-200 text-[0.78rem] sm:text-[0.85rem] px-3.5 sm:px-4 py-1.5 whitespace-nowrap"
                  >
                    {pill.label}
                  </Link>
                ))}

                {/* Direct Get in Touch CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-accent text-bg font-medium rounded-full hover:bg-accent/90 hover:shadow-md transition-all text-[0.78rem] sm:text-[0.85rem] px-4 py-1.5 whitespace-nowrap gap-1.5"
                >
                  <span>Get in Touch</span>
                  <span className="text-xs">↓</span>
                </a>

                {/* View/Download Resume CTA */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-paper bg-transparent border border-paper/70 rounded-full font-body hover:bg-paper hover:text-bg hover:border-paper transition-colors duration-200 text-[0.78rem] sm:text-[0.85rem] px-3.5 sm:px-4 py-1.5 whitespace-nowrap gap-1.5"
                >
                  <span>Resume</span>
                  <span className="text-xs">↗</span>
                </a>
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
