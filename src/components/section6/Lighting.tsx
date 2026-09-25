"use client";

/**
 * Scene lighting setup for the cybersecurity environment.
 * Uses multiple lights to create atmospheric green-tinged illumination
 * with subtle rim lighting effects.
 */
export default function Lighting() {
  return (
    <>
      {/* Very low ambient - keeps scene mostly dark */}
      <ambientLight intensity={0.08} color="#0A5429" />

      {/* Main green point light - behind/above main objects */}
      <pointLight
        position={[0, 6, -5]}
        color="#00A86B"
        intensity={3}
        distance={25}
        decay={2}
      />

      {/* Accent neon light - highlights from the right */}
      <pointLight
        position={[8, 3, 2]}
        color="#39FF88"
        intensity={1.5}
        distance={15}
        decay={2}
      />

      {/* Subtle back-fill from left */}
      <pointLight
        position={[-8, 2, 0]}
        color="#062D18"
        intensity={2}
        distance={20}
        decay={2}
      />

      {/* Soft white top light for object readability */}
      <directionalLight
        position={[0, 10, 5]}
        color="#C5DED0"
        intensity={0.15}
      />

      {/* Deep fog for atmospheric depth */}
      <fog attach="fog" args={["#020604", 8, 35]} />
    </>
  );
}
