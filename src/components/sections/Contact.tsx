"use client";

import React, { useState, useEffect, useRef } from "react";
import { PROFILE } from "@/data/projects";

export function Contact() {
  const [istTime, setIstTime] = useState("");
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
    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  return (
    <section id="contact" className="py-[clamp(4.5rem,10vw,9rem)] border-t border-line relative z-10">
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="eyebrow">06 — Direct Comms</div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          {/* Left Text */}
          <div>
            <h2 className="font-display font-medium text-[clamp(2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.06]">
              Let&apos;s build systems <br />
              <span className="font-serif italic text-accent font-normal">that verify themselves.</span>
            </h2>

            <p className="mt-5 sm:mt-6 text-stone font-light max-w-[540px] text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed">
              Open to conversations about autonomous agent architectures, Model Context Protocol (MCP) infrastructure, full-stack products, or engineering roles.
            </p>

            {/* Education Badge */}
            <div className="mt-6 p-4 rounded-2xl bg-bg-raise/60 border border-line/70 max-w-[540px]">
              <div className="font-mono text-[0.65rem] text-accent uppercase tracking-widest font-semibold">
                Education
              </div>
              <div className="font-display font-medium text-sm text-paper mt-1">
                {PROFILE.education.degree}
              </div>
              <div className="font-mono text-xs text-stone mt-0.5">
                {PROFILE.education.school} · {PROFILE.education.period}
              </div>
            </div>

            {/* Live IST Telemetry */}
            <div className="mt-6 flex items-center gap-2.5 sm:gap-3 font-mono text-[0.72rem] sm:text-xs text-paper/80 bg-bg-raise/80 border border-line/70 px-4 py-2.5 rounded-full w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="truncate">{PROFILE.location} · IST:</span>
              <span className="text-accent font-medium">{istTime || "Loading..."}</span>
            </div>
          </div>

          {/* Right 3D Holographic Command Console */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-gradient-to-br from-bg-raise via-bg-raise/95 to-bg p-6 sm:p-10 rounded-3xl border border-line/80 shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(193,99,59,0.12)] transition-transform duration-200 ease-out will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between pb-5 border-b border-line/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[0.65rem] sm:text-[0.68rem] tracking-wider uppercase text-stone">
                Private Channels · Zero Friction
              </span>
            </div>

            <div className="mt-5 sm:mt-6 space-y-3.5">
              {/* LinkedIn Direct Connect */}
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-bg border border-line hover:border-accent hover:shadow-[0_0_20px_rgba(193,99,59,0.2)] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0 text-sm">
                    💼
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[0.62rem] sm:text-[0.65rem] uppercase text-stone tracking-wider">
                      Professional Network
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-paper group-hover:text-accent transition-colors">
                      Connect on LinkedIn
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[0.68rem] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded bg-bg-raise border border-line text-stone group-hover:text-accent group-hover:border-accent/50 transition-all flex-shrink-0 ml-2">
                  Connect ↗
                </div>
              </a>

              {/* GitHub Profile */}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-bg border border-line hover:border-accent hover:shadow-[0_0_20px_rgba(193,99,59,0.2)] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0 text-sm">
                    🐙
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[0.62rem] sm:text-[0.65rem] uppercase text-stone tracking-wider">
                      Code Repositories
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-paper group-hover:text-accent transition-colors">
                      github.com/fncreator22
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[0.68rem] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded bg-bg-raise border border-line text-stone group-hover:text-accent group-hover:border-accent/50 transition-all flex-shrink-0 ml-2">
                  Follow ↗
                </div>
              </a>

              {/* Verified Resume Action */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-accent text-bg font-medium hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(193,99,59,0.4)] transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold">View &amp; Download Resume</span>
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-black/20 uppercase tracking-widest">PDF</span>
                </div>
                <span className="text-base sm:text-lg">↗</span>
              </a>

              {/* Social Channels Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={PROFILE.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-bg border border-line hover:border-accent hover:text-accent font-mono text-[0.68rem] sm:text-xs uppercase tracking-wider transition-all"
                >
                  <span>X (Twitter)</span>
                  <span>↗</span>
                </a>
                <a
                  href={PROFILE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-bg border border-line hover:border-accent hover:text-accent font-mono text-[0.68rem] sm:text-xs uppercase tracking-wider transition-all"
                >
                  <span>Instagram</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
