"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Avatar3DModel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hudStatus, setHudStatus] = useState("10,480 Neural Nodes · 3D Active");
  const [dispersionMode, setDispersionMode] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Dynamic Size from Container (Auto-calibrated for all phone & tablet widths)
    const initialWidth = mount.clientWidth || 300;
    const initialHeight = mount.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, initialWidth / initialHeight, 0.1, 1000);
    camera.position.set(0, 0, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // 2. Generate 10,480 3D Neural Particle Coordinates
    const particleCount = 10480;
    const initialPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorTerracotta = new THREE.Color(0xc1633b); // Warm Core
    const colorCool = new THREE.Color(0x6b6fb0);       // Cyber Perimeter
    const colorGold = new THREE.Color(0xf3c892);       // Bright Node Glints

    let pIdx = 0;

    // A. Facial Anatomy & Features (4,000 particles)
    for (let i = 0; i < 4000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      let r = 0.92 + Math.sin(phi * 3) * 0.05;
      let x = r * Math.sin(phi) * Math.cos(theta) * 0.84;
      let y = r * Math.cos(phi) * 1.1;
      let z = r * Math.sin(phi) * Math.sin(theta) * 0.92;

      // Sculpt front facial plane
      if (z > 0) {
        z *= 0.85;
        if (Math.abs(x) < 0.18 && y > -0.2 && y < 0.3) {
          z += 0.22 * (1 - Math.abs(x) / 0.18);
        }
        if (Math.abs(x) > 0.25 && Math.abs(x) < 0.65 && y > -0.1 && y < 0.3) {
          z += 0.12;
        }
        if (y < -0.3) {
          x *= 1 - (-y - 0.3) * 0.45;
          z *= 1 - (-y - 0.3) * 0.35;
        }
      }

      initialPositions[pIdx * 3] = (Math.random() - 0.5) * 8;
      initialPositions[pIdx * 3 + 1] = (Math.random() - 0.5) * 8;
      initialPositions[pIdx * 3 + 2] = (Math.random() - 0.5) * 8;

      targetPositions[pIdx * 3] = x;
      targetPositions[pIdx * 3 + 1] = y;
      targetPositions[pIdx * 3 + 2] = z;

      currentPositions[pIdx * 3] = initialPositions[pIdx * 3];
      currentPositions[pIdx * 3 + 1] = initialPositions[pIdx * 3 + 1];
      currentPositions[pIdx * 3 + 2] = initialPositions[pIdx * 3 + 2];

      const mixedColor = z > 0 ? colorTerracotta.clone().lerp(colorGold, Math.random() * 0.4) : colorCool;
      colors[pIdx * 3] = mixedColor.r;
      colors[pIdx * 3 + 1] = mixedColor.g;
      colors[pIdx * 3 + 2] = mixedColor.b;

      sizes[pIdx] = Math.random() * 0.024 + 0.015;
      pIdx++;
    }

    // B. Aviator Glasses Frame Nodes (1,800 particles)
    for (let i = 0; i < 1800; i++) {
      const isLeft = i < 900;
      const angle = (i % 900) * ((2 * Math.PI) / 900);
      const ringRadius = 0.28 + Math.random() * 0.03;
      const centerX = isLeft ? -0.34 : 0.34;
      const centerY = 0.12;

      const x = centerX + Math.cos(angle) * ringRadius;
      const y = centerY + Math.sin(angle) * ringRadius * 0.88;
      const z = 0.88 + Math.random() * 0.06;

      initialPositions[pIdx * 3] = x * 2;
      initialPositions[pIdx * 3 + 1] = y * 2;
      initialPositions[pIdx * 3 + 2] = z * 2;

      targetPositions[pIdx * 3] = x;
      targetPositions[pIdx * 3 + 1] = y;
      targetPositions[pIdx * 3 + 2] = z;

      currentPositions[pIdx * 3] = targetPositions[pIdx * 3];
      currentPositions[pIdx * 3 + 1] = targetPositions[pIdx * 3 + 1];
      currentPositions[pIdx * 3 + 2] = targetPositions[pIdx * 3 + 2];

      colors[pIdx * 3] = colorGold.r;
      colors[pIdx * 3 + 1] = colorGold.g;
      colors[pIdx * 3 + 2] = colorGold.b;

      sizes[pIdx] = 0.032;
      pIdx++;
    }

    // C. Studio Headphones & Headband (2,680 particles)
    for (let i = 0; i < 2680; i++) {
      let x = 0, y = 0, z = 0;
      if (i < 1600) {
        const isLeft = i < 800;
        const cupAngle = (i % 800) * ((2 * Math.PI) / 800);
        const r = Math.random() * 0.36;
        x = (isLeft ? -0.96 : 0.96) + (Math.random() - 0.5) * 0.12;
        y = 0.05 + Math.sin(cupAngle) * r;
        z = Math.cos(cupAngle) * r * 0.85;
      } else {
        const bandAngle = ((i - 1600) / 1080) * Math.PI;
        const arcR = 1.16 + (Math.random() - 0.5) * 0.08;
        x = Math.cos(bandAngle) * arcR;
        y = 0.15 + Math.sin(bandAngle) * arcR;
        z = (Math.random() - 0.5) * 0.18;
      }

      initialPositions[pIdx * 3] = x;
      initialPositions[pIdx * 3 + 1] = y;
      initialPositions[pIdx * 3 + 2] = z;

      targetPositions[pIdx * 3] = x;
      targetPositions[pIdx * 3 + 1] = y;
      targetPositions[pIdx * 3 + 2] = z;

      currentPositions[pIdx * 3] = x;
      currentPositions[pIdx * 3 + 1] = y;
      currentPositions[pIdx * 3 + 2] = z;

      colors[pIdx * 3] = colorCool.r;
      colors[pIdx * 3 + 1] = colorCool.g;
      colors[pIdx * 3 + 2] = colorCool.b;

      sizes[pIdx] = 0.026;
      pIdx++;
    }

    // D. Outer Ambient Neural Field (2,000 particles)
    for (let i = 0; i < 2000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.random() * 0.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      initialPositions[pIdx * 3] = x;
      initialPositions[pIdx * 3 + 1] = y;
      initialPositions[pIdx * 3 + 2] = z;

      targetPositions[pIdx * 3] = x;
      targetPositions[pIdx * 3 + 1] = y;
      targetPositions[pIdx * 3 + 2] = z;

      currentPositions[pIdx * 3] = x;
      currentPositions[pIdx * 3 + 1] = y;
      currentPositions[pIdx * 3 + 2] = z;

      const c = Math.random() > 0.5 ? colorTerracotta : colorCool;
      colors[pIdx * 3] = c.r * 0.7;
      colors[pIdx * 3 + 1] = c.g * 0.7;
      colors[pIdx * 3 + 2] = c.b * 0.7;

      sizes[pIdx] = Math.random() * 0.016 + 0.008;
      pIdx++;
    }

    // 3. Buffer Geometry & Glowing Particle Material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(243, 200, 146, 0.9)");
      gradient.addColorStop(0.55, "rgba(193, 99, 59, 0.4)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      return texture;
    };

    const particleTexture = createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // 4. Mouse & Touch Kinematics
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let dispersionPower = 0;
    let targetDispersion = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth * 0.45);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight * 0.45);

      mouse.targetX = Math.max(-1, Math.min(1, normX));
      mouse.targetY = Math.max(-1, Math.min(1, normY));

      if (Math.abs(mouse.targetX) > 0.35) {
        setHudStatus(mouse.targetX > 0 ? "Neural Cluster · Right Orbit" : "Neural Cluster · Left Orbit");
      } else if (mouse.targetY < -0.3) {
        setHudStatus("Neural Cluster · Upward Gaze");
      } else {
        setHudStatus("10,480 Neural Nodes · Synced");
      }
    };

    const handlePointerDown = () => {
      targetDispersion = 1.0;
      setDispersionMode(true);
      setHudStatus("Neural Pulse · Dispersion Wave");
      setTimeout(() => {
        targetDispersion = 0;
        setDispersionMode(false);
      }, 700);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = mount.getBoundingClientRect();
        const normX = (touch.clientX - (rect.left + rect.width / 2)) / (window.innerWidth * 0.35);
        const normY = (touch.clientY - (rect.top + rect.height / 2)) / (window.innerHeight * 0.35);
        mouse.targetX = Math.max(-1, Math.min(1, normX));
        mouse.targetY = Math.max(-1, Math.min(1, normY));
      }
    };

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    mount.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // 5. 60FPS Kinematics Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      dispersionPower += (targetDispersion - dispersionPower) * 0.12;

      pointCloud.rotation.y = mouse.x * 1.35 + Math.sin(elapsedTime * 0.6) * 0.06;
      pointCloud.rotation.x = mouse.y * 0.85 + Math.cos(elapsedTime * 0.5) * 0.04;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const tx = targetPositions[i3];
        const ty = targetPositions[i3 + 1];
        const tz = targetPositions[i3 + 2];

        const wave = Math.sin(elapsedTime * 2.2 + tx * 3.0 + ty * 2.5) * 0.018;
        const disperseX = tx * dispersionPower * 2.4 + (Math.sin(i + elapsedTime * 4) * dispersionPower * 0.8);
        const disperseY = ty * dispersionPower * 2.4 + (Math.cos(i + elapsedTime * 4) * dispersionPower * 0.8);
        const disperseZ = tz * dispersionPower * 2.4;

        posArray[i3] += (tx + wave + disperseX - posArray[i3]) * 0.09;
        posArray[i3 + 1] += (ty + wave + disperseY - posArray[i3 + 1]) * 0.09;
        posArray[i3 + 2] += (tz + wave + disperseZ - posArray[i3 + 2]) * 0.09;
      }

      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full select-none">
      <div className="relative w-[min(320px,76vw)] aspect-square rounded-[28px] sm:rounded-[32px] p-2 bg-[radial-gradient(circle_at_50%_35%,rgba(193,99,59,0.22),#141311_75%)] border border-accent/40 shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_45px_rgba(193,99,59,0.2)]">
        
        {/* WebGL Canvas Container (Auto-fills responsive parent) */}
        <div
          ref={mountRef}
          className="w-full h-full rounded-[22px] sm:rounded-[24px] overflow-hidden bg-bg/95 flex items-center justify-center cursor-grab active:cursor-grabbing"
          title="Click / Tap to trigger Neural Particle Pulse"
        />

        {/* Dynamic Holographic Scanner Line */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent pointer-events-none animate-pulse" />

        {/* Ambient Ring */}
        <div className="absolute -inset-1.5 sm:-inset-2 rounded-[32px] sm:rounded-[36px] border border-accent/20 pointer-events-none" />

        {/* Live HUD Status Badge */}
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-bg/95 backdrop-blur-md border border-accent px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.12em] uppercase text-paper flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-[0_12px_30px_rgba(0,0,0,0.7)] z-20">
          <span className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${dispersionMode ? "bg-accent shadow-[0_0_10px_#c1633b]" : "bg-emerald-400 shadow-[0_0_8px_#4ade80]"} animate-pulse`} />
          <span>{hudStatus}</span>
        </div>
      </div>
    </div>
  );
}
