"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTransitionEnabled } from "@/lib/motion-flags";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Cpu, Terminal, Play, CheckCircle2, Zap } from "lucide-react";

interface SpanWaterfallStep {
  name: string;
  time: number;
  unit: string;
  color: string;
}

interface TraceSpan {
  id: string;
  method: string;
  methodColor: string;
  path: string;
  categoryTag: string;
  latencyDisplay: string;
  baseLatencyMs: number;
  statusText: string;
  principleNumber: string;
  principleTitle: string;
  principleSummary: string;
  waterfall: SpanWaterfallStep[];
  payload: string;
}

const TRACE_SPANS: TraceSpan[] = [
  {
    id: "guardrail",
    method: "POST",
    methodColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    path: "/eval/ast-guardrail",
    categoryTag: "DETERMINISTIC VERIFICATION",
    latencyDisplay: "3.8ms",
    baseLatencyMs: 3.8,
    statusText: "200 OK • 0 AST VIOLATIONS",
    principleNumber: "01",
    principleTitle: "Verify before you trust",
    principleSummary:
      "A generative model proposes; deterministic AST validators dispose. Every code execution or tool dispatch runs through structural sandboxing before touching system memory.",
    waterfall: [
      { name: "Token Regex & Taint Filter", time: 0.4, unit: "ms", color: "bg-emerald-400" },
      { name: "AST Semantic Policy Proof", time: 2.1, unit: "ms", color: "bg-accent" },
      { name: "HMAC Cryptographic Nonce", time: 1.3, unit: "ms", color: "bg-stone-300" },
    ],
    payload: JSON.stringify(
      {
        trace_id: "trc_ast_982b1",
        evaluator: "ast_sentinel_v2",
        policy: "BLOCK_ARBITRARY_CODE_EXECUTION",
        taint_analysis: "PASSED",
        runtime_guardrail: {
          sandboxed: true,
          max_stack_depth: 32,
          memory_cap_mb: 64,
        },
        execution_guarantee: "DETERMINISTIC_SANDBOX",
      },
      null,
      2
    ),
  },
  {
    id: "voice",
    method: "WS",
    methodColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    path: "/voice/duplex-stream",
    categoryTag: "REAL-TIME SPEECH PIPELINE",
    latencyDisplay: "142ms",
    baseLatencyMs: 142.0,
    statusText: "ACTIVE • P99 JITTER 2ms",
    principleNumber: "02",
    principleTitle: "Latency is a feature",
    principleSummary:
      "A conversational agent with 500ms lag breaks human conversational cadence. Sub-150ms bidirectional audio with instant neural barge-in makes voice intelligence feel native.",
    waterfall: [
      { name: "Neural VAD Interruption Detection", time: 35, unit: "ms", color: "bg-sky-400" },
      { name: "LLM Time-to-First-Token (TTFT)", time: 72, unit: "ms", color: "bg-accent" },
      { name: "Streaming Chunk Audio Synthesis", time: 35, unit: "ms", color: "bg-amber-400" },
    ],
    payload: JSON.stringify(
      {
        trace_id: "trc_duplex_084k",
        protocol: "webrtc_bidirectional",
        barge_in_latency_p99: "35ms",
        jitter_buffer_ms: 12,
        audio_codec: "opus_48khz_low_delay",
        stream_pipeline: {
          vad_mode: "silero_neural",
          tts_engine: "stream_chunked_fast",
          duplex_state: "SYNCHRONIZED",
        },
      },
      null,
      2
    ),
  },
  {
    id: "rollback",
    method: "STATE",
    methodColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    path: "/agent/rollback-gate",
    categoryTag: "TRANSACTIONAL STATE MACHINE",
    latencyDisplay: "18.0ms",
    baseLatencyMs: 18.0,
    statusText: "VERIFIED • INVARIANT VALID",
    principleNumber: "03",
    principleTitle: "Ship the whole stack",
    principleSummary:
      "A model without state checkpoints is a liability. We capture continuous state diff trees, so unverified tool mutations instantly revert without corrupting live production databases.",
    waterfall: [
      { name: "State Diff Tree Capture", time: 4.2, unit: "ms", color: "bg-amber-400" },
      { name: "Formal Invariant Assertion Proof", time: 11.0, unit: "ms", color: "bg-accent" },
      { name: "Transactional Checkpoint Commit", time: 2.8, unit: "ms", color: "bg-emerald-400" },
    ],
    payload: JSON.stringify(
      {
        trace_id: "trc_gate_441q",
        checkpoint_id: "snap_01h9x72b",
        state_tree_hash: "sha256:e3b0c44298fc1c149afb80327f424e39483832c",
        rollback_guarantee: "ZERO_DATA_LOSS_ATOMIC",
        witness_signature: "VERIFIED_BY_RUNTIME",
        invariant_status: {
          pre_condition: "VALID",
          post_condition: "VALID",
          side_effects_quarantined: true,
        },
      },
      null,
      2
    ),
  },
];

