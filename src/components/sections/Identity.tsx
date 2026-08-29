"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE, PROJECTS, SKILL_DOMAINS } from "@/data/projects";

export function Identity() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".identity-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="identity" className="py-[clamp(5rem,9vw,9rem)] border-t border-line relative z-10" aria-labelledby="identity-heading">
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="identity-reveal max-w-[760px] mb-10 md:mb-14">
          <div className="eyebrow">01 — Identity &amp; Philosophy</div>
          <h2 id="identity-heading" className="font-display font-medium text-[clamp(1.9rem,4.5vw,3.2rem)] tracking-[-0.01em] mt-3 sm:mt-4 leading-[1.08] text-paper">
            Taking projects from <em>vague asks</em> to <em>live production</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-start">
          {/* Main Manifesto */}
          <div className="identity-reveal">
            <p className="text-[clamp(0.98rem,1.4vw,1.2rem)] font-light text-paper/95 leading-relaxed">
              {PROFILE.summary}
            </p>
          </div>

          {/* 2x2 Responsive Metric Grid */}
          <div className="identity-reveal grid grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-raise border border-line/80 hover:border-accent/50 shadow-md transition-all flex flex-col justify-between">
              <span className="font-serif italic text-3xl sm:text-4xl text-accent font-normal">{PROJECTS.length}</span>
              <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">Shipped Systems</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-raise border border-line/80 hover:border-accent/50 shadow-md transition-all flex flex-col justify-between">
              <span className="font-serif italic text-3xl sm:text-4xl text-accent font-normal">{String(SKILL_DOMAINS.length).padStart(2, "0")}</span>
              <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">Skill Domains</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-raise border border-line/80 hover:border-accent/50 shadow-md transition-all flex flex-col justify-between">
              <span className="font-serif italic text-3xl sm:text-4xl text-accent font-normal">40+</span>
              <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">Core Technologies</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-raise border border-line/80 hover:border-accent/50 shadow-md transition-all flex flex-col justify-between">
              <span className="font-serif italic text-3xl sm:text-4xl text-accent font-normal">1+</span>
              <span className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-stone-300 font-semibold mt-2">Year Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
