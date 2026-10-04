"use client";

import React, { useState, useEffect } from "react";
import { PROFILE } from "@/data/projects";
import { IDCardLanyard } from "@/components/ui/id-card-lanyard";

export function Contact() {
  const [istTime, setIstTime] = useState("");

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

  return (
    <section id="invariants" className="py-[clamp(5rem,9vw,9rem)] border-t border-line relative z-10 overflow-visible" aria-labelledby="invariants-heading">
      <span id="contact" className="sr-only" aria-hidden="true" />
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="eyebrow">06 / Engineering Invariants</div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
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

          {/* Right Column: Interactive ID Card Lanyard */}
          <div className="w-full flex justify-center items-center relative min-h-[580px] bg-gradient-to-br from-bg-raise/90 via-bg-raise/50 to-bg rounded-3xl border border-line/80 shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(193,99,59,0.12)] p-2 sm:p-6 overflow-visible">
            <IDCardLanyard
              name={PROFILE.name}
              role="AI Engineer & Systems Architect"
              brand="SAGAR MAHAJAN"
              brandTagline="Autonomous AI & Voice Systems"
              pillars={["Verify", "Scale", "Autonomy"]}
              location="Hyderabad, IN (IST)"
              idNumber="SM-2026-AI"
              validThru="Permanent"
              avatarUrl="/images/avatar.jpg"
              site="sagarmahajan.cloud"
              githubUrl={PROFILE.github}
              linkedinUrl={PROFILE.linkedin}
              xUrl={PROFILE.x}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
