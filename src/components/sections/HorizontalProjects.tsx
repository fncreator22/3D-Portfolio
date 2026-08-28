"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.cat)))];

// 3D Interactive Parallax Card Component
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
    const rotX = -(y / (rect.height / 2)) * 10;
    const rotY = (x / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;

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
      className="w-full lg:w-[min(78vw,460px)] h-[480px] sm:h-[520px] lg:h-[min(74vh,580px)] lg:mr-[clamp(1.5rem,3vw,2.5rem)] flex-shrink-0 border border-line bg-bg-raise flex flex-col relative overflow-hidden group rounded-3xl transition-transform duration-200 ease-out will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-accent hover:shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(193,99,59,0.18)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Open case study: ${project.title}`}
      />

      {/* Dynamic Specular Glare */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-30 transition-all duration-75 mix-blend-overlay"
      />

      {/* Media preview */}
      <div
        className="relative w-full h-[40%] flex-shrink-0 overflow-hidden bg-bg border-b border-line/50"
        style={{ transform: "translateZ(15px)" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-bg/85 backdrop-blur-md border border-line/60 px-2.5 py-0.5 rounded font-mono text-[0.62rem] sm:text-[0.65rem] tracking-wider uppercase text-paper/90 shadow-md">
          {project.cat}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow min-h-0 relative z-10" style={{ transform: "translateZ(24px)" }}>
        <div className="font-mono text-[0.68rem] sm:text-xs text-accent tracking-widest">
          {String(project.idx).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </div>

        <h3 className="font-display font-medium text-[clamp(1.1rem,1.8vw,1.4rem)] mt-1.5 leading-snug group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="mt-2.5 text-stone font-light text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {project.desc}
        </p>

        <div className="mt-auto pt-3 sm:pt-4 border-t border-line/60">
          {project.metrics.slice(0, 2).map((m, mIdx) => (
            <div key={mIdx} className="font-mono text-[0.65rem] sm:text-[0.68rem] text-paper/85 mb-0.5 sm:mb-1 truncate">
              • {m}
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 flex items-center justify-between pt-1">
          <span className="font-mono text-[0.72rem] sm:text-xs text-accent group-hover:underline flex items-center gap-1">
            View Case Study →
          </span>
          <div className="flex gap-3 relative z-30">
            <a
              href={project.gh}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] sm:text-xs uppercase text-stone hover:text-accent transition-colors"
            >
              Code ↗
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] sm:text-xs uppercase text-stone hover:text-accent transition-colors"
              >
                Live ↗
              </a>
            )}
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
    if (window.innerWidth < 1024) return;

    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    let ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth * 1.1}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 border-t border-line">
      {/* Section Header & Filter Controls */}
      <div className="pt-16 sm:pt-24 pb-6 sm:pb-8 max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-line">
          <div>
            <div className="eyebrow">04 — Selected Systems</div>
            <h2 className="font-display font-medium text-[clamp(1.9rem,4.5vw,3.4rem)] tracking-[-0.01em] mt-3">
              Production Work &amp; <em>Architectures</em>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[0.68rem] sm:text-xs uppercase tracking-wider px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-bg border-accent font-medium shadow-md shadow-accent/20"
                    : "border-line text-stone hover:text-paper hover:border-paper/40 bg-bg-raise/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-wider text-accent hover:underline flex items-center gap-1.5 py-1"
          >
            Full Archive ({PROJECTS.length} Projects) →
          </Link>
        </div>
      </div>

      {/* Desktop Mode (>= 1024px) */}
      <div ref={pinRef} className="hidden lg:block h-screen relative overflow-hidden">
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center pl-[clamp(1.25rem,5vw,4rem)] will-change-transform"
        >
          {filteredProjects.map((p) => (
            <Project3DCard key={p.slug} project={p} />
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Snap-Swipe Carousel (< 1024px) */}
      <div className="lg:hidden px-[clamp(1rem,5vw,4rem)] pb-14 sm:pb-16">
        <div className="flex overflow-x-auto gap-4 sm:gap-5 snap-x snap-mandatory py-3 no-scrollbar -mx-4 px-4">
          {filteredProjects.map((p) => (
            <div key={p.slug} className="snap-center flex-shrink-0 w-[min(84vw,360px)]">
              <Project3DCard project={p} />
            </div>
          ))}
        </div>
        
        {/* Mobile Swipe Guidance Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 text-stone font-mono text-[0.65rem] uppercase tracking-widest">
          <span>← Swipe to explore ({filteredProjects.length} systems) →</span>
        </div>
      </div>
    </section>
  );
}
