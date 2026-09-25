"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Image } from "@react-three/drei";
import * as THREE from "three";

export default function HeroScene() {
  const { viewport } = useThree();
  
  const groupRef = useRef<THREE.Group>(null);
  const textBehindRef = useRef<THREE.Mesh>(null);
  const textFrontRef = useRef<THREE.Mesh>(null);
  const portraitRef = useRef<THREE.Group>(null);
  const tribalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Read native scroll for global parallax
    const scrollY = window.scrollY;
    // Normalize scroll (assume max scroll for hero effect is 1000px)
    const offset = Math.min(scrollY / 1000, 1);

    // 1. Parallax Typography (Moves horizontally based on scroll)
    if (textBehindRef.current) {
      textBehindRef.current.position.x = THREE.MathUtils.lerp(
        textBehindRef.current.position.x,
        -offset * viewport.width * 1.5,
        0.1
      );
    }
    
    if (textFrontRef.current) {
      textFrontRef.current.position.x = THREE.MathUtils.lerp(
        textFrontRef.current.position.x,
        offset * viewport.width * 1.5,
        0.1
      );
    }

    // 2. Portrait Scaling & Fading on scroll
    if (portraitRef.current) {
      const scale = 1 + offset * 0.8;
      portraitRef.current.scale.set(scale, scale, 1);
    }

    // 3. Mouse Parallax (Tilting the whole group)
    if (groupRef.current) {
      const targetX = (state.pointer.x * viewport.width) / 20;
      const targetY = (state.pointer.y * viewport.height) / 20;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* BACKGROUND TEXT */}
      <Text
        ref={textBehindRef}
        position={[0, 0, -2]}
        fontSize={viewport.width / 8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        fontWeight="bold"
      >
        THIS WILL FEEL
      </Text>

      {/* PORTRAIT IMAGE */}
      <group ref={portraitRef} position={[0, -0.5, 0]}>
        <Image
          url="/profile.jpg"
          scale={[viewport.width / 3, viewport.height / 1.5]}
          transparent
          opacity={0.8}
        />
      </group>

      {/* TRIBAL GRAPHIC OVERLAY */}
      <Text
        ref={tribalRef}
        position={[0, 0.5, 0.5]}
        fontSize={viewport.width / 15}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
      >
        {`><`}
      </Text>

      {/* FOREGROUND TEXT */}
      <Text
        ref={textFrontRef}
        position={[0, -viewport.height / 4, 1.5]}
        fontSize={viewport.width / 8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        fillOpacity={0} // Outline text effect
        strokeWidth={0.02}
        strokeColor="#00ff00"
      >
        DIFFERENT
      </Text>
    </group>
  );
}
