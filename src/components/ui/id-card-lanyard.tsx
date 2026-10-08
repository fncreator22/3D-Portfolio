"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/data/projects";

export interface IDCardLanyardProps {
  /** Full name shown on the card and used for the back-face signature. */
  name?: string;
  /** Job title / role line under the name. */
  role?: string;
  /** Wordmark shown top-left on the front face. */
  brand?: string;
  /** Small caption under the wordmark. */
  brandTagline?: string;
  /** Three short values stacked top-right (e.g. working pillars). */
  pillars?: [string, string, string];
  location?: string;
  idNumber?: string;
  validThru?: string;
  avatarUrl?: string;
  /** URL/label shown next to the back-face QR code. */
  site?: string;
  /** Social links shown on the back face. */
  githubUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
  /** Show the "drag to swing" hint. */
  showHint?: boolean;
  className?: string;
}

const CSS = `
.idcl-container {
  position: relative;
  width: 100%;
  min-height: 560px;
  height: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  --idcl-ink-faint: #78716c;
  --idcl-accent: #c1633b;
  --idcl-accent-dim: #6e3c26;
  --idcl-card: #181715;
  --idcl-card-2: #12110f;
  --idcl-card-ink: #f6f4ee;
  --idcl-card-soft: #a8a29e;
  --idcl-card-line: #2e2b26;
  --idcl-font-display: var(--font-space), -apple-system, sans-serif;
  --idcl-font-mono: var(--font-mono), monospace;
  --idcl-font-script: var(--font-fraunces), Georgia, serif;
  font-family: var(--font-space), system-ui, sans-serif;
}
.idcl-container * { box-sizing: border-box; }

.idcl-stage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.idcl-rope {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.idcl-rail {
  position: absolute;
  top: 0;
  width: 68px;
  height: 8px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, #3d3a34, #1f1d1a);
  border-radius: 0 0 5px 5px;
  border: 1px solid rgba(193, 99, 59, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  pointer-events: none;
}

.idcl-card {
  position: absolute;
  width: clamp(232px, 68vw, 258px);
  aspect-ratio: 246 / 485;
  perspective: 1400px;
  cursor: grab;
  touch-action: none;
  user-select: none;
  transform-origin: top center;
  pointer-events: auto;
}
.idcl-card:active { cursor: grabbing; }
.idcl-card a {
  pointer-events: auto !important;
  cursor: pointer !important;
  position: relative;
  z-index: 25;
}

.idcl-flipper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.idcl-face {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 14px 14px 12px;
  display: flex;
  flex-direction: column;
  backface-visibility: hidden;
  border: 1px solid var(--idcl-card-line);
  box-shadow:
    0 32px 65px -16px rgba(0, 0, 0, 0.85),
    0 12px 24px -8px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.12),
    inset 0 0 0 1px rgba(193, 99, 59, 0.15);
}
.idcl-face::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 25%),
    radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1.3px) 0 0/3px 3px;
  mix-blend-mode: overlay;
  opacity: 0.6;
}
.idcl-face::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.25), transparent 45%);
  mix-blend-mode: overlay;
  opacity: 0;
  transition: opacity .3s ease;
}
.idcl-card.idcl-hovering .idcl-face::after { opacity: 1; }

.idcl-front {
  background: linear-gradient(165deg, var(--idcl-card), var(--idcl-card-2));
  align-items: stretch;
  text-align: left;
}
.idcl-back {
  background: linear-gradient(165deg, var(--idcl-card-2), var(--idcl-card));
  transform: rotateY(180deg);
}

.idcl-holo {
  position: absolute;
  top: 14px;
  bottom: 14px;
  right: 6px;
  width: 6px;
  border-radius: 5px;
  background: repeating-linear-gradient(125deg, #c1633b 0%, #6b6fb0 12%, #f6f4ee 24%, #6e3c26 36%, #c1633b 48%);
  background-size: 240% 240%;
  animation: idcl-foil 8s linear infinite;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.2), 0 0 8px rgba(193,99,59,.3);
  opacity: 0.85;
}
@keyframes idcl-foil { to { background-position: 240% 0%; } }

.idcl-hole {
  width: 34px;
  height: 8px;
  background: #090807;
  border-radius: 4px;
  margin: 0 auto 8px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.idcl-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.idcl-brand {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}
.idcl-brand-mark {
  font-size: 11px;
  color: var(--idcl-accent);
  line-height: 1;
  margin-top: 2px;
}
.idcl-brand-text {
  display: flex;
  flex-direction: column;
}
.idcl-brand-text b {
  font-family: var(--idcl-font-display);
  font-weight: 700;
  font-size: 10.5px;
  letter-spacing: .02em;
  color: var(--idcl-card-ink);
  line-height: 1.2;
}
.idcl-brand-text small {
  font-family: var(--idcl-font-mono);
  font-size: 6.5px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--idcl-card-soft);
}
.idcl-pillars {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.5px;
}
.idcl-pillars span {
  font-family: var(--idcl-font-mono);
  font-size: 6.5px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--idcl-card-soft);
}
.idcl-pillars i {
  width: 14px;
  height: 1.5px;
  background: var(--idcl-accent);
  margin-top: 2px;
}

.idcl-photo {
  position: relative;
  width: 100%;
  height: 108px;
  border-radius: 12px;
  background: #11100e;
  overflow: hidden;
  margin-bottom: 8px;
  flex-shrink: 0;
  border: 1px solid var(--idcl-card-line);
}
.idcl-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.idcl-verified {
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(160deg, #34d399, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--idcl-card);
}
.idcl-verified svg { width: 10px; height: 10px; stroke: #fff; }

.idcl-name {
  margin: 0 0 2px;
  font-family: var(--idcl-font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--idcl-card-ink);
  letter-spacing: -.01em;
}
.idcl-role {
  margin: 0 0 6px;
  font-size: 8.5px;
  color: var(--idcl-accent);
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-family: var(--idcl-font-mono);
}

/* Front Social Channels Row */
.idcl-front-socials {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 2px 0 8px;
  width: 100%;
}
.idcl-front-social-pill {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 3px;
  border-radius: 6px;
  background: #161513;
  border: 1px solid var(--idcl-card-line);
  color: var(--idcl-card-ink);
  font-family: var(--idcl-font-mono);
  font-size: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}
.idcl-front-social-pill:hover {
  background: #23201b;
  border-color: var(--idcl-accent);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(193, 99, 59, 0.3);
}
.idcl-front-social-pill svg {
  width: 10.5px;
  height: 10.5px;
  flex-shrink: 0;
  color: var(--idcl-accent);
}
.idcl-front-social-pill:hover svg {
  color: #fff;
}

.idcl-divider {
  width: 100%;
  height: 1px;
  background: var(--idcl-card-line);
  margin-bottom: 7px;
}

.idcl-idrow {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.idcl-idrow-labels {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-family: var(--idcl-font-mono);
}
.idcl-idrow-labels div {
  display: flex;
  gap: 6px;
  align-items: baseline;
}
.idcl-idrow-labels span {
  width: 48px;
  flex-shrink: 0;
  font-size: 7px;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--idcl-card-soft);
}
.idcl-idrow-labels b {
  font-size: 8.5px;
  font-weight: 600;
  color: var(--idcl-card-ink);
}

.idcl-qr-link {
  display: block;
  text-decoration: none;
  transition: transform 0.2s ease;
}
.idcl-qr-link:hover {
  transform: scale(1.06);
}

/* Clickable Barcode Component */
.idcl-barcode-interactive {
  display: block;
  width: 100%;
  margin: 4px 0 6px;
  text-decoration: none;
  border-radius: 6px;
  padding: 4px 5px;
  background: rgba(246, 244, 238, 0.05);
  border: 1px dashed var(--idcl-card-line);
  transition: all 0.2s ease;
}
.idcl-barcode-interactive:hover {
  border-color: var(--idcl-accent);
  background: rgba(193, 99, 59, 0.12);
  box-shadow: 0 0 12px rgba(193, 99, 59, 0.25);
}
.idcl-barcode {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 24px;
  width: 100%;
  background: #f6f4ee;
  border-radius: 3px;
  padding: 0 3px;
  overflow: hidden;
}
.idcl-barcode span {
  width: 2px;
  background: #11100e;
}
.idcl-barcode-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3px;
  font-family: var(--idcl-font-mono);
  font-size: 6.8px;
  color: var(--idcl-card-soft);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.idcl-barcode-meta strong {
  color: var(--idcl-accent);
  font-weight: 600;
}
.idcl-barcode-interactive:hover .idcl-barcode-meta strong {
  text-decoration: underline;
}

.idcl-footer {
  width: 100%;
  margin-top: auto;
  padding-top: 6px;
  border-top: 1px solid var(--idcl-card-line);
  text-align: center;
  font-family: var(--idcl-font-mono);
  font-size: 7px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--idcl-card-soft);
}
.idcl-footer i {
  color: var(--idcl-accent);
  font-style: normal;
  margin: 0 4px;
}

.idcl-stripe {
  width: 100%;
  height: 24px;
  background: repeating-linear-gradient(45deg, #11100e, #11100e 6px, #1f1e1a 6px, #1f1e1a 12px);
  border-radius: 4px;
  margin-bottom: 8px;
  border: 1px solid var(--idcl-card-line);
}
.idcl-idnum {
  margin: 0 0 5px;
  font-family: var(--idcl-font-mono);
  font-size: 9px;
  font-weight: 600;
  color: var(--idcl-card-ink);
  letter-spacing: .04em;
  display: flex;
  justify-content: space-between;
}
.idcl-idnum em {
  font-style: normal;
  color: var(--idcl-accent);
}

.idcl-backrow {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin: 6px 0 8px;
}
.idcl-qr {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
  width: 48px;
  height: 48px;
  background: #f6f4ee;
  padding: 3px;
  border-radius: 4px;
  flex-shrink: 0;
}
.idcl-qr i { background: transparent; }
.idcl-qr i.on { background: #11100e; }
.idcl-qr.idcl-small { width: 40px; height: 40px; padding: 2.5px; }

.idcl-scan {
  font-family: var(--idcl-font-mono);
  font-size: 7.5px;
  color: var(--idcl-card-soft);
  line-height: 1.4;
  padding-top: 1px;
  text-align: left;
}
.idcl-scan b {
  color: var(--idcl-card-ink);
  display: block;
  font-size: 8px;
  margin-bottom: 2px;
}

.idcl-connect {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid var(--idcl-card-line);
}
.idcl-connect span {
  font-family: var(--idcl-font-mono);
  font-size: 7.5px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--idcl-card-soft);
}
.idcl-connect-icons { display: flex; gap: 7px; }
.idcl-connect-icons a {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--idcl-card-line);
  color: var(--idcl-card-soft);
  background: #11100e;
  transition: all .2s ease;
}
.idcl-connect-icons a:hover {
  border-color: var(--idcl-accent);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 0 10px rgba(193, 99, 59, 0.4);
}
.idcl-connect-icons svg { width: 12px; height: 12px; }

.idcl-sig { margin-top: 8px; }
.idcl-sig .idcl-script {
  font-family: var(--idcl-font-script);
  font-size: 20px;
  font-style: italic;
  color: var(--idcl-accent);
  line-height: 1;
}
.idcl-sig small {
  display: block;
  font-family: var(--idcl-font-mono);
  font-size: 7px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--idcl-card-soft);
  border-top: 1px solid var(--idcl-card-line);
  margin-top: 4px;
  padding-top: 4px;
}

.idcl-hint {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(18, 17, 15, 0.85);
  border: 1px solid var(--idcl-card-line);
  color: var(--idcl-card-soft);
  padding: 5px 12px;
  border-radius: 999px;
  font-family: var(--idcl-font-mono);
  font-size: 10px;
  letter-spacing: .04em;
  pointer-events: none;
  opacity: 1;
  transition: opacity .4s ease;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.idcl-hint.idcl-hint-hidden { opacity: 0; }
.idcl-hint svg { width: 12px; height: 12px; color: var(--idcl-accent); }
`;

