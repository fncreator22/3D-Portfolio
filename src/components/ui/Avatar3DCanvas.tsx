"use client";

import React, { useEffect, useRef, useState } from "react";

export function Avatar3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [statusText, setStatusText] = useState("3D Neural HUD · Interactive");
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load master avatar image
    const img = new window.Image();
    img.src = "/images/center.jpg";

    let animationFrameId: number;
    let width = (canvas.width = 400);
    let height = (canvas.height = 400);

    // Target and current interpolated coordinates (Smooth Lerp)
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let time = 0;

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      setIsInteracting(true);
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : (e as PointerEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as PointerEvent).clientY;

      const normX = (clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const normY = (clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);

      mouse.targetX = Math.max(-1, Math.min(1, normX));
      mouse.targetY = Math.max(-1, Math.min(1, normY));

      // Update HUD status based on tracking
      if (Math.abs(normX) < 0.15 && Math.abs(normY) < 0.15) {
        setStatusText("3D Depth · Direct Focus");
      } else if (normX > 0.3) {
        setStatusText("3D Depth · Tracking Right");
      } else if (normX < -0.3) {
        setStatusText("3D Depth · Tracking Left");
      } else if (normY < -0.3) {
        setStatusText("3D Depth · Tracking Up");
      } else {
        setStatusText("3D Depth · Tracking Down");
      }
    };

    const handlePointerLeave = () => {
      setIsInteracting(false);
      mouse.targetX = 0;
      mouse.targetY = 0;
      setStatusText("3D Neural HUD · Idle Float");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerLeave);

    // Render loop with continuous fluid interpolation (Lerp)
    const render = () => {
      time += 0.03;

      // Smooth dampening factor
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Ambient idle breathing float
      const idleTiltX = Math.sin(time * 0.8) * 0.04;
      const idleTiltY = Math.cos(time * 0.6) * 0.04;
      const currentX = mouse.x + idleTiltX;
      const currentY = mouse.y + idleTiltY;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Sound-Reactive Ambient Pulse Halo around Headphones
      const haloRadius = 160 + Math.sin(time * 2) * 4 + (isInteracting ? 8 : 0);
      const haloGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        haloRadius - 20,
        width / 2,
        height / 2,
        haloRadius + 40
      );
      haloGrad.addColorStop(0, "rgba(193, 99, 59, 0.28)");
      haloGrad.addColorStop(0.6, "rgba(107, 111, 176, 0.14)");
      haloGrad.addColorStop(1, "transparent");

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, haloRadius + 30, 0, Math.PI * 2);
      ctx.fill();

      // 2. Multi-layer depth projection with continuous perspective warp
      if (img.complete && img.naturalWidth > 0) {
        ctx.save();
        
        // Center transformation
        ctx.translate(width / 2, height / 2);

        // Continuous subtle 3D translation & shearing
        const shiftX = currentX * 16;
        const shiftY = currentY * 16;
        ctx.translate(shiftX, shiftY);

        // Circular clipping mask with soft edge
        ctx.beginPath();
        ctx.arc(0, 0, 168, 0, Math.PI * 2);
        ctx.clip();

        // Draw master portrait with sub-pixel depth scale
        ctx.drawImage(img, -180, -180, 360, 360);

        // 3. Dynamic Specular Light Reflection on Aviator Glasses & Headphone Rim
        const lightX = -currentX * 120;
        const lightY = -currentY * 120;
        const specGrad = ctx.createRadialGradient(
          lightX,
          lightY,
          10,
          lightX,
          lightY,
          140
        );
        specGrad.addColorStop(0, "rgba(255, 255, 255, 0.22)");
        specGrad.addColorStop(0.5, "rgba(193, 99, 59, 0.12)");
        specGrad.addColorStop(1, "transparent");

        ctx.fillStyle = specGrad;
        ctx.fillRect(-180, -180, 360, 360);

        ctx.restore();
      }

      // 4. Physical 3D tilt on card container
      const rotX = -currentY * 14;
      const rotY = currentX * 14;
      container.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${isInteracting ? 1.025 : 1})`;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerLeave);
    };
  }, [isInteracting]);

  return (
    <div className="flex justify-center items-center [perspective:1200px] w-full">
      <div
        ref={containerRef}
        className="relative w-[min(340px,80vw)] sm:w-[320px] lg:w-[340px] aspect-square rounded-[32px] p-2.5 bg-[radial-gradient(circle_at_50%_30%,rgba(193,99,59,0.25),#141311_70%)] border border-accent/40 shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_45px_rgba(193,99,59,0.22)] transition-[box-shadow] duration-300 ease-out hover:shadow-[0_34px_85px_rgba(0,0,0,0.95),0_0_65px_rgba(193,99,59,0.35)] select-none cursor-grab active:cursor-grabbing [transform-style:preserve-3d]"
      >
        <div className="w-full h-full rounded-[24px] overflow-hidden relative bg-bg [transform:translateZ(30px)] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Live HUD Status Indicator */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 [transform:translateX(-50%)_translateZ(50px)] bg-bg/95 backdrop-blur-md border border-accent px-4 py-1.5 rounded-full font-mono text-[0.65rem] tracking-[0.1em] uppercase text-paper flex items-center gap-2 whitespace-nowrap shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
          <span>{statusText}</span>
        </div>
      </div>
    </div>
  );
}
