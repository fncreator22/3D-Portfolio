"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Ensure native touch scroll on mobile devices updates ScrollTrigger seamlessly
    const handleNativeScroll = () => {
      ScrollTrigger.update();
    };
    window.addEventListener("scroll", handleNativeScroll, { passive: true });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Immediate synchronous scroll for query parameter
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const scrollParam = params.get("scroll");
      if (scrollParam) {
        const el = document.getElementById(scrollParam);
        if (el) {
          window.scrollTo(0, el.offsetTop);
          lenis.scrollTo(el, { immediate: true });
        }
      }
    }

    // Refresh ScrollTrigger after initial layout settles and handle initial scroll anchor
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const scrollParam = params.get("scroll");
        const hash = window.location.hash.replace("#", "");
        const targetId = scrollParam || hash;
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            lenis.scrollTo(targetEl, { immediate: true });
          }
        }
      }
    }, 400);

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