export function IDCardLanyard({
  name = PROFILE.name || "Sagar Mahajan",
  role = "AI Engineer & Systems Architect",
  brand = "SAGAR MAHAJAN",
  brandTagline = "Autonomous AI & Voice Systems",
  pillars = ["Verify", "Scale", "Autonomy"],
  location = "Hyderabad, IN (IST)",
  idNumber = "SM-2026-AI",
  validThru = "Permanent",
  avatarUrl = "/images/avatar.jpg",
  site = "sagarmahajan.cloud",
  githubUrl = PROFILE.github || "https://github.com/fncreator22",
  linkedinUrl = PROFILE.linkedin || "https://www.linkedin.com/in/sagar-mahajanofficial",
  xUrl = PROFILE.x || "https://x.com/sr2mahajan",
  showHint = true,
  className = "",
}: IDCardLanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);
  const barcodeFrontRef = useRef<HTMLDivElement>(null);
  const qrBackRef = useRef<HTMLDivElement>(null);
  const qrFrontRef = useRef<HTMLDivElement>(null);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const rail = railRef.current;
    const card = cardRef.current;
    const flipper = flipperRef.current;
    const barcodeEl = barcodeRef.current;
    const barcodeFrontEl = barcodeFrontRef.current;
    const qrBackEl = qrBackRef.current;
    const qrFrontEl = qrFrontRef.current;
    if (!container || !canvas || !rail || !card || !flipper || !barcodeEl || !qrBackEl || !qrFrontEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Generate barcode bars helper
    const buildBarcode = (target: HTMLDivElement) => {
      target.innerHTML = "";
      for (let i = 0; i < 30; i++) {
        const bar = document.createElement("span");
        bar.style.height = ((i * 37) % 100 > 38 ? 100 : 55) + "%";
        target.appendChild(bar);
      }
    };
    buildBarcode(barcodeEl);
    if (barcodeFrontEl) buildBarcode(barcodeFrontEl);

    // Build QR pattern
    function buildQR(el: HTMLDivElement, seed: number) {
      el.innerHTML = "";
      const N = 9;
      const seedOn = new Set([
        0, 1, 2, 9, 10, 11, 18, 19, 20,
        6, 7, 8, 15, 16, 17, 24, 25, 26,
        54, 55, 56, 63, 64, 65, 72, 73, 74,
      ]);
      for (let i = 0; i < N * N; i++) {
        const cell = document.createElement("i");
        const pseudoRandom = (i * seed) % 97 < 46;
        if (seedOn.has(i) || pseudoRandom) cell.classList.add("on");
        el.appendChild(cell);
      }
    }
    buildQR(qrBackEl, 928371);
    buildQR(qrFrontEl, 574123);

    // Anchor is anchored to top center of the container
    const anchor = { x: container.clientWidth / 2, y: 8 };

    function resize() {
      if (!container || !canvas || !rail) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      anchor.x = rect.width / 2;
      rail.style.left = anchor.x + "px";
      rail.style.top = anchor.y - 3 + "px";
    }
    resize();

    const NUM_POINTS = 12;
    const REST_LENGTH = 130;
    const SEGMENT_LENGTH = REST_LENGTH / (NUM_POINTS - 1);
    const GRAVITY = 0.52;
    const FRICTION = 0.975;
    const CONSTRAINT_ITERATIONS = 6;
    const TAP_THRESHOLD = 6;
    const MAX_TILT = 8;

    type Pt = { x: number; y: number; oldx: number; oldy: number; pinned: boolean };
    const points: Pt[] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      const y = anchor.y + i * SEGMENT_LENGTH;
      points.push({ x: anchor.x, y, oldx: anchor.x, oldy: y, pinned: i === 0 });
    }

    let dragging = false;
    let flipped = false;
    let downPos = { x: anchor.x, y: anchor.y };
    let pointer = { x: anchor.x, y: anchor.y + REST_LENGTH };
    let lastPointer = { ...pointer };
    let velocity = { x: 0, y: 0 };

    let flipTarget = 0;
    let flipCurrent = 0;
    const tiltTarget = { x: 0, y: 0 };
    const tiltCurrent = { x: 0, y: 0 };
    let mouse = { x: -9999, y: -9999 };

    function getContainerPos(e: PointerEvent | MouseEvent) {
      const rect = container!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function clampToContainer(p: { x: number; y: number }) {
      const margin = 20;
      p.x = Math.max(margin, Math.min(canvas!.width - margin, p.x));
      p.y = Math.max(anchor.y + 15, Math.min(canvas!.height - 40, p.y));
      return p;
    }

    function updatePoints() {
      for (let i = 1; i < points.length; i++) {
        if (dragging && i === points.length - 1) continue;
        const p = points[i];
        const vx = (p.x - p.oldx) * FRICTION;
        const vy = (p.y - p.oldy) * FRICTION;
        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }
    }

    function applyConstraints() {
      points[0].x = anchor.x;
      points[0].y = anchor.y;
      if (dragging) {
        const last = points[points.length - 1];
        last.x = pointer.x;
        last.y = pointer.y;
      }
      for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const diff = (SEGMENT_LENGTH - dist) / dist;
          const offX = dx * diff * 0.5;
          const offY = dy * diff * 0.5;
          if (!p1.pinned) {
            p1.x -= offX;
            p1.y -= offY;
          }
          if (!(dragging && i + 1 === points.length - 1)) {
            p2.x += offX;
            p2.y += offY;
          }
        }
      }
      for (let i = 1; i < points.length; i++) clampToContainer(points[i]);
    }

    function drawRope() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const path: { x: number; y: number; cx?: number; cy?: number }[] = [];
      path.push({ x: points[0].x, y: points[0].y });
      for (let i = 1; i < points.length - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        path.push({ x: points[i].x, y: points[i].y, cx: midX, cy: midY });
      }
      path.push({ x: points[points.length - 1].x, y: points[points.length - 1].y });

      function strokeRibbon(style: string | CanvasGradient, width: number) {
        ctx!.beginPath();
        ctx!.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          const p = path[i];
          if (p.cx !== undefined) ctx!.quadraticCurveTo(p.x, p.y, p.cx, p.cy as number);
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.strokeStyle = style;
        ctx!.lineWidth = width;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
      }

      // Shadow
      ctx!.save();
      ctx!.translate(2, 4);
      ctx!.globalAlpha = 0.35;
      strokeRibbon("#000000", 15);
      ctx!.restore();

      // Tactical Dark Webbing
      strokeRibbon("#191816", 15);
      strokeRibbon("rgba(0,0,0,0.4)", 15.5);
      strokeRibbon("#1f1e1a", 12.5);

      // Terracotta signature weave stripe
      strokeRibbon("rgba(193, 99, 59, 0.4)", 2.5);
    }

    function drawClip() {
      ctx!.save();
      ctx!.translate(anchor.x, anchor.y);
      const g = ctx!.createLinearGradient(-11, -9, 11, 9);
      g.addColorStop(0, "#d4cfc7");
      g.addColorStop(0.35, "#8c8577");
      g.addColorStop(0.65, "#524f46");
      g.addColorStop(1, "#2e2b26");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.roundRect(-11, -9, 22, 16, 4);
      ctx!.fill();
      ctx!.strokeStyle = "rgba(0,0,0,.35)";
      ctx!.lineWidth = 1;
      ctx!.stroke();
      ctx!.strokeStyle = "rgba(255,255,255,.25)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(-8, -6);
      ctx!.lineTo(8, -6);
      ctx!.stroke();
      ctx!.fillStyle = "#c1633b";
      ctx!.beginPath();
      ctx!.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function positionCard() {
      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;
      card!.style.left = last.x - card!.offsetWidth / 2 + "px";
      card!.style.top = last.y + "px";
      card!.style.transform = `rotate(${angle}rad)`;
    }

    function updateTiltAndSheen() {
      flipCurrent += (flipTarget - flipCurrent) * 0.16;

      const hovering = !dragging && mouse.x > -1000;
      if (hovering) {
        const cx = card!.offsetLeft + card!.offsetWidth / 2;
        const cy = card!.offsetTop + card!.offsetHeight / 2;
        const dx = Math.max(-1, Math.min(1, (mouse.x - cx) / (card!.offsetWidth / 2)));
        const dy = Math.max(-1, Math.min(1, (mouse.y - cy) / (card!.offsetHeight / 2)));
        tiltTarget.y = dx * MAX_TILT;
        tiltTarget.x = -dy * MAX_TILT;

        const mx = Math.max(0, Math.min(100, ((mouse.x - card!.offsetLeft) / card!.offsetWidth) * 100));
        const my = Math.max(0, Math.min(100, ((mouse.y - card!.offsetTop) / card!.offsetHeight) * 100));
        card!.style.setProperty("--mx", mx + "%");
        card!.style.setProperty("--my", my + "%");
        card!.classList.add("idcl-hovering");
      } else {
        tiltTarget.x = 0;
        tiltTarget.y = 0;
        card!.classList.remove("idcl-hovering");
      }

      tiltCurrent.x += (tiltTarget.x - tiltCurrent.x) * 0.12;
      tiltCurrent.y += (tiltTarget.y - tiltCurrent.y) * 0.12;

      flipper!.style.transform = `rotateY(${flipCurrent + tiltCurrent.y}deg) rotateX(${tiltCurrent.x}deg)`;
    }

    let raf = 0;
    function loop() {
      updatePoints();
      applyConstraints();
      drawRope();
      drawClip();
      positionCard();
      updateTiltAndSheen();
      raf = requestAnimationFrame(loop);
    }

    const onCardDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a")) return;
      e.preventDefault();
      dragging = true;
      setInteracted(true);
      card!.setPointerCapture(e.pointerId);
      const pos = clampToContainer(getContainerPos(e));
      pointer = pos;
      lastPointer = pos;
      downPos = pos;
    };

    const onWindowMove = (e: PointerEvent) => {
      mouse = getContainerPos(e);
      if (!dragging) return;
      const pos = clampToContainer(mouse);
      velocity.x = pos.x - lastPointer.x;
      velocity.y = pos.y - lastPointer.y;
      lastPointer = pos;
      pointer = pos;
    };

    const onWindowUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      const pos = getContainerPos(e);
      const dist = Math.hypot(pos.x - downPos.x, pos.y - downPos.y);
      if (dist < TAP_THRESHOLD) {
        flipped = !flipped;
        flipTarget = flipped ? 180 : 0;
        const last = points[points.length - 1];
        last.oldx = last.x;
        last.oldy = last.y;
        return;
      }
      const last = points[points.length - 1];
      last.oldx = last.x - velocity.x;
      last.oldy = last.y - velocity.y;
    };

    const onResize = () => resize();
    const onPointerOut = (e: PointerEvent) => {
      if (e.relatedTarget === null) mouse = { x: -9999, y: -9999 };
    };

    card.addEventListener("pointerdown", onCardDown);
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
    window.addEventListener("resize", onResize);
    document.addEventListener("pointerout", onPointerOut);

    loop();

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerdown", onCardDown);
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowUp);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <div className={`idcl-container ${className}`} ref={containerRef} suppressHydrationWarning>
      <style>{CSS}</style>

      {/* Physics stage scoped to container */}
      <div className="idcl-stage" suppressHydrationWarning>
        <canvas className="idcl-rope" ref={canvasRef} />
        <div className="idcl-rail" ref={railRef} />

        <div className="idcl-card" ref={cardRef}>
          <div className="idcl-flipper" ref={flipperRef}>
            {/* FRONT FACE */}
            <div className="idcl-face idcl-front">
              <div className="idcl-hole" />
              <div className="idcl-holo" />

              <div className="idcl-header">
                <div className="idcl-brand">
                  <span className="idcl-brand-mark">✳︎</span>
                  <div className="idcl-brand-text">
                    <b>{brand}</b>
                    <small>{brandTagline}</small>
                  </div>
                </div>
                <div className="idcl-pillars">
                  {pillars.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                  <i />
                </div>
              </div>

              {/* Photo Frame */}
              <div className="idcl-photo">
                <img
                  src={avatarUrl}
                  alt={name}
                  onError={(e) => {
                    // Fallback to neural avatar pattern if local photo is absent
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="idcl-verified" title="Verified AI Systems Engineer">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
              </div>

              <h3 className="idcl-name">{name}</h3>
              <p className="idcl-role">{role}</p>

              {/* Prominent Front Social Links */}
              <div className="idcl-front-socials">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="idcl-front-social-pill"
                    title="GitHub: github.com/fncreator22"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="idcl-front-social-pill"
                    title="LinkedIn: Sagar Mahajan"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
                {xUrl && (
                  <a
                    href={xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="idcl-front-social-pill"
                    title="X: @sr2mahajan"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>X</span>
                  </a>
                )}
              </div>

              <div className="idcl-divider" />

              <div className="idcl-idrow">
                <div className="idcl-idrow-labels">
                  <div>
                    <span>ID</span>
                    <b>{idNumber}</b>
                  </div>
                  <div>
                    <span>Location</span>
                    <b>{location}</b>
                  </div>
                  <div>
                    <span>Valid</span>
                    <b>{validThru}</b>
                  </div>
                </div>
                <a
                  href={`https://${site}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="idcl-qr-link"
                  title={`Open ${site}`}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="idcl-qr idcl-small" ref={qrFrontRef} />
                </a>
              </div>

              {/* Clickable Barcode Link to Portfolio */}
              <a
                href={`https://${site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="idcl-barcode-interactive group"
                title={`Click to open https://${site}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="idcl-barcode" ref={barcodeFrontRef} />
                <div className="idcl-barcode-meta">
                  <span>PORTFOLIO VERIFICATION</span>
                  <strong>{site} ↗</strong>
                </div>
              </a>

              <div className="idcl-footer">
                Verify<i>·</i>Scale<i>·</i>Deploy
              </div>
            </div>

            {/* BACK FACE */}
            <div className="idcl-face idcl-back">
              <div className="idcl-hole" />
              <div className="idcl-holo" />
              <div className="idcl-stripe" />

              <div className="idcl-idnum">
                <span>NO. {idNumber}</span>
                <em>{validThru}</em>
              </div>

              {/* Back Clickable Barcode Link */}
              <a
                href={`https://${site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="idcl-barcode-interactive group"
                title={`Click to open https://${site}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="idcl-barcode" ref={barcodeRef} />
                <div className="idcl-barcode-meta">
                  <span>SYSTEM AUTH KEY</span>
                  <strong>{site} ↗</strong>
                </div>
              </a>

              <div className="idcl-backrow">
                <a
                  href={`https://${site}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="idcl-qr-link"
                  title={`Open ${site}`}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="idcl-qr" ref={qrBackRef} />
                </a>
                <div className="idcl-scan">
                  <b>Scan or Click for Portfolio</b>
                  {site}
                  <br />
                  16 Production Systems,
                  <br />
                  MCP specs &amp; source code.
                </div>
              </div>

              {/* Connected Channels (GitHub, LinkedIn, X) */}
              <div className="idcl-connect">
                <span>Direct Access</span>
                <div className="idcl-connect-icons">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      title="GitHub Profile"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                  )}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      title="LinkedIn Profile"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                      </svg>
                    </a>
                  )}
                  {xUrl && (
                    <a
                      href={xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X Profile"
                      title="X (Twitter) Profile"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="idcl-sig">
                <div className="idcl-script">{name}</div>
                <small>Authorized Systems Architect</small>
              </div>
            </div>
          </div>
        </div>

        {showHint && (
          <div className={`idcl-hint ${interacted ? "idcl-hint-hidden" : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 3v18M7 8l-4 4 4 4M17 8l4 4-4 4" />
            </svg>
            Drag to swing · Click to flip
          </div>
        )}
      </div>
    </div>
  );
}

export default IDCardLanyard;
