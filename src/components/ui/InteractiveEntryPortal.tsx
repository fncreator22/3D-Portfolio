"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export interface InteractiveEntryPortalProps {
  /**
   * Callback fired immediately when user enters or bypass triggers.
   * `soundEnabled` is true if the visitor clicked/interacted (authorizing unmuted audio),
   * or false if the portal was auto-bypassed or skipped.
   * NOTE: This is called synchronously in the user gesture call stack.
   */
  onEnter: (soundEnabled: boolean) => void;
  /**
   * Callback fired after the 1.1s radial aperture expansion concludes,
   * signaling to the parent that the portal can be completely dismantled.
   */
  onComplete?: () => void;
  /**
   * Auto-bypass duration in milliseconds. Defaults to 3800ms (3.8 seconds).
   */
  autoBypassDelayMs?: number;
  /**
   * Session storage key to prevent re-prompting within the same browser session/tab.
   */
  sessionKey?: string;
}

export function InteractiveEntryPortal({
  onEnter,
  onComplete,
  autoBypassDelayMs = 3800,
  sessionKey = "sm_entered_session",
}: InteractiveEntryPortalProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [maxRadius, setMaxRadius] = useState(2500);
  const [timeLeft, setTimeLeft] = useState(autoBypassDelayMs);
  const [isMounted, setIsMounted] = useState(false);

  const maskId = useId();
  const hasTriggeredRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const lensButtonRef = useRef<HTMLButtonElement>(null);

  // Keep stable refs to callbacks to avoid resetting the auto-bypass timer on re-render
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Initialize screen dimensions, viewport diagonal, and session check
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      try {
        const alreadyEntered = sessionStorage.getItem(sessionKey);
        if (alreadyEntered === "true") {
          setIsVisible(false);
          document.documentElement.classList.add("sm-portal-bypassed");
          onCompleteRef.current?.();
          return;
        }
      } catch {
        // Ignore sessionStorage restriction if in strict iframe/cookie mode
      }

      const diag = Math.hypot(window.innerWidth, window.innerHeight);
      setMaxRadius(Math.ceil(diag) + 200);
      setOrigin({
        x: Math.round(window.innerWidth / 2),
        y: Math.round(window.innerHeight / 2),
      });

      // Auto-focus portal container for immediate keyboard accessibility
      requestAnimationFrame(() => {
        portalRef.current?.focus();
      });
    }
  }, [sessionKey]);

  // Lock background scrolling while portal is active (before expansion)
  useEffect(() => {
    if (!isVisible || isExpanding) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isVisible, isExpanding]);

  // Execute entrance transition
  const triggerEnter = useCallback(
    (soundEnabled: boolean, clickCoords?: { x: number; y: number }) => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      // Clean up auto-bypass timers
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Determine aperture expansion origin
      if (clickCoords) {
        setOrigin(clickCoords);
      } else if (lensButtonRef.current) {
        const rect = lensButtonRef.current.getBoundingClientRect();
        setOrigin({
          x: Math.round(rect.left + rect.width / 2),
          y: Math.round(rect.top + rect.height / 2),
        });
      } else if (typeof window !== "undefined") {
        setOrigin({
          x: Math.round(window.innerWidth / 2),
          y: Math.round(window.innerHeight / 2),
        });
      }

      if (typeof window !== "undefined") {
        const currentDiag = Math.hypot(window.innerWidth, window.innerHeight);
        setMaxRadius(Math.ceil(currentDiag) + 200);
      }

      // Mark session entered & add class for smooth CSS transitions
      try {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(sessionKey, "true");
          document.documentElement.classList.add("sm-portal-bypassed");
        }
      } catch {
        // Ignore storage exceptions
      }

      // CRITICAL: Call onEnter synchronously in the same user gesture call stack
      // to ensure modern browsers grant unmuted audio autoplay permission.
      onEnterRef.current(soundEnabled);

      // Start radial aperture expansion
      setIsExpanding(true);

      // Restore scroll immediately as the website reveals
      document.body.style.overflow = "";

      // Dismantle portal cleanly after 1.1s radial expansion concludes
      setTimeout(() => {
        setIsVisible(false);
        onCompleteRef.current?.();
      }, 1150);
    },
    [sessionKey]
  );

  const triggerEnterRef = useRef(triggerEnter);
  triggerEnterRef.current = triggerEnter;

  // 3.8s Auto-bypass countdown logic (stable reference)
  useEffect(() => {
    if (!isVisible || !isMounted || isExpanding) return;

    const startTime = Date.now();
    const endTime = startTime + autoBypassDelayMs;

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 50);

    timerRef.current = setTimeout(() => {
      triggerEnterRef.current(false);
    }, autoBypassDelayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, isMounted, isExpanding, autoBypassDelayMs]);

  // Global & Local Keyboard Accessibility: Enter/Space for unmuted entry, Escape for bypass
  useEffect(() => {
    if (!isVisible || isExpanding) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerEnterRef.current(true);
      } else if (e.key === "Escape") {
        e.preventDefault();
        triggerEnterRef.current(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isVisible, isExpanding]);

  // If already entered in this session or animation concluded, render nothing
  if (!isVisible) return null;

  const progressPercent = Math.min(
    100,
    Math.max(0, ((autoBypassDelayMs - timeLeft) / autoBypassDelayMs) * 100)
  );

  const portalContent = (
    <div
      id="interactive-entry-portal"
      ref={portalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Website Entry Portal"
      tabIndex={0}
      onClick={(e) => {
        // Any click on outer portal backdrop counts as an active user gesture
        triggerEnter(true, { x: e.clientX, y: e.clientY });
      }}
      className="interactive-entry-portal fixed inset-0 z-[99999] select-none flex flex-col justify-between items-center px-4 py-8 sm:py-12 cursor-pointer focus:outline-none overflow-hidden"
      style={{
        backgroundColor: isExpanding ? "transparent" : "#0b0a09",
        pointerEvents: isExpanding ? "none" : "auto",
      }}
    >
      {/* ─── Hardware-Accelerated Iris Mask & Dark Base Sheet ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId}>
            {/* White reveals the dark backdrop; black creates the expanding aperture cut-out */}
            <rect width="100%" height="100%" fill="white" />
            <motion.circle
              cx={origin.x}
              cy={origin.y}
              initial={{ r: 0 }}
              animate={{ r: isExpanding ? maxRadius : 0 }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              fill="black"
            />
          </mask>
        </defs>

        {/* Solid #0b0a09 base sheet pierced by the expanding circular aperture */}
        <rect
          width="100%"
          height="100%"
          fill="#0b0a09"
          mask={`url(#${maskId})`}
        />

        {/* ─── Iris Shockwave Perimeter Rings ─── */}
        {isExpanding && (
          <>
            {/* Primary Copper Flare Ring */}
            <motion.circle
              cx={origin.x}
              cy={origin.y}
              initial={{ r: 50, opacity: 1, strokeWidth: 3.5 }}
              animate={{ r: maxRadius, opacity: 0, strokeWidth: 0.5 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              stroke="#c1633b"
              fill="none"
              style={{ filter: "drop-shadow(0 0 28px rgba(193, 99, 59, 0.95))" }}
            />

            {/* Secondary Indigo Harmonic Ring */}
            <motion.circle
              cx={origin.x}
              cy={origin.y}
              initial={{ r: 25, opacity: 0.85, strokeWidth: 2 }}
              animate={{ r: maxRadius * 0.94, opacity: 0, strokeWidth: 0.5 }}
              transition={{ duration: 1.05, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              stroke="#6b6fb0"
              fill="none"
              style={{ filter: "drop-shadow(0 0 20px rgba(107, 111, 176, 0.8))" }}
            />

            {/* Tertiary Dashed Geometric Orbit */}
            <motion.circle
              cx={origin.x}
              cy={origin.y}
              initial={{ r: 70, opacity: 0.9, strokeWidth: 1.5 }}
              animate={{ r: maxRadius * 0.98, opacity: 0, strokeWidth: 0.5 }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
              stroke="#efe9df"
              strokeDasharray="10 14"
              fill="none"
            />
          </>
        )}
      </svg>

      {/* ─── Hardware-Accelerated Framer Motion clip-path Radial Light Burst ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        initial={{
          clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
        }}
        animate={{
          clipPath: isExpanding
            ? `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`
            : `circle(0px at ${origin.x}px ${origin.y}px)`,
        }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          willChange: "clip-path",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(circle at ${origin.x}px ${origin.y}px, rgba(193, 99, 59, 0.36) 0%, rgba(107, 111, 176, 0.15) 35%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* ─── HUD Interface Foreground Layer ─── */}
      <motion.div
        className="relative z-10 w-full max-w-4xl flex flex-col justify-between items-center h-full pointer-events-none"
        animate={
          isExpanding
            ? { scale: 1.14, opacity: 0, filter: "blur(6px)" }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Header Tag */}
        <div className="flex flex-col items-center gap-1.5 text-center pt-2 sm:pt-4">
          <div className="flex items-center gap-2 font-mono text-[0.68rem] sm:text-xs uppercase tracking-[0.22em] text-accent">
            <span>SAGAR MAHAJAN // SYSTEMS &amp; PRODUCTION AI</span>
          </div>
          <div className="font-mono text-[0.58rem] sm:text-[0.64rem] tracking-wider text-stone/80 uppercase">
            Aperture Control · Direct Audio Subsystem
          </div>
        </div>

        {/* Center: Cinematic Iris Aperture Reticle & Central Lens */}
        <div className="relative flex items-center justify-center my-auto w-[320px] h-[320px] sm:w-[390px] sm:h-[390px]">
          {/* Subtle Ambient Radial Warmth */}
          <div className="absolute inset-0 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

          {/* Ring 1: Rotating Outer Compass Ring (Clockwise, 50s cycle) */}
          <motion.svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {/* Outer dotted compass circle */}
            <circle
              cx="200"
              cy="200"
              r="185"
              fill="none"
              stroke="rgba(193, 99, 59, 0.3)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />
            {/* Major cardinal ticks */}
            <line x1="200" y1="10" x2="200" y2="22" stroke="#c1633b" strokeWidth="2" />
            <line x1="200" y1="378" x2="200" y2="390" stroke="#c1633b" strokeWidth="2" />
            <line x1="10" y1="200" x2="22" y2="200" stroke="#c1633b" strokeWidth="2" />
            <line x1="378" y1="200" x2="390" y2="200" stroke="#c1633b" strokeWidth="2" />

            {/* Cardinal Angle Labels */}
            <text x="200" y="32" fill="#c1633b" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">000° // N</text>
            <text x="368" y="203" fill="rgba(193,99,59,0.7)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">090°</text>
            <text x="200" y="374" fill="rgba(193,99,59,0.7)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">180°</text>
            <text x="32" y="203" fill="rgba(193,99,59,0.7)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="start">270°</text>
          </motion.svg>

          {/* Ring 2: Rotating Middle Precision Reticle (Counter-Clockwise, 32s cycle) */}
          <motion.svg
            viewBox="0 0 300 300"
            className="absolute inset-[12.5%] w-[75%] h-[75%] pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {/* Segmented Tech Arc */}
            <circle
              cx="150"
              cy="150"
              r="135"
              fill="none"
              stroke="rgba(107, 111, 176, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="28 14 8 14"
            />
            {/* Coordinate Markers */}
            <text x="150" y="28" fill="#6b6fb0" fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="middle">LAT: 37.77° N</text>
            <text x="150" y="280" fill="#6b6fb0" fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="middle">LON: 122.41° W</text>
          </motion.svg>

          {/* Ring 3: Iris Aperture Blade Geometry */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-[25%] w-[50%] h-[50%] pointer-events-none"
          >
            {/* 8-Segment Tangent Iris Blades */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 100 + 78 * Math.cos(rad);
              const y1 = 100 + 78 * Math.sin(rad);
              const x2 = 100 + 52 * Math.cos(rad + 0.45);
              const y2 = 100 + 52 * Math.sin(rad + 0.45);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(193, 99, 59, 0.55)"
                  strokeWidth="1"
                />
              );
            })}
            {/* Inner Reticle Target Crosshairs */}
            <line x1="100" y1="36" x2="100" y2="48" stroke="#efe9df" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="100" y1="152" x2="100" y2="164" stroke="#efe9df" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="36" y1="100" x2="48" y2="100" stroke="#efe9df" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="152" y1="100" x2="164" y2="100" stroke="#efe9df" strokeWidth="1" strokeOpacity="0.7" />
          </svg>

          {/* ─── The Central Interactive Lens Button ─── */}
          <div className="relative z-20 pointer-events-auto">
            {/* Pulsing ambient aura */}
            <div className="absolute inset-0 rounded-full bg-accent/25 animate-ping opacity-40 pointer-events-none" />

            <button
              ref={lensButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                // When clicking the button, snap origin to button center for concentric beauty
                const rect = lensButtonRef.current?.getBoundingClientRect();
                const coords = rect
                  ? { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) }
                  : { x: e.clientX, y: e.clientY };
                triggerEnter(true, coords);
              }}
              aria-label="Click to enter portfolio and initialize unmuted audio"
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#141311]/95 backdrop-blur-md border border-accent/70 hover:border-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_35px_rgba(193,99,59,0.4)] hover:shadow-[0_0_55px_rgba(193,99,59,0.75)] flex flex-col items-center justify-center group cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Radial gradient sheen inside lens */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-cool/15 pointer-events-none" />

              {/* 5-Bar Dynamic Audio EQ Visualizer */}
              <div className="relative z-10 flex items-center gap-[3px] h-5 mb-1.5 pointer-events-none">
                {[0.45, 0.85, 1.0, 0.7, 0.55].map((scale, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] bg-accent rounded-full"
                    animate={{
                      height: ["6px", `${Math.round(scale * 18)}px`, "6px"],
                    }}
                    transition={{
                      duration: 0.85 + i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>

              {/* High-Impact Micro Typography */}
              <span className="relative z-10 font-mono text-[0.68rem] sm:text-[0.74rem] font-bold tracking-[0.24em] text-paper group-hover:text-accent transition-colors uppercase">
                INITIALIZE
              </span>
              <span className="relative z-10 font-mono text-[0.52rem] sm:text-[0.58rem] tracking-wider text-stone group-hover:text-paper transition-colors uppercase mt-0.5">
                VOICE &amp; AUDIO
              </span>

              {/* Glass Rim Highlight */}
              <div className="absolute inset-x-2 top-1 h-3 rounded-t-full bg-white/10 blur-[1px] pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Bottom Section: Instructions, 3.8s Progress Countdown & Bypass Option */}
        <div className="flex flex-col items-center w-full max-w-sm text-center pb-2 sm:pb-4 pointer-events-auto">
          {/* Main Action Cue */}
          <p className="font-body text-xs sm:text-[0.84rem] text-stone mb-2.5">
            Click central lens to enter with <span className="text-accent font-medium">unmuted audio</span>
          </p>

          {/* 3.8s Auto-Bypass Progress Bar */}
          <div className="w-64 sm:w-72 h-[3px] bg-line/80 rounded-full overflow-hidden mb-2 relative">
            <div
              className="h-full bg-gradient-to-r from-accent via-accent to-cool transition-[width] duration-75 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Auto-Bypass Timer & Direct Muted Skip Button */}
          <div className="flex items-center justify-between w-64 sm:w-72 font-mono text-[0.64rem] tracking-wider uppercase text-stone/90">
            <span>Auto-entering: {(timeLeft / 1000).toFixed(1)}s</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerEnter(false);
              }}
              className="hover:text-paper hover:underline transition-colors cursor-pointer text-stone/80"
              aria-label="Skip directly with muted playback"
            >
              Skip (Muted) →
            </button>
          </div>

          {/* Browser Autoplay Disclosure */}
          <p className="font-mono text-[0.52rem] sm:text-[0.56rem] text-stone/50 tracking-wider uppercase mt-3">
            Browser security requires 1 user gesture to authorize unmuted sound
          </p>
        </div>
      </motion.div>
    </div>
  );

  // If client-side mounted, portal directly to document.body to break free of any parent stacking context
  if (isMounted && typeof document !== "undefined") {
    return createPortal(portalContent, document.body);
  }

  // On SSR/initial hydration pass, render in-place to ensure zero flash of unstyled/unportaled content
  return portalContent;
}

export default InteractiveEntryPortal;
