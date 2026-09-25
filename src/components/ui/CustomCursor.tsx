"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  life: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Only run on desktop devices, smoke effects on mobile touch can be buggy/weird
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const particles: Particle[] = [];
    let lastX = -1;
    let lastY = -1;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const x = e.clientX;
      const y = e.clientY;
      
      if (lastX === -1 && lastY === -1) {
        lastX = x;
        lastY = y;
      }

      // Interpolate to fill gaps if mouse moves fast
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / 4)); // Particle every 4px for extreme smoothness
      
      for (let i = 1; i <= steps; i++) {
        const px = lastX + dx * (i / steps);
        const py = lastY + dy * (i / steps);
        particles.push({ x: px, y: py, life: 1.0 });
      }
      
      lastX = x;
      lastY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Use screen blending mode for a glowing, overlapping effect
      ctx.globalCompositeOperation = "screen";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.015; // Controls how long the smoke lasts (lower = longer)
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Size of the smoke particle. Grows slightly as it dissipates.
        const baseRadius = 35;
        const currentRadius = baseRadius + (1 - p.life) * 20;

        // Radial gradient for soft glowing smoke
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        
        // Deep blue core that fades into a darker blue outer edge
        // Opacity is tied to life, so it fades out smoothly
        const coreColor = `rgba(0, 100, 255, ${p.life * 0.4})`; // Vibrant blue core
        const edgeColor = `rgba(0, 20, 100, ${p.life * 0.1})`; // Dark blue edge
        const transparent = `rgba(0, 20, 100, 0)`;

        gradient.addColorStop(0, coreColor);
        gradient.addColorStop(0.4, edgeColor);
        gradient.addColorStop(1, transparent);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}
