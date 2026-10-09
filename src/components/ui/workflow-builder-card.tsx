"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
  className,
  slug,
  idx,
  total,
  category,
  githubUrl,
  liveUrl,
}: WorkflowBuilderCardProps) => {

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
      className={cn(
        "w-[84vw] sm:w-[350px] lg:w-[380px] xl:w-[400px] snap-center flex-shrink-0 cursor-pointer relative group select-none",
        className
      )}
    >
      {/* Background Case Study Link */}
      {slug && (
        <Link
          href={`/work/${slug}`}
          className="absolute inset-0 z-10 focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
          aria-label={`Open case study: ${title}`}
        >
          <span className="sr-only">View Case Study {title}</span>
        </Link>
      )}

      <Card className="overflow-hidden rounded-2xl border border-line bg-bg-raise text-paper shadow-[0_16px_40px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(193,99,59,0.2)] h-full flex flex-col justify-between">
        {/* Card Image with Themed Vignette */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-bg border-b border-line/60 flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
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

        {/* Card Body: Clean Single Project Name Only */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
          <h3 className="font-display text-xl sm:text-2xl font-medium text-paper group-hover:text-accent transition-colors leading-snug">
            {title.split(":")[0].trim()}
          </h3>
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
                aria-label={`View GitHub repository for ${title}`}
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
                aria-label={`Open live production deployment for ${title}`}
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
