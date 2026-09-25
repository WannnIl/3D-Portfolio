"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  { text: "LINUX", weight: 1.2 },
  { text: "PYTHON", weight: 1.2 },
  { text: "JAVASCRIPT", weight: 1.5 },
  { text: "TYPESCRIPT", weight: 1.3 },
  { text: "REACT", weight: 1.5 },
  { text: "NEXT.JS", weight: 1.5 },
  { text: "LARAVEL", weight: 1.2 },
  { text: "NODE.JS", weight: 1.2 },
  { text: "TAILWINDCSS", weight: 1.0 },
  { text: "THREE.JS", weight: 1.3 },
  { text: "WEBGL", weight: 1.2 },
  { text: "GIT", weight: 1.0 },
  { text: "CYBERSECURITY", weight: 1.5 },
  { text: "SQL", weight: 1.0 },
  { text: "DOCKER", weight: 1.0 },
  { text: "PENTESTING", weight: 1.2 },
  { text: "NETWORKING", weight: 1.1 },
  { text: "BASH", weight: 1.0 },
  { text: "FRAMER MOTION", weight: 1.0 },
  { text: "GSAP", weight: 1.1 },
  { text: "VULN. ASSESS", weight: 1.2 },
  { text: "FRONTEND DEV", weight: 1.5 }
];

function InnerCore() {
  const coreRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x -= delta * 0.1;
      coreRef.current.rotation.y += delta * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.05;
      outerRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group>
      {/* Outer faint wireframe shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="#007BFF" wireframe transparent opacity={0.05} />
      </mesh>
      
      {/* Inner solid core with bright edges */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#000011" transparent opacity={0.8} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 0)]} />
          <lineBasicMaterial color="#00CCFF" transparent opacity={0.4} />
        </lineSegments>
      </group>
    </group>
  );
}

function WordCloud({ radius = 4.5 }) {
  // Create spherical distribution using Fibonacci sphere
  const words = useMemo(() => {
    const temp = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    
    for (let i = 0; i < SKILLS.length; i++) {
      const y = 1 - (i / (SKILLS.length - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i;
      
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      temp.push({
        position: new THREE.Vector3(x * radius, y * radius, z * radius),
        word: SKILLS[i].text,
        weight: SKILLS[i].weight,
      });
    }
    return temp;
  }, [radius]);

  // Generate connection lines between close nodes
  const linesGeo = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j < words.length; j++) {
        const d = words[i].position.distanceTo(words[j].position);
        if (d < radius * 1.4) { // Connect if distance is less than threshold
          points.push(
            words[i].position.x, words[i].position.y, words[i].position.z,
            words[j].position.x, words[j].position.y, words[j].position.z
          );
        }
      }
      // Connect to center (InnerCore)
      points.push(
        words[i].position.x, words[i].position.y, words[i].position.z,
        0, 0, 0
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [words, radius]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Lines */}
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial color="#007BFF" transparent opacity={0.1} />
      </lineSegments>
      
      {/* Central Core */}
      <InnerCore />

      {/* Skill Nodes */}
      {words.map((item, i) => (
        <SkillNode key={i} position={item.position} word={item.word} weight={item.weight} />
      ))}
    </group>
  );
}

function SkillNode({ position, word, weight }: { position: THREE.Vector3, word: string, weight: number }) {
  const innerRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (innerRef.current) {
      // Subtle pulse based on position hash
      const t = clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 3 + position.x * 10) * 0.05;
      innerRef.current.scale.set(scale, scale, scale);
    }
  });

  const isCore = weight >= 1.5;
  const color = isCore ? "#E8F4FF" : "#00CCFF";
  const opacity = isCore ? 1 : 0.7;

  return (
    <group position={position}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <group ref={innerRef}>
          <Text
            fontSize={0.25 * weight}
            color={color}
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
            outlineWidth={0.015}
            outlineColor="#020406"
            letterSpacing={0.1}
          >
            {word}
          </Text>
          
          {/* Decorative accent for high weight skills */}
          {isCore && (
            <mesh position={[0, -0.3, 0]}>
              <planeGeometry args={[0.5, 0.02]} />
              <meshBasicMaterial color="#007BFF" transparent opacity={0.5} />
            </mesh>
          )}
        </group>
      </Billboard>
    </group>
  );
}

export default function SkillsSection() {
  return (
    <section className="relative w-full h-screen bg-[#020406] overflow-hidden flex items-center justify-center border-b border-[#007BFF]/20">
      
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_80%)] pointer-events-none z-0" />
      
      {/* Animated Scanlines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen z-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #007BFF 2px, #007BFF 4px)' }}></div>

      {/* Title */}
      <div className="absolute top-12 left-8 md:top-20 md:left-20 z-10 pointer-events-none">
        <h3 className="font-mono text-[#007BFF] text-xs md:text-sm mb-2 tracking-[0.3em] flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00CCFF] rounded-full animate-pulse" />
          SYSTEM CAPABILITIES
        </h3>
         <h2 className="font-primary text-[#E8F4FF] text-5xl md:text-8xl tracking-tighter font-bold opacity-90 leading-none">
           CORE
           <span className="text-transparent block" style={{ WebkitTextStroke: "1px #007BFF", textShadow: "0 0 40px rgba(0, 123, 255, 0.3)" }}>
             STACK
           </span>
         </h2>
      </div>
      
      {/* Bottom info */}
      <div className="absolute bottom-12 right-8 md:bottom-20 md:right-20 z-10 pointer-events-none text-right">
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-1 mb-2 opacity-50">
            <div className="w-1 h-3 bg-[#007BFF]" />
            <div className="w-1 h-3 bg-[#007BFF]" />
            <div className="w-1 h-3 bg-[#007BFF]" />
            <div className="w-1 h-3 bg-[#00CCFF] animate-pulse" />
          </div>
          <p className="font-mono text-[#E8F4FF] text-[10px] md:text-xs opacity-80 tracking-[0.2em]">
            INTERACTIVE NEURAL GRAPH
          </p>
          <p className="font-mono text-[#007BFF] text-[8px] md:text-[10px] opacity-60 tracking-[0.3em]">
            [ DRAG TO ROTATE ARCHITECTURE ]
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-0 cursor-move">
        <Canvas camera={{ position: [0, 0, 11], fov: 45 }}>
          <fog attach="fog" args={['#020406', 5, 18]} />
          <ambientLight intensity={0.5} />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <WordCloud radius={4.2} />
          </Float>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.8} 
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </section>
  );
}
