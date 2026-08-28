"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { SKILL_DOMAINS } from "@/data/projects";

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

    // 3. Synaptic Axon Connections
    const maxLines = 80;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc1633b,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    let lineIdx = 0;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodePositions[i * 3] - nodePositions[j * 3];
        const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
        const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 4.8 && lineIdx < linePositions.length - 6) {
          linePositions[lineIdx++] = nodePositions[i * 3];
          linePositions[lineIdx++] = nodePositions[i * 3 + 1];
          linePositions[lineIdx++] = nodePositions[i * 3 + 2];
          linePositions[lineIdx++] = nodePositions[j * 3];
          linePositions[lineIdx++] = nodePositions[j * 3 + 1];
          linePositions[lineIdx++] = nodePositions[j * 3 + 2];
        }
      }
    }
    lineGeo.attributes.position.needsUpdate = true;

    // 4. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      nodes.rotation.y = t * 0.15;
      nodes.rotation.x = Math.sin(t * 0.1) * 0.1;
      lines.rotation.y = t * 0.15;
      lines.rotation.x = Math.sin(t * 0.1) * 0.1;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" className="py-[clamp(4.5rem,8vw,8.5rem)] border-t border-line relative z-10">
      <div className="max-w-[1240px] mx-auto px-[clamp(1rem,5vw,4rem)]">
        <div className="max-w-[760px] mb-10 sm:mb-12">
          <div className="eyebrow">03 — Technical Matrix</div>
          <h2 className="font-display font-medium text-[clamp(1.9rem,4.5vw,3.2rem)] tracking-[-0.01em] mt-3 sm:mt-4 leading-[1.08]">
            Four domains that <em>compound</em> into one practice.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-center">
          {/* Left: Domain Accordion List */}
          <div className="flex flex-col">
            {SKILL_DOMAINS.map((domain, idx) => {
              const isActive = activeDomain === idx;
              return (
                <div
                  key={domain.idx}
                  onClick={() => setActiveDomain(idx)}
                  onMouseEnter={() => setActiveDomain(idx)}
                  className={`domain-card grid grid-cols-1 sm:grid-cols-[70px_1fr] gap-3 sm:gap-5 border-t border-line py-5 sm:py-7 px-4 sm:px-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-bg-raise border-accent/60 shadow-[0_12px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(193,99,59,0.15)]"
                      : "hover:bg-white/[0.02]"
                  } last:border-b`}
                >
                  <div className={`font-mono text-xs sm:text-sm pt-1 ${isActive ? "text-accent font-medium" : "text-stone"}`}>
                    {domain.idx}
                  </div>
                  <div>
                    <div className="font-display font-medium text-[clamp(1.15rem,2.2vw,1.75rem)] mb-2 sm:mb-3 flex items-center justify-between">
                      <span className={isActive ? "text-paper" : "text-paper/85"}>{domain.name}</span>
                      {isActive && (
                        <span className="font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider text-accent border border-accent/40 bg-accent/10 px-2 py-0.5 rounded-full">
                          Active Synapse
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {domain.items.map((item, i) => (
                        <span
                          key={i}
                          className={`font-mono text-[0.7rem] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-md transition-all ${
                            isActive
                              ? "bg-bg text-paper border border-line hover:border-accent hover:text-accent"
                              : "text-stone bg-bg/50 border border-transparent"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: 3D Interactive Synapse Visualizer */}
          <div className="relative h-[240px] sm:h-[300px] lg:h-auto lg:aspect-square max-w-[420px] mx-auto w-full rounded-3xl bg-[radial-gradient(circle_at_50%_40%,rgba(193,99,59,0.18),#141311_70%)] border border-line/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden flex items-center justify-center">
            <div ref={mountRef} className="w-full h-full" />
            
            {/* Live Visualizer Status Overlay */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-bg/90 backdrop-blur-md border border-line px-3 py-1 rounded-full font-mono text-[0.58rem] sm:text-[0.62rem] tracking-wider uppercase text-paper/80 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Domain {SKILL_DOMAINS[activeDomain]?.idx || "01"} Synaptic Graph</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
