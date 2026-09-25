"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Loader from "./Loader";
import DeskModel from "./DeskModel";

interface SceneProps {
  onSelectProject: (id: string | null) => void;
}

export default function Scene({ onSelectProject }: SceneProps) {
  return (
    <div className="w-full h-screen bg-neutral-950">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-2, 2, -2]} intensity={2} color="#00ffcc" />
          <pointLight position={[2, 2, 2]} intensity={2} color="#ff0055" />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Interactive Models */}
          <DeskModel onSelectProject={onSelectProject} />

          {/* Camera Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 4} // Limit looking from top
            maxPolarAngle={Math.PI / 2 - 0.1} // Prevent looking below the ground
            minAzimuthAngle={-Math.PI / 3} // Limit horizontal rotation
            maxAzimuthAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
