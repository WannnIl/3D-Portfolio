"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Section6Overlay from "./Section6Overlay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { s6State } from "./store";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 6 — Digital Cybersecurity Landscape
 * A full-screen immersive 3D environment representing cybersecurity infrastructure.
 * Composes a React Three Fiber canvas with an HTML overlay.
 */
export default function Section6() {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=6000",
        pin: true,
        scrub: 1,
        refreshPriority: 1,
        onUpdate: (self) => {
          s6State.progress = self.progress;
          setProgress(self.progress);

          let newChapter = 0;
          if (self.progress < 0.15) newChapter = 0;
          else if (self.progress < 0.35) newChapter = 1;
          else if (self.progress < 0.55) newChapter = 2;
          else if (self.progress < 0.75) newChapter = 3;
          else if (self.progress < 0.95) newChapter = 4;
          else newChapter = 5;

          s6State.chapter = newChapter;
          setChapter(newChapter);
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden h-screen z-50"
      style={{
        background: `
          radial-gradient(circle at 50% 45%, rgba(0, 168, 107, 0.07), transparent 55%),
          radial-gradient(circle at 20% 80%, rgba(0, 168, 107, 0.03), transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(0, 200, 120, 0.02), transparent 35%),
          #020604
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
          style={{ background: "#020604" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay — typography, HUD, navigation */}
      <Section6Overlay progress={progress} chapter={chapter} />
    </section>
  );
}
