"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Section6Overlay from "./Section6Overlay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { s6State } from "./store";
import { PROJECTS } from "./projects";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 6 — Digital Cybersecurity Landscape
 * A full-screen immersive 3D environment representing cybersecurity infrastructure.
 * Composes a React Three Fiber canvas with an HTML overlay.
 */
import { useThree } from '@react-three/fiber';

function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const isMobile = size.width < 768;
    const fov = isMobile ? 80 : 50;
    const pCam = camera as any;
    if (pCam.fov !== fov) {
      pCam.fov = fov;
      pCam.updateProjectionMatrix();
    }
  }, [camera, size]);
  return null;
}

export default function Section6() {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=12000", // Increased scroll distance to accommodate 10 books
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Compress the 3D animation into the middle 80% of the scroll.
          // The first 10% creates a pause (doors closed) when entering from the top.
          // The last 10% creates a pause (doors closed) before exiting at the bottom.
          let mappedProgress = (self.progress - 0.1) / 0.8;
          mappedProgress = Math.max(0, Math.min(1, mappedProgress));
          
          s6State.progress = mappedProgress;

          // Calculate chapter (1 to PROJECTS.length)
          let newChapter = 0;
          if (mappedProgress <= 0.05) {
            newChapter = 0; // Door opening phase
          } else if (mappedProgress >= 0.95) {
            newChapter = PROJECTS.length + 1; // Door closing phase
          } else {
            // Distribute the remaining progress (0.05 to 0.95) evenly across all projects
            const activeProgress = (mappedProgress - 0.05) / 0.90;
            newChapter = Math.floor(activeProgress * PROJECTS.length) + 1;
            if (newChapter > PROJECTS.length) newChapter = PROJECTS.length;
            if (newChapter < 1) newChapter = 1;
          }

          s6State.chapter = newChapter;
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden h-[100dvh] z-50"
      style={{
        background: `
          radial-gradient(circle at 50% 45%, rgba(0, 123, 255, 0.07), transparent 55%),
          radial-gradient(circle at 20% 80%, rgba(0, 123, 255, 0.03), transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(0, 200, 120, 0.02), transparent 35%),
          #020406
        `,
      }}
    >
      {/* 3D Canvas — full section coverage */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 4, 14], fov: 50, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#020406" }}
        >
            <ResponsiveCamera />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay — typography, HUD, navigation */}
      <Section6Overlay />
    </section>
  );
}
