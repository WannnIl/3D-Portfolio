"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 150;

export default function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random particle data once
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        Math.random() * 8 - 1,
        (Math.random() - 0.5) * 30
      ),
      speed: Math.random() * 0.002 + 0.001,
      drift: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.03 + 0.01,
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsed = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      dummy.position.set(
        p.position.x + Math.sin(elapsed * 0.3 + p.drift) * 0.5,
        p.position.y + Math.sin(elapsed * p.speed * 100 + p.drift) * 0.3,
        p.position.z + Math.cos(elapsed * 0.2 + p.drift) * 0.4
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#062850" transparent opacity={0.4} />
    </instancedMesh>
  );
}
