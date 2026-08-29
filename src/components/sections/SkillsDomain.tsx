"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { SKILL_DOMAINS } from "@/data/projects";
import { TechLogo } from "@/components/ui/TechLogo";

export function SkillsDomain() {
  const [activeDomain, setActiveDomain] = useState<number>(0);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 300;

    // 1. Three.js Synaptic Cluster Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // 2. Synaptic Nodes
    const nodeCount = 36;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    const colorTerracotta = new THREE.Color(0xc1633b);
    const colorCool = new THREE.Color(0x6b6fb0);

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 5.5 + Math.random() * 2.5;

      nodePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      nodePositions[i * 3 + 1] = r * Math.cos(phi);
      nodePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const c = i % 2 === 0 ? colorTerracotta : colorCool;
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // 3. Synaptic Electrical Axons (Lines)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc1633b,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodePositions[i * 3] - nodePositions[j * 3];
        const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
        const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 4.2) {
          linePositions.push(
            nodePositions[i * 3],
            nodePositions[i * 3 + 1],
            nodePositions[i * 3 + 2],
            nodePositions[j * 3],
            nodePositions[j * 3 + 1],
            nodePositions[j * 3 + 2]
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // 4. Interactive Orbital Motion with requestAnimationFrame
    let animId: number;
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotY = x * 0.6;
      targetRotX = -y * 0.6;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);

      nodes.rotation.y += 0.003;
      lines.rotation.y += 0.003;

      nodes.rotation.y += (targetRotY - nodes.rotation.y) * 0.05;
      nodes.rotation.x += (targetRotX - nodes.rotation.x) * 0.05;
      lines.rotation.y = nodes.rotation.y;
      lines.rotation.x = nodes.rotation.x;

      renderer.render(scene, camera);
    };

    animate();

    // Throttled Resize with requestAnimationFrame
    let resizeFrameId: number | null = null;
    const handleResize = () => {
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        if (!mount) return;
        const newW = mount.clientWidth;
        const newH = mount.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveDomain(idx);
    }
  };

  return (
    <section id="skills" className="py-[clamp(5rem,9vw,9rem)] border-t border-line relative z-10" aria-labelledby="skills-heading">
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        {/* Header */}
        <div className="max-w-[760px] mb-10 sm:mb-14">
          <div className="eyebrow">03 — Technical Matrix</div>
          <h2 id="skills-heading" className="font-display font-medium text-[clamp(2rem,5vw,3.4rem)] tracking-[-0.01em] mt-3 sm:mt-4 leading-[1.08] text-paper">
            Core Domains &amp; <span className="font-serif italic text-accent font-normal">Production Technologies</span>.
          </h2>
          <p className="mt-4 text-stone-300 font-light text-base sm:text-lg max-w-[620px] leading-relaxed">
            Hover to inspect the live neural graph and browse production toolchains with official tech badges.
          </p>
        </div>

        {/* 2-Column Matrix: Left Domain Selectors, Right 3D Visualizer & Skills Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-start">
          {/* Left: Interactive Domain Accordion Cards */}
          <div className="space-y-3.5 sm:space-y-4" role="tablist" aria-label="Technical Skill Domains">
            {SKILL_DOMAINS.map((domain, idx) => {
              const isActive = activeDomain === idx;
              return (
                <div
                  key={domain.idx}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  aria-expanded={isActive}
                  aria-controls={`domain-panel-${idx}`}
                  onClick={() => setActiveDomain(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "bg-bg-raise border-accent shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(193,99,59,0.15)]"
                      : "bg-bg-raise/40 border-line/70 hover:border-accent/40 hover:bg-bg-raise/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-accent font-semibold">
                        {domain.idx}
                      </span>
                      <h3 className="font-display font-medium text-base sm:text-xl text-paper">
                        {domain.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-stone-300 font-semibold" aria-hidden="true">
                      {isActive ? "▼" : "▶"}
                    </span>
                  </div>

                  {/* Skills badges with Logos inside active domain */}
                  {isActive && (
                    <div id={`domain-panel-${idx}`} className="mt-5 pt-4 border-t border-line/60 flex flex-wrap gap-2 animate-fadeIn">
                      {domain.items.map((skill) => (
                        <TechLogo key={skill} name={skill} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: 3D Interactive Synaptic Visualizer & Active Domain Inspector */}
          <div className="relative rounded-3xl overflow-hidden border border-line bg-gradient-to-b from-bg-raise to-bg p-5 sm:p-8 flex flex-col justify-between h-[360px] sm:h-[460px] lg:h-[540px] shadow-[0_24px_60px_rgba(0,0,0,0.7)] lg:sticky lg:top-28">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[0.68rem] tracking-widest uppercase text-accent font-semibold">
                Domain 0{activeDomain + 1} — Neural Graph
              </span>
              <span className="font-mono text-[0.65rem] tracking-wider uppercase px-2.5 py-1 rounded bg-bg border border-line text-stone-300 font-medium">
                3D Interactive
              </span>
            </div>

            {/* Three.js Canvas Mount */}
            <div
              ref={mountRef}
              className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            />

            {/* Bottom Active Stack Card */}
            <div className="z-10 bg-bg/95 backdrop-blur-xl border border-line/80 p-4 sm:p-5 rounded-2xl shadow-xl">
              <div className="font-mono text-xs text-accent font-semibold uppercase tracking-wider mb-2">
                {SKILL_DOMAINS[activeDomain].name}
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILL_DOMAINS[activeDomain].items.slice(0, 8).map((item) => (
                  <TechLogo key={item} name={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
