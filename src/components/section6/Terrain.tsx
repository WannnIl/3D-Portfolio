"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TerrainProps {
  isMobile?: boolean;
}

import { PROJECTS } from './projects';

const Terrain: React.FC<TerrainProps> = ({ isMobile = false }) => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);

  // DRASTICALLY reduced segments to fix stuttering / performance issues
  // The terrain still looks good as a low-poly wireframe, but with 10x less vertices to calculate per frame.
  const segmentsX = isMobile ? 15 : 25;
  const width = 40;
  
  // Dynamically calculate length based on the number of projects.
  const length = Math.max(100, PROJECTS.length * 10 + 60);
  const segmentsZ = Math.floor((length / width) * segmentsX);

  const { wireframeGeo, colorBase, colorHighlight } = useMemo(() => {
    const planeGeo = new THREE.PlaneGeometry(width, length, segmentsX, segmentsZ);
    planeGeo.rotateX(-Math.PI / 2);
    
    // Offset the plane so it starts slightly behind the camera (z=20) and goes deep into the negative Z
    const zOffset = 20 - length / 2;
    planeGeo.translate(0, 0, zOffset);
    
    const wireframe = new THREE.WireframeGeometry(planeGeo);
    
    return { 
      wireframeGeo: wireframe,
      colorBase: new THREE.Color('#062850'),
      colorHighlight: new THREE.Color('#007BFF')
    };
  }, [segmentsX, segmentsZ, width, length]);

  // Animate the terrain heights and colors on every frame
  useFrame((_, delta) => {
    timeRef.current += delta * 0.02;
    const t = timeRef.current;
    
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      
      // Ensure color attribute exists
      if (!lineRef.current.geometry.attributes.color) {
        lineRef.current.geometry.setAttribute(
          'color', 
          new THREE.BufferAttribute(new Float32Array(positions.count * 3), 3)
        );
      }
      
      const colors = lineRef.current.geometry.attributes.color;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        
        // Procedurally displace vertex heights using layered noise-like functions
        const y = Math.sin(x * 0.2 + t) * Math.cos(z * 0.2 + t) * 1.5 + 
                  Math.sin(x * 0.5 - t + z * 0.5) * 0.5;
                  
        positions.setY(i, y);
        
        // Map height to a color gradient between base and highlight
        // Normalize y to roughly 0-1 range based on the amplitude
        const h = THREE.MathUtils.clamp((y + 2) / 4, 0, 1);
        const r = THREE.MathUtils.lerp(colorBase.r, colorHighlight.r, h);
        const g = THREE.MathUtils.lerp(colorBase.g, colorHighlight.g, h);
        const b = THREE.MathUtils.lerp(colorBase.b, colorHighlight.b, h);
        
        colors.setXYZ(i, r, g, b);
      }
      
      // Notify Three.js that the buffers need to be sent to the GPU
      positions.needsUpdate = true;
      colors.needsUpdate = true;
    }
  });

  return (
    <lineSegments 
      ref={lineRef} 
      geometry={wireframeGeo} 
      position={[0, -1.5, 0]}
    >
      <lineBasicMaterial vertexColors={true} transparent opacity={0.8} />
    </lineSegments>
  );
};

export default Terrain;
