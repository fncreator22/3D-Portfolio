import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0a09",
        "bg-raise": "#141311",
        "bg-glass": "rgba(255,255,255,0.035)",
        paper: "#efe9df",
        stone: "#8c8577",
        line: "#2a2822",
        accent: "#c1633b",
        "accent-dim": "#6e3c26",
        "accent-glow": "rgba(193,99,59,0.20)",
        cool: "#6b6fb0",
        "cool-glow": "rgba(107,111,176,0.16)",
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;