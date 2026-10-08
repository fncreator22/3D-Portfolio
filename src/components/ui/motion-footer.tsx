"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/data/projects";

// Register ScrollTrigger safely for Next.js App Router
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES MATCHING OBSIDIAN & TERRACOTTA PALETTE
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-space), -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Portfolio Design System Tokens */
  --pill-bg-1: rgba(20, 19, 17, 0.85);
  --pill-bg-2: rgba(11, 10, 9, 0.95);
  --pill-shadow: rgba(0, 0, 0, 0.7);
  --pill-highlight: rgba(246, 244, 238, 0.08);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(42, 40, 34, 0.9);
  
  --pill-bg-1-hover: rgba(193, 99, 59, 0.16);
  --pill-bg-2-hover: rgba(20, 19, 17, 0.95);
  --pill-border-hover: rgba(193, 99, 59, 0.6);
  --pill-shadow-hover: rgba(193, 99, 59, 0.25);
  --pill-highlight-hover: rgba(246, 244, 238, 0.18);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.95; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}



/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 56px 56px;
  background-image: 
    linear-gradient(to right, rgba(42, 40, 34, 0.35) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(42, 40, 34, 0.35) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(193, 99, 59, 0.22) 0%, 
    rgba(107, 111, 176, 0.14) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 12px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 45px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--paper);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: clamp(6.5rem, 28vw, 34rem);
  line-height: 0.8;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(246, 244, 238, 0.06);
  background: linear-gradient(180deg, rgba(246, 244, 238, 0.08) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: var(--font-space), monospace;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #f6f4ee 0%, rgba(246, 244, 238, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 30px rgba(193, 99, 59, 0.2));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 1024) return; // Only enable magnetic physics on desktop pointer devices
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.1,
            rotationY: x * 0.1,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as unknown as { current: HTMLElement | null }).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as unknown as { current: HTMLElement | null }).current = node;
        }}
        className={cn("cursor-pointer select-none", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. CONTINUOUS SYSTEM MARQUEE STRIP
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-8 sm:space-x-12 px-4 sm:px-6">
    <span>AUTONOMOUS AGENTS</span> <span className="text-accent">✦</span>
    <span>NATIVE BARGE-IN</span> <span className="text-cool">✦</span>
    <span>LLM SAFETY GUARDRAILS</span> <span className="text-accent">✦</span>
    <span>ZERO-TRUST RLS</span> <span className="text-cool">✦</span>
    <span>EMPIRICAL VERIFICATION</span> <span className="text-accent">✦</span>
    <span>MULTILINGUAL VOICE AI</span> <span className="text-cool">✦</span>
    <span>100% OFFLINE ENCRYPTION</span> <span className="text-accent">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// Shared Channel Links & Telemetry
// -------------------------------------------------------------------------
const ConnectedChannels = () => (
  <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
    {/* LinkedIn */}
    <MagneticButton
      as="a"
      href={PROFILE.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-glass-pill px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-paper font-mono text-xs sm:text-sm font-semibold flex items-center gap-3 group"
      aria-label="Connect on LinkedIn"
    >
      <svg className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
      </svg>
      <span>Connect on LinkedIn</span>
      <span className="text-accent text-xs">↗</span>
    </MagneticButton>

    {/* GitHub */}
    <MagneticButton
      as="a"
      href={PROFILE.github}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-glass-pill px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-paper font-mono text-xs sm:text-sm font-semibold flex items-center gap-3 group"
      aria-label="View GitHub Repositories"
    >
      <svg className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
      <span>GitHub Source Code</span>
      <span className="text-accent text-xs">↗</span>
    </MagneticButton>

    {/* X (Twitter) */}
    <MagneticButton
      as="a"
      href={PROFILE.x}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-glass-pill px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-paper font-mono text-xs sm:text-sm font-semibold flex items-center gap-3 group"
      aria-label="Connect on X Twitter"
    >
      <svg className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      <span>X (Twitter)</span>
      <span className="text-accent text-xs">↗</span>
    </MagneticButton>

    {/* Resume (PDF) */}
    <MagneticButton
      as="a"
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-glass-pill px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-paper font-mono text-xs sm:text-sm font-semibold flex items-center gap-3 group border-accent/40"
      aria-label="Download Resume PDF"
    >
      <span>Resume (PDF)</span>
      <span className="text-accent text-xs">↗</span>
    </MagneticButton>
  </div>
);

const SecondaryNavigation = () => (
  <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 w-full mt-2 font-mono text-xs">
    <MagneticButton as={Link} href="/#journey" className="footer-glass-pill px-5 py-2 rounded-full text-stone-300 hover:text-paper">
      Trajectory
    </MagneticButton>
    <MagneticButton as={Link} href="/#skills" className="footer-glass-pill px-5 py-2 rounded-full text-stone-300 hover:text-paper">
      Technical Matrix
    </MagneticButton>
    <MagneticButton as={Link} href="/work" className="footer-glass-pill px-5 py-2 rounded-full text-stone-300 hover:text-paper">
      Systems Archive (16)
    </MagneticButton>
    <MagneticButton as={Link} href="/#thinking" className="footer-glass-pill px-5 py-2 rounded-full text-stone-300 hover:text-paper">
      Engineering Philosophy
    </MagneticButton>
  </div>
);

const FooterStatusBar = ({ onScrollTop }: { onScrollTop: () => void }) => (
  <div className="relative z-20 w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5 border-t border-line/50 pt-6 mt-8">
    <div className="text-stone-300 font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase order-2 md:order-1 text-center md:text-left">
      © 2026 Sagar Mahajan. All rights reserved.
    </div>

    <MagneticButton
      as="button"
      onClick={onScrollTop}
      className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center text-stone-300 hover:text-paper hover:border-accent group order-3 focus-visible:ring-2 focus-visible:ring-accent"
      aria-label="Scroll back to top of page"
    >
      <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </MagneticButton>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isHome || !wrapperRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Parallax Scrub for Giant Background Text
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0.2 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Elevation: Trigger early (top 85% to top 30%) with opacity fallback
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 30, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.6,
          },
        }
      );
    });

    return () => mm.revert();
  }, [isHome]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -----------------------------------------------------------------------
  // NON-HOME PAGES (/work, /work/[slug]):
  // Clean, static, non-fixed footer with 100% visible text, zero ScrollTrigger
  // freeze, and no irrelevant "07 /" prefix.
  // -----------------------------------------------------------------------
  if (!isHome) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <footer className="relative w-full overflow-hidden bg-bg text-paper cinematic-footer-wrapper py-12 lg:py-16 border-t border-line">
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background typography watermark */}
          <div
            className="footer-giant-bg-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-center opacity-30"
            aria-hidden="true"
          >
            SAGAR
          </div>

          {/* 1. Diagonal Sleek Marquee Strip */}
          <div className="relative w-full overflow-hidden border-y border-line/60 bg-bg-raise/80 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-2xl mb-10">
            <div className="flex w-max animate-footer-scroll-marquee font-mono text-[0.68rem] sm:text-xs font-semibold tracking-[0.25em] text-stone-300 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content (100% Visible) */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 my-6 w-full max-w-5xl mx-auto text-center">
            <div className="eyebrow mb-4 text-[0.68rem] sm:text-xs">
              Terminal Connection
            </div>

            <h2 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl footer-text-glow tracking-tight text-center max-w-4xl leading-[1.08] opacity-100">
              Initiate Transmission. <br />
              <span className="font-serif italic text-accent font-normal">Let&apos;s build autonomous scale.</span>
            </h2>

            <div className="flex flex-col items-center gap-5 w-full mt-10 opacity-100">
              <ConnectedChannels />
              <SecondaryNavigation />
            </div>
          </div>

          {/* 3. Bottom Status Bar */}
          <FooterStatusBar onScrollTop={scrollToTop} />
        </footer>
      </>
    );
  }

  // -----------------------------------------------------------------------
  // HOMEPAGE (/):
  // Clean in-flow footer for mobile touch devices (< 1024px);
  // High-craft curtain reveal for wide desktop screens (>= 1024px).
  // -----------------------------------------------------------------------
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      <div id="connect" className="w-full">
        {/* ─── MOBILE IN-FLOW FOOTER (lg:hidden): Natural flow, zero clipping, 100% visible & touch friendly ─── */}
        <footer className="lg:hidden relative w-full overflow-hidden bg-bg text-paper cinematic-footer-wrapper py-10 sm:py-14 border-t border-line">
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[50vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background typography watermark */}
          <div
            className="footer-giant-bg-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-center opacity-30"
            aria-hidden="true"
          >
            SAGAR
          </div>

          {/* 1. Diagonal Sleek Marquee */}
          <div className="relative w-full overflow-hidden border-y border-line/60 bg-bg-raise/80 backdrop-blur-md py-3 z-10 -rotate-1 scale-105 shadow-2xl mb-8">
            <div className="flex w-max animate-footer-scroll-marquee font-mono text-[0.68rem] font-semibold tracking-[0.25em] text-stone-300 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-xl mx-auto text-center">
            <div className="eyebrow mb-3 text-[0.68rem]">
              07 / Terminal Connection
            </div>

            <h2 className="font-display font-medium text-3xl sm:text-5xl footer-text-glow tracking-tight text-center max-w-xl leading-[1.12]">
              Initiate Transmission. <br />
              <span className="font-serif italic text-accent font-normal">Let&apos;s build autonomous scale.</span>
            </h2>

            <div className="flex flex-col items-center gap-4 w-full mt-7">
              <ConnectedChannels />
              <SecondaryNavigation />
            </div>
          </div>

          {/* 3. Bottom Status Bar */}
          <FooterStatusBar onScrollTop={scrollToTop} />
        </footer>

        {/* ─── DESKTOP CURTAIN REVEAL FOOTER (hidden lg:block) ─── */}
        <div
          ref={wrapperRef}
          className="hidden lg:block relative min-h-[640px] h-screen w-full max-w-full overflow-hidden"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
          <footer className="fixed bottom-0 left-0 flex min-h-[640px] h-screen w-full max-w-full flex-col justify-between overflow-hidden bg-bg text-paper cinematic-footer-wrapper py-8 lg:py-12 border-t border-line">
            {/* Ambient Light & Grid Background */}
            <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
            <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

            {/* Giant background typography watermark */}
            <div
              ref={giantTextRef}
              className="footer-giant-bg-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-center"
              aria-hidden="true"
            >
              SAGAR
            </div>

            {/* 1. Diagonal Sleek Marquee (Top of Footer) */}
            <div className="relative w-full overflow-hidden border-y border-line/60 bg-bg-raise/80 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
              <div className="flex w-max animate-footer-scroll-marquee font-mono text-xs font-semibold tracking-[0.25em] text-stone-300 uppercase">
                <MarqueeItem />
                <MarqueeItem />
              </div>
            </div>

            {/* 2. Main Center Content */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 my-6 w-full max-w-5xl mx-auto text-center">
              <div className="eyebrow mb-4 text-xs">
                07 / Terminal Connection
              </div>

              <h2
                ref={headingRef}
                className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl footer-text-glow tracking-tight text-center max-w-4xl leading-[1.08]"
              >
                Initiate Transmission. <br />
                <span className="font-serif italic text-accent font-normal">Let&apos;s build autonomous scale.</span>
              </h2>

              {/* Interactive Magnetic Glass Pills Layout */}
              <div ref={linksRef} className="flex flex-col items-center gap-5 w-full mt-8">
                <ConnectedChannels />
                <SecondaryNavigation />
              </div>
            </div>

            {/* 3. Bottom Status Bar & Credits */}
            <FooterStatusBar onScrollTop={scrollToTop} />
          </footer>
        </div>
      </div>
    </>
  );
}
