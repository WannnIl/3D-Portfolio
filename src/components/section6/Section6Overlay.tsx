"use client";

import { useState, useEffect, useRef } from "react";
import { PROJECTS } from "./projects";

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
      "> decrypting project archives...",
      "> compiling webgl components...",
      "> verifying portfolio assets...",
      "> access granted",
      "> initializing vault_",
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

  // Split door logic:
  // - Open smoothly from 0.0 to 0.05
  // - Stay open from 0.05 to 0.95
  // - Close smoothly from 0.95 to 1.0
  let splitProgress = 0;
  if (progress > 0.0 && progress <= 0.05) {
    splitProgress = progress * 20; // 0 to 1
  } else if (progress > 0.05 && progress <= 0.95) {
    splitProgress = 1;
  } else if (progress > 0.95 && progress <= 1.0) {
    splitProgress = 1 - (progress - 0.95) * 20; // 1 to 0
  }
  
  // Strictly clamp to prevent floating point gaps (e.g. -0.000000000001)
  splitProgress = Math.max(0, Math.min(1, splitProgress));
  const xOffset = splitProgress * 100; 

  const showHUD = progress > 0.05 && progress < 0.95;

  const HeroContent = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
      
      {/* Background Matrix/Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `linear-gradient(#007BFF 1px, transparent 1px), linear-gradient(90deg, #007BFF 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020406_90%)]" />

      {/* Massive Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center opacity-[0.03] mix-blend-screen">
        <h1 className="font-secondary font-bold text-[30vw] leading-none whitespace-nowrap">
          PORTFOLIO
        </h1>
      </div>

      {/* Central Crosshairs & Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[70vh] border border-[#007BFF] rounded-full opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] border-[0.5px] border-[#007BFF] rounded-full opacity-20 border-dashed animate-[spin_20s_linear_infinite]" />
      
      {/* Axis Lines */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#007BFF] to-transparent opacity-30" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#007BFF] to-transparent opacity-30" />

      {/* Ornate Frame Accents */}
      <div className="absolute top-10 left-10 border-t-2 border-l-2 border-[#007BFF] w-16 h-16 opacity-60" />
      <div className="absolute top-10 right-10 border-t-2 border-r-2 border-[#007BFF] w-16 h-16 opacity-60" />
      <div className="absolute bottom-10 left-10 border-b-2 border-l-2 border-[#007BFF] w-16 h-16 opacity-60" />
      <div className="absolute bottom-10 right-10 border-b-2 border-r-2 border-[#007BFF] w-16 h-16 opacity-60" />

      {/* Data Blocks in Corners */}
      <div className="absolute top-16 right-32 flex flex-col items-end gap-1 opacity-50 font-mono text-[9px] text-[#007BFF] hidden md:flex">
        <span>FW: NEXT.JS / REACT</span>
        <span>RENDER: R3F / WEBGL</span>
        <span>STATUS: SECURE</span>
      </div>

      <div className="absolute bottom-16 left-32 flex flex-col items-start gap-1 opacity-50 font-mono text-[9px] text-[#007BFF] hidden md:flex">
        <span>ROLE: FRONTEND DEV</span>
        <span>ROLE: CYBERSECURITY</span>
        <div className="w-20 h-[1px] bg-[#007BFF] mt-1" />
      </div>

      {/* Main Text Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2
          className="font-secondary font-light uppercase tracking-[0.1em]"
          style={{
            fontSize: "clamp(40px, 8vw, 120px)",
            lineHeight: "0.9",
            color: "#E8F4FF",
            textShadow: "0 0 40px rgba(0, 123, 255, 0.4)",
          }}
        >
          My
        </h2>
        <h2
          className="font-secondary font-bold uppercase tracking-[-0.03em]"
          style={{
            fontSize: "clamp(50px, 11vw, 170px)",
            lineHeight: "0.85",
            color: "#E8F4FF",
            textShadow: "0 0 60px rgba(0, 123, 255, 0.5)",
          }}
        >
          Projects
        </h2>
      </div>
      
      {/* Categories Box */}
      <div className="flex items-center gap-6 md:gap-12 mt-12 relative z-10 border-t border-b border-[#007BFF]/40 py-4 px-12 backdrop-blur-md bg-[#007BFF]/5">
        {PROJECTS.map((proj, i) => (
          <div key={proj.title} className="flex items-center gap-3">
            <span className="font-mono text-[8px] text-[#007BFF]/60">{(i + 1).toString().padStart(2, '0')}</span>
            <span
              className="font-secondary text-[9px] md:text-[11px] uppercase tracking-[0.4em]"
              style={{ color: chapter - 1 === i ? "#00CCFF" : "#8BA4C4" }}
            >
              {proj.title}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator block */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#007BFF] to-transparent animate-pulse" />
        <div className="bg-[#007BFF] text-[#020406] font-mono font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-2 mb-10">
          Access Archive
        </div>
      </div>
      
    </div>
  );

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none">
      
      {/* SPLIT DOORS */}
      {/* Left Door */}
      <div 
        className="absolute inset-0 bg-[#020406]"
        style={{ 
          clipPath: "polygon(0 0, 50.1% 0, 50.1% 100%, 0 100%)",
          transform: `translateX(-${xOffset}%)`,
          willChange: "transform"
        }}
      >
        <HeroContent />
      </div>

      {/* Right Door */}
      <div 
        className="absolute inset-0 bg-[#020406]"
        style={{ 
          clipPath: "polygon(49.9% 0, 100% 0, 100% 100%, 49.9% 100%)",
          transform: `translateX(${xOffset}%)`,
          willChange: "transform"
        }}
      >
        <HeroContent />
      </div>

      {/* HUD ELEMENTS (Fades in after doors open and fades out before they close) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: showHUD ? 1 : 0 }}
      >
        {/* Top Left — Section Label */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10">
          <p className="font-secondary text-[10px] md:text-xs uppercase tracking-[0.3em]" style={{ color: "#8BA4C4" }}>
            Section 06
          </p>
          <p className="font-secondary text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1" style={{ color: "#062850" }}>
            Selected Works
          </p>
        </div>

        {/* Top Right — Status Indicator */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#00CCFF" }} />
          <span className="font-secondary text-[10px] md:text-xs uppercase tracking-[0.2em]" style={{ color: "#8BA4C4" }}>
            System Online
          </span>
        </div>

        {/* Chapter Indicator */}
        {chapter >= 1 && chapter <= 4 && (
          <div
            className="absolute top-1/2 left-6 md:left-10 -translate-y-1/2 text-[#007BFF] font-secondary text-xs md:text-sm uppercase tracking-widest hidden md:block"
            style={{ textShadow: "0 0 10px rgba(0, 123, 255, 0.3)" }}
          >
            {chapter.toString().padStart(2, '0')} / {PROJECTS.length.toString().padStart(2, '0')}
          </div>
        )}

        {/* HUD — Left Bottom */}
        <div className="absolute bottom-16 left-6 md:bottom-20 md:left-10 hidden md:block" style={{ color: "#062850" }}>
          <div className="font-secondary text-[10px] uppercase tracking-[0.2em] space-y-1">
            <p>Architecture <span className="inline-block w-8 border-t" style={{ borderColor: "#062850" }} /></p>
            <p>Build <span style={{ color: "#007BFF" }}>Passing</span></p>
            <p>Frame <span style={{ color: "#8BA4C4" }}>60FPS</span></p>
            <p>System <span style={{ color: "#007BFF" }}>Secure</span></p>
          </div>
        </div>

        {/* HUD — Right Bottom — Threat Level */}
        <div className="absolute bottom-16 right-6 md:bottom-20 md:right-10 text-right hidden md:block" style={{ color: "#062850" }}>
          <p className="font-secondary text-[10px] uppercase tracking-[0.3em]">Performance</p>
          <p className="font-secondary text-2xl md:text-3xl font-bold uppercase tracking-wider mt-1 transition-colors duration-500" style={{ color: chapter === 2 ? "#00CCFF" : "#007BFF" }}>
            {chapter === 2 ? "Max" : "Optimal"}
          </p>
        </div>

        {/* Terminal */}
        <div ref={terminalRef} className="absolute bottom-36 md:bottom-40 left-6 md:left-10 max-w-[250px] hidden md:block">
          {terminalLines.map((line, i) => (
            <p key={`${line}-${i}`} className="font-mono text-[9px] leading-relaxed" style={{ color: i === terminalLines.length - 1 ? "#007BFF" : "#041A33" }}>
              {line}
            </p>
          ))}
        </div>

        {/* Bottom Center — Navigation Labels */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-12">
          {PROJECTS.map((proj, i) => (
            <span
              key={proj.title}
              className="font-secondary text-[8px] md:text-[10px] uppercase tracking-[0.25em] transition-colors duration-500"
              style={{ color: chapter - 1 === i ? "#0099FF" : "#041A33" }}
            >
              {proj.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );


}
