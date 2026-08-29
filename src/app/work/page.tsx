"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS, CATEGORIES } from "@/data/projects";

export default function AllProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCat = selectedCat === "All" || p.cat === selectedCat;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  return (
    <main id="main-content" className="pt-24 sm:pt-32 pb-24 relative z-10 min-h-screen">
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        {/* Header */}
        <div className="mb-10">
          <div className="eyebrow">Engineering Archive</div>
          <h1 className="font-display font-medium text-[clamp(2.2rem,5vw,4.2rem)] tracking-[-0.01em] mt-3 leading-[1.04]">
            Archive of <em>{PROJECTS.length} Systems &amp; Builds</em>.
          </h1>
          <p className="mt-4 max-w-[680px] text-stone-300 font-light text-base sm:text-lg leading-relaxed">
            Autonomous agentic pipelines, MCP security guardrails, full-stack enterprise SaaS, computer vision suites, and voice AI workflows.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="border border-line bg-bg-raise/70 backdrop-blur-md p-4 sm:p-6 rounded-2xl mb-12 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Search Input with Themed SVG Icon */}
            <div className="relative flex-grow max-w-md">
              <label htmlFor="systems-search" className="sr-only">
                Search systems, models, skills
              </label>
              <input
                id="systems-search"
                type="text"
                placeholder="Search systems, models, skills (e.g. Gemini, MCP, YOLO)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg border border-line/90 rounded-xl px-4 py-2.5 pl-10 font-mono text-xs text-paper placeholder:text-stone-400 focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {/* Horizontally Scrollable Category Filter Rail on Mobile */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`font-mono text-[0.72rem] uppercase tracking-wider px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-accent ${
                    selectedCat === cat
                      ? "bg-accent text-bg border-accent font-semibold shadow-md shadow-accent/25"
                      : "border-line text-stone-300 hover:text-paper hover:border-paper/50 bg-bg/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Screen Reader Result Announcer */}
          <div aria-live="polite" className="sr-only">
            Showing {filteredProjects.length} systems out of {PROJECTS.length}
          </div>
        </div>

        {/* Results Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-line rounded-2xl bg-bg-raise/30">
            <p className="font-mono text-stone-300 text-sm">
              No systems match &quot;{searchQuery}&quot;. Try searching for Python, React, or MCP.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <article
                key={p.slug}
                className="border border-line bg-bg-raise rounded-2xl overflow-hidden flex flex-col group hover:border-accent hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(193,99,59,0.15)] transition-all duration-300 relative"
              >
                <Link
                  href={`/work/${p.slug}`}
                  className="absolute inset-0 z-10 focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
                  aria-label={`Open case study for ${p.title}`}
                />

                {/* Media preview */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-bg border-b border-line/60">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-bg/90 backdrop-blur-md border border-line/70 px-2.5 py-0.5 rounded font-mono text-[0.65rem] tracking-wider uppercase text-paper font-medium shadow-md">
                    {p.cat}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="font-mono text-xs text-accent tracking-widest uppercase font-semibold">
                    System {String(p.idx).padStart(2, "0")}
                  </div>

                  <h2 className="font-display font-medium text-xl mt-2 text-paper group-hover:text-accent transition-colors leading-snug">
                    {p.title}
                  </h2>

                  <p className="mt-3 text-stone-300 font-light text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {p.desc}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                    {p.tech.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[0.65rem] tracking-wider uppercase px-2 py-0.5 rounded bg-bg border border-line text-stone-300 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Metrics & Actions */}
                  <div className="mt-auto pt-5 border-t border-line/60 flex items-center justify-between">
                    <span className="font-mono text-xs text-accent group-hover:underline flex items-center gap-1 font-medium">
                      Case Study →
                    </span>

                    <div className="flex items-center gap-3 relative z-20">
                      <a
                        href={p.gh}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase text-stone-300 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
                        aria-label={`View GitHub source code for ${p.title}`}
                      >
                        Code ↗
                      </a>
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs uppercase text-stone-300 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
                          aria-label={`Open live production deployment for ${p.title}`}
                        >
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
