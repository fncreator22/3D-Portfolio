"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TechLogo } from "@/components/ui/TechLogo";

export interface SkillItem {
  name: string;
  category: string;
  tag: string;
}

export const SKILL_ITEMS: SkillItem[] = [
  { name: "Python", category: "AI & SYSTEMS", tag: "Core Runtime" },
  { name: "TypeScript", category: "FULL-STACK", tag: "Strict Types" },
  { name: "Next.js", category: "FULL-STACK", tag: "SSR & App Router" },
  { name: "React", category: "FRONTEND", tag: "Component UI" },
  { name: "Gemini API", category: "AGENTIC AI", tag: "Multimodal Models" },
  { name: "FastAPI", category: "BACKEND", tag: "High-Performance APIs" },
  { name: "Docker", category: "INFRASTRUCTURE", tag: "Containers" },
  { name: "Model Context Protocol", category: "AGENTIC AI", tag: "MCP Tools" },
  { name: "PostgreSQL", category: "DATA ENGINE", tag: "Relational & RLS" },
  { name: "Redis", category: "DATA ENGINE", tag: "Cache & BullMQ" },
  { name: "Playwright", category: "AUTOMATION", tag: "Browser Sandboxes" },
  { name: "Kotlin", category: "MOBILE", tag: "Jetpack Compose" },
  { name: "Supabase", category: "CLOUD & AUTH", tag: "Edge Database" },
  { name: "Ollama", category: "ON-DEVICE AI", tag: "Local LLM Inference" },
  { name: "OpenCV", category: "COMPUTER VISION", tag: "YOLO Object Detection" },
  { name: "FFmpeg", category: "MEDIA PIPELINE", tag: "Video Compositing" },
  { name: "Vapi Voice AI", category: "VOICE INTELLIGENCE", tag: "Duplex Speech" },
  { name: "Tailwind CSS", category: "DESIGN SYSTEMS", tag: "Utility Styling" },
  { name: "OpenAI API", category: "AGENTIC AI", tag: "LLM Reasoning" },
  { name: "Cloudflare", category: "EDGE INFRA", tag: "Global Workers" },
];

export const TOTAL_CARDS = SKILL_ITEMS.length; // 20 Cards

interface FlipCardProps {
  skill: SkillItem;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number; zIndex: number };
  cardWidth: number;
  cardHeight: number;
}

