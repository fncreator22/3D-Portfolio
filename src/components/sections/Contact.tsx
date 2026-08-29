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
    <section id="contact" className="py-[clamp(5rem,9vw,9rem)] border-t border-line relative z-10" aria-labelledby="contact-heading">
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="eyebrow">06 — Direct Comms</div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          {/* Left Text */}
          <div>
            <h2 id="contact-heading" className="font-display font-medium text-[clamp(2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.06] text-paper">
              Let&apos;s build systems <br />
              <span className="font-serif italic text-accent font-normal">that verify themselves.</span>
            </h2>

            <p className="mt-5 sm:mt-6 text-stone-300 font-light max-w-[540px] text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed">
              Open to conversations about autonomous agent architectures, Model Context Protocol (MCP) infrastructure, full-stack products, or engineering roles.
            </p>

            {/* Education Badge */}
            <div className="mt-6 p-5 rounded-2xl bg-bg-raise border border-line/80 max-w-[540px] shadow-md">
              <div className="font-mono text-[0.68rem] text-accent uppercase tracking-widest font-semibold">
                Education
              </div>
              <div className="font-display font-medium text-base text-paper mt-1">
                {PROFILE.education.degree}
              </div>
              <div className="font-mono text-xs text-stone-300 mt-0.5 font-medium">
                {PROFILE.education.school} · {PROFILE.education.period}
              </div>
            </div>

            {/* Live IST Telemetry */}
            <div className="mt-6 flex items-center gap-2.5 sm:gap-3 font-mono text-[0.72rem] sm:text-xs text-paper bg-bg-raise border border-line/80 px-4 py-2.5 rounded-full w-fit backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{PROFILE.location} · IST:</span>
              <span className="text-accent font-semibold">{istTime || "Loading..."}</span>
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
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[0.65rem] sm:text-[0.68rem] tracking-wider uppercase text-stone-300 font-semibold">
                Private Channels · Zero Friction
              </span>
            </div>

            <div className="mt-5 sm:mt-6 space-y-3.5">
              {/* LinkedIn Direct Connect with Clean Themed SVG Icon */}
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-bg border border-line hover:border-accent hover:shadow-[0_0_20px_rgba(193,99,59,0.2)] transition-all focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Connect with Sagar Mahajan on LinkedIn"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[0.65rem] sm:text-[0.68rem] uppercase text-stone-300 tracking-wider font-semibold">
                      Professional Network
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-paper group-hover:text-accent transition-colors">
                      Connect on LinkedIn
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[0.68rem] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded bg-bg-raise border border-line text-stone-300 group-hover:text-accent group-hover:border-accent/50 transition-all flex-shrink-0 ml-2 font-semibold">
                  Connect ↗
                </div>
              </a>

              {/* GitHub Profile with Clean Themed Octocat SVG Icon */}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-bg border border-line hover:border-accent hover:shadow-[0_0_20px_rgba(193,99,59,0.2)] transition-all focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="View Sagar Mahajan GitHub Repositories"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[0.65rem] sm:text-[0.68rem] uppercase text-stone-300 tracking-wider font-semibold">
                      Code Repositories
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-paper group-hover:text-accent transition-colors">
                      github.com/fncreator22
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[0.68rem] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded bg-bg-raise border border-line text-stone-300 group-hover:text-accent group-hover:border-accent/50 transition-all flex-shrink-0 ml-2 font-semibold">
                  Follow ↗
                </div>
              </a>

              {/* Verified Resume Action */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-accent text-bg font-semibold hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(193,99,59,0.4)] transition-all focus-visible:ring-2 focus-visible:ring-paper"
                aria-label="View and Download Sagar Mahajan Resume PDF"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold">View &amp; Download Resume</span>
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-black/20 uppercase tracking-widest font-semibold">PDF</span>
                </div>
                <span className="text-base sm:text-lg" aria-hidden="true">↗</span>
              </a>

              {/* Social Channels Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={PROFILE.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-bg border border-line hover:border-accent hover:text-accent font-mono text-[0.68rem] sm:text-xs uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-accent font-semibold"
                  aria-label="Connect on X Twitter"
                >
                  <span>X (Twitter)</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={PROFILE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-bg border border-line hover:border-accent hover:text-accent font-mono text-[0.68rem] sm:text-xs uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-accent font-semibold"
                  aria-label="Connect on Instagram"
                >
                  <span>Instagram</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
