"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/lib/types";
import { WorkflowBuilderCard } from "@/components/ui/workflow-builder-card";

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
      className="w-[84vw] sm:w-[350px] lg:w-[390px] xl:w-[410px] h-[430px] sm:h-[450px] lg:h-[465px] snap-center flex-shrink-0 border border-line bg-bg-raise flex flex-col relative overflow-hidden group rounded-3xl transition-transform duration-200 ease-out will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-accent hover:shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(193,99,59,0.18)]"
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
        className="relative w-full h-[40%] flex-shrink-0 overflow-hidden bg-bg border-b border-line/60"
        style={{ transform: "translateZ(14px)" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2.5 right-2.5 bg-bg/90 backdrop-blur-md border border-line/70 px-2.5 py-0.5 rounded font-mono text-[0.62rem] tracking-wider uppercase text-paper font-semibold shadow-md">
          {project.cat}
        </div>
      </div>

      {/* Classic Spacious Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow min-h-0 relative z-10 justify-between" style={{ transform: "translateZ(22px)" }}>
        <div>
          <div className="font-mono text-[0.65rem] sm:text-xs text-accent tracking-widest font-semibold">
            {String(project.idx).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </div>

          <h3 className="font-display font-medium text-[clamp(1.1rem,1.6vw,1.3rem)] mt-1 leading-snug group-hover:text-accent transition-colors text-paper">
            {project.title}
          </h3>

          <p className="mt-1.5 text-stone-300 font-light text-xs sm:text-[0.82rem] line-clamp-2 leading-relaxed">
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mobileCardIndex, setMobileCardIndex] = useState<number>(0);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.cat === activeCategory);

  // Cap visible projects on homepage to 8 flagship items + 1 Archive Explorer card
  // This reduces trapped scroll distance from 8,000px down to ~3,200px
  const displayedProjects =
    activeCategory === "All"
      ? PROJECTS.slice(0, 8)
      : filteredProjects.slice(0, 8);

  const handleMobileScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardEl = el.querySelector(".snap-center") as HTMLElement | null;
    const itemWidth = cardEl ? cardEl.offsetWidth + 16 : 320;
    const idx = Math.min(
      displayedProjects.length,
      Math.max(0, Math.round(el.scrollLeft / itemWidth))
    );
    setMobileCardIndex(idx);
  };

  useEffect(() => {
    // Reset horizontal scroll position on category switch
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setMobileCardIndex(0);
    }

    const mm = gsap.matchMedia();

    // GSAP horizontal pinning on Desktop (lg: >= 1024px)
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 80);
      };

      if (getScrollDistance() <= 0) {
        gsap.set(track, { x: 0 });
        return;
      }

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              displayedProjects.length,
              Math.max(0, Math.round(progress * displayedProjects.length))
            );
            setMobileCardIndex(idx);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // GSAP horizontal pinning on Mobile & Tablet (< 1024px)
    mm.add("(max-width: 1023px)", () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 32);
      };

      if (getScrollDistance() <= 0) {
        gsap.set(track, { x: 0 });
        return;
      }

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              displayedProjects.length,
              Math.max(0, Math.round(progress * displayedProjects.length))
            );
            setMobileCardIndex(idx);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [activeCategory, displayedProjects.length]);

  return (
    <section id="projects" ref={sectionRef} className="relative z-10 border-t border-line py-0 overflow-x-clip max-w-full" aria-labelledby="projects-heading">
      <div ref={pinRef} className="h-[100svh] min-h-[580px] lg:min-h-[700px] flex flex-col justify-between pt-4 sm:pt-6 lg:pt-8 pb-3 sm:pb-4 lg:pb-6">
        
        {/* Header Bar */}
        <div className="max-w-[1240px] w-full mx-auto px-[clamp(1rem,5vw,4rem)] mb-2 lg:mb-3 flex-shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-3 relative z-20">
          <div>
            <div className="eyebrow">04 / Selected Work</div>
            <h2 id="projects-heading" className="font-display font-medium text-[clamp(1.5rem,3.2vw,2.6rem)] tracking-[-0.01em] mt-1 sm:mt-1.5 leading-tight text-paper">
              Engineered for <span className="font-serif italic text-accent font-normal">Autonomy &amp; Scale</span>.
            </h2>
          </div>

          {/* Category Filter Pills (Sleek Horizontal Scroll Rail) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full md:max-w-xl xl:max-w-2xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[0.68rem] uppercase tracking-wider px-3 py-1 rounded-full border whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-accent ${
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
          - Universal GSAP scroll-driven horizontal pinned stream for both desktop & mobile
        */}
        <div
          id="projects-carousel"
          ref={scrollContainerRef}
          onScroll={handleMobileScroll}
          className="w-full min-h-0 py-2 sm:py-3 lg:py-2 overflow-hidden relative z-10 my-auto"
        >
          <div
            ref={trackRef}
            className="flex flex-row w-max px-[clamp(1rem,5vw,4rem)] gap-4 sm:gap-6 lg:gap-7 lg:pl-[clamp(1.5rem,5vw,4rem)] items-center"
          >
            {displayedProjects.map((project) => (
              <WorkflowBuilderCard
                key={project.slug}
                imageUrl={project.image}
                status={project.live ? "Active" : "Production"}
                lastUpdated={project.cat}
                title={project.title}
                tagline={project.tagline}
                description={project.desc}
                tags={project.tech}
                slug={project.slug}
                idx={project.idx}
                total={PROJECTS.length}
                category={project.cat}
                metrics={project.metrics}
                githubUrl={project.gh}
                liveUrl={project.live}
              />
            ))}

            {/* 9th Flagship Card: Archive Explorer */}
            <article
              className="w-[84vw] sm:w-[350px] lg:w-[380px] xl:w-[400px] snap-center flex-shrink-0 border border-line hover:border-accent bg-gradient-to-b from-bg-raise via-bg to-bg flex flex-col justify-between relative overflow-hidden group rounded-2xl transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.65)] p-5 sm:p-6 select-none"
            >
              <Link
                href="/work"
                className="absolute inset-0 z-20 focus-visible:ring-2 focus-visible:ring-accent rounded-3xl"
                aria-label="Open systems archive with all 16 projects"
              />

              {/* Decorative Background Glow & Grid Watermark */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/15 blur-3xl pointer-events-none group-hover:bg-accent/25 transition-all duration-500" />
              <div
                className="absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 70% 30%, rgba(193,99,59,0.3) 0%, transparent 60%), linear-gradient(to right, rgba(42,40,34,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(42,40,34,0.3) 1px, transparent 1px)",
                  backgroundSize: "100% 100%, 32px 32px, 32px 32px",
                }}
              />

              {/* Card Top: Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-accent text-[0.68rem] tracking-widest uppercase font-semibold">
                  ARCHIVE // 16 SYSTEMS
                </span>
                <span className="bg-bg/90 border border-line px-2.5 py-0.5 rounded font-mono text-[0.62rem] text-stone-300 uppercase tracking-wider">
                  Full Catalog
                </span>
              </div>

              {/* Card Center: Core Narrative */}
              <div className="relative z-10 my-auto py-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:border-accent transition-all duration-300">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>

                <h3 className="font-display font-medium text-2xl sm:text-3xl text-paper group-hover:text-accent transition-colors leading-tight">
                  Explore Full Systems Archive
                </h3>

                <p className="mt-2 text-stone-300 font-light text-xs sm:text-sm leading-relaxed line-clamp-3">
                  Traverse all 16 autonomous systems, sub-200ms voice orchestrations, computer vision pipelines, and production case studies with category filtering and search.
                </p>

                {/* Metric Signals */}
                <div className="mt-4 pt-3 border-t border-line/60 space-y-1 font-mono text-[0.7rem] text-paper/80">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">•</span>
                    <span>16 Shipped Production Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">•</span>
                    <span>09 Technical Domain Specializations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">•</span>
                    <span>100% Empirical Verification Logs</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom: Action CTA */}
              <div className="relative z-10 pt-2">
                <div className="w-full bg-accent text-bg font-semibold rounded-full px-5 py-3 hover:bg-accent/90 transition-all font-mono text-xs uppercase tracking-wider flex items-center justify-between group-hover:shadow-[0_0_20px_rgba(193,99,59,0.4)]">
                  <span>Launch Archive Explorer</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Bottom Helper Bar with Guaranteed Breathing Room */}
        <div className="max-w-[1240px] w-full mx-auto px-[clamp(1rem,5vw,4rem)] mt-3 pt-3 pb-1 flex justify-between items-center text-stone-300 font-mono text-[0.68rem] tracking-wider uppercase flex-shrink-0 border-t border-line/40 relative z-20">
          <span className="hidden lg:inline">
            Traversing {displayedProjects.length} Flagship Systems + Archive ({PROJECTS.length} Total) →
          </span>
          <div className="lg:hidden flex items-center gap-2 text-accent font-semibold">
            <span>⇄ Card {mobileCardIndex + 1} of {displayedProjects.length + 1}</span>
            <div className="flex items-center gap-1 ml-0.5">
              {Array.from({ length: displayedProjects.length + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    const el = scrollContainerRef.current;
                    if (el) {
                      const cardEl = el.querySelector(".snap-center") as HTMLElement | null;
                      const itemWidth = cardEl ? cardEl.offsetWidth + 16 : 320;
                      el.scrollTo({ left: dotIdx * itemWidth, behavior: "smooth" });
                    }
                  }}
                  aria-label={`Jump to project card ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    dotIdx === mobileCardIndex ? "w-3 bg-accent shadow-[0_0_6px_rgba(193,99,59,0.7)]" : "w-1.5 bg-stone/40 hover:bg-stone/70"
                  }`}
                />
              ))}
            </div>
          </div>
          <Link
            href="/work"
            className="text-accent hover:underline flex items-center gap-1 font-semibold focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
          >
            View All 16 Systems Archive ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
