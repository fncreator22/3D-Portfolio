/**
 * Motion & Scroll Transition Feature Flag Registry
 * 
 * Provides atomic zero-breakdown controls over all cinematic scroll transitions.
 * Any single transition can be toggled to false to instantly revert that section
 * to its standard resting layout with zero risk to page scrollability.
 */

export const MOTION_CONFIG = {
  // Master switch: if false, page immediately runs on original standard layout
  ENABLE_CINEMATIC_SCROLL: true,

  // Granular per-section transition toggles:
  TRANSITIONS: {
    HERO_TO_IDENTITY_PORTAL: true,      // T1: Typographic Aperture Portal (Letter 'O' Zoom Mask)
    IDENTITY_TO_TRAJECTORY_STACK: true,  // T2: 3D Card Deck Stacking & Card Splash
    TRAJECTORY_TO_SKILLS_PHOTON: true,   // T3: Laser Photon Shockwave into WebGL Synaptic Cloud
    SKILLS_TO_PROJECTS_PIVOT: true,      // T4: Pinned Horizontal Rail Pivot (Active)
    PROJECTS_TO_PHILOSOPHY_BLADE: true,  // T5: Kinetic Typography Scrub (Active)
    FOOTER_CURTAIN_REVEAL: true,         // T6: Obsidian Curtain Reveal Footer (Active)
  },

  // Performance & Accessibility Controls
  PERFORMANCE: {
    MOBILE_MAX_PARTICLES: 6000,
    REDUCE_MOTION_FALLBACK: true, // Automatically disable intensive scrub when prefers-reduced-motion is true
  },
};

/**
 * Helper to check if a specific transition is enabled and safe for the user's environment
 */
export function isTransitionEnabled(
  transitionKey: keyof typeof MOTION_CONFIG.TRANSITIONS
): boolean {
  if (!MOTION_CONFIG.ENABLE_CINEMATIC_SCROLL) return false;
  if (!MOTION_CONFIG.TRANSITIONS[transitionKey]) return false;

  if (typeof window !== "undefined" && MOTION_CONFIG.PERFORMANCE.REDUCE_MOTION_FALLBACK) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return false;
  }

  return true;
}
