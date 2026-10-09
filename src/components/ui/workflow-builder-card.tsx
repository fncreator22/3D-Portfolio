"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export interface WorkflowBuilderCardProps {
  imageUrl: string;
  status?: "Active" | "Inactive" | string;
  lastUpdated?: string;
  title: string;
  tagline?: string;
  description?: string;
  points?: string[];
  tags?: string[];
  className?: string;
  slug?: string;
  idx?: number;
  total?: number;
  category?: string;
  metrics?: string[];
  githubUrl?: string;
  liveUrl?: string | null;
}

export const WorkflowBuilderCard = ({
  imageUrl,
  title,
  tagline,
  description,
  points,
  tags = [],
  className,
  slug,
  idx,
  total,
  category,
  metrics = [],
  githubUrl,
  liveUrl,
}: WorkflowBuilderCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Clean single headline: extract product name without noisy subtitles
  const displayTitle = useMemo(() => title.split(":")[0].trim(), [title]);

  // Compute 1 or 2 concise, punchy bullet points / lines
  const displayPoints: string[] = useMemo(() => {
    if (points && points.length > 0) {
      return points.slice(0, 2);
    }
    if (metrics && metrics.length > 0) {
      return metrics.slice(0, 2);
    }
    if (tagline) {
      return [tagline];
    }
    if (description) {
      return [description.split(". ")[0] + "."];
    }
    return [];
  }, [points, metrics, tagline, description]);

  // Animation variants for the collapsible spread details section
  const detailVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "0.75rem",
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
      className={cn(
        "w-[84vw] sm:w-[350px] lg:w-[380px] xl:w-[400px] snap-center flex-shrink-0 cursor-pointer relative group select-none active:scale-[0.98]",
        className
      )}
    >
      {/* Background Case Study Link */}
      {slug && (
        <Link
          href={`/work/${slug}`}
          className="absolute inset-0 z-10 focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
          aria-label={`Open case study: ${displayTitle}`}
        >
          <span className="sr-only">View Case Study {displayTitle}</span>
        </Link>
      )}

      <Card className="overflow-hidden rounded-2xl border border-line bg-bg-raise text-paper shadow-[0_16px_40px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(193,99,59,0.2)]">
        {/* Card Image with Themed Vignette */}
        <div className="relative h-36 sm:h-44 lg:h-48 w-full overflow-hidden bg-bg border-b border-line/60 flex-shrink-0">
          <img
            src={imageUrl}
            alt={displayTitle}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-raise via-transparent to-black/35 pointer-events-none" />

          {/* Top Floating Category Badge */}
          {category && (
            <div className="absolute top-2.5 right-2.5 bg-bg/90 backdrop-blur-md border border-line/80 px-2.5 py-0.5 rounded font-mono text-[0.62rem] tracking-wider uppercase text-paper font-semibold shadow-md">
              {category}
            </div>
          )}

          {/* Top Floating System Index */}
          {idx !== undefined && (
            <div className="absolute top-2.5 left-2.5 bg-bg/90 backdrop-blur-md border border-line/80 px-2 py-0.5 rounded font-mono text-[0.62rem] tracking-widest text-accent font-semibold shadow-md">
              {String(idx).padStart(2, "0")} {total ? `/ ${String(total).padStart(2, "0")}` : ""}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-paper group-hover:text-accent transition-colors leading-snug">
              {displayTitle}
            </h3>
          </div>

          {/* On Mobile (< 1024px): Highlights always visible with secondary font color (no empty card void) */}
          <div className="lg:hidden space-y-2 pt-2.5 border-t border-line/40 mt-3">
            {displayPoints.length > 0 && (
              <ul className="space-y-1 text-stone-400 font-light text-xs leading-snug">
                {displayPoints.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-accent font-bold text-xs leading-none mt-0.5 select-none">•</span>
                    <span className="line-clamp-2">{point}</span>
                  </li>
                ))}
              </ul>
            )}
            {tags && tags.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.6rem] px-1.5 py-0.5 rounded bg-bg border border-line text-stone-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* On Desktop (>= 1024px): Animated Collapsible Details on Hover (Dynamic Spread) */}
          <div className="hidden lg:block">
            <AnimatePresence initial={false}>
              {isHovered && (
                <motion.div
                  key="details"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={detailVariants}
                  className="overflow-hidden space-y-2 pt-0.5"
                >
                  {/* 1 or 2 Crisp Highlights with secondary font color */}
                  {displayPoints.length > 0 && (
                    <ul className="space-y-1.5 text-stone-400 font-light text-xs sm:text-[0.78rem] leading-snug">
                      {displayPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-accent font-bold text-xs leading-none mt-0.5 select-none">
                            •
                          </span>
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack Badges */}
                  {tags && tags.length > 0 && (
                    <div className="pt-2 border-t border-line/40 flex flex-wrap gap-1.5">
                      {tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.62rem] px-2 py-0.5 rounded bg-bg border border-line text-stone-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Card Footer: Arrow like earlier cards */}
        <div className="flex items-center justify-between border-t border-line/70 p-4 bg-bg/40 flex-shrink-0">
          <span className="font-mono text-[0.72rem] sm:text-xs text-accent group-hover:underline flex items-center gap-1.5 font-semibold">
            <span>View Case Study</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1 text-sm leading-none">
              →
            </span>
          </span>

          <div className="flex items-center gap-3 relative z-30">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[0.7rem] sm:text-xs uppercase text-stone-300 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-1 font-semibold flex items-center gap-0.5"
                aria-label={`View GitHub repository for ${displayTitle}`}
              >
                <span>Code</span>
                <span className="text-[0.65rem]">↗</span>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[0.7rem] sm:text-xs uppercase text-stone-300 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-1 font-semibold flex items-center gap-0.5"
                aria-label={`Open live production deployment for ${displayTitle}`}
              >
                <span>Live</span>
                <span className="text-[0.65rem]">↗</span>
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WorkflowBuilderCard;
