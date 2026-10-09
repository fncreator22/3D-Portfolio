# 🏛️ Architecture & Design System (DESIGN.md)

> **Sagar Mahajan Portfolio — Autonomous Systems, Voice AI & Production Architectures**  
> *Living Design Standard: Emil Kowalski Craft Philosophy, Anti-Slop Discipline, Obsidian Palette & Motion Physics.*

---

## 1. Design Philosophy & Craft Principles

This portfolio embodies **quiet engineering authority**, avoiding the generic tropes of AI web design ("AI-slop", gradient-overload cards, gratuitous floating orbs, hollow containers). Every pixel, easing curve, and surface responds to real user intent with physical weight and deterministic behavior.

### Core Tenets

1. **Anti-Slop Restraint**: If an element does not convey empirical engineering data, interactive feedback, or structural hierarchy, it is excised. No vanity metric pills or fake neural status badges.
2. **Emil Kowalski Motion Philosophy**:
   - Motion is informative, never decorative.
   - Micro-interactions feel physical, spring-damped, and interruptible (`ease: [0.25, 1, 0.5, 1]`).
   - Content expands dynamically into view rather than popping abruptly; when unhovered, it collapses cleanly without leaving hollow voids.
3. **Information Density with Breathing Room**: Technical density must never mean visual congestion. On mobile, components scale gracefully with generous negative space, ensuring zero cramped viewports.
4. **Typographic Hierarchy as Architecture**: Headlines deliver high-contrast conviction (`text-paper`), while secondary lines, technical metrics, and collapsible bullet points strictly adopt muted secondary values (`text-stone-400` / `text-stone`) to establish instant visual hierarchy.

---

## 2. Color System & Semantic Tokens

