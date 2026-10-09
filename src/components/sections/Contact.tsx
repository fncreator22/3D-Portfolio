"use client";

import React from "react";
import { PROFILE } from "@/data/projects";
import { IDCardLanyard } from "@/components/ui/id-card-lanyard";
import { ArrowUpRight, Download, MessageSquare } from "lucide-react";

export function Contact() {
  return (
    <section id="invariants" className="py-[clamp(5rem,9vw,9rem)] border-t border-line relative z-10 overflow-x-clip max-w-full bg-bg" aria-labelledby="invariants-heading">
      <span id="contact" className="sr-only" aria-hidden="true" />
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="eyebrow">06 / Engineering &amp; Profile</div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Clear Human-Centric Overview */}
          <div>
            <h2 id="invariants-heading" className="font-display font-medium text-[clamp(2rem,4.5vw,3.5rem)] tracking-[-0.02em] leading-[1.1] text-paper">
              Building intelligent systems <br />
              <span className="text-accent font-medium">ready for production.</span>
            </h2>

            <p className="mt-4 sm:mt-5 text-stone-300 font-light max-w-[520px] text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed">
              I engineer autonomous AI agents, conversational voice systems, and reliable full-stack applications. Focused on clean architecture, sub-second responsiveness, and software that delivers real-world value.
            </p>

            {/* Direct Connect & Collaboration Card */}
            <div className="mt-8 max-w-[520px] rounded-2xl bg-bg-raise/80 border border-line/80 p-5 sm:p-6 relative overflow-hidden backdrop-blur-sm shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 font-mono text-[0.7rem] text-accent font-semibold uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct Connect</span>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-stone-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  AVAILABLE FOR OPPORTUNITIES
                </span>
              </div>

              <p className="mt-4 text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
                Open for full-time engineering roles, autonomous AI architecture, and high-impact product engineering. Connect directly through the verified pathways below.
              </p>

              {/* Action Channels */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={PROFILE.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-paper font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent/90 transition-all shadow-md shadow-accent/20 active:scale-[0.97]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-bg-raise border border-line/80 text-paper font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-all active:scale-[0.97]"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-bg-raise border border-line/80 text-paper font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-all active:scale-[0.97]"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PROFILE.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-bg-raise border border-line/80 text-paper font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-all active:scale-[0.97]"
                >
                  <span>X (Twitter)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
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
