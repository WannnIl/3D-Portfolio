"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface CyberBookProps {
  index: number;
  title: string;
  subtitle: string;
  fileNumber: string;
  status: string;
  theme: string;
}

export default function CyberBook({
  index,
  title,
  subtitle,
  fileNumber,
  status,
  theme,
}: CyberBookProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  const themeColor = theme === 'Network' ? '#007BFF' : 
                     theme === 'Threat' ? '#00CCFF' : 
                     theme === 'Encryption' ? '#0099FF' : '#00aaff';
                     
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Position books in a zigzag along the Z-axis
    // Book 0: z = 8, x = -1.5
    // Book 1: z = 0, x = 1.5
    // Book 2: z = -8, x = -1.5
    // Book 3: z = -16, x = 1.5
    
    const baseZ = 8 - index * 8;
    const baseX = index % 2 === 0 ? -1.5 : 1.5;
    
    // Add subtle floating animation
    const floatY = Math.sin(t * 2 + index) * 0.15;
    const floatRot = Math.sin(t * 0.5 + index) * 0.05;
    
    groupRef.current.position.lerp(new THREE.Vector3(baseX, 2 + floatY, baseZ), 0.1);
    
    // Slightly rotate towards center
    const targetRot = new THREE.Euler(0, index % 2 === 0 ? 0.1 + floatRot : -0.1 + floatRot, 0);
    const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
    groupRef.current.quaternion.slerp(targetQuat, 0.1);
  });

  return (
    <group ref={groupRef}>
      {/* Cover */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 4, 0.1]} />
        <meshStandardMaterial color="#03060A" roughness={0.7} metalness={0.2} />
        <Edges scale={1} threshold={15}>
          <lineBasicMaterial color={themeColor} />
        </Edges>
      </mesh>
      
      {/* Pages block */}
      <mesh position={[0, 0, -0.25]}>
        <boxGeometry args={[2.8, 3.8, 0.4]} />
        <meshStandardMaterial color="#050A15" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Text on Cover */}
      <group position={[0, 0, 0.06]}>
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.25}
          color={themeColor}
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {subtitle}
        </Text>
        <Text
          position={[-1.2, -1.5, 0]}
          fontSize={0.15}
          color="#888888"
          anchorX="left"
          anchorY="middle"
        >
          FILE: {fileNumber}
        </Text>
        <Text
          position={[1.2, -1.5, 0]}
          fontSize={0.15}
          color={themeColor}
          anchorX="right"
          anchorY="middle"
        >
          [{status}]
        </Text>
      </group>
    </group>
  );
}
