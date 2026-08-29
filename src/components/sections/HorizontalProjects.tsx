"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.cat)))];

// 3D Interactive Parallax Card Component (Classic Spacious Design)
function Project3DCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 1024) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;

    if (glareRef.current) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle 220px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18), transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (glareRef.current) {
      glareRef.current.style.background = "transparent";
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-[84vw] sm:w-[380px] lg:w-[440px] h-[490px] sm:h-[510px] lg:h-[530px] snap-center flex-shrink-0 border border-line bg-bg-raise flex flex-col relative overflow-hidden group rounded-3xl transition-transform duration-200 ease-out will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-accent hover:shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(193,99,59,0.18)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-20 focus-visible:ring-2 focus-visible:ring-accent rounded-3xl"
        aria-label={`Open case study: ${project.title}`}
      />

      {/* Dynamic Specular Glare */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-30 transition-all duration-75 mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Classic 16/10 Media Preview Header */}
      <div
        className="relative w-full h-[44%] flex-shrink-0 overflow-hidden bg-bg border-b border-line/60"
        style={{ transform: "translateZ(14px)" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-bg/90 backdrop-blur-md border border-line/70 px-2.5 py-0.5 rounded font-mono text-[0.65rem] tracking-wider uppercase text-paper font-semibold shadow-md">
          {project.cat}
        </div>
      </div>

      {/* Classic Spacious Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow min-h-0 relative z-10 justify-between" style={{ transform: "translateZ(22px)" }}>
        <div>
          <div className="font-mono text-[0.68rem] sm:text-xs text-accent tracking-widest font-semibold">
            {String(project.idx).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </div>

          <h3 className="font-display font-medium text-[clamp(1.15rem,1.8vw,1.4rem)] mt-1 leading-snug group-hover:text-accent transition-colors text-paper">
            {project.title}
          </h3>

          <p className="mt-2 text-stone-300 font-light text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {project.desc}
          </p>
        </div>

        <div>
          {/* Key Verification Metrics */}
          <div className="pt-3 border-t border-line/60 space-y-1">
            {project.metrics.slice(0, 2).map((m, mIdx) => (
              <div key={mIdx} className="font-mono text-[0.68rem] sm:text-xs text-paper/90 truncate font-medium">
                • {m}
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="mt-3.5 flex items-center justify-between pt-1">
            <span className="font-mono text-[0.72rem] sm:text-xs text-accent group-hover:underline flex items-center gap-1 font-semibold">
              View Case Study →
            </span>
            <div className="flex gap-3 relative z-30">
              <a
                href={project.gh}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] sm:text-xs uppercase text-stone-300 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-1 font-semibold"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                Code ↗
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.7rem] sm:text-xs uppercase text-stone-300 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-1 font-semibold"
                  aria-label={`Open live production deployment for ${project.title}`}
                >
                  Live ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HorizontalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.cat === activeCategory);

  useEffect(() => {
    // Only apply horizontal GSAP pin on wide desktop (lg+)
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const totalWidth = track.scrollWidth;
    const viewWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewWidth + 80;

    const tween = gsap.to(track, {
      x: () => -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: () => `+=${scrollDistance * 1.1}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [activeCategory]);

  return (
    <section id="projects" ref={sectionRef} className="relative z-10 border-t border-line py-12 lg:py-0" aria-labelledby="projects-heading">
      <div ref={pinRef} className="lg:h-screen lg:min-h-[660px] lg:overflow-hidden flex flex-col justify-between lg:py-8">
        
        {/* Header Bar */}
        <div className="max-w-[1240px] w-full mx-auto px-[clamp(1rem,5vw,4rem)] mb-6 lg:mb-4 flex-shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="eyebrow">04 — Selected Work</div>
            <h2 id="projects-heading" className="font-display font-medium text-[clamp(1.9rem,4vw,3.2rem)] tracking-[-0.01em] mt-2 leading-none text-paper">
              Engineered for <span className="font-serif italic text-accent font-normal">Autonomy &amp; Scale</span>.
            </h2>
          </div>

          {/* Category Filter Pills (Mobile Swipe Rail & Desktop Wrap) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[0.7rem] uppercase tracking-wider px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-accent ${
                  activeCategory === cat
                    ? "bg-accent text-bg border-accent font-semibold shadow-md shadow-accent/20"
                    : "border-line text-stone-300 hover:text-paper hover:border-paper/40 bg-bg/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 
          Horizontal Track:
          - Mobile (< 1024px): Touch-native horizontal snap scroll container with smooth swipe physics
          - Desktop (>= 1024px): GSAP horizontal transform track
        */}
        <div className="flex-1 flex items-center w-full min-h-0 py-2 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none no-scrollbar">
          <div
            ref={trackRef}
            className="flex flex-row w-max px-[clamp(1rem,5vw,4rem)] gap-4 sm:gap-6 lg:gap-8 lg:pl-[clamp(1.5rem,5vw,4rem)]"
          >
            {filteredProjects.map((project) => (
              <Project3DCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        {/* Bottom Helper Bar with Guaranteed Breathing Room */}
        <div className="max-w-[1240px] w-full mx-auto px-[clamp(1rem,5vw,4rem)] mt-6 lg:mt-3 pt-3 pb-1 flex justify-between items-center text-stone-300 font-mono text-[0.68rem] tracking-wider uppercase flex-shrink-0 border-t border-line/40">
          <span className="hidden lg:inline">
            Scroll vertically to traverse 3D Case Studies →
          </span>
          <span className="lg:hidden flex items-center gap-1.5 text-accent font-semibold">
            <span>⇄ Swipe to explore systems ({filteredProjects.length})</span>
          </span>
          <Link
            href="/work"
            className="text-accent hover:underline flex items-center gap-1 font-semibold focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
          >
            View All 12 Systems Archive ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
