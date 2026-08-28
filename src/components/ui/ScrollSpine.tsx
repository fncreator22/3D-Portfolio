"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "identity", label: "Identity" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "thinking", label: "Thinking" },
  { id: "contact", label: "Contact" },
];

export function ScrollSpine() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    SECTIONS.forEach((sec, idx) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIdx(idx),
        onEnterBack: () => setActiveIdx(idx),
      });
    });

    const spineFill = document.getElementById("spine-fill-bar");
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (spineFill) spineFill.style.height = `${self.progress * 100}%`;
      },
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-[clamp(1rem,3vw,2.6rem)] top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center">
      <div className="relative w-[1px] h-[230px] bg-line">
        <div id="spine-fill-bar" className="absolute top-0 left-0 w-full h-0 bg-accent origin-top transition-all duration-75" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[1px] flex flex-col justify-between">
          {SECTIONS.map((sec, i) => (
            <div
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`w-[7px] h-[7px] rounded-full border cursor-pointer -translate-x-[3px] relative transition-all duration-300 group ${
                activeIdx === i
                  ? "bg-accent border-accent scale-125"
                  : "bg-bg border-line hover:border-accent"
              }`}
            >
              <span
                className={`absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[0.62rem] tracking-wider uppercase whitespace-nowrap transition-opacity pointer-events-none ${
                  activeIdx === i ? "opacity-100 text-paper" : "opacity-0 group-hover:opacity-100 text-stone"
                }`}
              >
                {sec.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
