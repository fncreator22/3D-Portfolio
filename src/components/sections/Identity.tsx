"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <section ref={sectionRef} id="identity" className="py-[clamp(4.5rem,8vw,8rem)] border-t border-line relative z-10">
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="identity-reveal max-w-[760px] mb-10 md:mb-14">
          <div className="eyebrow">01 — Identity</div>
          <h2 className="font-display font-medium text-[clamp(1.9rem,4.5vw,3.2rem)] tracking-[-0.01em] mt-3 sm:mt-4 leading-[1.08]">
            Not just <em>building</em> AI systems — making them <em>accountable</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-start">
          {/* Main Manifesto */}
          <div className="identity-reveal">
            <p className="text-[clamp(0.98rem,1.4vw,1.2rem)] font-light text-paper/90 leading-relaxed">
              I&apos;m an AI/ML engineer focused on agentic systems, LLM orchestration, and applied computer vision — with full-stack engineering as the delivery layer that turns those systems into shipped products. Most of my recent work sits at the boundary between an autonomous agent and the real world it&apos;s allowed to act in: reviewing what an agent proposes before it runs, tracking what a model actually sees, and making sure the pipeline underneath stays honest at scale.
            </p>
          </div>

          {/* 2x2 Responsive Metric Grid on Mobile, Clean Column on Desktop */}
          <div className="identity-reveal grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-raise/80 border border-line/70 hover:border-accent/40 transition-all flex flex-col justify-between">
              <span className="font-serif italic text-3xl sm:text-4xl text-accent">14</span>
              <span className="font-mono text-[0.65rem] sm:text-xs tracking-wider uppercase text-stone mt-2">Shipped Projects</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-raise/80 border border-line/70 hover:border-accent/40 transition-all flex flex-col justify-between">
              <span className="font-serif italic text-3xl sm:text-4xl text-accent">04</span>
              <span className="font-mono text-[0.65rem] sm:text-xs tracking-wider uppercase text-stone mt-2">Skill Domains</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-raise/80 border border-line/70 hover:border-accent/40 transition-all flex flex-col justify-between">
              <span className="font-serif italic text-3xl sm:text-4xl text-accent">27</span>
              <span className="font-mono text-[0.65rem] sm:text-xs tracking-wider uppercase text-stone mt-2">Core Technologies</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-bg-raise/80 border border-line/70 hover:border-accent/40 transition-all flex flex-col justify-between">
              <span className="font-serif italic text-3xl sm:text-4xl text-accent">3+</span>
              <span className="font-mono text-[0.65rem] sm:text-xs tracking-wider uppercase text-stone mt-2">Years Building</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
