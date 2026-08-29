"use client";

import React from "react";

interface TechLogoProps {
  name: string;
  className?: string;
  showName?: boolean;
}

export function TechLogo({ name, className = "w-4 h-4", showName = true }: TechLogoProps) {
  const norm = name.toLowerCase().trim();

  // Return SVG icon based on tech name
  const renderIcon = () => {
    if (norm.includes("python")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M11.9 2C6.7 2 7.1 4.3 7.1 4.3l.01 2.3h4.9v.7H5.2S2 7 2 12.2c0 5.3 2.8 5.1 2.8 5.1h1.7v-2.4s-.1-2.8 2.8-2.8h4.8s2.7.1 2.7-2.6V4.7s.4-2.7-4.9-2.7zm-2.7 1.6a1 1 0 110 2 1 1 0 010-2z" fill="#3884ff"/>
          <path d="M12.1 22c5.2 0 4.8-2.3 4.8-2.3l-.01-2.3h-4.9v-.7h6.8s3.2.3 3.2-4.9c0-5.3-2.8-5.1-2.8-5.1h-1.7v2.4s.1 2.8-2.8 2.8H9.9s-2.7-.1-2.7 2.6v4.8s-.4 2.7 4.9 2.7zm2.7-1.6a1 1 0 110-2 1 1 0 010 2z" fill="#FFD438"/>
        </svg>
      );
    }
    if (norm.includes("typescript") || norm.includes("ts")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <path d="M11.5 10H6v2.2h2.1V19h2.7v-6.8h2.1V10h-1.4zm4.8 4.7c0-.8.4-1.3 1.1-1.7.7-.4 1.7-.7 3-.8 0-.4-.1-.7-.4-.9-.3-.2-.7-.3-1.3-.3-.6 0-1.1.1-1.6.4-.5.3-.8.7-.9 1.2h-2.5c.1-.9.5-1.7 1.2-2.3.7-.6 1.7-.9 3-.9 1.4 0 2.5.3 3.2 1 .7.6 1.1 1.6 1.1 2.8V19h-2.4v-1.1c-.4.4-.8.7-1.3.9-.5.2-1.1.3-1.8.3-.9 0-1.7-.2-2.3-.7-.6-.6-.9-1.2-.9-2.1zm5.2.3c0-.4-.2-.7-.5-.9-.3-.2-.8-.4-1.5-.4-.6 0-1.1.1-1.4.3-.3.2-.4.5-.4.8 0 .3.1.6.4.8.3.2.8.3 1.4.3.7 0 1.2-.2 1.6-.4.3-.1.4-.3.4-.5z" fill="#FFFFFF"/>
        </svg>
      );
    }
    if (norm.includes("javascript") || norm.includes("js")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
          <path d="M7 16.5c.4.7 1 1.2 2 1.2 1 0 1.6-.5 1.6-1.5v-6.2h2.5v6.3c0 2.2-1.3 3.2-3.6 3.2-1.9 0-3-1-3.5-2.2l1-.8zm8.2-.2c.5.8 1.3 1.4 2.5 1.4 1.1 0 1.8-.6 1.8-1.3 0-.9-.7-1.2-2-1.8-1.7-.7-2.8-1.4-2.8-3.1 0-1.7 1.3-3 3.3-3 1.4 0 2.5.5 3.2 1.8l-1.9 1.2c-.4-.7-.9-1-1.4-1-.6 0-1 .4-1 .9 0 .6.4.9 1.5 1.3 1.9.8 3.3 1.6 3.3 3.5 0 2-1.6 3.2-3.8 3.2-2.1 0-3.4-1-4.1-2.4l2.4-1.2z" fill="#000000"/>
        </svg>
      );
    }
    if (norm.includes("react")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)"/>
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB"/>
        </svg>
      );
    }
    if (norm.includes("next")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#000000" stroke="#FFFFFF" strokeWidth="1.2"/>
          <path d="M8 8v8h2.2v-5.2l6.2 5.2H18V8h-2.2v5.2L9.6 8H8z" fill="#FFFFFF"/>
        </svg>
      );
    }
    if (norm.includes("fastapi")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#059669"/>
          <path d="M13 3L6 14h5l-1 7 7-11h-5l1-7z" fill="#FFFFFF"/>
        </svg>
      );
    }
    if (norm.includes("flask")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M9 3h6v2H9V3zm1 3h4l5 12c.5 1.2-.4 2.5-1.7 2.5H6.7C5.4 20.5 4.5 19.2 5 18l5-12z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="15" r="1.5" fill="#c1633b"/>
        </svg>
      );
    }
    if (norm.includes("tailwind")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M6 8c2.5-3 6.5-2 8.5.5s4 3 6.5 1.5c-1 3.5-5 4.5-7.5 3s-4.5-3.5-7.5-5zm-3 6c2.5-3 6.5-2 8.5.5s4 3 6.5 1.5c-1 3.5-5 4.5-7.5 3s-4.5-3.5-7.5-5z" fill="#38BDF8"/>
        </svg>
      );
    }
    if (norm.includes("supabase")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M12.9 2.5c-.5-.7-1.6-.4-1.7.5l-1.9 10h8.2c1 0 1.5 1.1.9 1.8l-9.2 10.3c-.6.7-1.7.3-1.6-.6l1.8-10.2H3.8c-1 0-1.5-1.1-.9-1.8L12.9 2.5z" fill="#3ECF8E"/>
        </svg>
      );
    }
    if (norm.includes("postgres") || norm.includes("sql") || norm.includes("plpgsql")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.4 9.2.5.1.7-.2.7-.5v-1.8c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.5 0-1 .3-1.8.9-2.5-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7.9 1.5.9 2.5 0 3.5-2.1 4.3-4.1 4.5.3.3.6.9.6 1.8V21c0 .3.2.6.7.5 3.8-1.4 6.4-5 6.4-9.2 0-5.5-4.5-10-10-10z" fill="#4169E1"/>
        </svg>
      );
    }
    if (norm.includes("mongo")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M12 2S6 7.5 6 13.5c0 4.5 3.5 7.5 6 8.5 2.5-1 6-4 6-8.5C18 7.5 12 2 12 2zm-.5 18v-8.5c0-1.5.5-3 1-4 .5 1 1 2.5 1 4V20c-.7.2-1.3.2-2 0z" fill="#47A248"/>
        </svg>
      );
    }
    if (norm.includes("docker")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M3 13.5h2.5V11H3v2.5zm3.5 0H9V11H6.5v2.5zm3.5 0h2.5V11H10v2.5zm3.5 0H16V11h-2.5v2.5zm-7-3.5H9V7.5H6.5V10zm3.5 0h2.5V7.5H10V10zm3.5 0H16V7.5h-2.5V10zm3.5 3.5H19.5V11H17v2.5zM22 13c-.3-.2-1.2-.5-2.2-.2-1.2.3-1.8.8-1.8.8-.5-.8-1.3-1.2-2.2-1.4v-.7H2v4c0 3.3 2.7 6 6 6 5.5 0 9.8-3.4 11-7.2 1.3-.1 2.4-.7 3-1.3z" fill="#2496ED"/>
        </svg>
      );
    }
    if (norm.includes("redis")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M2.5 13l9.5 5 9.5-5-9.5-5-9.5 5z" fill="#DC382D"/>
          <path d="M2.5 16l9.5 5 9.5-5-9.5-5-9.5 5z" fill="#A82820"/>
          <path d="M2.5 10l9.5 5 9.5-5-9.5-5-9.5 5z" fill="#FF4438"/>
        </svg>
      );
    }
    if (norm.includes("ollama")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="1.5"/>
          <circle cx="9" cy="10" r="1.5" fill="#FFFFFF"/>
          <circle cx="15" cy="10" r="1.5" fill="#FFFFFF"/>
          <path d="M9 15c1 1.2 3 1.2 4 0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    }
    if (norm.includes("gemini")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" fill="url(#gemini-grad)"/>
          <defs>
            <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1BA1E3"/>
              <stop offset="0.5" stopColor="#5468FF"/>
              <stop offset="1" stopColor="#C448FF"/>
            </linearGradient>
          </defs>
        </svg>
      );
    }
    if (norm.includes("gpt") || norm.includes("openai") || norm.includes("whisper")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M20.5 10.5a5.5 5.5 0 00-.5-4.2 5.5 5.5 0 00-4.2-2.8 5.6 5.6 0 00-5.6 1.8 5.5 5.5 0 00-4.3 2.1 5.5 5.5 0 00-1.8 5.6 5.5 5.5 0 00.5 4.2 5.5 5.5 0 004.2 2.8 5.6 5.6 0 005.6-1.8 5.5 5.5 0 004.3-2.1 5.5 5.5 0 001.8-5.6z" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2.5" fill="#10A37F"/>
        </svg>
      );
    }
    if (norm.includes("mcp") || norm.includes("protocol")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#c1633b" strokeWidth="1.5"/>
          <path d="M7 12h10M12 7v10" stroke="#c1633b" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill="#f3c892"/>
        </svg>
      );
    }
    if (norm.includes("playwright")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="9" cy="12" r="6" stroke="#2EAD33" strokeWidth="1.5"/>
          <circle cx="15" cy="12" r="6" stroke="#E63946" strokeWidth="1.5"/>
        </svg>
      );
    }
    if (norm.includes("opencv") || norm.includes("vision") || norm.includes("yolo")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#5C3BFF" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="4" fill="#c1633b"/>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    }
    if (norm.includes("cloudflare")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M18.5 15.5a3.5 3.5 0 00-6.8-1.2 5 5 0 00-8.7 3.2c0 .3 0 .7.1 1h15.4c1.1 0 2-.9 2-2 0-.4-.1-.7-.3-1z" fill="#F38020"/>
          <path d="M19.8 12.3a4.5 4.5 0 00-8.5-1.5 5.5 5.5 0 00-6.8 4.7H19.8z" fill="#FAAE40"/>
        </svg>
      );
    }
    if (norm.includes("vapi") || norm.includes("voice") || norm.includes("audio")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" fill="#8B5CF6"/>
          <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3M8 22h8" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (norm.includes("n8n")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#EA4B71"/>
          <circle cx="8" cy="12" r="2.5" fill="#FFFFFF"/>
          <circle cx="16" cy="8" r="2.5" fill="#FFFFFF"/>
          <circle cx="16" cy="16" r="2.5" fill="#FFFFFF"/>
          <path d="M8 12l8-4M8 12l8 4" stroke="#FFFFFF" strokeWidth="1.5"/>
        </svg>
      );
    }
    if (norm.includes("razorpay")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M14.5 3L8 14h5l-2 7 8-11h-5l2-7z" fill="#0C2340"/>
          <path d="M12 2l-6 10h4.5L9 20l7-10h-4.5L13 2z" fill="#0284C7"/>
        </svg>
      );
    }

    // Default Tech Node Badge
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
      </svg>
    );
  };

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-raise/95 border border-line/90 hover:border-accent/70 hover:shadow-[0_0_16px_rgba(193,99,59,0.22)] transition-all font-mono text-xs text-paper font-medium group select-none">
      <span className="flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
        {renderIcon()}
      </span>
      {showName && <span className="tracking-wide text-[#f6f4ee]">{name}</span>}
    </span>
  );
}
