"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

const CATEGORIES = [
  "All",
  "AI & Agentic Systems",
  "Computer Vision Suite",
  "Full Stack & Web",
];

export default function AllProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredProjects = PROJECTS.filter((p) => {
    // Category match
    let matchesCat = true;
    if (selectedCat === "AI & Agentic Systems") {
      matchesCat = p.cat.includes("AI") || p.cat.includes("Agentic");
    } else if (selectedCat === "Computer Vision Suite") {
      matchesCat = p.cat.includes("Vision") || p.cat.includes("Signal");
    } else if (selectedCat === "Full Stack & Web") {
      matchesCat = p.cat.includes("Full Stack") || p.cat.includes("Web") || p.cat.includes("Enterprise");
    }

    // Search query match
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-24 sm:pt-32 pb-24 relative z-10 min-h-screen">
      <div className="max-w-[1240px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        {/* Header */}
        <div className="mb-10">
          <div className="eyebrow">All Engineering Work</div>
          <h1 className="font-display font-medium text-[clamp(2.4rem,6vw,4.5rem)] tracking-[-0.01em] mt-3 leading-[1.04]">
            Archive of <em>14 Shipped Builds</em>.
          </h1>
          <p className="mt-4 max-w-[650px] text-stone font-light text-base sm:text-lg leading-relaxed">
            Search and filter across agentic infrastructure, real-time computer vision pipelines, enterprise platforms, and full-stack applications.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="border border-line bg-bg-raise/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search by title, tech stack (e.g. YOLO, FastAPI, React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg border border-line rounded-xl px-4 py-2.5 text-xs font-mono text-paper placeholder:text-stone/60 focus:outline-none focus:border-accent transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[0.65rem] text-stone hover:text-paper"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`font-mono text-[0.7rem] sm:text-xs uppercase tracking-wider px-3.5 py-2 border rounded-full transition-all ${
                    selectedCat === cat
                      ? "bg-accent border-accent text-bg font-medium"
                      : "border-line text-stone hover:border-accent hover:text-paper"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-line/40 flex justify-between items-center text-stone font-mono text-[0.68rem]">
            <span>Showing {filteredProjects.length} of {PROJECTS.length} builds</span>
            {selectedCat !== "All" && <span>Filter: {selectedCat}</span>}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-line rounded-2xl bg-bg-raise/30">
            <div className="font-serif italic text-2xl text-stone mb-2">No projects matched your search.</div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("All");
              }}
              className="mt-4 font-mono text-xs text-accent uppercase tracking-wider underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <article
                key={p.slug}
                className="border border-line bg-bg-raise rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_0_1px_rgba(193,99,59,0.25)] relative"
              >
                {/* Clickable link to case study */}
                <Link
                  href={`/work/${p.slug}`}
                  className="absolute inset-0 z-20"
                  aria-label={`View case study: ${p.title}`}
                />

                {/* Card Preview Banner */}
                <div className="relative aspect-[16/9] bg-bg overflow-hidden border-b border-line/50">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-bg/85 backdrop-blur-md border border-line/60 px-2 py-0.5 rounded font-mono text-[0.62rem] tracking-wider uppercase text-paper/90">
                    {p.cat}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="font-mono text-[0.68rem] text-accent tracking-widest">
                    {String(p.idx).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                  </div>

                  <h2 className="font-display font-medium text-xl mt-1.5 text-paper group-hover:text-accent transition-colors leading-snug">
                    {p.title}
                  </h2>

                  <p className="mt-2 text-stone font-light text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-line/50">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.tech.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[0.62rem] uppercase px-2 py-0.5 border border-line text-stone rounded"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 3 && (
                        <span className="font-mono text-[0.62rem] text-stone px-1 py-0.5">
                          +{p.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {p.metrics[0] && (
                      <div className="font-mono text-[0.68rem] text-paper/85 truncate">
                        • {p.metrics[0]}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-accent group-hover:underline flex items-center gap-1">
                      Case Study →
                    </span>
                    <div className="flex gap-3 relative z-30">
                      <a
                        href={p.gh}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase text-stone hover:text-accent"
                      >
                        Code ↗
                      </a>
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs uppercase text-stone hover:text-accent"
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
    </div>
  );
}
