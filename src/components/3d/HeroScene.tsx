"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Image } from "@react-three/drei";
import * as THREE from "three";

const REPEATED_TEXT = Array(50).fill("THIS WILL FEEL").join("      ");

export default function HeroScene() {
  const { viewport } = useThree();
  
  const groupRef = useRef<THREE.Group>(null);
  const textBehindRef = useRef<THREE.Mesh>(null);
  const textFrontRef = useRef<THREE.Mesh>(null);
  const portraitRef = useRef<THREE.Group>(null);
  const tribalRef = useRef<THREE.Mesh>(null);

  const positionX = useRef(0); // For continuous marquee
  const rawScrollVelocity = useRef(0); // Raw instantaneous velocity
  const smoothVelocity = useRef(0); // Smoothed velocity for rendering

    useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Accumulate raw wheel delta. e.deltaY is positive (down) or negative (up).
      rawScrollVelocity.current += e.deltaY * 0.05; 
    };
    
    const handleTouchMove = () => {
       // Simple boost for mobile swipe
       rawScrollVelocity.current += 5;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useFrame((state, delta) => {
    const scrollY = window.scrollY;
    // Normalize scroll for scaling effects (clamped 0 to 1)
    const offset = Math.min(Math.max(scrollY / 1000, 0), 1);

    // Smooth the raw velocity
    smoothVelocity.current = THREE.MathUtils.lerp(smoothVelocity.current, rawScrollVelocity.current, 0.1);
    
    // Decay raw velocity back to 0 every frame so it doesn't spin forever
    rawScrollVelocity.current = THREE.MathUtils.lerp(rawScrollVelocity.current, 0, 0.15);

    // --- 1. CONTINUOUS MARQUEE ("THIS WILL FEEL") ---
    // Base speed + Boost from scroll wheel (absolute value so scrolling up OR down increases speed)
    // Works perfectly even when scrollY is locked at 0 (top of page)!
    const speed = 0.8 + Math.abs(smoothVelocity.current) * 0.5;
    positionX.current += speed * delta;

    if (textBehindRef.current) {
      // Move right continuously
      textBehindRef.current.position.x = viewport.width / 2 + positionX.current;
      textBehindRef.current.renderOrder = -10;
    }

    // --- 2. FOREGROUND TEXT ("DIFFERENT") ---
    // Custom animation: Moves towards the camera (Z increases) and fades/drops
    if (textFrontRef.current) {
      // Move towards the viewer on scroll (Z axis)
      textFrontRef.current.position.z = THREE.MathUtils.lerp(
        textFrontRef.current.position.z,
        1.5 + offset * 15,
        0.1
      );
      // Drop slightly down on Y axis
      textFrontRef.current.position.y = THREE.MathUtils.lerp(
        textFrontRef.current.position.y,
        -viewport.height / 4 - offset * 3,
        0.1
      );
      // Keep horizontally centered (remove X parallax)
      textFrontRef.current.position.x = 0;
      textFrontRef.current.renderOrder = 10;
    }

    // --- 3. PORTRAIT SCALING & FADING ---
    if (portraitRef.current) {
      const scale = 1 + offset * 0.8;
      portraitRef.current.scale.set(scale, scale, 1);
    }

    // --- 4. MOUSE PARALLAX (Tilting the whole group) ---
    if (groupRef.current) {
      const targetX = (state.pointer.x * viewport.width) / 20;
      const targetY = (state.pointer.y * viewport.height) / 20;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* BACKGROUND TEXT */}
      <Text
        ref={textBehindRef}
        position={[0, 0, -2]}
        fontSize={viewport.width / 8}
        color="#ffffff"
        anchorX="right" // Anchor right so it extends endlessly to the left
        anchorY="middle"
        letterSpacing={0.05}
        fontWeight="bold"
        whiteSpace="nowrap"
      >
        {REPEATED_TEXT}
      </Text>

      {/* PORTRAIT IMAGE */}
      <group ref={portraitRef} position={[0, 0, 0]}>
        <Image
          url="/profile.png"
          scale={[viewport.width / 3, viewport.height / 1.5]}
          transparent
        />
      </group>

      {/* TRIBAL GRAPHIC OVERLAY */}
      <Text
        ref={tribalRef}
        position={[0, 0.5, 0.5]}
        fontSize={viewport.width / 15}
        color="#00aaff"
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
        strokeColor="#00aaff"
      >
        DIFFERENT
      </Text>
    </group>
  );
}
