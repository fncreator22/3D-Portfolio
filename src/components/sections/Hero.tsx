"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { InteractiveEntryPortal } from "@/components/ui/InteractiveEntryPortal";

const PROJECT_CHIPS = [
  { label: "Sentinel MCP Guardrail", href: "/work/sentinel-mcp-guardrail" },
  { label: "VaniFlow Voice AI", href: "/work/vaniflow-multilingual-voice-ai" },
  { label: "BrowserPilot Agent", href: "/work/browserpilot-autonomous-web-agent" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoIntroRef = useRef<HTMLVideoElement>(null);
  const videoIdleRef = useRef<HTMLVideoElement>(null);
  const videoTalkRef = useRef<HTMLVideoElement>(null);

  const introCompletedRef = useRef(false);
  const userMutedRef = useRef(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Interactive Entry Portal session gate state & ref (defaults to true for zero FOUC on initial visit)
  const [showPortal, setShowPortal] = useState(true);
  const portalActiveRef = useRef(true);

  // Active scene state: 'intro' (first presentation), 'idle' (standing weight-shift loop), or 'talk' (standing interactive dialogue)
  const [activeScene, setActiveScene] = useState<"intro" | "idle" | "talk">("intro");
  const activeSceneRef = useRef<"intro" | "idle" | "talk">("intro");

  // Audio state: starts muted (isMuted = true) to comply with browser autoplay security policies.
  // The moment the browser allows unmuted playback (MEI met) OR the visitor interacts
  // anywhere on the page (click/tap/keydown), audio automatically un-mutes and the speaker
  // symbol turns into active speaking mode.
  const [isMuted, setIsMuted] = useState(true);
  const [hasTalkVideo, setHasTalkVideo] = useState(true);

  // Zero-Dark-Dip Layering Engine:
  // Base Layer (Scene 2 Idle) is ALWAYS solid 100% opaque.
  // Scene 1 Intro sits on top (z-[2]), starts at opacity 1, dissolves to 0 over Idle.
  const [introOpacity, setIntroOpacity] = useState(1);
  const [introMounted, setIntroMounted] = useState(true);

  // Scene 3 Talk sits on top (z-[3]), starts at opacity 0, dissolves to 1 over Idle, and dissolves to 0 on return.
  const [talkOpacity, setTalkOpacity] = useState(0);

  const switchScene = (scene: "intro" | "idle" | "talk") => {
    activeSceneRef.current = scene;
    setActiveScene(scene);
  };

  // Browser Autoplay Policy Eager Interaction Unmute:
  // Modern browsers (Chrome, Edge, Safari, Firefox) block unmuted audio until a valid user gesture.
  // We listen across valid user activation events (click, pointerdown, touchstart, keydown).
  // As soon as the visitor interacts anywhere on the page (even on navigation or background),
  // audio un-mutes automatically and the speaker symbol updates to active speaking waves.
  useEffect(() => {
    let removed = false;

    const handleGesture = (e: Event) => {
      // If portal is still awaiting user interaction, let the portal handle initial activation
      if (portalActiveRef.current) return;

      // If the interaction is on or inside the speaker button, let toggleSound handle it directly
      const target = e.target as HTMLElement | null;
      if (target && target.closest?.("button")) {
        return;
      }

      if (userMutedRef.current || introCompletedRef.current) return;

      const vIntro = videoIntroRef.current;
      if (vIntro) {
        if (!vIntro.muted && !vIntro.paused) {
          setIsMuted(false);
          removeListeners();
          return;
        }

        vIntro.muted = false;
        const playPromise = vIntro.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsMuted(false);
              removeListeners();
            })
            .catch(() => {
              // If browser still requires direct button click, keep rolling muted
              vIntro.muted = true;
              vIntro.play().catch(() => {});
              setIsMuted(true);
            });
        }
      }
    };

    const events = [
      "click",
      "pointerdown",
      "touchstart",
      "keydown",
    ] as const;

    const addListeners = () => {
      events.forEach((evt) => {
        window.addEventListener(evt, handleGesture, { passive: true });
      });
    };

    const removeListeners = () => {
      if (removed) return;
      removed = true;
      events.forEach((evt) => {
        window.removeEventListener(evt, handleGesture);
      });
    };

    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  // Interactive Entry Portal session gate initialization
  useEffect(() => {
    let entered = false;
    try {
      entered = sessionStorage.getItem("sm_entered_session") === "true";
    } catch {
      entered = false;
    }

    if (!entered) {
      portalActiveRef.current = true;
      setShowPortal(true);
    } else {
      portalActiveRef.current = false;
      setShowPortal(false);
      // Returning visitor in same session: immediately probe unmuted autoplay
      const vIntro = videoIntroRef.current;
      if (vIntro && !introCompletedRef.current) {
        vIntro.muted = false;
        const initialPromise = vIntro.play();
        if (initialPromise !== undefined) {
          initialPromise
            .then(() => {
              setIsMuted(false);
            })
            .catch(() => {
              vIntro.muted = true;
              vIntro.play().catch(() => {});
              setIsMuted(true);
            });
        }
      }
    }
  }, []);

  // Handle Interactive Entry Portal trigger (synchronous user gesture start)
  const handlePortalEnter = useCallback((soundEnabled: boolean) => {
    portalActiveRef.current = false;

    const vIntro = videoIntroRef.current;
    if (!vIntro || introCompletedRef.current) return;

    if (soundEnabled) {
      // Synchronously un-mute within the user gesture execution context
      try {
        vIntro.currentTime = 0;
      } catch {}
      vIntro.muted = false;
      userMutedRef.current = false;
      const playPromise = vIntro.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch((err) => {
            console.warn("Autoplay audio blocked, falling back to muted:", err);
            vIntro.muted = true;
            vIntro.play().catch(() => {});
            setIsMuted(true);
          });
      }
    } else {
      // Auto-bypassed fallback: start playback muted, with [🔊 Click for sound] badge ready.
      // Keep userMutedRef.current = false so subsequent user gestures anywhere on the page CAN unmute!
      try {
        vIntro.currentTime = 0;
      } catch {}
      vIntro.muted = true;
      userMutedRef.current = false;
      vIntro.play().catch(() => {});
      setIsMuted(true);
    }
  }, []);

  // Handle portal unmount after the 1.1s radial expansion animation has finished
  const handlePortalComplete = useCallback(() => {
    portalActiveRef.current = false;
    setShowPortal(false);
  }, []);

  // Autoplay & Scroll-aware Audio/Video IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    const vIntro = videoIntroRef.current;
    const vIdle = videoIdleRef.current;
    const vTalk = videoTalkRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            // Hero is in view: play active video (only if portal is not active)
            if (activeSceneRef.current === "intro" && !introCompletedRef.current && vIntro && !portalActiveRef.current) {
              if (vIntro.paused) {
                const playPromise = vIntro.play();
                if (playPromise !== undefined) {
                  playPromise.catch(() => {
                    vIntro.muted = true;
                    vIntro.play().catch(() => {});
                    setIsMuted(true);
                  });
                }
              }
            } else if (activeSceneRef.current === "idle" && vIdle) {
              vIdle.play().catch(() => {});
            } else if (activeSceneRef.current === "talk" && vTalk) {
              vTalk.play().catch(() => {});
            }
          } else {
            // Scrolled away: pause active to preserve performance
            if (vIntro && !introCompletedRef.current) vIntro.pause();
            if (vIdle) vIdle.pause();
            if (vTalk) vTalk.pause();
          }
        });
      },
      { threshold: [0.1, 0.25, 0.5] }
    );

    observer.observe(container);

    // Initial play attempt for intro (only for returning visitors where portal is not waiting for user gesture):
    if (vIntro && !introCompletedRef.current && !portalActiveRef.current) {
      vIntro.muted = false;
      const initialPromise = vIntro.play();
      if (initialPromise !== undefined) {
        initialPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch(() => {
            // Browser autoplay security blocked unmuted playback on initial launch
            vIntro.muted = true;
            vIntro.play().catch(() => {});
            setIsMuted(true);
          });
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Seamless handoff from Scene 1 (Intro) into Scene 2 (Standing Idle)
  const transitionToIntroComplete = () => {
    if (introCompletedRef.current) return;
    introCompletedRef.current = true;

    const vIdle = videoIdleRef.current;
    if (vIdle) {
      vIdle.currentTime = 0;
      vIdle.play().catch(() => {});
    }

    // Ultra-fast 120ms dissolve right at the resting frame (0% black dip, 0% ghosting)
    setIntroOpacity(0);
    switchScene("idle");
    setIsMuted(true);

    setTimeout(() => {
      const vIntro = videoIntroRef.current;
      if (vIntro) {
        vIntro.pause();
      }
      setIntroMounted(false);
    }, 150);
  };

  // Monitor Intro video progress down to frame precision
  const handleIntroTimeUpdate = () => {
    const vIntro = videoIntroRef.current;
    if (!vIntro || introCompletedRef.current) return;

    // hero.mp4 duration 10.00s. Speech concludes at 9.83s, character settles into exact resting pose at 9.90s.
    if (vIntro.currentTime >= 9.90 || vIntro.ended) {
      transitionToIntroComplete();
    }
  };

  // When Scene 3 (Talk) finishes, smoothly return to Scene 2 (Standing Idle)
  const handleTalkEnded = () => {
    if (activeSceneRef.current !== "talk") return;
    const vIdle = videoIdleRef.current;
    const vTalk = videoTalkRef.current;

    // Start idle video from frame 0 (exact match to talk's resting end frame)
    if (vIdle) {
      vIdle.currentTime = 0;
      vIdle.play().catch(() => {});
    }

    // Seamless 150ms handoff back to idle
    setTalkOpacity(0);
    switchScene("idle");
    setIsMuted(true);
    userMutedRef.current = false;

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      if (vTalk && activeSceneRef.current !== "talk") {
        vTalk.pause();
        vTalk.currentTime = 0;
      }
    }, 180);
  };

  // Pre-emptively trigger talk-to-idle transition at resting pause (7.75s) for 100% fluid stream
  const handleTalkTimeUpdate = () => {
    const vTalk = videoTalkRef.current;
    if (!vTalk || activeSceneRef.current !== "talk") return;

    // Talk speech ends at 6.15s; by 7.75s avatar is in resting neutral pose. Smoothly return to idle.
    if (vTalk.currentTime >= 7.75 || vTalk.ended) {
      handleTalkEnded();
    }
  };

  // Interactive Speaker Button Toggle & 3-Scene State Machine
  const toggleSound = () => {
    const vIntro = videoIntroRef.current;
    const vIdle = videoIdleRef.current;
    const vTalk = videoTalkRef.current;

    // 1. Scene 1 (Intro):
    // Speaker button ONLY toggles mute/unmute of intro audio.
    // It NEVER skips, pauses, or stops the video. The intro continues speaking to completion.
    if (!introCompletedRef.current && activeSceneRef.current === "intro") {
      if (vIntro) {
        const nextMuted = !vIntro.muted;
        userMutedRef.current = nextMuted;
        vIntro.muted = nextMuted;
        setIsMuted(nextMuted);
      }
      return;
    }

    // 2. Scene 2 (Standing Idle loop):
    // Clicking speaker at ANY time during idle immediately starts Scene 3 (Talk) unmuted.
    if (activeSceneRef.current === "idle") {
      if (vTalk) {
        vTalk.currentTime = 0;
        vTalk.muted = false;
        userMutedRef.current = false;

        const playPromise = vTalk.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setTalkOpacity(1);
              switchScene("talk");
              setIsMuted(false);
              // Pause idle once talk has fully taken over
              if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
              transitionTimerRef.current = setTimeout(() => {
                if (vIdle && activeSceneRef.current === "talk") {
                  vIdle.pause();
                }
              }, 180);
            })
            .catch(() => {
              // Browser requires user gesture fallback
              vTalk.muted = true;
              vTalk.play().catch(() => {});
              setTalkOpacity(1);
              switchScene("talk");
              setIsMuted(true);
            });
        }
      }
      return;
    }

    // 3. Scene 3 (Speaking):
    // Clicking speaker while avatar is speaking immediately mutes and smoothly returns to Scene 2 (Idle).
    if (activeSceneRef.current === "talk") {
      userMutedRef.current = true;
      if (vTalk) {
        vTalk.muted = true;
      }
      if (vIdle) {
        vIdle.currentTime = 0;
        vIdle.play().catch(() => {});
      }
      setTalkOpacity(0);
      switchScene("idle");
      setIsMuted(true);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        if (vTalk && activeSceneRef.current !== "talk") {
          vTalk.pause();
          vTalk.currentTime = 0;
        }
      }, 180);
      return;
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-svh flex flex-col justify-between overflow-hidden bg-bg"
      aria-label="Hero Introduction"
    >
      {/* ─── Interactive Entry Portal (Option A: Cinematic Iris Aperture) ─── */}
      {showPortal && (
        <InteractiveEntryPortal
          onEnter={handlePortalEnter}
          onComplete={handlePortalComplete}
        />
      )}

      {/* ─── Seamless Ambient Video Background (Zero-Dark-Dip Layering Engine) ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#cbc4ba]">
        {/* Layer 1 (z-[1]): Scene 2 Standing Lifelike Idle (Rock-solid, always 100% opaque underlying canvas) */}
        <video
          ref={videoIdleRef}
          src="/videos/hero-idle.mp4"
          poster="/images/hero-idle-poster.webp"
          playsInline
          muted
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-[right_center] lg:object-[82%_center] z-[1]"
          style={{ opacity: 1, backgroundColor: "#cbc4ba" }}
        />

        {/* Layer 2 (z-[2]): Scene 1 Intro Presentation (Runs strictly ONCE, dissolves smoothly into Idle) */}
        {introMounted && (
          <video
            ref={videoIntroRef}
            src="/videos/hero.mp4"
            poster="/images/hero-poster.webp"
            playsInline
            muted
            onTimeUpdate={handleIntroTimeUpdate}
            onEnded={transitionToIntroComplete}
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-[right_center] lg:object-[82%_center] z-[2] transition-opacity duration-150 ease-out will-change-[opacity]"
            style={{
              opacity: introOpacity,
              backgroundColor: "#cbc4ba",
              pointerEvents: introOpacity === 0 ? "none" : undefined,
            }}
          />
        )}

        {/* Layer 3 (z-[3]): Scene 3 Re-Engagement Dialogue (Dissolves in/out on top of Idle with zero black shade) */}
        <video
          ref={videoTalkRef}
          src="/videos/hero-talk.mp4"
          playsInline
          onTimeUpdate={handleTalkTimeUpdate}
          onEnded={handleTalkEnded}
          onError={() => setHasTalkVideo(false)}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-[right_center] lg:object-[82%_center] z-[3] transition-opacity duration-150 ease-out will-change-[opacity]"
          style={{
            opacity: talkOpacity,
            backgroundColor: "#cbc4ba",
            pointerEvents: talkOpacity === 0 ? "none" : undefined,
          }}
        />

        {/* Left Obsidian Gradient Mask: Darkens text area so typography is 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/95 via-30% to-transparent w-full lg:w-[58%] z-10" />

        {/* Right edge feathering: seamless fade on ultra-wide screens */}
        <div className="absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-bg via-bg/35 to-transparent z-10" />

        {/* Top edge gradient: Lighter as requested to let studio lighting breathe */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/40 via-bg/20 to-transparent z-10" />

        {/* Bottom edge gradient: blends cleanly into Section 02 */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/90 to-transparent z-10" />

        {/* Subtle warm amber/terracotta atmosphere tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/8 via-transparent to-transparent mix-blend-color-dodge z-10" />
      </div>

      {/* ─── Hero Content Foreground Layer ─── */}
      <div className="relative z-20 flex-1 flex items-center pt-28 sm:pt-32 pb-12">
        <div className="max-w-[1320px] mx-auto px-[clamp(1.5rem,4vw,3.5rem)] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-center">

            {/* Left: Tightly Constrained & Balanced Text Column */}
            <div className="flex flex-col max-w-[460px]">
              
              {/* Shortened Eyebrow Tag (prevents collision with avatar's hair) */}
              <div className="eyebrow mb-3 sm:mb-3.5 text-[0.68rem] sm:text-xs tracking-wider">
                AI ENGINEER · AGENTIC SYSTEMS · VOICE AI
              </div>

              {/* High-Impact Headline */}
              <h1 className="font-display font-medium text-[clamp(2.2rem,4.2vw,3.8rem)] tracking-[-0.02em] leading-[1.06] text-paper mb-3 sm:mb-3.5">
                Engineering <span className="text-accent">Autonomous Systems</span> &amp; Production AI.
              </h1>

              {/* Shortened, Punchy Statement */}
              <p className="text-stone-300 mb-6 font-body text-[clamp(0.92rem,1.25vw,1.05rem)] leading-relaxed max-w-[440px]">
                Architecting self-evaluating agents, sub-200ms voice pipelines, and production systems that make dependable decisions.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap gap-2.5 items-center mb-6">
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center bg-paper text-bg border border-black/10 rounded-full font-body font-medium hover:bg-accent hover:text-paper hover:border-accent transition-all duration-200 text-[0.8rem] sm:text-[0.88rem] px-4 py-2 shadow-sm"
                >
                  Explore 16 Systems
                </Link>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-accent text-bg font-medium rounded-full hover:bg-accent/90 hover:shadow-md transition-all text-[0.8rem] sm:text-[0.88rem] px-4 py-2 gap-1.5"
                >
                  <span>Get in Touch</span>
                  <span className="text-xs">↓</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-paper bg-transparent border border-paper/60 rounded-full font-body hover:bg-paper hover:text-bg hover:border-paper transition-all duration-200 text-[0.8rem] sm:text-[0.88rem] px-4 py-2 gap-1.5"
                >
                  <span>Resume</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>

              {/* Flagship Project Quick Links */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-line/60">
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-stone mr-1">
                  Flagship:
                </span>
                {PROJECT_CHIPS.map((chip) => (
                  <Link
                    key={chip.href}
                    href={chip.href}
                    className="inline-flex items-center gap-1 font-mono text-[0.7rem] sm:text-xs text-paper/90 bg-bg-raise/90 border border-line/80 hover:border-accent hover:text-accent rounded-lg px-2.5 py-1 transition-all backdrop-blur-sm"
                  >
                    <span>{chip.label}</span>
                    <span className="text-accent text-[0.65rem]">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Open Visual Stage for the Animated Avatar */}
            <div className="hidden lg:block relative min-h-[440px] pointer-events-none" />

          </div>
        </div>
      </div>

      {/* ─── Dedicated Speaker Button: Positioned Directly Above the 4-Pointed Star ─── */}
      <div className="absolute bottom-[18%] sm:bottom-[20%] right-[7%] sm:right-[9%] lg:right-[9.8%] z-30 pointer-events-auto flex items-center gap-2.5">
        {/* Helper prompt when browser autoplay policy blocks unmuted audio on launch */}
        {activeScene === "intro" && isMuted && (
          <button
            onClick={toggleSound}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-wider uppercase text-paper bg-bg/90 hover:bg-bg-raise/95 border border-accent/60 px-3.5 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all cursor-pointer group"
            aria-label="Click to unmute presentation audio"
          >
            <span className="text-accent text-xs">🔊</span>
            <span className="group-hover:text-accent transition-colors font-medium">Click for sound</span>
          </button>
        )}

        <button
          onClick={toggleSound}
          type="button"
          aria-label={
            activeScene === "talk" || (activeScene === "intro" && !isMuted)
              ? "Mute speaker audio"
              : "Unmute speaker audio"
          }
          title={
            activeScene === "talk"
              ? "Avatar speaking · Click to mute"
              : activeScene === "intro"
              ? isMuted
                ? "Intro muted · Click to unmute"
                : "Intro audio active · Click to mute"
              : "Click to hear avatar speak"
          }
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-bg/85 hover:bg-bg-raise/95 border border-line hover:border-accent flex items-center justify-center text-paper transition-all backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.7)] group cursor-pointer"
        >
          {isMuted ? (
            <svg className="w-5 h-5 text-stone-400 group-hover:text-paper transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <div className="relative flex items-center justify-center">
              <svg className="w-5 h-5 text-accent group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </div>
          )}
        </button>
      </div>

      {/* ─── Bottom Bar: Minimal Scroll Indicator ─── */}
      <div className="relative z-20 max-w-[1320px] mx-auto px-[clamp(1.5rem,4vw,3.5rem)] w-full pb-4 sm:pb-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-1.5 pointer-events-none select-none">
          <span className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-stone">
            Scroll to begin
          </span>
          <div className="w-[1px] h-5 bg-gradient-to-b from-stone to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
