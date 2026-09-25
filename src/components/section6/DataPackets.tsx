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

const DataPackets: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Define ~5 paths with staggered starting progress and slightly different speeds
  const paths = useMemo<Path[]>(() => {
    return [
      { start: new THREE.Vector3(-3, 1, -2), end: new THREE.Vector3(2, -1, 3), speed: 0.3, progress: 0.1 },
      { start: new THREE.Vector3(4, -2, 1), end: new THREE.Vector3(-2, 2, -1), speed: 0.4, progress: 0.6 },
      { start: new THREE.Vector3(-1, 3, 2), end: new THREE.Vector3(3, -2, -3), speed: 0.25, progress: 0.3 },
      { start: new THREE.Vector3(2, 0, -4), end: new THREE.Vector3(-3, 1, 2), speed: 0.35, progress: 0.8 },
      { start: new THREE.Vector3(-4, -1, 0), end: new THREE.Vector3(1, 2, 4), speed: 0.2, progress: 0.4 },
    ];
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
      <meshBasicMaterial color="#39FF88" toneMapped={false} />
    </instancedMesh>
  );
};

export default DataPackets;
