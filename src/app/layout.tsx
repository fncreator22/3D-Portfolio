import type { Metadata } from "next";
import { Space_Grotesk, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Navigation } from "@/components/ui/Navigation";
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
    <html lang="en" className={`${spaceGrotesk.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-bg text-paper antialiased relative selection:bg-accent selection:text-bg">
        <SmoothScroll>
          <AuroraBackground />
          <CursorSpotlight />
          <Navigation />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
