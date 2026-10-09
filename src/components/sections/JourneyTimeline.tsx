"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROLES } from "@/data/projects";
import { TechLogo } from "@/components/ui/TechLogo";
import { isTransitionEnabled } from "@/lib/motion-flags";

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".role-item");
      const fillLine = document.getElementById("role-fill-line");
      const laserHead = document.getElementById("role-laser-head");
      const shockwavePulse = document.getElementById("trajectory-shockwave-pulse");

      // Role active item trigger
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 72%",
          end: "bottom 30%",
          onEnter: () => setActiveRoleIndex(i),
          onEnterBack: () => setActiveRoleIndex(i),
        });
      });

      // Active 3D Laser Glowing Rail and Photon Light Head
      if (fillLine) {
        ScrollTrigger.create({
          trigger: ".role-track-wrap",
          start: "top 72%",
          end: "bottom 55%",
          onUpdate: (self) => {
            const p = self.progress;
            fillLine.style.height = `${p * 100}%`;
            if (laserHead) {
              laserHead.style.top = `${p * 100}%`;
              laserHead.style.opacity = p > 0.005 ? "1" : "0";
            }

            // Transition 03: Traveling Photon Shockwave at 100% completion
            if (isTransitionEnabled("TRAJECTORY_TO_SKILLS_PHOTON")) {
              if (p >= 0.92) {
                const intensity = (p - 0.92) / 0.08;
                if (shockwavePulse) {
                  shockwavePulse.style.opacity = `${Math.min(1, intensity * 1.5)}`;
                  shockwavePulse.style.transform = `scale(${1 + intensity * 1.8})`;
                }
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("trajectory-photon-burst", {
                      detail: { intensity, progress: p },
                    })
                  );
                }
              } else if (shockwavePulse) {
                shockwavePulse.style.opacity = "0";
                shockwavePulse.style.transform = "scale(1)";
              }
            }
          },
        });
      }

      // Transition 02: 3D Card Splash Physics on Section Entry & Exit Tilt
      if (isTransitionEnabled("IDENTITY_TO_TRAJECTORY_STACK") && cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            y: 65,
            scale: 0.96,
            rotateX: -3.5,
            rotateZ: -0.6,
            transformOrigin: "center bottom",
          },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateZ: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              end: "top 45%",
              scrub: 0.8,
            },
          }
        );

        // Card 02 Exit Tilt toward Card 03 (Skills)
        gsap.to(cardRef.current, {
          scale: 0.95,
          rotateX: 3.2,
          y: -20,
          filter: "brightness(0.8)",
          transformOrigin: "center top",
          ease: "power1.out",
          scrollTrigger: {
            trigger: "#skills",
            start: "top 95%",
            end: "top 35%",
            scrub: 0.8,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="py-[clamp(3.5rem,7vw,7rem)] relative z-10 overflow-visible max-w-full"
      style={{ perspective: "1200px" }}
      aria-labelledby="journey-heading"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        {/* ─── 3D Card Deck: Section Card 02 ─── */}
        <div
          ref={cardRef}
          className="rounded-[28px] sm:rounded-[36px] bg-bg-raise/95 border border-line/90 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_35px_rgba(193,99,59,0.1)] p-6 sm:p-10 lg:p-14 relative overflow-hidden will-change-transform"
        >
          {/* Subtle Ambient Rim Glow */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-accent/6 rounded-full blur-[90px] pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-[820px] mb-10 sm:mb-14">
            <div className="eyebrow text-accent font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>02 / Trajectory &amp; Evolution</span>
            </div>
            {/* Space Grotesk 500 headline without heavy italic serif flourishes */}
            <h2
              id="journey-heading"
              className="font-display font-medium text-[clamp(1.85rem,4.5vw,3.2rem)] tracking-[-0.01em] mt-3 sm:mt-4 leading-[1.1] text-paper"
            >
              Four roles, one throughline:{" "}
              <span className="text-accent font-medium">ship it, then prove it&apos;s safe</span>.
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

            {/* Transition 03: Photon Shockwave Burst at Rail Termination */}
            <div
              id="trajectory-shockwave-pulse"
              className="absolute -left-[14px] bottom-0 w-[30px] h-[30px] rounded-full pointer-events-none -translate-y-1/2 opacity-0 z-30 flex items-center justify-center transition-all duration-150 will-change-transform"
            >
              <div className="absolute inset-0 rounded-full bg-accent/40 animate-ping pointer-events-none" />
              <div className="w-[14px] h-[14px] rounded-full bg-paper shadow-[0_0_20px_#ffffff,0_0_40px_#ffaa75,0_0_60px_#c1633b]" />
            </div>

            {ROLES.map((role, i) => {
              const isActive = activeRoleIndex === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveRoleIndex(i)}
                  className={`role-item relative py-8 md:py-10 border-b border-line last:border-b-0 transition-all duration-500 cursor-pointer ${
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
                        ? "bg-bg/95 border-accent/60 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(193,99,59,0.18)]"
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div className="font-display font-medium text-[clamp(1.25rem,2.5vw,1.85rem)] text-paper">
                        {role.title}
                      </div>
                      <div className="font-display font-medium text-accent text-[clamp(1.05rem,1.8vw,1.25rem)]">
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
      </div>
    </section>
  );
}

export default JourneyTimeline;
