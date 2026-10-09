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
| **T1** | **Hero → Identity** | **Typographic Aperture Portal**: Keyword `AUTONOMOUS` pins; outer letters disperse horizontally; focal letter `O` expands 28× (18× on mobile) as an SVG/lens aperture; dark radial shader vignette closes in from all 4 edges; Section 01 reveals from within the letter counter. | [`LetterPortalTransition.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/effects/LetterPortalTransition.tsx), [`page.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/app/page.tsx) | `HERO_TO_IDENTITY_PORTAL` | **Verified** (Zero scroll-lock traps, 60fps GPU rasterization) |
| **T2** | **Identity → Trajectory** | **3D Card Deck Stacking & Card Splash**: Section 01 (Identity) and Section 02 (Trajectory) are wrapped in elevated architectural card containers (`perspective: 1200px`). As user scrolls, Identity scales to `0.94` and tilts `3.5°` on `rotateX`; Trajectory splashes upward from below (`y: 65px -> 0px`, `rotateX: -3.5° -> 0°`, `scale: 0.96 -> 1.0`). | [`Identity.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/Identity.tsx), [`JourneyTimeline.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/JourneyTimeline.tsx) | `IDENTITY_TO_TRAJECTORY_STACK` | **Verified** (Physical obsidian deck feel, smooth handoff) |
| **T3** | **Trajectory → Skills** | **Traveling Photon Shockwave to WebGL Cloud**: When the 3D glowing laser rail (`#role-fill-line`) hits 100% completion at Role 04, a radial photon burst (`#trajectory-shockwave-pulse`) ignites at the rail terminus, dispatching a custom event that excites the Three.js particle cluster in Section 03 with radial wave dispersion and axon line flaring. | [`JourneyTimeline.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/JourneyTimeline.tsx), [`SkillsDomain.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/SkillsDomain.tsx) | `TRAJECTORY_TO_SKILLS_PHOTON` | **Verified** (Seamless narrative: Career timeline ignites technical matrix) |
| **T4** | **Skills → Projects** | **Pinned 90° Axis Pivot & Framer Motion Spread**: Vertical page scroll locks via GSAP ScrollTrigger pinning; horizontal projects carousel translates across X-axis; dynamic collapsible card spread on desktop hover with secondary `text-stone-400` details. | [`HorizontalProjects.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/HorizontalProjects.tsx), [`workflow-builder-card.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/ui/workflow-builder-card.tsx) | `SKILLS_TO_PROJECTS_PIVOT` | **Verified & Preserved** |
| **T5** | **Projects → Philosophy** | **Kinetic Typography Scrub & Space Grotesk 500**: Clean editorial typography (replacing italic serif wall of text) with dual-tone word scrub; key conviction terms illuminate in terracotta. | [`ThinkingPhilosophy.tsx`](file:///c:/Users/sr2ma/Downloads/profile/src/components/sections/ThinkingPhilosophy.tsx) | `PROJECTS_TO_PHILOSOPHY_BLADE` | **Verified** (High-conviction, anti-slop) |
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
- **To revert entire repository to baseline**:
  ```powershell
  git checkout checkpoint/stable-baseline
  ```
- **To revert a specific transition commit**:
  ```powershell
  git revert <commit-hash>
  ```
