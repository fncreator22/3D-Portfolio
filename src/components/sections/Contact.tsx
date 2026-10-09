"use client";

import React, { useState } from "react";
import { PROFILE } from "@/data/projects";
import { IDCardLanyard } from "@/components/ui/id-card-lanyard";
import { Copy, Check, Terminal, Mail, MapPin } from "lucide-react";

export function Contact() {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyCurl = () => {
    navigator.clipboard.writeText("curl -s https://sagarmahajan.cloud/api/v1/health");
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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

            {/* Direct Communication & Developer Gateway */}
            <div className="mt-6 max-w-[520px] rounded-xl bg-bg-raise/80 border border-line/80 p-4 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 font-mono text-[0.68rem] text-accent font-semibold uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Dispatch &amp; Engineering Gateway</span>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-stone-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  AVAILABLE FOR HIRE / COLLAB
                </span>
              </div>

              {/* Direct Email Channel */}
              <div className="mt-3 flex items-center justify-between gap-3 p-3 rounded-lg bg-black/40 border border-white/[0.04]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[0.62rem] text-stone-400 uppercase tracking-wider">Direct Email</div>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="font-mono text-xs sm:text-sm text-paper hover:text-accent truncate font-medium block transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="shrink-0 inline-flex items-center gap-1 font-mono text-[0.62rem] text-stone-300 hover:text-paper bg-white/[0.05] hover:bg-white/[0.1] px-2.5 py-1.5 rounded border border-white/[0.05] transition-colors active:scale-[0.95]"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Developer CLI Terminal Snippet */}
              <div className="mt-2.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2 bg-black/60 px-3 py-2 rounded-lg border border-white/[0.04]">
                <div className="flex items-center gap-2 overflow-x-auto font-mono text-[0.68rem] sm:text-xs text-stone-300">
                  <Terminal className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="text-stone-500 select-none">$</span>
                  <span className="whitespace-nowrap text-paper/90">curl -s https://sagarmahajan.cloud/api/v1/health</span>
                </div>
                <button
                  onClick={copyCurl}
                  className="shrink-0 inline-flex items-center gap-1 font-mono text-[0.62rem] text-stone-300 hover:text-paper bg-white/[0.05] hover:bg-white/[0.1] px-2.5 py-1 rounded border border-white/[0.05] transition-colors active:scale-[0.95]"
                  title="Copy command"
                >
                  {copiedCurl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCurl ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Academic Background & Location */}
            <div className="mt-4 p-4 rounded-xl bg-bg-raise/80 border border-line/80 max-w-[520px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[0.68rem] text-accent uppercase tracking-wider font-semibold">
                    Academic Background
                  </div>
                  <div className="font-display font-medium text-sm text-paper mt-0.5">
                    {PROFILE.education.degree}
                  </div>
                  <div className="font-mono text-xs text-stone-300 mt-0.5">
                    {PROFILE.education.school}
                  </div>
                  <div className="font-mono text-[0.68rem] text-stone-400 mt-0.5">
                    {PROFILE.education.period}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-[0.68rem] text-accent uppercase tracking-wider font-semibold">
                    Base
                  </div>
                  <div className="font-mono text-xs text-stone-300 mt-0.5">
                    Hyderabad, India
                  </div>
                  <div className="font-mono text-[0.68rem] text-stone-400 mt-0.5">
                    IST (UTC+5:30)
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-paper font-mono text-xs uppercase tracking-wider font-medium hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
              >
                <span>Download Resume</span>
                <span>↓</span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-raise border border-line/80 text-paper font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-raise border border-line/80 text-paper font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
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
