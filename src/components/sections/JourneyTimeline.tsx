"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROLES } from "@/data/projects";

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".role-item");
      const fillLine = document.getElementById("role-fill-line");

      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 40%",
          onEnter: () => setActiveRoleIndex(i),
          onEnterBack: () => setActiveRoleIndex(i),
        });
      });

      if (fillLine) {
        ScrollTrigger.create({
          trigger: ".role-track-wrap",
          start: "top 65%",
          end: "bottom 65%",
          onUpdate: (self) => {
            fillLine.style.height = `${self.progress * 100}%`;
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="journey" className="border-t border-line py-[clamp(5rem,10vw,8rem)] relative z-10">
      <div className="max-w-[1240px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="max-w-[760px] mb-14">
          <div className="eyebrow">02 — Trajectory</div>
          <h2 className="font-display font-medium text-[clamp(2rem,5vw,3.4rem)] tracking-[-0.01em] mt-4 leading-[1.08]">
            Four roles, one <em>throughline</em>: ship it, then prove it&apos;s safe.
          </h2>
        </div>

        <div className="role-track-wrap relative pl-8 md:pl-12">
          {/* Background Conduit Rail */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-line/80" />
          
          {/* Active 3D Laser Glowing Rail */}
          <div
            id="role-fill-line"
            className="absolute left-0 top-0 w-[2px] h-0 bg-gradient-to-b from-accent via-accent to-emerald-400 shadow-[0_0_12px_#c1633b] transition-all duration-100"
          />

          {ROLES.map((role, i) => {
            const isActive = activeRoleIndex === i;
            return (
              <div
                key={i}
                className={`role-item relative py-8 md:py-10 border-b border-line last:border-b-0 transition-all duration-500 ${
                  isActive
                    ? "opacity-100 translate-x-1"
                    : "opacity-40 hover:opacity-75"
                }`}
              >
                {/* 3D Kinetic Synapse Node on the Rail */}
                <div
                  className={`absolute -left-[37px] md:-left-[53px] top-10 md:top-12 w-[12px] h-[12px] rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-accent border-paper shadow-[0_0_16px_#c1633b,0_0_0_5px_rgba(193,99,59,0.25)] scale-125"
                      : "bg-bg border-stone/60"
                  }`}
                />

                {/* Role Content Card */}
                <div
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-bg-raise/95 border-accent/40 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(193,99,59,0.1)]"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="font-display font-medium text-[clamp(1.25rem,2.5vw,1.85rem)] text-paper">
                      {role.title}
                    </div>
                    <div className="font-serif italic text-accent text-[clamp(1.1rem,2vw,1.35rem)]">
                      {role.company}
                    </div>
                  </div>

                  <div className="font-mono text-xs tracking-wider uppercase text-stone mt-1.5 flex items-center gap-2">
                    <span>{role.meta}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>

                  <p className="mt-4 max-w-[720px] text-stone font-light text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed">
                    {role.desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {role.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`font-mono text-[0.68rem] tracking-wider uppercase px-3 py-1 rounded border transition-colors ${
                          isActive
                            ? "border-accent/40 bg-accent/10 text-paper"
                            : "border-line text-stone"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
