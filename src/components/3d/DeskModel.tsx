"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface DeskModelProps {
  onSelectProject: (id: string | null) => void;
}

export default function DeskModel({ onSelectProject }: DeskModelProps) {
  const monitorRef = useRef<Mesh>(null);
  const serverRef = useRef<Mesh>(null);

  // Subtle floating animation for placeholders
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (monitorRef.current) monitorRef.current.position.y = Math.sin(t) * 0.1 + 0.5;
    if (serverRef.current) serverRef.current.position.y = Math.cos(t) * 0.1 + 0.5;
  });

  const handlePointerOver = (e: any, activeColor: string) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    e.object.material.color.set(activeColor);
    e.object.material.emissive.set(activeColor);
  };

  const handlePointerOut = (e: any, defaultColor: string) => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
    e.object.material.color.set(defaultColor);
    e.object.material.emissive.set("#000000");
  };

  return (
    <group>
      {/* Table Placeholder */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[5, 0.2, 3]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Monitor Placeholder (Web Dev) */}
      <mesh
        ref={monitorRef}
        position={[-1, 0.5, -0.5]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject("web-dev");
        }}
        onPointerOver={(e) => handlePointerOver(e, "#00ffcc")}
        onPointerOut={(e) => handlePointerOut(e, "#0088aa")}
      >
        <boxGeometry args={[1.5, 1, 0.2]} />
        <meshStandardMaterial color="#0088aa" emissive="#000000" emissiveIntensity={0.5} />
      </mesh>

      {/* Server Placeholder (Security) */}
      <mesh
        ref={serverRef}
        position={[1.5, 0.5, 0]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject("security");
        }}
        onPointerOver={(e) => handlePointerOver(e, "#ff0055")}
        onPointerOut={(e) => handlePointerOut(e, "#aa0033")}
      >
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#aa0033" emissive="#000000" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
