"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const DIRECTIONS = [
  { id: "center", file: "/images/center.jpg", label: "Focusing · Center" },
  { id: "up", file: "/images/up.jpg", label: "Tracking · Up" },
  { id: "down", file: "/images/down.jpg", label: "Tracking · Down" },
  { id: "left", file: "/images/left.jpg", label: "Turned · Left" },
  { id: "right", file: "/images/right.jpg", label: "Turned · Right" },
  { id: "top_left", file: "/images/top_left.jpg", label: "Tracking · Top-Left" },
  { id: "top_right", file: "/images/top_right.jpg", label: "Tracking · Top-Right" },
  { id: "eye_left", file: "/images/eye_left.jpg", label: "Glancing · Left" },
  { id: "eye_right", file: "/images/eye_right.jpg", label: "Glancing · Right" },
];

export function AvatarGazeTracker() {
  const [activeDir, setActiveDir] = useState("center");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preload images
    DIRECTIONS.forEach((d) => {
      const img = new window.Image();
      img.src = d.file;
    });

    const handlePointerMove = (e: PointerEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      // 3D Parallax Tilt
      const rotX = Math.max(-14, Math.min(14, -dy * 14));
      const rotY = Math.max(-14, Math.min(14, dx * 14));
      cardRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;

      // Direction Classifier
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (absX < 0.16 && absY < 0.16) {
        setActiveDir("center");
      } else if (dy < -0.45 && absX < 0.35) {
        setActiveDir("up");
      } else if (dy > 0.40 && absX < 0.40) {
        setActiveDir("down");
      } else if (dx < -0.40 && dy < -0.20) {
        setActiveDir("top_left");
      } else if (dx > 0.40 && dy < -0.20) {
        setActiveDir("top_right");
      } else if (dx < -0.50) {
        setActiveDir("left");
      } else if (dx > 0.50) {
        setActiveDir("right");
      } else if (dx < -0.16 && absY < 0.40) {
        setActiveDir("eye_left");
      } else if (dx > 0.16 && absY < 0.40) {
        setActiveDir("eye_right");
      } else if (dy < -0.25) {
        setActiveDir("up");
      } else if (dy > 0.25) {
        setActiveDir("down");
      } else {
        setActiveDir("center");
      }
    };

    const handlePointerLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      setActiveDir("center");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const currentLabel = DIRECTIONS.find((d) => d.id === activeDir)?.label || "Active";

  return (
    <div className="flex justify-center items-center [perspective:1200px]">
      <div
        ref={cardRef}
        className="relative w-[min(340px,82vw)] aspect-square rounded-[28px] p-2.5 bg-[radial-gradient(circle_at_50%_30%,rgba(193,99,59,0.22),#141311_70%)] border border-accent/35 shadow-[0_24px_60px_rgba(0,0,0,0.75),0_0_45px_rgba(193,99,59,0.2)] transition-[transform,box-shadow] duration-150 ease-out hover:shadow-[0_34px_80px_rgba(0,0,0,0.9),0_0_65px_rgba(193,99,59,0.3)] select-none cursor-pointer [transform-style:preserve-3d]"
      >
        <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-bg [transform:translateZ(35px)]">
          {DIRECTIONS.map((dir) => (
            <img
              key={dir.id}
              src={dir.file}
              alt={`Sagar Mahajan ${dir.id}`}
              className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-200 ease-out ${
                activeDir === dir.id ? "opacity-100 z-10 scale-[1.02]" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>

        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 [transform:translateX(-50%)_translateZ(50px)] bg-bg/95 backdrop-blur-md border border-accent px-4 py-1.5 rounded-full font-mono text-[0.65rem] tracking-[0.1em] uppercase text-paper flex items-center gap-2 whitespace-nowrap shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
          <span>{currentLabel}</span>
        </div>
      </div>
    </div>
  );
}
