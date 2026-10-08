"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROLES } from "@/data/projects";
import { TechLogo } from "@/components/ui/TechLogo";

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".role-item");
      const fillLine = document.getElementById("role-fill-line");
      const laserHead = document.getElementById("role-laser-head");

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
            const p = self.progress;
            fillLine.style.height = `${p * 100}%`;
            if (laserHead) {
              laserHead.style.top = `${p * 100}%`;
              laserHead.style.opacity = p > 0.005 ? "1" : "0";
            }
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
          <div className="eyebrow">02 / Trajectory</div>
          <h2 className="font-display font-medium text-[clamp(2rem,5vw,3.4rem)] tracking-[-0.01em] mt-4 leading-[1.08]">
            Four roles, one <em>throughline</em>: ship it, then prove it&apos;s safe.
          </h2>
        </div>

        <div className="role-track-wrap relative pl-8 md:pl-12">
          {/* Background Conduit Rail */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-line/60" />
          
          {/* Active 3D Laser Glowing Rail */}
          <div
            id="role-fill-line"
            className="absolute left-0 top-0 w-[2.5px] h-0 bg-gradient-to-b from-accent via-[#e27d50] to-[#ffaa75] origin-top will-change-[height]"
            style={{
              boxShadow:
                "0 0 10px rgba(255, 170, 117, 0.95), 0 0 22px rgba(193, 99, 59, 0.85), 0 0 35px rgba(193, 99, 59, 0.5)",
            }}
          />

          {/* Traveling Photon Light Head (Pop-up light on scroll) */}
          <div
            id="role-laser-head"
            className="absolute -left-[5px] w-[12px] h-[12px] rounded-full bg-paper pointer-events-none -translate-y-1/2 opacity-0 z-20 transition-opacity duration-150"
            style={{
              boxShadow:
                "0 0 12px #ffffff, 0 0 24px #ffaa75, 0 0 38px #c1633b, 0 0 55px rgba(193, 99, 59, 0.9)",
            }}
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
                      ? "bg-paper border-accent shadow-[0_0_16px_#ffffff,0_0_32px_#ffaa75,0_0_50px_#c1633b,0_0_0_6px_rgba(193,99,59,0.35)] scale-125 z-10"
                      : "bg-bg border-stone/50 hover:border-accent/60"
                  }`}
                >
                  {/* Radiant synaptic pulse ripple on active node */}
                  {isActive && (
                    <span className="absolute -inset-1.5 rounded-full bg-accent animate-ping opacity-75 pointer-events-none" />
                  )}
                </div>

                {/* Role Content Card */}
                <div
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-bg-raise/95 border-accent/60 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(193,99,59,0.18)]"
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

                  <div className="font-mono text-xs tracking-wider uppercase text-stone-300 mt-1.5 flex items-center gap-2">
                    <span>{role.meta}</span>
                  </div>

                  <p className="mt-4 max-w-[720px] text-stone-300 font-light text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed">
                    {role.desc}
                  </p>

                  {/* Skills badges with glowing Tech Logos */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {role.skills.map((skill, sIdx) => (
                      <TechLogo key={sIdx} name={skill} />
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

export default JourneyTimeline;
