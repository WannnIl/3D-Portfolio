"use client";

import { useState, useEffect, useRef } from "react";

interface Section6OverlayProps {
  progress: number;
  chapter: number;
}

/**
 * Section 6 HTML overlay — editorial typography, HUD elements,
 * terminal animation, and navigation labels.
 * Rendered on top of the 3D canvas.
 */
export default function Section6Overlay({
  progress,
  chapter,
}: Section6OverlayProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = [
      "> scanning network...",
      "> analyzing nodes...",
      "> threat level: LOW",
      "> encryption active",
      "> system secure_",
    ];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setTerminalLines((prev) => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        currentLine = 0;
        setTerminalLines([]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Split door logic: starts opening at 0.05, fully open by 0.25
  const splitProgress = Math.max(0, Math.min(1, (progress - 0.05) * 5));
  const xOffset = splitProgress * 100; 

  const HeroContent = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <h2
        className="font-secondary font-light uppercase tracking-[0.15em] md:tracking-[0.2em]"
        style={{
          fontSize: "clamp(50px, 10vw, 160px)",
          lineHeight: "0.85",
          color: "#E8FFF1",
          textShadow: "0 0 60px rgba(0, 168, 107, 0.08)",
        }}
      >
        Cyber
      </h2>
      <h2
        className="font-secondary font-bold uppercase tracking-[-0.03em]"
        style={{
          fontSize: "clamp(55px, 11vw, 180px)",
          lineHeight: "0.85",
          color: "#E8FFF1",
          textShadow: "0 0 80px rgba(0, 168, 107, 0.06)",
        }}
      >
        Security
      </h2>
      <div className="flex items-center gap-8 md:gap-16 mt-6 md:mt-10">
        {["Network", "Defense", "Detection", "Encryption"].map((label, i) => (
          <span
            key={label}
            className="font-secondary text-[8px] md:text-[10px] uppercase tracking-[0.3em]"
            style={{ color: i === 1 ? "#00A86B" : "#073D20" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none">
      
      {/* SPLIT DOORS */}
      {/* Left Door */}
      <div 
        className="absolute inset-0 bg-[#020604]"
        style={{ 
          clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
          transform: `translateX(-${xOffset}%)`,
          willChange: "transform"
        }}
      >
        <HeroContent />
      </div>

      {/* Right Door */}
      <div 
        className="absolute inset-0 bg-[#020604]"
        style={{ 
          clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
          transform: `translateX(${xOffset}%)`,
          willChange: "transform"
        }}
      >
        <HeroContent />
      </div>

      {/* HUD ELEMENTS (Fades in after doors open) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: progress > 0.15 ? 1 : 0 }}
      >
        {/* Top Left — Section Label */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10">
          <p className="font-secondary text-[10px] md:text-xs uppercase tracking-[0.3em]" style={{ color: "#8BAE99" }}>
            Section 06
          </p>
          <p className="font-secondary text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1" style={{ color: "#073D20" }}>
            Digital Archive
          </p>
        </div>

        {/* Top Right — Status Indicator */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#39FF88" }} />
          <span className="font-secondary text-[10px] md:text-xs uppercase tracking-[0.2em]" style={{ color: "#8BAE99" }}>
            System Online
          </span>
        </div>

        {/* Chapter Indicator */}
        {chapter >= 1 && chapter <= 4 && (
          <div
            className="absolute top-1/2 left-6 md:left-10 -translate-y-1/2 text-[#00A86B] font-secondary text-xs md:text-sm uppercase tracking-widest hidden md:block"
            style={{ textShadow: "0 0 10px rgba(0, 168, 107, 0.3)" }}
          >
            0{chapter} / 04
          </div>
        )}

        {/* HUD — Left Bottom */}
        <div className="absolute bottom-16 left-6 md:bottom-20 md:left-10 hidden md:block" style={{ color: "#073D20" }}>
          <div className="font-secondary text-[10px] uppercase tracking-[0.2em] space-y-1">
            <p>System 06 <span className="inline-block w-8 border-t" style={{ borderColor: "#073D20" }} /></p>
            <p>Status <span style={{ color: "#00A86B" }}>Online</span></p>
            <p>Node <span style={{ color: "#8BAE99" }}>047</span></p>
          </div>
        </div>

        {/* HUD — Right Bottom — Threat Level */}
        <div className="absolute bottom-16 right-6 md:bottom-20 md:right-10 text-right hidden md:block" style={{ color: "#073D20" }}>
          <p className="font-secondary text-[10px] uppercase tracking-[0.3em]">Threat Level</p>
          <p className="font-secondary text-2xl md:text-3xl font-bold uppercase tracking-wider mt-1 transition-colors duration-500" style={{ color: chapter === 2 ? "#FF3939" : "#00A86B" }}>
            {chapter === 2 ? "High" : "Low"}
          </p>
        </div>

        {/* Terminal */}
        <div ref={terminalRef} className="absolute bottom-36 md:bottom-40 left-6 md:left-10 max-w-[200px] hidden md:block">
          {terminalLines.map((line, i) => (
            <p key={`${line}-${i}`} className="font-mono text-[9px] leading-relaxed" style={{ color: i === terminalLines.length - 1 ? "#00A86B" : "#062D18" }}>
              {line}
            </p>
          ))}
        </div>

        {/* Bottom Center — Navigation Labels */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-12">
          {["Network", "Defense", "Detection", "Encryption"].map((label, i) => (
            <span
              key={label}
              className="font-secondary text-[8px] md:text-[10px] uppercase tracking-[0.25em] transition-colors duration-500"
              style={{ color: chapter - 1 === i ? "#00C878" : "#062D18" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

