"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-line py-12 px-[clamp(1.25rem,5vw,4rem)] relative z-10 bg-bg">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-8">
          <div className="font-serif italic text-2xl">Sagar Mahajan</div>
          <div className="flex gap-6 flex-wrap font-mono text-xs tracking-wider uppercase text-stone">
            <a href="https://github.com/fncreator22" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/sagar-mahajan-513a43200/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              LinkedIn ↗
            </a>
            <a href="https://leetcode.com/fncreator22" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              LeetCode ↗
            </a>
            <a href="https://www.hackerrank.com/fncreator22" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              HackerRank ↗
            </a>
            <a href="mailto:contact@portfolio.internal" className="hover:text-accent transition-colors">
              Email
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-line/40 flex justify-between text-stone font-mono text-xs tracking-wide flex-wrap gap-4">
          <span>Greater Hyderabad Area, India</span>
          <span>Designed & built as one continuous story.</span>
        </div>
      </div>
    </footer>
  );
}
