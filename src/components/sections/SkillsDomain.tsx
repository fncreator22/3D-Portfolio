"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTransitionEnabled } from "@/lib/motion-flags";
import ScrollMorphSkills from "@/components/ui/scroll-morph-hero";

export function SkillsDomain() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // 1. Transition 03: Traveling Laser Photon Shockwave Mechanics
    const handlePhotonBurst = (e: Event) => {
      if (!isTransitionEnabled("TRAJECTORY_TO_SKILLS_PHOTON")) return;
      const customEvent = e as CustomEvent<{ intensity?: number }>;
      const intensity = customEvent.detail?.intensity ?? 1;
      if (flareRef.current) {
        flareRef.current.style.opacity = `${Math.min(0.85, intensity)}`;
        setTimeout(() => {
          if (flareRef.current) flareRef.current.style.opacity = "0";
        }, 800);
      }
    };

    window.addEventListener("trajectory-photon-burst", handlePhotonBurst);

    const ctx = gsap.context(() => {
      // Synchronize Transition 03: Excite flare when Skills arrives in viewport from Journey
      if (isTransitionEnabled("TRAJECTORY_TO_SKILLS_PHOTON") && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 35%",
          onEnter: () => {
            if (flareRef.current) {
              flareRef.current.style.opacity = "0.75";
              setTimeout(() => {
                if (flareRef.current) flareRef.current.style.opacity = "0";
              }, 800);
            }
          },
        });
      }

      // Transition 02 Extension: Card 03 3D Splash Entry Physics
      if (isTransitionEnabled("IDENTITY_TO_TRAJECTORY_STACK") && cardRef.current && sectionRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            y: 40,
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
              end: "top 55%",
              scrub: 0.8,
            },
          }
        );
      }

      // Page-driven scroll driver with pin for ScrollMorphSkills
      if (sectionRef.current) {
        const isMobile = window.innerWidth < 768;
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=1400" : "+=2400",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("trajectory-photon-burst", handlePhotonBurst);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 w-full min-h-[100svh] flex flex-col justify-center items-center py-6 sm:py-8"
      style={{ perspective: "1200px" }}
      aria-labelledby="skills-heading"
    >
      <div className="w-full max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 pt-14 sm:pt-16">
        {/* ─── 3D Card Deck: Section Card 03 ─── */}
        <div
          ref={cardRef}
          className="rounded-[28px] sm:rounded-[36px] bg-bg-raise/95 border border-line/90 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_35px_rgba(193,99,59,0.1)] p-3 sm:p-6 lg:p-8 relative overflow-hidden will-change-transform"
        >
          {/* Subtle Ambient Rim Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/6 rounded-full blur-[90px] pointer-events-none" />

          {/* Photon Shockwave Radiant Flare (Transition 03 Seeding Anchor) */}
          <div
            ref={flareRef}
            className="absolute top-0 left-1/4 -translate-x-1/2 w-[420px] h-32 bg-[radial-gradient(ellipse_at_top,rgba(193,99,59,0.45),transparent_70%)] pointer-events-none opacity-0 transition-opacity duration-300 z-0"
            aria-hidden="true"
          />

          {/* ScrollMorphSkills Component (Pure Logo Cards with 3D Flip & Scroll Morph) */}
          <ScrollMorphSkills externalProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}

export default SkillsDomain;
