"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface NetworkLinesProps {
  nodes?: THREE.Vector3[];
}

// Internal node positions forming an organic network topology
const defaultNodes = [
  new THREE.Vector3(-5, -2, -1),
  new THREE.Vector3(-4, 3, 0),
  new THREE.Vector3(-3, 0, 2),
  new THREE.Vector3(-2, -3, -2),
  new THREE.Vector3(-1, 2, 1),
  new THREE.Vector3(0, -1, -3),
  new THREE.Vector3(1, 3, -1),
  new THREE.Vector3(2, -2, 2),
  new THREE.Vector3(3, 1, 0),
  new THREE.Vector3(4, -3, -1),
  new THREE.Vector3(5, 2, 1),
  new THREE.Vector3(0, 0, 3),
  new THREE.Vector3(-2, 4, -2),
  new THREE.Vector3(3, 4, 2),
  new THREE.Vector3(-4, -4, 2),
];

// About ~30 connections (pairs of node indices)
const connections = [
  [0, 2], [0, 3], [0, 14],
  [1, 2], [1, 4], [1, 12],
  [2, 4], [2, 5], [2, 11],
  [3, 5], [3, 7], [3, 14],
  [4, 6], [4, 11], [4, 12],
  [5, 7], [5, 8], [5, 11],
  [6, 8], [6, 10], [6, 13],
  [7, 9], [7, 8], [7, 14],
  [8, 10], [8, 9], [8, 13],
  [9, 10], [9, 14],
  [10, 13],
  [11, 13], [11, 12]
];

export default function NetworkLines({ nodes = defaultNodes }: NetworkLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const positionsArray: number[] = [];
    const colorsArray: number[] = [];

    const colorOptions = [
      new THREE.Color("#062D18"), // Primary dark green
      new THREE.Color("#073D20"), // Secondary mid green
      new THREE.Color("#00A86B"), // Accent bright green
    ];

    connections.forEach(([startIdx, endIdx]) => {
      const start = nodes[startIdx];
      const end = nodes[endIdx];

      if (!start || !end) return;

      positionsArray.push(start.x, start.y, start.z);
      positionsArray.push(end.x, end.y, end.z);

      // Randomly assign a color to this specific connection line
      const rand = Math.random();
      let color: THREE.Color;
      
      if (rand < 0.70) {
        color = colorOptions[0]; // 70% primary
      } else if (rand < 0.95) {
        color = colorOptions[1]; // 25% secondary
      } else {
        color = colorOptions[2]; // 5% accent
      }

      // Add the same color for both vertices of the line segment
      colorsArray.push(color.r, color.g, color.b);
      colorsArray.push(color.r, color.g, color.b);
    });

    return {
      positions: new Float32Array(positionsArray),
      colors: new Float32Array(colorsArray),
    };
  }, [nodes]);

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors={true} transparent opacity={0.7} linewidth={1} />
    </lineSegments>
  );
}
