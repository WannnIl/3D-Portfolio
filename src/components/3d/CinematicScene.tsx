"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, useScroll, Image as DreiImage } from "@react-three/drei";
import * as THREE from "three";

export default function CinematicScene() {
  const scroll = useScroll();
  const { viewport } = useThree();
  const textRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const portraitRef = useRef<THREE.Mesh>(null);

  // Animation loop
  useFrame((state) => {
    // 1. Cinematic Scroll: Move text horizontally based on scroll offset
    // scroll.offset is 0 at top, 1 at bottom
    const offset = scroll.offset;
    
    if (textRef.current) {
      // Moves from right to left as you scroll down
      textRef.current.position.x = THREE.MathUtils.lerp(
        textRef.current.position.x,
        -offset * viewport.width * 2, // Multiply for speed
        0.1
      );
    }

    if (portraitRef.current) {
      // Portrait slightly zooms in as you scroll
      const scale = 1 + offset * 0.5;
      portraitRef.current.scale.set(scale, scale, 1);
    }

    // 2. Hover Parallax: Slight rotation based on mouse position
    if (groupRef.current) {
      // state.pointer is normalized (-1 to +1)
      const targetX = (state.pointer.x * viewport.width) / 10;
      const targetY = (state.pointer.y * viewport.height) / 10;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Huge Background Typography */}
      <Text
        ref={textRef}
        position={[viewport.width / 2, 0, -2]}
        fontSize={viewport.width / 4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
        fontWeight="bold"
      >
        ALWAYS GO
      </Text>

      {/* Center Portrait Placeholder */}
      <mesh ref={portraitRef} position={[0, -1, 0]}>
        <planeGeometry args={[viewport.width / 2, viewport.height / 1.2]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.7} />
        {/* Replace this with <DreiImage url="/portrait.png" ... /> later */}
      </mesh>

      {/* Decorative Red Tribal Graphic over eyes (Simulated) */}
      <Text
        position={[0, 0, 0.5]}
        fontSize={1}
        color="#ff0000"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/nosifer/v21/AYcpXPI-8FEuXpY_L91gfw.woff"
      >
        {`><`}
      </Text>
    </group>
  );
}
