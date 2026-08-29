"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ThinkingPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const words = statementRef.current?.querySelectorAll(".fade-word");
      if (words) {
        gsap.to(words, {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statementText =
    "An agent that can act is only as trustworthy as the system watching it act. I don't ship autonomy — I ship autonomy with a witness: something that reviews, verifies, and can say no.";

  return (
    <section ref={sectionRef} id="thinking" className="py-[clamp(5rem,9vw,9rem)] border-t border-line relative z-10" aria-labelledby="thinking-heading">
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div id="thinking-heading" className="eyebrow">05 — Engineering Philosophy</div>

        <p
          ref={statementRef}
          className="mt-6 max-w-[900px] font-serif italic font-normal text-[clamp(1.35rem,3.2vw,2.4rem)] leading-[1.32] text-paper"
        >
          {statementText.split(" ").map((word, i) => (
            <span key={i} className="fade-word opacity-30 transition-opacity inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 rounded-2xl bg-bg-raise border border-line/80 hover:border-accent shadow-lg transition-colors">
            <div className="font-mono text-accent text-xs font-semibold">01</div>
            <h3 className="font-display font-medium text-base sm:text-lg mt-2.5 text-paper">Verify before you trust</h3>
            <p className="mt-2.5 text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
              Sentinel and LATO both exist because &quot;the model said so&quot; isn&apos;t good enough. Every proposed action gets reviewed against real constraints before it executes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-bg-raise border border-line/80 hover:border-accent shadow-lg transition-colors">
            <div className="font-mono text-accent text-xs font-semibold">02</div>
            <h3 className="font-display font-medium text-base sm:text-lg mt-2.5 text-paper">Latency is a feature</h3>
            <p className="mt-2.5 text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
              A guardrail nobody can afford to run gets bypassed. Sub-5ms gateway checks and 35ms end-to-end vision pipelines aren&apos;t vanity metrics — they&apos;re what makes safety usable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-bg-raise border border-line/80 hover:border-accent shadow-lg transition-colors">
            <div className="font-mono text-accent text-xs font-semibold">03</div>
            <h3 className="font-display font-medium text-base sm:text-lg mt-2.5 text-paper">Ship the whole stack</h3>
            <p className="mt-2.5 text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
              A model is not a product. I build the FastAPI gateway, the RBAC layer, and the React surface around it — because the delivery layer is where trust is actually earned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
