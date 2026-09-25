"use client";

import Terrain from "./Terrain";
import CyberNodes from "./CyberNodes";
import NetworkLines from "./NetworkLines";
import DataPackets from "./DataPackets";
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

      {/* Major Cybersecurity Objects — replaced by books */}
      <CyberBook 
        index={0} 
        theme="Network" 
        title="NETWORK" 
        subtitle="SECURITY" 
        fileNumber="FILE 01" 
        status="SECURE" 
      />
      <CyberBook 
        index={1} 
        theme="Threat" 
        title="THREAT" 
        subtitle="DETECTION" 
        fileNumber="FILE 02" 
        status="MONITORING" 
      />
      <CyberBook 
        index={2} 
        theme="Encryption" 
        title="ENCRYPTION" 
        subtitle="PROTECTION" 
        fileNumber="FILE 03" 
        status="ENCRYPTED" 
      />
      <CyberBook 
        index={3} 
        theme="Defense" 
        title="DIGITAL" 
        subtitle="DEFENSE" 
        fileNumber="FILE 04" 
        status="ACTIVE" 
      />

      {/* Floating digital particles */}
      <Particles />
    </>
  );
}
