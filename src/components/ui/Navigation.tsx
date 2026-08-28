"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#journey", label: "Journey" },
  { href: "/#skills", label: "Skills" },
  { href: "/work", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      {/* ─── Fixed Navbar ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-bg/90 border-b border-line/60 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        {/* ─── Left: Logo + Status ─── */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 select-none"
            onClick={closeMenu}
          >
            <span
              className="text-paper font-display tracking-tight leading-none"
              style={{ fontSize: "clamp(17px, 2.2vw, 22px)" }}
            >
              Sagar Mahajan<sup className="text-[0.55em] align-super">®</sup>
            </span>
            <span
              className="text-paper select-none hidden sm:inline"
              style={{ fontSize: "clamp(20px, 2.5vw, 26px)", letterSpacing: "-0.02em" }}
            >
              ✳︎
            </span>
          </Link>

          {/* Live Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="font-mono text-[0.58rem] tracking-[0.12em] uppercase text-emerald-400 whitespace-nowrap">
              Available for Roles
            </span>
          </div>
        </div>

        {/* ─── Center: Desktop Nav Links (comma-separated) ─── */}
        <nav className="hidden md:flex items-center" aria-label="Main navigation">
          <span className="font-body text-paper/75" style={{ fontSize: "clamp(15px, 1.6vw, 20px)" }}>
            {NAV_LINKS.map((link, i) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="hover:opacity-50 transition-opacity duration-200"
                >
                  {link.label}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span className="text-paper/40 select-none">, </span>
                )}
              </React.Fragment>
            ))}
          </span>
        </nav>

        {/* ─── Right: Get in touch + Hamburger ─── */}
        <div className="flex items-center gap-5">
          <Link
            href="/#contact"
            className="hidden md:block font-body text-paper hover:opacity-50 transition-opacity duration-200 underline underline-offset-2"
            style={{ fontSize: "clamp(15px, 1.6vw, 20px)" }}
          >
            Get in touch
          </Link>

          {/* Hamburger Button (mobile) */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 items-center"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span
              className="w-6 h-[2px] bg-paper block transition-all duration-300 origin-center"
              style={{
                transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="w-6 h-[2px] bg-paper block transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="w-6 h-[2px] bg-paper block transition-all duration-300 origin-center"
              style={{
                transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* ─── Mobile Full-Screen Overlay ─── */}
      <div
        className="fixed inset-0 z-40 md:hidden bg-bg/95 backdrop-blur-xl flex flex-col justify-center px-8 gap-8 transition-opacity duration-300"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        {/* Mobile Nav Links */}
        <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="font-body font-medium text-paper hover:opacity-50 transition-opacity duration-200"
              style={{ fontSize: "clamp(28px, 8vw, 36px)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={closeMenu}
            className="font-body font-medium text-paper underline underline-offset-4 hover:opacity-50 transition-opacity duration-200"
            style={{ fontSize: "clamp(28px, 8vw, 36px)" }}
          >
            Get in touch
          </Link>
        </nav>

        {/* Status in Mobile Overlay */}
        <div className="flex items-center gap-2 mt-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-emerald-400">
            Available for Roles
          </span>
        </div>
      </div>
    </>
  );
}
