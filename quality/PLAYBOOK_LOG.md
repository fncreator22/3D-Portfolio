# 📖 Motion Playbook & Section Rollback Logbook

> **Living Quality & Motion Audit Document**  
> **Baseline Anchor:** `0da12ea` (`checkpoint/stable-baseline`)  
> **Architecture Standard:** Next.js 15 App Router + GSAP ScrollTrigger + Framer Motion + Three.js WebGL  
> **Safeguard Engine:** Zero-Breakdown Feature Flag Registry (`src/lib/motion-flags.ts`)

---

## 1. Zero-Breakdown Architecture & Feature Flags

All cinematic scroll transitions are registered behind an atomic feature flag registry at [`src/lib/motion-flags.ts`](file:///c:/Users/sr2ma/Downloads/profile/src/lib/motion-flags.ts). Any single animation can be toggled to `false` to instantly revert that specific section to its standard resting layout with zero code refactoring and zero risk to overall page scrollability.

```typescript
export const MOTION_CONFIG = {
  ENABLE_CINEMATIC_SCROLL: true, // Master toggle

  TRANSITIONS: {
    HERO_TO_IDENTITY_PORTAL: true,      // T1: Typographic Aperture Portal (Letter 'O' Zoom Mask)
    IDENTITY_TO_TRAJECTORY_STACK: true,  // T2: 3D Card Deck Stacking & Card Splash
    TRAJECTORY_TO_SKILLS_PHOTON: true,   // T3: Laser Photon Shockwave into WebGL Synaptic Cloud
    SKILLS_TO_PROJECTS_PIVOT: true,      // T4: Pinned Horizontal Rail Pivot (Preserved)
    PROJECTS_TO_PHILOSOPHY_BLADE: true,  // T5: Kinetic Typography Scrub (Modernized)
    FOOTER_CURTAIN_REVEAL: true,         // T6: Obsidian Curtain Reveal Footer (Preserved)
  },

  PERFORMANCE: {
    MOBILE_MAX_PARTICLES: 6000,
    REDUCE_MOTION_FALLBACK: true, // Auto-disables intensive scrubs on prefers-reduced-motion
  },
};
```

---

## 2. Transition Implementation Matrix

| ID | Boundary | Signature Mechanism | Files Involved | Flag Key | Verification State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **T1** | **Hero → Identity** | **Typographic Aperture Portal**: Keyword `AUTONOMOUS` pins; outer letters disperse horizontally; focal letter `O` acts as an aperture lens with an SVG counter mask hole (`#letter-o-aperture-mask`) and terracotta rim expanding up to 28× (18× on mobile); dark radial shader vignette closes in from all 4 edges; the real Section 01 reveals directly from within the aperture counter with zero duplicate cards. | [`LetterPortalTransition.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/effects/LetterPortalTransition.tsx), [`page.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/app/page.tsx), [`Identity.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/Identity.tsx) | `HERO_TO_IDENTITY_PORTAL` | **Verified** (True SVG mask hole, 0 duplicate preview cards, reversible scrub, zero scroll traps) |
| **T2** | **Card Deck Stacking & Splash** | **Unified 3D Card Deck Stacking**: Every major section is styled as an architectural obsidian card (`perspective: 1200px`). Card 01 (Identity) tilts back as Card 02 (Journey) splashes up; Card 02 tilts back as Card 03 (Skills) splashes up; Card 05 (Philosophy) splashes up with depth physics. | [`Identity.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/Identity.tsx), [`JourneyTimeline.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/JourneyTimeline.tsx), [`SkillsDomain.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/SkillsDomain.tsx), [`ThinkingPhilosophy.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/ThinkingPhilosophy.tsx) | `IDENTITY_TO_TRAJECTORY_STACK` | **Verified** (Physical obsidian deck feel across Cards 01, 02, 03, 05) |
| **T3** | **Trajectory → Skills** | **Synchronized Traveling Photon Shockwave to WebGL**: The 3D glowing laser rail (`#role-fill-line`) terminates into a photon burst (`#trajectory-shockwave-pulse`). As Card 03 arrives in the viewport, the shockwave energy bridges into the radiant flare and excites the Three.js synaptic cluster to expand radially and illuminate its terracotta axons directly before the visitor's eyes. | [`JourneyTimeline.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/JourneyTimeline.tsx), [`SkillsDomain.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/SkillsDomain.tsx) | `TRAJECTORY_TO_SKILLS_PHOTON` | **Verified** (Viewport-synchronized Three.js cluster excitation and flare illumination) |
| **T4** | **Skills → Projects** | **Pinned 90° Axis Pivot & Framer Motion Spread**: Vertical page scroll locks via GSAP ScrollTrigger pinning; horizontal projects carousel translates across X-axis; dynamic collapsible card spread on desktop hover with secondary `text-stone-400` details. | [`HorizontalProjects.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/HorizontalProjects.tsx), [`workflow-builder-card.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/ui/workflow-builder-card.tsx) | `SKILLS_TO_PROJECTS_PIVOT` | **Verified & Preserved** |
| **T5** | **Projects → Philosophy** | **Kinetic Typography Scrub & Space Grotesk 500**: Clean editorial typography in Card 05 (replacing italic serif wall of text) with dual-tone word scrub; key conviction terms illuminate in terracotta. | [`ThinkingPhilosophy.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/ThinkingPhilosophy.tsx) | `PROJECTS_TO_PHILOSOPHY_BLADE` | **Verified** (High-conviction, anti-slop, Card 05 wrapper) |
| **T6** | **Connect → Footer** | **Obsidian Curtain Reveal Footer**: Desktop viewport clip-path unrolls fixed bottom footer (`polygon(0 0, 100% 0, 100% 100%, 0 100%)`) with giant watermark parallax. | [`motion-footer.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/ui/motion-footer.tsx), [`Contact.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/Contact.tsx) | `FOOTER_CURTAIN_REVEAL` | **Verified & Preserved** |

---

## 3. Typography & De-cluttering Changes

| Section | Previous State | New Modernized Architecture |
| :--- | :--- | :--- |
| **Section 01 (Identity)** | Double italic tags `<em>vague asks</em> to <em>live production</em>`; italic serif metric numbers. | Clean Space Grotesk 500: `Taking systems from vague asks to live production.` Numbers use `font-display font-semibold text-3xl sm:text-4xl text-accent`. Added empirical telemetry architecture chips: `[ <150ms P99 Voice ]`, `[ Deterministic Agent Evals ]`, `[ Multi-Agent Sandboxing ]`. |
| **Section 02 (Trajectory)** | `Four roles, one <em>throughline</em>`; role companies in `font-serif italic`. | High-conviction Space Grotesk 500: `Four roles, one throughline: ship it, then prove it's safe.` Role company names in `font-display font-medium text-accent`. |
| **Section 03 (Skills)** | `Core Domains & <span className="font-serif italic">Production Technologies</span>.` | Clean Space Grotesk 500: `Core Domains & Production Toolchains.` |
| **Section 05 (Philosophy)** | Statement paragraph rendered entirely in `font-serif italic font-normal text-paper`. | Modernized to Space Grotesk 500 (`font-display font-medium text-[clamp(1.35rem,3.2vw,2.3rem)]`). Dual-tone contrast scrub with keyword conviction markers. |
| **Section 06 (Contact)** | `<span className="font-serif italic">ready for production.</span>` | Clean Space Grotesk: `<span className="text-accent font-medium">ready for production.</span>`. |
| **Footer (Terminal)** | `<span className="font-serif italic">Let's build autonomous scale.</span>` | Clean Space Grotesk: `<span className="text-accent font-medium">Let's build autonomous scale.</span>`. |

---

## 4. Atomic Rollback Protocols

### Instant Feature Flag Rollback (0 Code Changes)
To deactivate any transition without touching component code:
1. Open [`src/lib/motion-flags.ts`](file:///c:/Users/sr2ma/Downloads/profile/src/lib/motion-flags.ts).
2. Set the desired transition to `false`:
   - `HERO_TO_IDENTITY_PORTAL: false` — Removes the letter portal; page scrolls directly from Hero into Identity.
   - `IDENTITY_TO_TRAJECTORY_STACK: false` — Removes 3D card tilt and splash; sections render in standard vertical flow.
   - `TRAJECTORY_TO_SKILLS_PHOTON: false` — Deactivates shockwave pulse and WebGL cluster burst.
   - `ENABLE_CINEMATIC_SCROLL: false` — Master kill-switch reverting all experimental scroll transitions across the entire site.

### Git Anchor Rollback Commands
- **Baseline Tag**: `checkpoint/stable-baseline` (`0da12ea`)
- **Cinematic Transitions Checkpoint Tag**: `checkpoint/cinematic-transitions-complete` (`b119679`)
- **To revert entire repository to baseline**:
  ```powershell
  git checkout checkpoint/stable-baseline
  ```
- **To revert this transition batch**:
  ```powershell
  git revert b119679
  ```

---

## 5. Visual Refinements & Surface De-boxification Batch

| Area | Issue Identified | Engineering Remediation | Verification |
| :--- | :--- | :--- | :--- |
| **Hero Top Gradient** | Gloomy `rgba(11, 10, 9, 0.70)` top gradient created an abrupt dark shader bar and hard demarcation line across the 3D studio background. | Thinned to an ultra-delicate translucent obsidian feathering (`rgba(11, 10, 9, 0.32)` easing to transparent at `h-20 sm:h-24`), seamlessly matching stage lighting with zero hard lines. | Verified via `test-hero-typing-complete.png`. |
| **Hero Subtitle & Reveal** | Technical jargon ("sub-200ms"); typewriter interval leaked timers on unmount. | Updated copy to high-impact personal positioning: `"AI Systems & Autonomous Agent Engineer. Building production-grade agentic architectures, real-time voice intelligence, and scalable AI that solves real-world problems."` Typewriter interval now strictly cleaned up with robust lifecycle handling; cursor hides on completion. | Verified via `test-hero-typing-start.png` & `test-hero-typing-complete.png`. |
| **Aperture Lens Symmetry & Drift** | Badge above `AUTONOMOUS` caused a 16px vertical offset; GSAP matrix transform on `<defs><mask id="...">` `<g>` element drifted 286px off-center due to empty SVG BBox calculation in Chromium; blocking vignette at `z-30` blacked out the hole. | Centered the word row dead-center at (50% X, 50% Y) by positioning badge absolutely; eliminated SVG matrix drift by directly animating `attr: { r: targetRadius }` on `<circle cx="50%" cy="50%" r="36" />`; lowered ambient vignette so Section 01 blooms organically through the lens. | Verified via `test-zoom-02-mid.png` and `test-aperture-zoom-symmetric.png` (`isCircle: true, r: 59.53`). |
| **Aperture Section Emergence Alignment** | Section 01 was delayed until progress > 0.28, leaving the aperture opening pure black before popping in abruptly. | Aligned Section 01 emergence with the aperture expansion: starts zooming in from `scale: 0.82` and fading in at progress 0.12, staggered `.identity-reveal` children entering organically in sync with the expanding circle. | Verified via `test-zoom-02-mid.png` and `test-zoom-03-expanding.png`. |
| **Section 01 (Identity) De-boxification** | Outer card container box and chunky card tiles produced rigid "box-inside-a-box" aesthetic. | Completely eliminated outer card container box in favor of an expansive architectural stage directly on obsidian canvas; transformed metric tiles into sleek architectural stat pillars with luminous accent numbers. | Verified via `test-deboxified-identity.png` and `test-identity-scrolled.png`. |
| **Section 05 (Philosophy) De-boxification** | Outer rounded card container and 3 boxed principle cards created rigid boxy look; static `once: true` animation was disconnected from scroll rhythm. | Removed outer container card; replaced 3 boxed cards with an open architectural 3-column flow separated by elegant hairline dividers; aligned entry animation to a smooth scroll scrub tied directly to page motion. | Verified via `test-deboxified-philosophy.png`. |

---

## 6. Future Phase Animation Concepts (Experience & Skills)

1. **Section 02 (JourneyTimeline - Experience)**:
   - *Orbital Chrono-Pulse*: As each milestone arrives in the viewport, the node pulse can emit a dual-ring radar ripple along the SVG rail with a frequency keyed to the duration/recency of the role.
   - *Split-Flap Metric Counter*: Metric chips inside each role card (e.g. `100k+ users`, `<150ms`) can roll like airport split-flap mechanical displays upon card focus.
2. **Section 03 (SkillsDomain - Technologies)**:
   - *Axonal Synaptic Discharge*: When hovering a technology domain chip, send a directional laser pulse through the WebGL axon cluster connecting directly to that technology's specific node in the Three.js 3D space.
   - *Frequency Waveform Shader*: Integrate an ambient audio-reactive frequency ribbon behind the Voice AI skill cluster that subtly undulates as the user hovers over speech tools.

