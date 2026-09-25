"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface NetworkLinesProps {
  nodes?: THREE.Vector3[];
}

import { PROJECTS } from './projects';

// Generate nodes spanning the entire project length dynamically
const generateNetwork = () => {
  const nodeCount = Math.max(30, PROJECTS.length * 6);
  const nodes: THREE.Vector3[] = [];
  const minZ = 15;
  const maxZ = -(PROJECTS.length * 10 + 20);

  for (let i = 0; i < nodeCount; i++) {
    const x = (Math.random() - 0.5) * 30; 
    const y = -2 + Math.random() * 6;
    const z = maxZ + Math.random() * (minZ - maxZ);
    nodes.push(new THREE.Vector3(x, y, z));
  }

  const connections: [number, number][] = [];
  // Connect each node to 2-3 of its closest neighbors
  for (let i = 0; i < nodeCount; i++) {
    const distances = [];
    for (let j = 0; j < nodeCount; j++) {
      if (i !== j) {
        distances.push({ index: j, dist: nodes[i].distanceToSquared(nodes[j]) });
      }
    }
    distances.sort((a, b) => a.dist - b.dist);
    // Add 2 closest connections
    connections.push([i, distances[0].index]);
    connections.push([i, distances[1].index]);
  }
  
  return { nodes, connections };
};

const { nodes: defaultNodes, connections } = generateNetwork();

export default function NetworkLines({ nodes = defaultNodes }: NetworkLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const positionsArray: number[] = [];
    const colorsArray: number[] = [];

    const colorOptions = [
      new THREE.Color("#041A33"), // Primary dark green
      new THREE.Color("#062850"), // Secondary mid green
      new THREE.Color("#007BFF"), // Accent bright green
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
