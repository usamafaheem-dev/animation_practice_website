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

// Procedural Colorful Realistic Butterfly Wing Texture
function createWingTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  
  ctx.clearRect(0, 0, 512, 512);

  // Outer glow / blur for ethereal look
  ctx.shadowColor = 'rgba(244, 63, 94, 0.4)';
  ctx.shadowBlur = 15;

  // Authentic wing shape (bezier curves forming a beautiful monarch-style wing)
  ctx.beginPath();
  ctx.moveTo(20, 256); 
  ctx.bezierCurveTo(80, 20, 380, 30, 480, 150);
  ctx.bezierCurveTo(510, 300, 400, 420, 280, 480);
  ctx.bezierCurveTo(150, 490, 80, 400, 20, 256);
  ctx.closePath();
  
  // Vibrant colorful gradient
  const grad = ctx.createRadialGradient(20, 256, 10, 256, 256, 350);
  grad.addColorStop(0, '#0f172a'); // dark core
  grad.addColorStop(0.2, '#f43f5e'); // hot pink/rose
  grad.addColorStop(0.5, '#a855f7'); // vivid purple
  grad.addColorStop(0.8, '#ec4899'); // pink
  grad.addColorStop(1, '#38bdf8'); // glowing cyan edge
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.shadowBlur = 0; // Turn off shadow

  // Bold perimeter border
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#020617';
  ctx.stroke();

  // Internal organic wing veins
  ctx.beginPath();
  ctx.moveTo(20, 256); ctx.bezierCurveTo(150, 150, 300, 100, 460, 140);
  ctx.moveTo(20, 256); ctx.bezierCurveTo(150, 220, 350, 200, 480, 260);
  ctx.moveTo(20, 256); ctx.bezierCurveTo(150, 280, 300, 350, 400, 420);
  ctx.moveTo(20, 256); ctx.bezierCurveTo(80, 350, 200, 440, 260, 470);
  ctx.lineWidth = 5;
  ctx.stroke();

  // Perimeter majestic wing spots
  const spots = [
    [460,110],[475,170],[470,230],[440,300],
    [390,380],[330,440],[270,460],[200,465],
    [380,210],[330,130] // Inner highlights
  ];
  spots.forEach((p, i) => {
     ctx.fillStyle = i % 2 === 0 ? '#ffffff' : '#67e8f9';
     ctx.beginPath(); 
     ctx.arc(p[0], p[1], Math.random() * 6 + 4, 0, Math.PI*2); 
     ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function Butterfly({ parentPos, offset, scale = 1 }: { parentPos: THREE.Vector3, offset: number, scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Group>(null);
  const rightWing = useRef<THREE.Group>(null);
  
  const wingTexture = useMemo(() => createWingTexture(), []);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + offset;
    if (groupRef.current && leftWing.current && rightWing.current) {
        // Fluttering Path around the snake
      const orbitX = Math.sin(t * 1.2) * 2.5;
      const orbitY = Math.cos(t * 0.8) * 1.5;
      const orbitZ = Math.sin(t * 1.5) * 1.5;
      
      groupRef.current.position.lerp(new THREE.Vector3(
        parentPos.x + orbitX,
        parentPos.y + orbitY + 0.5,
        parentPos.z + orbitZ
      ), 0.05);

      // Flapping wings animation
      const flapSpeed = 20;
      const flapAngle = Math.sin(t * flapSpeed) * 1.0;
      // Because we scaled the left wing by -1, we rotate them both the same way technically, 
      // or inverted depending on exact axis structure.
      leftWing.current.rotation.y = -Math.abs(flapAngle) - 0.2; 
      rightWing.current.rotation.y = Math.abs(flapAngle) + 0.2;

      // Rotate butterfly body to face flight direction
      groupRef.current.rotation.y = Math.atan2(orbitX, orbitZ);
      groupRef.current.rotation.x = Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Dark little butterfly thorax/body */}
      <mesh>
        <capsuleGeometry args={[0.04, 0.2, 4, 8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Right Wing Hinge */}
      <group ref={rightWing}>
         <mesh position={[0.3, 0, 0]}>
           <planeGeometry args={[0.6, 0.6]} />
           <meshStandardMaterial 
             map={wingTexture} 
             transparent 
             alphaTest={0.05} 
             side={THREE.DoubleSide} 
             roughness={0.3} 
             metalness={0.2}
             emissive="#a855f7"
             emissiveIntensity={0.2}
           />
         </mesh>
      </group>

      {/* Left Wing Hinge */}
      <group ref={leftWing}>
         <mesh position={[-0.3, 0, 0]} scale={[-1, 1, 1]}>
           <planeGeometry args={[0.6, 0.6]} />
           <meshStandardMaterial 
             map={wingTexture} 
             transparent 
             alphaTest={0.05} 
             side={THREE.DoubleSide} 
             roughness={0.3} 
             metalness={0.2}
             emissive="#a855f7"
             emissiveIntensity={0.2}
           />
         </mesh>
      </group>
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
      <Butterfly parentPos={snakePos.current} offset={0} scale={1.2} />
      <Butterfly parentPos={snakePos.current} offset={2.5} scale={0.9} />
      <Butterfly parentPos={snakePos.current} offset={5} scale={1.1} />
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
