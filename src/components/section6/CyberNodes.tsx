"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { PROJECTS } from './projects';

export default function CyberNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Scale the number of nodes with the project count
  const nodeCount = Math.max(20, PROJECTS.length * 4);
  
  const { positions, phases, colors } = useMemo(() => {
    const pos = [];
    const ph = [];
    const cols = [];
    const colorNormal = new THREE.Color('#007BFF');
    const colorActive = new THREE.Color('#00CCFF');
    
    // Spread z from +15 down to deep negative Z
    const minZ = 15;
    const maxZ = -(PROJECTS.length * 10 + 20);
    
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 30; // -15 to 15
      const y = 0.5 + Math.random() * 2.5;  // 0.5 to 3
      const z = maxZ + Math.random() * (minZ - maxZ);
      pos.push(new THREE.Vector3(x, y, z));
      
      ph.push(Math.random() * Math.PI * 2);
      
      const isActive = Math.random() > 0.8;
      cols.push(isActive ? colorActive : colorNormal);
    }
    return { positions: pos, phases: ph, colors: cols };
  }, [nodeCount]);

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < nodeCount; i++) {
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
    
    for (let i = 0; i < nodeCount; i++) {
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
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}
