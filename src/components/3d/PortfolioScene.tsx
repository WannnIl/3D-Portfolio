"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

export default function PortfolioScene() {
  const { viewport } = useThree();
  const leftDeviceRef = useRef<THREE.Group>(null);
  const rightDeviceRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!leftDeviceRef.current || !rightDeviceRef.current) return;

    // Get scroll progress
    // Section 5 is at the bottom. We can calculate its offset.
    // A simple approach is just reading how close we are to the bottom of the page.
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    
    // Progress is 0 when we are 1 window height away from bottom, 1 when at bottom
    // We clamp it between 0 and 1
    const progress = THREE.MathUtils.clamp((scrollY - (maxScroll - window.innerHeight)) / window.innerHeight, 0, 1);
    
    // Easing the progress for smoothness (lerp)
    // Left Device Animation
    const leftTargetX = THREE.MathUtils.lerp(-5, -viewport.width / 4, progress);
    const leftTargetRotY = THREE.MathUtils.lerp(-Math.PI / 4, 0, progress);
    
    leftDeviceRef.current.position.x = THREE.MathUtils.lerp(leftDeviceRef.current.position.x, leftTargetX, 0.1);
    leftDeviceRef.current.rotation.y = THREE.MathUtils.lerp(leftDeviceRef.current.rotation.y, leftTargetRotY, 0.1);

    // Right Device Animation
    const rightTargetX = THREE.MathUtils.lerp(5, viewport.width / 4, progress);
    const rightTargetRotY = THREE.MathUtils.lerp(Math.PI / 4, 0, progress);
    
    rightDeviceRef.current.position.x = THREE.MathUtils.lerp(rightDeviceRef.current.position.x, rightTargetX, 0.1);
    rightDeviceRef.current.rotation.y = THREE.MathUtils.lerp(rightDeviceRef.current.rotation.y, rightTargetRotY, 0.1);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ff0000" />

      {/* DEVICE 1: CODENARTS */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <group ref={leftDeviceRef} position={[-5, -2, -5]} rotation={[0, -Math.PI / 4, 0]}>
          {/* Tablet/Screen Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 2, 0.2]} />
            <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Screen Content */}
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <Text
            position={[0, 0, 0.12]}
            fontSize={0.3}
            color="#ff0000"
          >
            CODENARTS
          </Text>
        </group>
      </Float>

      {/* DEVICE 2: AZ-DIGITAL-VENTURES */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1.2}>
        <group ref={rightDeviceRef} position={[5, -2, -5]} rotation={[0, Math.PI / 4, 0]}>
          {/* Monitor Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.5, 2.2, 0.2]} />
            <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -1.3, 0]}>
             <boxGeometry args={[0.5, 0.6, 0.2]} />
             <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[0, -1.6, 0]}>
             <boxGeometry args={[1.5, 0.1, 0.8]} />
             <meshStandardMaterial color="#111111" />
          </mesh>

          {/* Screen Content */}
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[3.3, 2.0]} />
            <meshBasicMaterial color="#0a0000" />
          </mesh>
          <Text
            position={[0, 0, 0.12]}
            fontSize={0.25}
            color="#ffffff"
          >
            AZ-DIGITAL-VENTURES
          </Text>
        </group>
      </Float>
    </>
  );
}
