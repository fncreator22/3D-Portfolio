import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { SentinelSimulator } from "@/components/ui/SentinelSimulator";
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

  return (
    <div className="pt-20 sm:pt-24 pb-20 relative z-10">
      {/* Back link */}
      <div className="max-w-[1240px] mx-auto px-[clamp(1.25rem,5vw,4rem)] pt-6 pb-2">
        <Link
          href="/#projects"
          className="font-mono text-xs uppercase tracking-wider text-stone hover:text-accent inline-flex items-center gap-2 transition-colors py-2"
        >
          ← Back to all builds
        </Link>
      </div>

      {/* Hero Section: Editorial 2-Column Split */}
      <section className="border-b border-line py-8 sm:py-12">
        <div className="max-w-[1240px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            {/* Left: Metadata & Intro */}
            <div>
              <div className="font-mono text-xs text-accent tracking-widest uppercase mb-2">
                {String(project.idx).padStart(2, "0")} / {String(total).padStart(2, "0")} — {project.cat}
              </div>

              <h1 className="font-display font-medium text-[clamp(2rem,5vw,3.6rem)] leading-[1.04] mt-2 text-paper">
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
                  className="font-mono text-xs uppercase tracking-wider px-5 py-3 bg-accent border border-accent text-bg font-medium rounded hover:bg-transparent hover:text-accent transition-all"
                >
                  GitHub Source ↗
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider px-5 py-3 border border-line text-paper rounded hover:border-accent hover:text-accent transition-all"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right: Containerized Media Mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-line bg-bg-raise shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <div className="bg-bg px-4 py-2.5 border-b border-line/60 flex items-center justify-between text-stone font-mono text-[0.68rem]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-line" />
                  <span className="w-2.5 h-2.5 rounded-full bg-line" />
                  <span className="w-2.5 h-2.5 rounded-full bg-line" />
                </div>
                <span className="truncate max-w-[200px]">{project.slug}.build</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep-Dive Case Study Content */}
      <section className="py-[clamp(4rem,8vw,6rem)]">
        <div className="max-w-[1240px] mx-auto px-[clamp(1.25rem,5vw,4rem)] grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
          <div className="space-y-12">
            <div>
              <div className="eyebrow">Overview</div>
              <h2 className="font-display font-medium text-[clamp(1.4rem,2.6vw,1.9rem)] mt-3 mb-4">
                What it does
              </h2>
              <p className="text-stone font-light text-base leading-relaxed max-w-[680px]">
                {project.desc}
              </p>
            </div>

            <div>
              <div className="eyebrow">The Problem</div>
              <h2 className="font-display font-medium text-[clamp(1.4rem,2.6vw,1.9rem)] mt-3 mb-4">
                Why it needed building
              </h2>
              <p className="text-stone font-light text-base leading-relaxed max-w-[680px]">
                {project.problem}
              </p>
            </div>

            <div>
              <div className="eyebrow">The Approach</div>
              <h2 className="font-display font-medium text-[clamp(1.4rem,2.6vw,1.9rem)] mt-3 mb-4">
                How it was engineered
              </h2>
              <p className="text-stone font-light text-base leading-relaxed max-w-[680px]">
                {project.approach}
              </p>

              {project.slug === "sentinel-model-context-protocol" && (
                <div className="mt-8">
                  <div className="text-accent text-xs font-mono mb-2 uppercase tracking-wider">
                    Interactive Safety Sandbox
                  </div>
                  <SentinelSimulator />
                </div>
              )}
            </div>

            <div>
              <div className="eyebrow">The Outcome</div>
              <h2 className="font-display font-medium text-[clamp(1.4rem,2.6vw,1.9rem)] mt-3 mb-4">
                Where it landed
              </h2>
              <p className="text-stone font-light text-base leading-relaxed max-w-[680px]">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <div className="border border-line/60 bg-bg-raise/40 p-6 rounded-xl">
              <div className="eyebrow mb-4">Key Metrics</div>
              <div className="space-y-3 font-mono text-xs">
                {project.metrics.length > 0 ? (
                  project.metrics.map((m, i) => (
                    <div key={i} className="py-2 border-b border-line/40 last:border-b-0 text-paper/90">
                      • {m}
                    </div>
                  ))
                ) : (
                  <div className="text-stone py-2">Personal build — metrics not tracked.</div>
                )}
              </div>
            </div>

            <div className="border border-line/60 bg-bg-raise/40 p-6 rounded-xl">
              <div className="eyebrow mb-4">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs uppercase px-2.5 py-1 border border-line text-stone rounded hover:border-accent hover:text-paper transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-line/60 bg-bg-raise/40 p-6 rounded-xl">
              <div className="eyebrow mb-4">Links & Source</div>
              <div className="flex flex-col gap-3">
                <a
                  href={project.gh}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase text-accent hover:underline flex items-center justify-between"
                >
                  <span>GitHub Repository</span>
                  <span>↗</span>
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase text-accent hover:underline flex items-center justify-between"
                  >
                    <span>Live Deployment</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Prev / Next Project Switcher */}
      <nav aria-label="Project switcher" className="border-t border-line grid grid-cols-1 md:grid-cols-2">
        <Link
          href={`/work/${prevProject.slug}`}
          className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-line hover:bg-white/[0.02] transition-colors flex flex-col items-start text-left group"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-accent group-hover:-translate-x-1 transition-transform">
            ← Previous Project
          </span>
          <span className="font-display font-medium text-xl mt-2 text-paper group-hover:text-accent transition-colors">
            {prevProject.title}
          </span>
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="p-8 md:p-12 hover:bg-white/[0.02] transition-colors flex flex-col items-start md:items-end text-left md:text-right group"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-accent group-hover:translate-x-1 transition-transform">
            Next Project →
          </span>
          <span className="font-display font-medium text-xl mt-2 text-paper group-hover:text-accent transition-colors">
            {nextProject.title}
          </span>
        </Link>
      </nav>
    </div>
  );
}
