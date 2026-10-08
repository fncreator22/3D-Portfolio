import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Navigation } from "@/components/ui/Navigation";
import { ScrollSpine } from "@/components/ui/ScrollSpine";
import { Footer } from "@/components/ui/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0a09" },
    { media: "(prefers-color-scheme: light)", color: "#0b0a09" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sagarmahajan.cloud"),
  title: "Sagar Mahajan | AI Engineer",
  description: "Agentic AI, autonomous voice agents, LLM guardrails, and full-stack engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/images/hero-poster.webp" type="image/webp" />
        <link rel="preload" as="video" href="/videos/hero.mp4" type="video/mp4" />
      </head>
      <body
        suppressHydrationWarning
        className="bg-bg text-paper antialiased relative selection:bg-accent selection:text-bg"
      >
        <SmoothScroll>
          <AuroraBackground />
          <CursorSpotlight />
          <ScrollSpine />
          <Navigation />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
