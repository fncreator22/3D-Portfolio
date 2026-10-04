"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROFILE } from "@/data/projects";

interface DiagnosticSpec {
  id: string;
  name: string;
  badge: string;
  pipeline: string;
  stats: string[];
  status: string;
}

const DIAGNOSTICS: DiagnosticSpec[] = [
  {
    id: "sentinel",
    name: "Sentinel MCP Guardrail",
    badge: "LLM Safety Protocol",
    pipeline: "Rules Engine → TF-IDF Classifier → LLM Context Review",
    stats: [
      "76.3% 5-fold CV accuracy (828 hand-labeled examples)",
      "Zero unauthorized escapes across 100k test payloads",
      "<5ms deterministic gateway inspection latency",
      "Native stdio & SSE for Claude Desktop, Cursor, CodeX"
    ],
    status: "Active Shield"
  },
  {
    id: "vaniflow",
    name: "VaniFlow Streaming Voice AI",
    badge: "Realtime Audio Pipeline",
    pipeline: "16kHz AudioWorklet → Go WebSocket Bridge → Gemini 3.8 Live",
    stats: [
      "Sub-200ms bidirectional voice round-trip latency",
      "Instantaneous barge-in with hardware buffer purge",
      "Trilingual seamless code-switching (English, Hindi, Telugu)",
      "Automated post-call CRM qualification via Gemini Flash"
    ],
    status: "Streaming Ready"
  },
  {
    id: "daybook",
    name: "Daybook On-Device OS",
    badge: "Zero-Cloud Invariant",
    pipeline: "Jetpack Compose → SQLCipher Encryption → On-Device OCR",
    stats: [
      "100% offline-first invariant: zero cloud telemetry leaks",
      "197 passed automated unit and integration tests",
      "CadenceEngine alarm dispatch with reboot resilience",
      "Hardware-backed AES database encryption"
    ],
    status: "Verified Offline"
  }
];

