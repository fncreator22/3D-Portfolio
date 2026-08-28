"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Global3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // 2. 3D Neural Lattice Particles
    const particleCount = 750;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorTerracotta = new THREE.Color(0xc1633b);
    const colorCool = new THREE.Color(0x6b6fb0);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 55;
      const y = (Math.random() - 0.5) * 55;
      const z = (Math.random() - 0.5) * 45;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const mixedColor = Math.random() > 0.4 ? colorTerracotta : colorCool;
      colors[i * 3] = mixedColor.r * 0.6;
      colors[i * 3 + 1] = mixedColor.g * 0.6;
      colors[i * 3 + 2] = mixedColor.b * 0.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Subtle Synaptic Connecting Lines
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(180 * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc1633b,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // 4. Mouse & Scroll Interaction
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // 5. Render Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Parallax Camera motion based on scroll depth
      camera.position.y = -scrollY * 0.008;
      camera.position.x = mouse.x * 2.5;
      camera.rotation.y = mouse.x * 0.08;
      camera.rotation.x = mouse.y * 0.06;

      // Subtle particle floating
      particles.rotation.y = elapsedTime * 0.02;

      // Dynamic Synapse Connections for nearby particles
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const lineArr = lineGeo.attributes.position.array as Float32Array;

      let lineIdx = 0;
      for (let i = 0; i < 40 && lineIdx < linePositions.length - 6; i++) {
        const p1X = posArr[i * 3];
        const p1Y = posArr[i * 3 + 1];
        const p1Z = posArr[i * 3 + 2];

        for (let j = i + 1; j < 40 && lineIdx < linePositions.length - 6; j++) {
          const p2X = posArr[j * 3];
          const p2Y = posArr[j * 3 + 1];
          const p2Z = posArr[j * 3 + 2];

          const dist = Math.sqrt((p1X - p2X) ** 2 + (p1Y - p2Y) ** 2 + (p1Z - p2Z) ** 2);
          if (dist < 12) {
            lineArr[lineIdx++] = p1X;
            lineArr[lineIdx++] = p1Y;
            lineArr[lineIdx++] = p1Z;
            lineArr[lineIdx++] = p2X;
            lineArr[lineIdx++] = p2Y;
            lineArr[lineIdx++] = p2Z;
          }
        }
      }

      lineGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60"
      aria-hidden="true"
    />
  );
}