The visual foundation is built on an **Obsidian & Terracotta** atmospheric palette. The dark tones are deep and organic (#0b0a09) rather than synthetic pure pitch black (#000000), reducing eye fatigue and giving depth to Three.js particle lighting.

| Token | Hex / Value | Semantic Role | Usage Rules |
| :--- | :--- | :--- | :--- |
| `bg` | `#0b0a09` | Deepest canvas background | Base layer for all pages, scrims, and backdrop cutouts. |
| `bg-raise` | `#141311` | Elevated surface base | Card containers, navigation docks, and modals. |
| `bg-glass` | `rgba(255,255,255,0.035)` | Specular frosted surface | Backdrop blur overlays and subtle pill backgrounds. |
| `paper` | `#efe9df` | High-contrast text / Title | Primary headings (`h1`, `h2`, `h3`), active tabs, and emphasized titles. |
| `stone-400` | `#a8a29e` | Secondary text & details | **Mandatory** for collapsible project card bullet points and sub-details. |
| `stone` | `#8c8577` | Muted captions & metadata | Eyebrows, timestamps, non-interactive indicators, and subtle dividers. |
| `line` | `#2a2822` | Structural borders | Card perimeters, horizontal rules, and grid lines. Never exceeds 1px. |
| `accent` | `#c1633b` | Terracotta warm core | Interactive hover targets, active states, bullet markers, and primary CTAs. |
| `accent-dim` | `#6e3c26` | Low-luminance accent | Secondary border glows, muted track states. |
| `accent-glow`| `rgba(193,99,59,0.20)` | Atmosphere diffusion | Radial ambient lights behind avatar and active project cards. |
| `cool` | `#6b6fb0` | Cyber perimeter / Secondary | Three.js outer field particles, secondary tags. |

### Strict Rule on Font Color Contrast
- **Headline/Title**: Always rendered in `text-paper` (`#efe9df`) with `font-display`.
- **Secondary Points / Collapsible Details**: **Never** rendered in `text-paper`. Always rendered in `text-stone-400` (`#a8a29e`) or `text-paper/70`. This prevents text bloat and immediately communicates that the bullet points are supplementary technical evidence.

---

## 3. Typography Hierarchy

| Role | Font Family | Tailwind Class | Weight | Tracking & Leading |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Space Grotesk | `font-display text-[clamp(1.75rem,5.2vw,3.8rem)]` | Medium (500) | `tracking-[-0.02em] leading-[1.08]` |
| **Section Head** | Space Grotesk | `font-display text-[clamp(1.5rem,3.2vw,2.6rem)]` | Medium (500) | `tracking-[-0.01em] leading-tight` |
| **Card Title** | Space Grotesk | `font-display text-xl sm:text-2xl` | Medium (500) | `leading-snug` |
| **Editorial Serif** | Fraunces (Italic) | `font-serif italic font-normal text-accent` | Regular (400) | Optical flourish within headings |
| **Eyebrow / Code** | Geist Mono | `font-mono text-[0.66rem] sm:text-xs uppercase` | Semibold (600) | `tracking-widest` |
| **Secondary Bullet**| Geist / Sans | `font-body text-xs sm:text-[0.78rem] text-stone-400` | Light (300) | `leading-snug` |

---

## 4. Component System: Project Cards & Surfaces

### `WorkflowBuilderCard` Architecture
The flagship horizontal project rail uses `WorkflowBuilderCard` with interactive expansion physics.

```
┌────────────────────────────────────────────────────────┐
│  [05 / 16]              [MULTIMODAL AI & MEDIA] (Badge)│
│  [ Preview Image (h-44 sm:h-48) with Vignette ]        │
├────────────────────────────────────────────────────────┤
│  CampaignCraft (font-display text-xl sm:text-2xl)      │
│  ────────────────────────────────────────────────────  │  <-- Border divider (pt-2.5)
│  • Sub-120ms multi-agent campaign pipeline            │  <-- Collapsible Detail
│  • Autonomous tool calling with real-time audit        │      (text-stone-400)
│  [Next.js] [FastAPI] [Gemini]                          │  <-- Muted tech tags
├────────────────────────────────────────────────────────┤
│  View Case Study →                         Code ↗ Live ↗│
└────────────────────────────────────────────────────────┘
```

#### Spread Physics (`AnimatePresence` & Framer Motion):
- **Desktop (>= 1024px)**:
  - Resting State: Displays clean preview image, category/index pills, single title (`title.split(':')[0].trim()`), and interactive footer links.
  - Hover / Spread State (`isHovered = true`):
    - Card lifts gently: `whileHover={{ y: -6 }}` with `duration: 0.28, ease: [0.25, 1, 0.5, 1]`.
    - Collapsible section animates via `detailVariants`:
      - `hidden`: `{ opacity: 0, height: 0, marginTop: 0 }`
      - `visible`: `{ opacity: 1, height: "auto", marginTop: "0.75rem" }` (300ms ease-out)
    - Content displayed: Exactly 1 or 2 concise empirical metrics or bullet points (`displayPoints.slice(0, 2)`), styled in `text-stone-400`.
- **Mobile (< 1024px)**:
  - Bullet points and tech tags are permanently mounted under a subtle divider (`border-line/40`).
  - **No hollow voids**: Mobile users swiping horizontally immediately see both the headline and the 1–2 key highlights without requiring hover capability.

---

## 5. Mobile Ergonomics & Decongestion Standard

Mobile devices (viewport `< 1024px`) require strict spatial rules to prevent cramping:

1. **Zero Protruding HUD Badges**:
   - Banned floating capsules that collide with touch action buttons (e.g. the removed `18,488 NEURAL NODES · SYNCED` badge).
   - The 3D avatar canvas sits inside a clean self-contained rounded capsule (`rounded-[24px] sm:rounded-[28px]`) with no awkward overhanging pills.
2. **Proportional Canvas Sizing**:
   - Desktop: Hero avatar video renders on the right column (`lg:block`).
   - Mobile: 3D particle canvas is calibrated to `w-[min(260px,68vw)] sm:w-[min(290px,72vw)]` with `my-3.5 sm:my-5`. This guarantees that action buttons (`Explore 16 Systems`, `Get in Touch`, `Resume`) remain comfortably in view.
3. **Balanced Vertical Rhythm**:
   - Hero container top padding calibrated to `pt-20 sm:pt-28 lg:pt-32` so phones under 400px height do not push key actions below the fold.
   - Spacing between headline and body copy is maintained at `mb-2.5 sm:mb-3.5`.
4. **Touch Target Standard**:
   - All interactive elements (CTA buttons, flagship chips, drawer links) provide at least 44×44px interactive tap area.
   - Category filter pills horizontally scroll without scrollbar friction (`no-scrollbar`).

---

## 6. Motion & Scroll Architecture

1. **GSAP ScrollTrigger Horizontal Pinning**:
   - Pinned carousel container: `h-[100svh] min-h-[580px] lg:min-h-[700px]`.
   - Desktop and Mobile both use `gsap.matchMedia()` for horizontal scroll translation (`x: -getScrollDistance()`).
   - Scrub smoothing: `scrub: 0.8` with `anticipatePin: 1` to prevent layout jumps.
2. **Zero-Dark-Dip Video Engine (Desktop Hero)**:
   - Three-scene state machine (`intro` -> `idle` -> `talk`).
   - Idle layer sits perpetually loaded at `z-[1]`.
   - Intro and Talk layers dissolve smoothly over Idle with frame-precision `handleIntroTimeUpdate` (9.90s threshold).
   - Audio toggles on user interaction anywhere on the desktop hero stage.
3. **Three.js WebGL Particle Kinematics**:
   - 10,480 particles running on GPU shader point sprites.
   - Additive blending (`THREE.AdditiveBlending`) with depth write disabled (`depthWrite: false`).
   - Harmonic resting wave equation: `sin(t * 2.2 + x * 3.0 + y * 2.5) * 0.018`.
   - Pointer kinematics with lerped spring response: `mouse.x += (targetX - mouse.x) * 0.08`.

---

## 7. Craft-Floor Anti-Patterns (Quality Checklist)

- ❌ **No Empty Card Voids**: Never strip card details while leaving fixed-height flex containers with `justify-center`. Cards must either be compact or display their points.
- ❌ **No Clashing Headline / Body Tones**: Never set secondary bullet points to `text-paper`. The primary product title must clearly stand out from supporting text.
- ❌ **No Extraneous Decorative Status Badges**: Do not add repetitive `• PRODUCTION` or `• ACTIVE` pills when the category badge already defines the domain.
- ❌ **No Mobile Viewport Cramming**: Never stack oversized canvases, protruding pill badges, and 3 rows of action buttons in under 600px of vertical height.
- ❌ **No Unsound Layout Shift**: Dynamic card expansion must use Framer Motion `layout` and `AnimatePresence` to prevent jumping adjacent elements.
