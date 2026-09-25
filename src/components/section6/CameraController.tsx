"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { s6State } from "./store";

/**
 * Cinematic camera controller with mouse parallax and slow drift.
 * Reads mouse position from pointer events and applies very subtle rotation.
 */
export default function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ rotX: 0, rotY: 0 });

  useFrame((state) => {
    // Get normalized mouse position (-1 to 1)
    const mx = state.pointer.x;
    const my = state.pointer.y;

    mouseRef.current.x = mx;
    mouseRef.current.y = my;

    // Very subtle mouse parallax (max ±0.03 radians)
    targetRef.current.rotY = mx * 0.03;
    targetRef.current.rotX = -my * 0.02;

    const progress = s6State.progress;
    const elapsed = state.clock.elapsedTime;

    // The camera starts far back at z=18, flies in to z=-75 to pass 10 books.
    // Total travel distance is 93 units over the scroll.
    const targetZ = THREE.MathUtils.lerp(18, -75, progress);
    
    // Keep panning minimal so we stay in the center aisle
    const targetX = 0;
    
    // Keep camera relatively low
    const baseRotX = -0.15; // slight downward look
    const isMobile = window.innerWidth < 768;
    const baseRotY = 0;

    // Slow cinematic drift
    const driftX = Math.sin(elapsed * 0.1) * 0.3;
    const driftZ = Math.cos(elapsed * 0.08) * 0.2;

    // Smooth interpolation for rotation
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      baseRotY + targetRef.current.rotY,
      0.05
    );
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      baseRotX + targetRef.current.rotX,
      0.05
    );

    // Smooth interpolation for position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + driftX, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + driftZ, 0.05);
  });

  return null;
}
