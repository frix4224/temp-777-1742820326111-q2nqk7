import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';
import { Vector3 } from 'three';

const FluidMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle movement based on time
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
      
      // Scale animation
      const scale = 15 + Math.sin(clock.getElapsedTime() * 0.1) * 0.5;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Follow mouse with slight delay
      const targetX = (mouse.x * viewport.width) / 25;
      const targetY = (mouse.y * viewport.height) / 25;
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={[15, 15, 15]}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={3}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

const FluidSimulation: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        <FluidMesh />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default FluidSimulation;