// --- FlipCard Component (Pure Illuminated Tech Logo on Front Face, 3D Inverted Details on Back Face) ---
function FlipCard({
  skill,
  target,
  cardWidth,
  cardHeight,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: cardWidth,
        height: cardHeight,
        transform: `translate3d(calc(-50% + ${target.x}px), calc(-50% + ${target.y}px), 0px) rotate(${target.rotation}deg) scale(${target.scale})`,
        opacity: target.opacity,
        zIndex: isFlipped ? 250 : target.zIndex,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transition: "transform 0.08s linear, opacity 0.15s ease-out",
        willChange: "transform, opacity",
      }}
      className={`cursor-pointer group select-none ${isFlipped ? "z-[250]" : "hover:z-[180]"}`}
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={`Skill card: ${skill.name}. Tap or click to flip for details.`}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.45, type: "spring", stiffness: 280, damping: 22 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front Face: Illuminated Obsidian Glass Card with Crisp Specular Highlights */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#262420] via-[#1a1916] to-[#121110] border border-white/[0.14] group-hover:border-accent group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.95),0_0_24px_rgba(193,99,59,0.35)] shadow-[0_12px_28px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] transition-all duration-300 flex flex-col items-center justify-center p-2 backdrop-blur-md"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Subtle Ambient Radial Highlight & Backlight behind Logo */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,transparent_70%)] pointer-events-none" />

          {/* Centered SVG Tech Logo */}
          <div className="flex items-center justify-center w-full h-full transform group-hover:scale-110 transition-transform duration-300">
            <TechLogo
              name={skill.name}
              className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
              showName={false}
            />
          </div>

          {/* Micro Indicator Accent Dot */}
          <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-accent/80 group-hover:bg-accent group-hover:scale-125 transition-all shadow-[0_0_6px_rgba(193,99,59,0.8)]" />
        </div>

        {/* Back Face: 3D Inverted Details Face (Reveals on 3D Flip) */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-[#191714] flex flex-col items-center justify-center p-2.5 border border-accent/80 text-center select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center w-full px-1">
            <p className="text-[7.5px] sm:text-[8.5px] font-mono font-bold text-accent uppercase tracking-widest mb-0.5 line-clamp-1">
              {skill.category}
            </p>
            <p className="text-[11px] sm:text-xs font-display font-medium text-paper line-clamp-1">
              {skill.name}
            </p>
            <p className="text-[6.5px] sm:text-[7.5px] font-mono text-stone-300 mt-1 line-clamp-1">
              {skill.tag}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

interface ScrollMorphSkillsProps {
  /**
   * External scroll progress (0 to 1) driven directly by page ScrollTrigger.
   */
  externalProgress?: number;
  className?: string;
}

export default function ScrollMorphSkills({
  externalProgress = 0,
  className = "",
}: ScrollMorphSkillsProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseParallaxX, setMouseParallaxX] = useState(0);

  // --- Container Size via ResizeObserver ---
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  // --- Mouse Parallax on Desktop (Subtle +/- 20px) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      setMouseParallaxX(normalizedX * 22);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Responsive Dimensions
  const isMobile = containerSize.width < 768;
  const CARD_WIDTH = isMobile ? 48 : 64;
  const CARD_HEIGHT = isMobile ? 66 : 88;

  // Normalized scroll progress clamped between 0 and 1
  const rawProgress = Math.min(Math.max(externalProgress, 0), 1);

  // --- Deterministic Continuous Scroll Journey ---
  // 1. Morph Stage (0.00 -> 0.35): Circle Constellation morphs into Convex Rainbow Arc
  // 2. Shuffle Stage (0.35 -> 0.90): Cards rotate smoothly along the arc as user scrolls
  // 3. Exit Stage (0.90 -> 1.00): Cards gracefully exit downward to hand off to Horizontal Projects

  // Typography Opacity Mapping
  // Center circle title: Visible from 0.00, fades out smoothly as arc forms (by 0.22)
  let circleTextOpacity = 1;
  if (rawProgress > 0.08) {
    circleTextOpacity = Math.max(0, 1 - (rawProgress - 0.08) / 0.16);
  }

  // Top arc title: Fades in as arc settles (from 0.16 to 0.35), remains active through shuffle, fades on exit
  let arcTextOpacity = 0;
  if (rawProgress >= 0.16 && rawProgress <= 0.36) {
    arcTextOpacity = (rawProgress - 0.16) / 0.20;
  } else if (rawProgress > 0.36 && rawProgress <= 0.88) {
    arcTextOpacity = 1;
  } else if (rawProgress > 0.88 && rawProgress <= 1.00) {
    arcTextOpacity = Math.max(0, 1 - (rawProgress - 0.88) / 0.10);
  }
  const arcTextY = lerp(18, 0, Math.min(1, arcTextOpacity * 1.2));

  // Stage radius and bounds
  const minDimension = Math.min(containerSize.width || 800, containerSize.height || 650);

  // 1. Circle Constellation Radius: Clean orbit centered at (0, 0)
  const circleRadius = isMobile
    ? Math.min(minDimension * 0.34, 130)
    : Math.min(minDimension * 0.35, 230);

  // 2. Bounded Convex Arc Geometry:
  const arcRadius = isMobile
    ? Math.min(containerSize.width * 0.64, 230)
    : Math.min(containerSize.width * 0.60, 540);

  // Apex sits comfortably below the top header
  const arcApexY = isMobile ? -20 : -40;
  const arcCenterY = arcApexY + arcRadius;

  // Spread angle of the arc
  const spreadAngle = isMobile ? 104 : 132;
  const startAngle = -90 - spreadAngle / 2;
  const step = spreadAngle / (TOTAL_CARDS - 1);

  // Shuffling sweep in Phase 2 (0.35 -> 0.90)
  const shuffleProgress = Math.min(Math.max((rawProgress - 0.35) / 0.55, 0), 1);
  const maxShuffleSweep = spreadAngle * 0.82;
  const boundedRotation = (0.5 - shuffleProgress) * maxShuffleSweep;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[560px] sm:h-[640px] lg:h-[680px] bg-transparent overflow-hidden ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-accent/[0.05] rounded-full blur-[110px] pointer-events-none" />

        {/* Phase 1 Center Title (Circle Constellation Phase) */}
        <div
          style={{
            opacity: circleTextOpacity,
            pointerEvents: circleTextOpacity > 0.5 ? "auto" : "none",
            transform: `translateY(${lerp(0, -12, 1 - circleTextOpacity)}px)`,
            transition: "opacity 0.12s ease-out, transform 0.12s ease-out",
          }}
          className="absolute z-0 flex flex-col items-center justify-center text-center px-3 max-w-[220px] sm:max-w-xs select-none"
        >
          <div className="space-y-1 sm:space-y-2">
            <div className="font-mono text-[9px] sm:text-xs text-accent font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>03 / Technical Matrix</span>
            </div>
            <h2 className="text-base sm:text-2xl lg:text-3xl font-display font-medium text-paper tracking-tight leading-tight">
              Production Stack Constellation
            </h2>
            <p className="text-[8px] sm:text-xs font-mono text-stone-300 tracking-wider uppercase">
              Scroll down to explore · Tap or hover cards
            </p>
          </div>
        </div>

        {/* Phase 2 & 3 Active Top Content (Reveals as Arc Morphs) */}
        <div
          style={{
            opacity: arcTextOpacity,
            pointerEvents: arcTextOpacity > 0.5 ? "auto" : "none",
            transform: `translateY(${arcTextY}px)`,
            transition: "opacity 0.12s ease-out, transform 0.12s ease-out",
          }}
          className="absolute top-[4%] sm:top-[6%] z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl select-none"
        >
          <div className="font-mono text-[10px] sm:text-xs text-accent font-semibold tracking-wider uppercase flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>20 Verified Production Stacks</span>
          </div>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-display font-medium text-paper tracking-tight">
            Engineered with Precision
          </h2>
          <p className="mt-1 text-[11px] sm:text-sm text-stone-300 font-light leading-relaxed max-w-md">
            Tap or hover cards to inspect core toolchains, frameworks, and production architectures.
          </p>
        </div>

        {/* ─── Morphing & Shuffling Cards Stage ─── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {SKILL_ITEMS.map((skill, i) => {
            // A. Circle Constellation Position (Centered Orbit)
            const circleAngle = (i / TOTAL_CARDS) * 360;
            const circleRad = (circleAngle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(circleRad) * circleRadius,
              y: Math.sin(circleRad) * circleRadius,
              rotation: 0,
              scale: 1,
              opacity: 1,
              zIndex: 10,
            };

            // B. Bounded Convex Bottom Arc Position (with scroll shuffle)
            const currentArcAngle = startAngle + i * step + boundedRotation;
            const arcRad = (currentArcAngle * Math.PI) / 180;

            // Calculate distance from apex (-90 deg): cards closer to the apex sit on top!
            const angleFromApex = Math.abs(currentArcAngle - (-90));
            const arcZIndex = Math.round(150 - angleFromApex);
            const centerFactor = Math.max(0, 1 - angleFromApex / (spreadAngle * 0.55));
            const dynamicScale = lerp(isMobile ? 1.08 : 1.20, isMobile ? 1.26 : 1.48, centerFactor);

            const arcPos = {
              x: Math.cos(arcRad) * arcRadius + mouseParallaxX,
              y: Math.sin(arcRad) * arcRadius + arcCenterY,
              rotation: currentArcAngle + 90,
              scale: dynamicScale,
              opacity: 1,
              zIndex: arcZIndex,
            };

            // C. Exit Position (Smooth handoff to Horizontal Projects)
            const exitPos = {
              x: arcPos.x * 1.08,
              y: arcPos.y + (isMobile ? 40 : 60),
              rotation: arcPos.rotation * 1.15,
              scale: arcPos.scale * 0.82,
              opacity: 0,
              zIndex: arcZIndex,
            };

            // Interpolation Stage
            let target = circlePos;

            if (rawProgress <= 0.35) {
              // Stage 1: Circle -> Arc Morph
              const t = rawProgress / 0.35;
              target = {
                x: lerp(circlePos.x, arcPos.x, t),
                y: lerp(circlePos.y, arcPos.y, t),
                rotation: lerp(circlePos.rotation, arcPos.rotation, t),
                scale: lerp(circlePos.scale, arcPos.scale, t),
                opacity: 1,
                zIndex: Math.round(lerp(circlePos.zIndex, arcPos.zIndex, t)),
              };
            } else if (rawProgress <= 0.90) {
              // Stage 2: Shuffling along the Arc
              target = arcPos;
            } else {
              // Stage 3: Smooth Exit handoff to Projects
              const t = (rawProgress - 0.90) / 0.10;
              target = {
                x: lerp(arcPos.x, exitPos.x, t),
                y: lerp(arcPos.y, exitPos.y, t),
                rotation: lerp(arcPos.rotation, exitPos.rotation, t),
                scale: lerp(arcPos.scale, exitPos.scale, t),
                opacity: lerp(1, 0, t),
                zIndex: arcPos.zIndex,
              };
            }

            return (
              <FlipCard
                key={skill.name}
                skill={skill}
                target={target}
                cardWidth={CARD_WIDTH}
                cardHeight={CARD_HEIGHT}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