export function ThinkingPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

  const [activeTraceId, setActiveTraceId] = useState<string>("guardrail");
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [probeTick, setProbeTick] = useState<number>(0);

  const activeTrace = TRACE_SPANS.find((t) => t.id === activeTraceId) || TRACE_SPANS[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Card 05 Splash Physics
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            y: 45,
            scale: 0.97,
            rotateX: -2.5,
            transformOrigin: "center bottom",
          },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "top 50%",
              scrub: 0.8,
            },
          }
        );
      }

      const words = statementRef.current?.querySelectorAll(".fade-word");
      if (words && isTransitionEnabled("PROJECTS_TO_PHILOSOPHY_BLADE")) {
        gsap.to(words, {
          opacity: 1,
          color: "#efe9df",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        });
      }

      // Console entrance reveal
      gsap.fromTo(
        ".trace-inspector-console",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".trace-inspector-console",
            start: "top 88%",
            end: "top 60%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const triggerProbe = () => {
    if (isProbing) return;
    setIsProbing(true);
    setTimeout(() => {
      setProbeTick((prev) => prev + 1);
      setIsProbing(false);
    }, 450);
  };

  const statementText =
    "An agent that can act is only as trustworthy as the system watching it act. I do not ship blind autonomy; I ship autonomy with a witness: something that reviews, verifies, and can say no.";

  return (
    <section
      ref={sectionRef}
      id="thinking"
      className="py-[clamp(3.5rem,7vw,7rem)] relative z-10 overflow-visible max-w-full"
      style={{ perspective: "1200px" }}
      aria-labelledby="thinking-heading"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        {/* ─── De-boxified Organic Architecture: Section 05 Stage ─── */}
        <div
          ref={cardRef}
          className="relative transition-all duration-300 will-change-transform"
        >
          {/* Subtle Ambient Atmospheric Glows */}
          <div className="absolute -top-24 left-1/4 w-96 h-48 bg-accent/[0.04] blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/[0.035] rounded-full blur-[100px] pointer-events-none" />

          <div id="thinking-heading" className="eyebrow text-accent font-semibold flex items-center gap-2 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>05 / Engineering Conviction</span>
          </div>

          {/* High-conviction Space Grotesk editorial typography */}
          <p
            ref={statementRef}
            className="mt-6 max-w-[940px] font-display font-medium text-[clamp(1.35rem,3.2vw,2.3rem)] leading-[1.3] tracking-[-0.01em] text-paper relative z-10"
          >
            {statementText.split(" ").map((word, i) => {
              const isWitness = word.toLowerCase().includes("witness");
              const isKeyWord =
                word.toLowerCase().includes("verifies") ||
                word.toLowerCase().includes("reviews") ||
                word.toLowerCase().includes("no.");

              return (
                <span
                  key={i}
                  className={`fade-word opacity-30 transition-opacity inline-block mr-[0.25em] ${
                    isWitness
                      ? "text-accent font-semibold"
                      : isKeyWord
                      ? "text-paper font-semibold"
                      : "text-stone-300"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>

          {/* ─── Interactive Autonomous Systems Trace Inspector (Anti-AI-Slop Master-Detail) ─── */}
          <div className="trace-inspector-console mt-12 sm:mt-16 rounded-2xl bg-bg-raise/70 border border-white/[0.08] backdrop-blur-md overflow-hidden relative z-10 shadow-2xl shadow-black/80">
            {/* Top Chrome Header */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-white/[0.08] bg-black/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[0.72rem] sm:text-xs text-stone-300 font-medium tracking-wide flex items-center gap-1.5 ml-2">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  SYSTEM INVARIANT INSPECTOR // LIVE TRACE WATERFALL
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] sm:text-[0.72rem] text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  REC: STREAMING (P99 &lt; 5ms)
                </span>

                <button
                  onClick={triggerProbe}
                  disabled={isProbing}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] sm:text-xs text-paper bg-accent/20 hover:bg-accent/30 active:scale-[0.97] border border-accent/40 px-3 py-1 rounded-lg transition-all cursor-pointer"
                  title="Simulate live invariant execution probe"
                >
                  <Play className={`w-3 h-3 text-accent ${isProbing ? "animate-spin" : ""}`} />
                  <span>{isProbing ? "Probing..." : "Simulate Probe"}</span>
                </button>
              </div>
            </div>

            {/* Master-Detail Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
              {/* Left Panel: Selectable Spans Master List */}
              <div className="p-4 sm:p-5 flex flex-col gap-2.5 bg-black/20">
                <div className="font-mono text-[0.68rem] text-stone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Production Spans</span>
                  <span>Select to inspect</span>
                </div>

                {TRACE_SPANS.map((trace) => {
                  const isSelected = trace.id === activeTraceId;
                  return (
                    <button
                      key={trace.id}
                      onClick={() => setActiveTraceId(trace.id)}
                      className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? "bg-white/[0.05] border-accent/60 shadow-[0_4px_20px_rgba(193,99,59,0.15)]"
                          : "bg-white/[0.015] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.15]"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[0.65rem] font-bold px-1.5 py-0.5 rounded border ${trace.methodColor}`}
                          >
                            {trace.method}
                          </span>
                          <span className="font-mono text-xs text-paper font-medium tracking-tight">
                            {trace.path}
                          </span>
                        </div>
                        <span className="font-mono text-[0.72rem] text-accent font-semibold">
                          {trace.latencyDisplay}
                        </span>
                      </div>

                      <div className="mt-2 text-stone-300 font-light text-xs line-clamp-2 leading-relaxed">
                        {trace.principleSummary}
                      </div>

                      <div className="mt-2.5 flex items-center justify-between font-mono text-[0.62rem] text-stone-400">
                        <span className="text-stone">{trace.categoryTag}</span>
                        <span className="flex items-center gap-1 text-emerald-400/90">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {trace.statusText.split("•")[0].trim()}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Live Invariant Telemetry Banner */}
                <div className="mt-3 p-3 rounded-lg bg-accent/[0.06] border border-accent/20 flex items-center justify-between text-[0.68rem] font-mono text-stone-300">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-accent" />
                    <span>Invariant Proof Engine</span>
                  </div>
                  <span className="text-emerald-400">100% Deterministic</span>
                </div>
              </div>

              {/* Right Panel: Active Span Waterfall & Invariant Schema */}
              <div className="p-4 sm:p-6 flex flex-col justify-between bg-black/30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTrace.id}-${probeTick}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Header Details */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-accent font-semibold">
                            {activeTrace.principleNumber} /
                          </span>
                          <h3 className="font-display font-medium text-lg sm:text-xl text-paper">
                            {activeTrace.principleTitle}
                          </h3>
                        </div>
                        <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                          {activeTrace.statusText}
                        </span>
                      </div>

                      <p className="mt-2 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                        {activeTrace.principleSummary}
                      </p>
                    </div>

                    {/* Latency Waterfall Breakdown */}
                    <div>
                      <div className="flex items-center justify-between font-mono text-[0.68rem] text-stone-400 uppercase tracking-wider mb-2.5">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-accent" />
                          Latency Waterfall Execution Breakdown
                        </span>
                        <span className="text-paper font-semibold">
                          Total: {activeTrace.latencyDisplay}
                        </span>
                      </div>

                      <div className="space-y-2.5 bg-black/40 p-3 sm:p-4 rounded-xl border border-white/[0.06]">
                        {activeTrace.waterfall.map((step, idx) => {
                          const percentage = Math.max(
                            12,
                            Math.round((step.time / activeTrace.baseLatencyMs) * 100)
                          );
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex items-center justify-between font-mono text-[0.68rem] sm:text-xs">
                                <span className="text-stone-300">{step.name}</span>
                                <span className="text-paper font-semibold">
                                  {step.time}
                                  {step.unit}
                                </span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{
                                    duration: 0.45,
                                    delay: idx * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className={`h-full rounded-full ${step.color}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Invariant Rule Schema Viewer */}
                    <div>
                      <div className="flex items-center justify-between font-mono text-[0.68rem] text-stone-400 uppercase tracking-wider mb-2">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                          Verified Invariant Payload Schema
                        </span>
                        <span className="text-stone">JSON / STRICT</span>
                      </div>

                      <pre className="p-3 sm:p-4 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-[0.68rem] sm:text-xs text-stone-300 overflow-x-auto leading-relaxed shadow-inner">
                        <code>{activeTrace.payload}</code>
                      </pre>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Status Bar */}
                <div className="mt-6 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-[0.65rem] font-mono text-stone-400 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>[PROBE OK] Last verified {probeTick > 0 ? "just now" : "0.2s ago"}</span>
                  </div>
                  <span>Memory Delta: +0.02MB • Gateway CPU: 0.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThinkingPhilosophy;

