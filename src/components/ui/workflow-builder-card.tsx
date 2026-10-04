"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  status = "Active",
  lastUpdated = "Production Ready",
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

  // Compute 1-2 (max 3) concise, punchy bullet points without text bloat
  const displayPoints: string[] = React.useMemo(() => {
    if (points && points.length > 0) {
      return points.slice(0, 3);
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

  // Animation variants for the collapsible details section
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

  const isLive =
    status.toLowerCase().includes("active") ||
    status.toLowerCase().includes("prod") ||
    status.toLowerCase().includes("live");

  return (
    <motion.div
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
      className={cn(
        "w-[84vw] sm:w-[350px] lg:w-[380px] xl:w-[400px] flex-shrink-0 cursor-pointer relative group select-none",
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

      <Card className="overflow-hidden rounded-2xl border border-line bg-bg-raise text-paper shadow-[0_16px_40px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(193,99,59,0.2)]">
        {/* Card Image with Themed Vignette */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-bg border-b border-line/60">
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

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Always-visible header content */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-400">
                <span>{lastUpdated}</span>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      isLive
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                        : "bg-accent shadow-[0_0_8px_rgba(193,99,59,0.7)]"
                    )}
                    aria-label={status}
                  />
                  <span
                    className={cn(
                      "text-[0.7rem] uppercase tracking-wider font-semibold",
                      isLive ? "text-emerald-400" : "text-accent"
                    )}
                  >
                    {status}
                  </span>
                </div>
              </div>
              <h3 className="mt-1 font-display text-lg sm:text-xl font-medium text-paper group-hover:text-accent transition-colors leading-snug">
                {title}
              </h3>
            </div>
            <button
              aria-label="More options"
              className="text-stone-400 transition-colors group-hover:text-accent p-1"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Animated Collapsible Minimal Points Section (1 to 2 Points Max) */}
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
                {/* 1 to 2 Crisp Highlights */}
                {displayPoints.length > 0 && (
                  <ul className="space-y-1.5 text-stone-300 font-light text-xs sm:text-[0.78rem] leading-snug">
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

                {/* Tech Stack Badges (Top 3 badges) */}
                {tags && tags.length > 0 && (
                  <div className="pt-2 border-t border-line/40 flex flex-wrap gap-1.5">
                    {tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-[0.62rem] px-2 py-0.5 bg-bg border border-line text-stone-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
