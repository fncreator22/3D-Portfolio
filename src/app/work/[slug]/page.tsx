import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { SentinelSimulator } from "@/components/ui/SentinelSimulator";
import { TechLogo } from "@/components/ui/TechLogo";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Sagar Mahajan`,
    description: project.desc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = PROJECTS[projectIndex];
  const total = PROJECTS.length;
  const prevProject = PROJECTS[(projectIndex - 1 + total) % total];
  const nextProject = PROJECTS[(projectIndex + 1) % total];

  const isSentinel = project.slug === "sentinel-mcp-guardrail";

  return (
    <main id="main-content" className="pt-20 sm:pt-24 pb-20 relative z-10">
      {/* Back link */}
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)] pt-6 pb-2">
        <Link
          href="/#projects"
          className="font-mono text-xs uppercase tracking-wider text-stone-300 hover:text-accent inline-flex items-center gap-2 transition-colors py-2 focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
        >
          ← Back to all builds
        </Link>
      </div>

      {/* Hero Section: Editorial 2-Column Split */}
      <section className="border-b border-line py-8 sm:py-12" aria-labelledby="case-study-title">
        <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            {/* Left: Metadata & Intro */}
            <div>
              <div className="font-mono text-xs text-accent tracking-widest uppercase mb-2 font-semibold">
                {String(project.idx).padStart(2, "0")} / {String(total).padStart(2, "0")} — {project.cat}
              </div>

              <h1 id="case-study-title" className="font-display font-medium text-[clamp(2rem,5vw,3.6rem)] leading-[1.04] mt-2 text-paper">
                {project.title}
              </h1>

              <p className="font-serif italic text-accent text-[clamp(1rem,2vw,1.35rem)] mt-4">
                {project.tagline}
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <a
                  href={project.gh}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider px-5 py-3 bg-accent border border-accent text-bg font-semibold rounded-xl hover:bg-transparent hover:text-accent transition-all focus-visible:ring-2 focus-visible:ring-paper"
                  aria-label={`View GitHub repository for ${project.title}`}
                >
                  GitHub Source ↗
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider px-5 py-3 border border-line text-paper rounded-xl hover:border-accent hover:text-accent transition-all flex items-center gap-2 font-medium focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`Open live production deployment for ${project.title}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    Live Production ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right: Media Preview */}
            <div className="relative rounded-3xl overflow-hidden border border-line bg-bg-raise aspect-[16/10] shadow-[0_24px_60px_rgba(0,0,0,0.8)] group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 right-4 bg-bg/90 backdrop-blur-md border border-line/70 px-3 py-1 rounded-full font-mono text-[0.68rem] tracking-wider uppercase text-paper font-semibold shadow-md">
                {project.cat}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Case Study Body */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16">
            {/* Left: Narrative Sections */}
            <div className="space-y-12">
              {/* Overview */}
              <div>
                <div className="eyebrow mb-4">Architecture &amp; Overview</div>
                <p className="text-[clamp(1rem,1.4vw,1.18rem)] font-light text-paper/95 leading-relaxed">
                  {project.desc}
                </p>
              </div>

              {/* Problem */}
              <div className="border-t border-line/60 pt-8">
                <h2 className="font-display font-medium text-2xl text-paper mb-3">
                  The Problem
                </h2>
                <p className="text-stone-300 font-light text-base leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Approach */}
              <div className="border-t border-line/60 pt-8">
                <h2 className="font-display font-medium text-2xl text-paper mb-3">
                  The Approach &amp; Implementation
                </h2>
                <p className="text-stone-300 font-light text-base leading-relaxed">
                  {project.approach}
                </p>
              </div>

              {/* Outcome */}
              <div className="border-t border-line/60 pt-8">
                <h2 className="font-display font-medium text-2xl text-paper mb-3">
                  Measurable Outcome
                </h2>
                <p className="text-stone-300 font-light text-base leading-relaxed">
                  {project.outcome}
                </p>
              </div>

              {/* Interactive Simulator for Sentinel */}
              {isSentinel && (
                <div className="border-t border-line/60 pt-8">
                  <div className="eyebrow mb-4">Interactive Sandbox</div>
                  <h3 className="font-display font-medium text-2xl text-paper mb-2">
                    Test the 3-Stage Gating Pipeline
                  </h3>
                  <p className="text-stone-300 text-sm mb-6 font-light">
                    Simulate how Sentinel blocks destructive shell commands and flags scope creep in real time.
                  </p>
                  <SentinelSimulator />
                </div>
              )}
            </div>

            {/* Right Sidebar: Tech Stack WITH LOGOS & Metrics */}
            <div className="space-y-8">
              {/* Tech Stack with Logos */}
              <div className="p-6 sm:p-8 rounded-3xl bg-bg-raise border border-line/80 shadow-xl">
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4 font-semibold">
                  Technologies &amp; Skills
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {project.tech.map((t) => (
                    <TechLogo key={t} name={t} />
                  ))}
                </div>
              </div>

              {/* Empirical Metrics */}
              <div className="p-6 sm:p-8 rounded-3xl bg-bg-raise border border-line/80 shadow-xl">
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4 font-semibold">
                  Key Verification Metrics
                </div>
                <div className="space-y-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 font-mono text-xs text-paper/90 font-medium">
                      <span className="text-accent font-bold" aria-hidden="true">•</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Links Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-bg-raise to-bg border border-line/80 shadow-xl">
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4 font-semibold">
                  Project Availability
                </div>
                <div className="space-y-3">
                  <a
                    href={project.gh}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-bg border border-line hover:border-accent hover:text-accent font-mono text-xs uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <span>View Repository</span>
                    <span>↗</span>
                  </a>
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-accent text-bg font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent/90 transition-all focus-visible:ring-2 focus-visible:ring-paper"
                      aria-label={`Open live production deployment for ${project.title}`}
                    >
                      <span>Open Live App</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-bg/50 border border-line/50 font-mono text-[0.7rem] text-stone-400">
                      Codebase showcase · Live deploy upon request
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <nav className="border-t border-line mt-12 pt-12" aria-label="Adjacent Projects Pagination">
        <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)] flex justify-between items-center">
          <Link
            href={`/work/${prevProject.slug}`}
            className="group flex flex-col items-start focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-2"
            aria-label={`Previous Project: ${prevProject.title}`}
          >
            <span className="font-mono text-xs uppercase text-stone-300 group-hover:text-accent transition-colors">
              ← Previous System
            </span>
            <span className="font-display font-medium text-lg sm:text-xl text-paper mt-1 group-hover:text-accent transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col items-end focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-2"
            aria-label={`Next Project: ${nextProject.title}`}
          >
            <span className="font-mono text-xs uppercase text-stone-300 group-hover:text-accent transition-colors">
              Next System →
            </span>
            <span className="font-display font-medium text-lg sm:text-xl text-paper mt-1 group-hover:text-accent transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