export function Contact() {
  const [istTime, setIstTime] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3D Mouse Perspective Tilt on the Console Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 6;
    const rotY = (x / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  const currentDiagnostic = DIAGNOSTICS[activeTab];

  return (
    <section id="invariants" className="py-[clamp(5rem,9vw,9rem)] border-t border-line relative z-10" aria-labelledby="invariants-heading">
      <span id="contact" className="sr-only" aria-hidden="true" />
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="eyebrow">06 / Engineering Invariants</div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
          {/* Left Column: Editorial Manifesto & Credentials */}
          <div>
            <h2 id="invariants-heading" className="font-display font-medium text-[clamp(2rem,5vw,3.8rem)] tracking-[-0.02em] leading-[1.06] text-paper">
              Systems engineered with <br />
              <span className="font-serif italic text-accent font-normal">empirical verification.</span>
            </h2>

            <p className="mt-5 sm:mt-6 text-stone-300 font-light max-w-[540px] text-[clamp(0.95rem,1.4vw,1.12rem)] leading-relaxed">
              I build autonomous software on three non-negotiable invariants: no blind LLM execution, deterministic sub-200ms latency ceilings, and zero uninspected telemetry.
            </p>

            {/* Core Verification Tenets */}
            <div className="mt-6 space-y-3 max-w-[540px]">
              <div className="p-4 rounded-xl bg-bg-raise/80 border border-line/80 flex items-start gap-3">
                <span className="text-accent font-mono text-xs font-semibold mt-0.5 select-none">01</span>
                <div>
                  <h3 className="font-display font-medium text-sm text-paper">Zero Blind Tool Calls</h3>
                  <p className="text-stone-300 font-light text-xs mt-0.5 leading-relaxed">
                    Every tool invocation is inspected by protocol-layer rules, statistical classification, and policy guardrails before execution.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-bg-raise/80 border border-line/80 flex items-start gap-3">
                <span className="text-accent font-mono text-xs font-semibold mt-0.5 select-none">02</span>
                <div>
                  <h3 className="font-display font-medium text-sm text-paper">Streaming Sub-200ms Turn Taking</h3>
                  <p className="text-stone-300 font-light text-xs mt-0.5 leading-relaxed">
                    Audio pipelines use client AudioWorklet buffers with WebSocket bridges directly to Gemini 3.8 Live, supporting instantaneous barge-in.
                  </p>
                </div>
              </div>
            </div>

            {/* Education Credentials Badge */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-bg-raise border border-line/80 max-w-[540px] shadow-md">
              <div className="font-mono text-[0.68rem] text-accent uppercase tracking-widest font-semibold">
                Academic Background
              </div>
              <div className="font-display font-medium text-base text-paper mt-1">
                {PROFILE.education.degree}
              </div>
              <div className="font-mono text-xs text-stone-300 mt-0.5 font-medium">
                {PROFILE.education.school} · {PROFILE.education.period}
              </div>
            </div>

            {/* Live IST Telemetry */}
            <div className="mt-5 flex items-center gap-2.5 sm:gap-3 font-mono text-[0.72rem] sm:text-xs text-paper bg-bg-raise border border-line/80 px-4 py-2.5 rounded-full w-fit backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{PROFILE.location} · IST:</span>
              <span className="text-accent font-semibold">{istTime || "Loading..."}</span>
            </div>
          </div>

          {/* Right Column: 3D Holographic Diagnostic Console */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-gradient-to-br from-bg-raise via-bg-raise/95 to-bg p-5 sm:p-8 rounded-3xl border border-line/80 shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(193,99,59,0.12)] transition-transform duration-200 ease-out will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Terminal Window Header with Traffic Lights */}
            <div className="flex items-center justify-between pb-4 border-b border-line/60">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[0.65rem] sm:text-[0.68rem] tracking-wider uppercase text-stone-300 font-semibold">
                Diagnostics Console · Production Telemetry
              </span>
            </div>

            {/* Diagnostic Protocol Tabs */}
            <div className="mt-4 flex gap-1.5 p-1 rounded-xl bg-bg border border-line/80 overflow-x-auto no-scrollbar">
              {DIAGNOSTICS.map((diag, idx) => (
                <button
                  key={diag.id}
                  onClick={() => setActiveTab(idx)}
                  className={`font-mono text-[0.68rem] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    activeTab === idx
                      ? "bg-accent text-bg font-semibold shadow-sm"
                      : "text-stone-300 hover:text-paper hover:bg-bg-raise/50"
                  }`}
                >
                  {diag.id}
                </button>
              ))}
            </div>

            {/* Selected Diagnostic Output */}
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-bg border border-line/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[0.62rem] text-accent uppercase tracking-widest font-semibold">
                    {currentDiagnostic.badge}
                  </span>
                  <h3 className="font-display font-medium text-lg text-paper mt-0.5">
                    {currentDiagnostic.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-raise border border-line font-mono text-[0.65rem] text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentDiagnostic.status}</span>
                </div>
              </div>

              {/* Pipeline Flow */}
              <div className="p-2.5 rounded-lg bg-bg-raise/70 border border-line/50 font-mono text-[0.68rem] text-stone-300">
                <span className="text-accent font-semibold">$ pipeline:</span> {currentDiagnostic.pipeline}
              </div>

              {/* Empirical Stats Bullets */}
              <div className="space-y-1.5 pt-1">
                {currentDiagnostic.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 font-mono text-[0.7rem] text-stone-200">
                    <span className="text-accent font-bold mt-0.5 select-none">•</span>
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Console Footer */}
            <div className="mt-5 pt-4 border-t border-line/60 flex items-center justify-between text-stone-400 font-mono text-[0.65rem] sm:text-[0.68rem]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>16 systems verified · zero escapes</span>
              </span>

              <Link
                href="/work"
                className="text-accent hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Systems Archive</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
