import React from "react";
import { PROFILE } from "@/data/projects";
import { IDCardLanyard } from "@/components/ui/id-card-lanyard";

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
              <span className="font-serif italic text-accent font-normal">ready for production.</span>
            </h2>

            <p className="mt-4 sm:mt-5 text-stone-300 font-light max-w-[520px] text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed">
              I engineer autonomous AI agents, conversational voice systems, and reliable full-stack applications. Focused on clean architecture, sub-second responsiveness, and software that delivers real-world value.
            </p>

            {/* Core Capabilities */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[520px]">
              <div className="p-4 rounded-xl bg-bg-raise/80 border border-line/80">
                <div className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">01 / Agentic AI &amp; Voice</div>
                <p className="text-stone-300 font-light text-xs mt-1.5 leading-relaxed">
                  Autonomous reasoning workflows, MCP tool integrations, and real-time voice agents.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bg-raise/80 border border-line/80">
                <div className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">02 / Full-Stack Systems</div>
                <p className="text-stone-300 font-light text-xs mt-1.5 leading-relaxed">
                  Production-grade web apps built with Next.js, TypeScript, Python/FastAPI, and fast APIs.
                </p>
              </div>
            </div>

            {/* Academic Background */}
            <div className="mt-6 p-4 rounded-xl bg-bg-raise/80 border border-line/80 max-w-[520px]">
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
