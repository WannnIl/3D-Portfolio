"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function ExpertiseScene() {
  const { viewport } = useThree();
  const silhouetteRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Hover effect for the silhouette based on mouse
    if (silhouetteRef.current) {
      const targetX = (state.pointer.x * viewport.width) / 10;
      const targetY = (state.pointer.y * viewport.height) / 10;
      
      silhouetteRef.current.rotation.y = THREE.MathUtils.lerp(silhouetteRef.current.rotation.y, targetX, 0.05);
      silhouetteRef.current.rotation.x = THREE.MathUtils.lerp(silhouetteRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <>
      <color attach="background" args={["#220000"]} />
      <fog attach="fog" args={["#aa0000", 2, 10]} />
      <ambientLight intensity={0.5} color="#ffaaaa" />
      <directionalLight position={[0, 10, 5]} intensity={2} color="#ff0000" />
      <pointLight position={[0, -5, 0]} intensity={5} color="#ff0000" />

      {/* 3D Silhouette (Falling Man Placeholder) */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={3}>
        <group ref={silhouetteRef} position={[0, 0, 0]} rotation={[0.5, 0.5, 0]}>
          {/* Head */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#050000" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Torso */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 1.5, 0.4]} />
            <meshStandardMaterial color="#050000" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Arm Left */}
          <mesh position={[-0.6, 0.2, 0.2]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
            <meshStandardMaterial color="#050000" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Arm Right */}
          <mesh position={[0.6, 0.5, -0.2]} rotation={[0, 0, 0.8]}>
            <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
            <meshStandardMaterial color="#050000" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Legs */}
          <mesh position={[-0.25, -1.2, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.12, 0.1, 1.2, 16]} />
            <meshStandardMaterial color="#050000" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0.25, -1.0, 0.2]} rotation={[0.4, 0, 0.2]}>
            <cylinderGeometry args={[0.12, 0.1, 1.2, 16]} />
            <meshStandardMaterial color="#050000" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </Float>
    </>
  );
}
