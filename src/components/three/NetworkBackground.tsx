"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function NetworkParticles(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    // Create a cloud of points
    for (let i = 0; i < count; i++) {
      const r = 20 * Math.cbrt(Math.random()); // Spread them out
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  });

  const shouldReduceMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!ref.current || shouldReduceMotion) return;
    
    // Gentle rotation
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;

    // Mouse interaction (The "Signal")
    // We move the entire cloud slightly based on mouse
    const x = state.pointer.x * 2;
    const y = state.pointer.y * 2;
    
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x, 0.1);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y, 0.1);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#64FFDA"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function ConnectionLines() {
  // A simplified "network" effect using lines connecting random points would be computationally expensive 
  // if dynamic. For "Maximalist" performance, we stick to the particle cloud or use a shader.
  // However, let's add a secondary layer of "Data Nodes" that are larger.
  
  const ref = useRef<THREE.Points>(null);
  const [nodes] = useState(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
       const x = (Math.random() - 0.5) * 20;
       const y = (Math.random() - 0.5) * 20;
       const z = (Math.random() - 0.5) * 10;
       positions[i * 3] = x;
       positions[i * 3 + 1] = y;
       positions[i * 3 + 2] = z;
    }
    return positions;
  });

  useFrame((state, delta) => {
      if (ref.current) {
          ref.current.rotation.y += delta / 10;
      }
  });

  return (
      <Points ref={ref} positions={nodes} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FFFFFF"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
  )
}

export default function NetworkBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <NetworkParticles />
        <ConnectionLines />
        <Preload all />
      </Canvas>
    </div>
  );
}

