"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 20;

export default function CyberNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const { positions, phases, colors } = useMemo(() => {
    const pos = [];
    const ph = [];
    const cols = [];
    const colorNormal = new THREE.Color('#00A86B');
    const colorActive = new THREE.Color('#39FF88');
    
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 30; // -15 to 15
      const y = 0.5 + Math.random() * 1.5;  // 0.5 to 2
      const z = (Math.random() - 0.5) * 20; // -10 to 10
      pos.push(new THREE.Vector3(x, y, z));
      
      ph.push(Math.random() * Math.PI * 2);
      
      // Randomly make a few nodes active
      const isActive = Math.random() > 0.8;
      cols.push(isActive ? colorActive : colorNormal);
    }
    return { positions: pos, phases: ph, colors: cols };
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < NODE_COUNT; i++) {
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, colors[i]);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [dummy, positions, colors]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < NODE_COUNT; i++) {
      dummy.position.copy(positions[i]);
      
      // Pulse scale oscillation
      const scale = 1 + Math.sin(time * 2 + phases[i]) * 0.3;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}
