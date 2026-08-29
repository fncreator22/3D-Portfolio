"use client";

import React from "react";
import { PROFILE } from "@/data/projects";

export function Footer() {
  return (
    <footer className="border-t border-line py-12 px-[clamp(1rem,5vw,4rem)] relative z-10 bg-bg">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-8">
          <div>
            <div className="font-serif italic text-2xl text-paper">{PROFILE.name}</div>
            <div className="font-mono text-xs text-stone mt-1">
              {PROFILE.title}
            </div>
          </div>

          <div className="flex gap-5 sm:gap-6 flex-wrap font-mono text-xs tracking-wider uppercase text-stone">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={PROFILE.x}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              X (Twitter) ↗
            </a>
            <a
              href={PROFILE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Instagram ↗
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Resume ↗
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line/40 flex justify-between text-stone font-mono text-xs tracking-wide flex-wrap gap-4">
          <span>{PROFILE.location}</span>
          <span>Designed &amp; engineered for autonomous scale.</span>
        </div>
      </div>
    </footer>
  );
}
