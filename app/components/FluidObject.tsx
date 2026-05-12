"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { TorusKnot, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Type augmentation for JSX tags
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

function Butterfly({ parentPos, offset }: { parentPos: THREE.Vector3, offset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + offset;
    if (groupRef.current && leftWing.current && rightWing.current) {
        // Fluttering Path around the snake
      const orbitX = Math.sin(t * 1.2) * 2.5;
      const orbitY = Math.cos(t * 0.8) * 1.5;
      const orbitZ = Math.sin(t * 1.5) * 1;
      
      groupRef.current.position.lerp(new THREE.Vector3(
        parentPos.x + orbitX,
        parentPos.y + orbitY,
        parentPos.z + orbitZ
      ), 0.05);

      // Flapping wings animation
      const flapSpeed = 15;
      const flapAngle = Math.sin(t * flapSpeed) * 0.8;
      leftWing.current.rotation.y = flapAngle;
      rightWing.current.rotation.y = -flapAngle;

      groupRef.current.rotation.y = Math.atan2(orbitX, orbitZ);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Left Wing */}
      <mesh ref={leftWing} position={[-0.15, 0, 0]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="#fb7185" side={THREE.DoubleSide} emissive="#fb7185" emissiveIntensity={0.5} />
      </mesh>
      {/* Right Wing */}
      <mesh ref={rightWing} position={[0.15, 0, 0]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="#fb7185" side={THREE.DoubleSide} emissive="#fb7185" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function AnimatedSnake() {
  const meshRef = useRef<THREE.Mesh>(null);
  const snakePos = useRef(new THREE.Vector3());

  useFrame((state: any) => {
    const { mouse, clock, viewport } = state;
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const boundX = (viewport.width * 0.4);
      const boundY = (viewport.height * 0.4);

      // Increase movement range while staying in the 80% box
      const targetX = Math.sin(t * 0.45) * (boundX * 0.6);
      const targetY = Math.cos(t * 0.55) * (boundY * 0.6);
      const targetZ = Math.sin(t * 0.6) * 1.5; 
      
      const mouseX = mouse.x * (boundX * 0.4);
      const mouseY = mouse.y * (boundY * 0.4);
      
      const nextX = THREE.MathUtils.lerp(meshRef.current.position.x, targetX + mouseX, 0.04);
      const nextY = THREE.MathUtils.lerp(meshRef.current.position.y, targetY + mouseY, 0.04);
      
      meshRef.current.position.x = Math.max(-boundX, Math.min(boundX, nextX));
      meshRef.current.position.y = Math.max(-boundY, Math.min(boundY, nextY));
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.04);
      
      snakePos.current.copy(meshRef.current.position);
      
      meshRef.current.rotation.x = t * 0.5;
      meshRef.current.rotation.y = t * 0.7;
    }
  });

  return (
    <group>
      <TorusKnot ref={meshRef} args={[1, 0.2, 200, 40, 2, 5]} scale={1.2}>
        <meshStandardMaterial
          color="#ff75a5"
          metalness={0.8}
          roughness={0.2}
          emissive="#fb7185"
          emissiveIntensity={0.5}
        />
      </TorusKnot>
      {/* Butterflies Fluttering around the Snake */}
      <Butterfly parentPos={snakePos.current} offset={0} />
      <Butterfly parentPos={snakePos.current} offset={2.5} />
      <Butterfly parentPos={snakePos.current} offset={5} />
    </group>
  );
}

export default function FluidObject() {
  return (
    <div className="w-full h-full relative z-20">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <spotLight position={[10, 10, 10]} intensity={5} color="#ffffff" />
        <pointLight position={[-10, 5, 5]} intensity={4} color="#fb7185" />
        <pointLight position={[5, -5, 5]} intensity={3} color="#22d3ee" />
        
        <AnimatedSnake />
        
        <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={25} blur={3} far={6} />
      </Canvas>
    </div>
  );
}
