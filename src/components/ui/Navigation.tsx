"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/#journey", id: "journey", label: "Trajectory" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/work", id: "work", label: "Systems (12)" },
  { href: "/resume.pdf", id: "resume", label: "Resume ↗", target: "_blank" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  // Scroll listener for background blur & scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const sections = ["journey", "skills", "contact"];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              return;
            }
          }
        }
        if (window.scrollY < 400) {
          setActiveSection("");
        }
      } else if (pathname.startsWith("/work")) {
        setActiveSection("work");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      {/* ─── Skip to Main Content Link (Accessibility) ─── */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ─── Fixed Navbar ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-bg/90 border-b border-line/60 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
        role="banner"
      >
        {/* ─── Left: Logo + Status ─── */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 select-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            onClick={closeMenu}
            aria-label="Sagar Mahajan Home"
          >
            <span
              className="text-paper font-display tracking-tight leading-none font-medium"
              style={{ fontSize: "clamp(17px, 2.2vw, 22px)" }}
            >
              Sagar Mahajan<sup className="text-[0.55em] align-super text-accent">®</sup>
            </span>
            <span
              className="text-paper select-none hidden sm:inline"
              style={{ fontSize: "clamp(20px, 2.5vw, 26px)", letterSpacing: "-0.02em" }}
            >
              ✳︎
            </span>
          </Link>

          {/* Status badge */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-line font-mono text-[0.68rem] tracking-wider text-stone-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>Available for Engagements</span>
          </div>
        </div>

        {/* ─── Center / Right: Desktop Links + CTA ─── */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6" role="navigation" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                (pathname === "/" && activeSection === link.id) ||
                (pathname.startsWith("/work") && link.id === "work");

              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.target || undefined}
                  rel={link.target ? "noopener noreferrer" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-mono text-xs uppercase tracking-wider transition-colors py-1 relative group focus-visible:ring-2 focus-visible:ring-accent rounded px-1 ${
                    isActive ? "text-accent font-semibold" : "text-stone-300 hover:text-paper"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Sleek Get in Touch CTA */}
          <a
            href="/#contact"
            className="font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full bg-accent text-bg font-semibold hover:bg-accent/90 hover:shadow-[0_0_15px_rgba(193,99,59,0.3)] transition-all ml-2 focus-visible:ring-2 focus-visible:ring-paper"
          >
            Get in Touch
          </a>
        </div>

        {/* ─── Mobile: Hamburger Button ─── */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-line bg-bg-raise/90 text-paper z-50 focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-5 h-[1.5px] bg-paper transition-transform duration-300 ease-in-out ${
              mobileOpen ? "rotate-45 translate-y-[4.5px]" : "-translate-y-1"
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-paper transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-paper transition-transform duration-300 ease-in-out ${
              mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : "translate-y-1"
            }`}
          />
        </button>
      </header>

      {/* ─── Mobile Full-Screen Overlay ─── */}
      <div
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
          <span className="font-mono text-[0.68rem] tracking-widest uppercase text-accent font-semibold">
            Navigation Menu
          </span>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.target || undefined}
              rel={link.target ? "noopener noreferrer" : undefined}
              onClick={closeMenu}
              className="font-display font-medium text-3xl text-paper hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={closeMenu}
            className="font-display font-medium text-3xl text-accent"
          >
            Get in Touch →
          </a>
        </nav>

        <div className="pt-6 border-t border-line/60 flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-xs text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>Available for Engagements</span>
          </div>
          <span className="font-mono text-[0.7rem] text-stone-400">
            Hyderabad, India
          </span>
        </div>
      </div>
    </>
  );
}
