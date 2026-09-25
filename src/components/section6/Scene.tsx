"use client";

import Terrain from "./Terrain";
import CyberNodes from "./CyberNodes";
import NetworkLines from "./NetworkLines";
import DataPackets from "./DataPackets";
import { PROJECTS } from "./projects";
import Particles from "./Particles";
import Lighting from "./Lighting";
import CameraController from "./CameraController";
import CyberBook from "./CyberBook";
import { s6State } from "./store";

/**
 * Main 3D scene composition for the cybersecurity environment.
 * Assembles all sub-components with proper positioning and spacing.
 */
export default function Scene() {
  return (
    <>
      <Lighting />
      <CameraController />

      {/* Digital Terrain — network topology landscape */}
      <Terrain />

      {/* Network Infrastructure */}
      <CyberNodes />
      <NetworkLines />
      <DataPackets />

      {/* Project Books */}
      {PROJECTS.map((proj, i) => (
        <CyberBook
          key={i}
          index={i}
          theme={proj.theme}
          title={proj.title}
          subtitle={proj.subtitle}
          fileNumber={proj.id}
          status={proj.stack}
        />
      ))}

      {/* Floating digital particles */}
      <Particles />
    </>
  );
}
