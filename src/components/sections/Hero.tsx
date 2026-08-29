"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Avatar3DModel } from "@/components/ui/Avatar3DModel";

const TYPEWRITER_TEXT =
  "I build systems that verify themselves. LLM orchestration, Sentinel MCP, and computer vision that ship.";

const PILLS = [
  { label: "Sentinel MCP Guardrail", href: "/work/sentinel-mcp-guardrail" },
  { label: "NexWare ERP", href: "/work/nexware-erp" },
  { label: "Examly Enterprise", href: "/work/examly-enterprise" },
  { label: "BrowserPilot Autonomous Agent", href: "/work/browserpilot-autonomous-web-agent" },
  { label: "See 12 Systems", href: "/work" },
];

const EMAIL = "sagarin588@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=Discussion:%20AI%20Engineering%20Roles`;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const { displayed, done } = useTypewriter({
    text: TYPEWRITER_TEXT,
    speed: 38,
    startDelay: 600,
  });

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-svh flex flex-col overflow-hidden"
    >
      {/* Hero Layout */}
      <div className="flex-1 flex items-center pb-16 pt-24 sm:pt-28 md:pt-32">
        <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">

            {/* ─── Left: Text Content ─── */}
            <div className="flex flex-col max-w-xl">

              {/* Roles Eyebrow */}
              <div className="eyebrow mb-3.5 sm:mb-4 text-[0.68rem] sm:text-xs">
                AI Engineer · Software Developer · AI Automation Engineer · Full-Stack Developer
              </div>

              {/* High-Impact Headline */}
              <h1 className="font-display font-medium text-[clamp(2.1rem,5.2vw,4.2rem)] tracking-[-0.02em] leading-[1.04] text-paper mb-4 sm:mb-5">
                Hey there, I&apos;m <span className="text-accent">Sagar Mahajan</span>.
              </h1>

              {/* Typewriter Statement */}
              <p
                className="text-paper mb-5 sm:mb-6 font-body leading-[1.38]"
                style={{
                  fontSize: "clamp(15px, 2.5vw, 22px)",
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
                className="flex flex-wrap gap-1.5 sm:gap-2 items-center"
                style={{
                  opacity: pillsVisible ? 1 : 0,
                  transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
              >
                {/* Project Pills */}
                {PILLS.map((pill) => (
                  <Link
                    key={pill.href}
                    href={pill.href}
                    className="inline-flex items-center justify-center bg-paper text-bg border border-black/10 rounded-full font-body font-medium hover:bg-accent hover:text-paper hover:border-accent transition-colors duration-200 text-[0.78rem] sm:text-[0.85rem] px-3.5 sm:px-4 py-1.5 whitespace-nowrap"
                  >
                    {pill.label}
                  </Link>
                ))}

                {/* Direct Gmail Launcher */}
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-accent text-bg font-medium rounded-full hover:bg-accent/90 hover:shadow-md transition-all text-[0.78rem] sm:text-[0.85rem] px-3.5 sm:px-4 py-1.5 whitespace-nowrap gap-1.5"
                >
                  <span>Open Gmail</span>
                  <span className="text-xs">↗</span>
                </a>

                {/* Copy Email Pill */}
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center text-paper bg-transparent border border-paper/70 rounded-full font-body hover:bg-paper hover:text-bg hover:border-paper transition-colors duration-200 text-[0.78rem] sm:text-[0.85rem] px-3.5 sm:px-4 py-1.5 whitespace-nowrap gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                        <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Copy:{" "}
                        <span className="underline underline-offset-1">{EMAIL}</span>
                      </span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                        <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M3 8H2C1.44772 8 1 7.55228 1 7V2C1 1.44772 1.44772 1 2 1H7C7.55228 1 8 1.44772 8 2V3" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    </>
                  )}
                </button>
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
