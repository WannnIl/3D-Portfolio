"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Path {
  start: THREE.Vector3;
  end: THREE.Vector3;
  speed: number;
  progress: number;
}

import { PROJECTS } from "./projects";

const DataPackets: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Define paths dynamically based on project count
  const paths = useMemo<Path[]>(() => {
    const minZ = 15;
    const maxZ = -(PROJECTS.length * 10 + 20);
    const numPaths = Math.max(10, PROJECTS.length * 2);
    
    const p: Path[] = [];
    for (let i = 0; i < numPaths; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        -2 + Math.random() * 6,
        maxZ + Math.random() * (minZ - maxZ)
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        -2 + Math.random() * 6,
        maxZ + Math.random() * (minZ - maxZ)
      );
      p.push({
        start,
        end,
        speed: 0.1 + Math.random() * 0.3,
        progress: Math.random(),
      });
    }
    return p;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      
      // Advance progress
      path.progress += path.speed * delta;
      
      // Loop back to 0 when it reaches 1
      if (path.progress > 1) {
        path.progress = path.progress % 1;
      }
      
      // Interpolate position between start and end
      dummy.position.lerpVectors(path.start, path.end, path.progress);
      dummy.updateMatrix();
      
      // Update instance matrix
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    // Notify Three.js that the instance matrices have been updated
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, paths.length]}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshBasicMaterial color="#00CCFF" toneMapped={false} />
    </instancedMesh>
  );
};

export default DataPackets;
