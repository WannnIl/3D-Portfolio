"use client";

import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-lg">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-foreground">
          Loading 3D Assets... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
}
