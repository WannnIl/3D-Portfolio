"use client";

/**
 * Scene lighting setup for the cybersecurity environment.
 * Uses multiple lights to create atmospheric blue-tinged illumination
 * with subtle rim lighting effects.
 */
export default function Lighting() {
  return (
    <>
      {/* Very low ambient - keeps scene mostly dark */}
      <ambientLight intensity={0.08} color="#0A3354" />

      {/* Main blue point light - behind/above main objects */}
      <pointLight
        position={[0, 6, -5]}
        color="#007BFF"
        intensity={3}
        distance={25}
        decay={2}
      />

      {/* Accent neon light - highlights from the right */}
      <pointLight
        position={[8, 3, 2]}
        color="#00CCFF"
        intensity={1.5}
        distance={15}
        decay={2}
      />

      {/* Subtle back-fill from left */}
      <pointLight
        position={[-8, 2, 0]}
        color="#041A33"
        intensity={2}
        distance={20}
        decay={2}
      />

      {/* Soft white top light for object readability */}
      <directionalLight
        position={[0, 10, 5]}
        color="#C5D0DE"
        intensity={0.15}
      />

      {/* Deep fog for atmospheric depth */}
      <fog attach="fog" args={["#020406", 8, 35]} />
    </>
  );
}
