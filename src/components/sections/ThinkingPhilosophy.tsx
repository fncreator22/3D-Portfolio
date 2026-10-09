"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTransitionEnabled } from "@/lib/motion-flags";

export function ThinkingPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Card 05 Splash Physics
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            y: 45,
            scale: 0.97,
            rotateX: -2.5,
            transformOrigin: "center bottom",
          },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "top 50%",
              scrub: 0.8,
            },
          }
        );
      }

      const words = statementRef.current?.querySelectorAll(".fade-word");
      if (words && isTransitionEnabled("PROJECTS_TO_PHILOSOPHY_BLADE")) {
        gsap.to(words, {
          opacity: 1,
          color: "#efe9df",
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

      gsap.from(".principle-card", {
        scrollTrigger: {
          trigger: ".principles-grid",
          start: "top 85%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statementText =
    "An agent that can act is only as trustworthy as the system watching it act. I do not ship blind autonomy; I ship autonomy with a witness: something that reviews, verifies, and can say no.";

  return (
    <section
      ref={sectionRef}
      id="thinking"
      className="py-[clamp(3.5rem,7vw,7rem)] relative z-10 overflow-visible max-w-full"
      style={{ perspective: "1200px" }}
      aria-labelledby="thinking-heading"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        {/* ─── De-boxified Organic Architecture: Section Card 05 ─── */}
        <div
          ref={cardRef}
          className="rounded-[32px] sm:rounded-[44px] bg-gradient-to-b from-[#141210]/70 via-[#0e0d0b]/45 to-transparent p-6 sm:p-10 lg:p-14 relative overflow-hidden will-change-transform"
        >
          {/* Subtle Ambient Atmospheric Glows */}
          <div className="absolute -top-24 left-1/4 w-96 h-48 bg-accent/[0.05] blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/[0.05] rounded-full blur-[100px] pointer-events-none" />

          <div id="thinking-heading" className="eyebrow text-accent font-semibold flex items-center gap-2 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>05 / Engineering Conviction</span>
          </div>

          {/* High-conviction Space Grotesk editorial typography without italic overload */}
          <p
            ref={statementRef}
            className="mt-6 max-w-[940px] font-display font-medium text-[clamp(1.35rem,3.2vw,2.3rem)] leading-[1.3] tracking-[-0.01em] text-paper relative z-10"
          >
            {statementText.split(" ").map((word, i) => {
              const isWitness = word.toLowerCase().includes("witness");
              const isKeyWord =
                word.toLowerCase().includes("verifies") ||
                word.toLowerCase().includes("reviews") ||
                word.toLowerCase().includes("no.");

              return (
                <span
                  key={i}
                  className={`fade-word opacity-30 transition-opacity inline-block mr-[0.25em] ${
                    isWitness
                      ? "text-accent font-semibold"
                      : isKeyWord
                      ? "text-paper font-semibold"
                      : "text-stone-300"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>

          <div className="principles-grid mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            <div className="principle-card p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.06] hover:border-accent/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300">
              <div className="font-mono text-accent text-xs font-semibold">01</div>
              <h3 className="font-display font-medium text-base sm:text-lg mt-2.5 text-paper">
                Verify before you trust
              </h3>
              <p className="mt-2.5 text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
                Sentinel and LATO both exist because &quot;the model said so&quot; isn&apos;t good enough. Every proposed action gets reviewed against real constraints before it executes.
              </p>
            </div>

            <div className="principle-card p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.06] hover:border-accent/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300">
              <div className="font-mono text-accent text-xs font-semibold">02</div>
              <h3 className="font-display font-medium text-base sm:text-lg mt-2.5 text-paper">
                Latency is a feature
              </h3>
              <p className="mt-2.5 text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
                A guardrail nobody can afford to run gets bypassed. Sub-5ms gateway checks and 35ms end-to-end vision pipelines aren&apos;t vanity metrics, they are what makes safety usable.
              </p>
            </div>

            <div className="principle-card p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.06] hover:border-accent/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300">
              <div className="font-mono text-accent text-xs font-semibold">03</div>
              <h3 className="font-display font-medium text-base sm:text-lg mt-2.5 text-paper">
                Ship the whole stack
              </h3>
              <p className="mt-2.5 text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
                A model is not a product. I build the FastAPI gateway, the RBAC layer, and the React surface around it because the delivery layer is where trust is actually earned.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThinkingPhilosophy;
