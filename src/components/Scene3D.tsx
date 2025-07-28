import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Text, 
  Sphere, 
  Box, 
  Torus,
  Stars,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  shape?: 'sphere' | 'box' | 'torus';
  color?: string;
}

// Floating geometric shapes
function FloatingGeometry({ position, shape = 'sphere', color = '#00ff88' }: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const ShapeComponent = useMemo(() => {
    switch (shape) {
      case 'box':
        return <Box args={[0.5, 0.5, 0.5]} />;
      case 'torus':
        return <Torus args={[0.5, 0.2, 16, 100]} />;
      default:
        return <Sphere args={[0.5, 32, 32]} />;
    }
  }, [shape]);

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      position={position}
    >
      <mesh ref={meshRef}>
        {ShapeComponent}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Particle system
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={0.6}
      />
    </points>
  );
}

// 3D Scene content
function Scene3DContent() {
  return (
    <Suspense fallback={null}>
      <Environment preset="sunset" />
      <Stars radius={100} depth={50} count={1000} factor={4} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff0080" intensity={0.3} />
      
      <ParticleSystem />
      
      <FloatingGeometry position={[2, 1, 0]} shape="sphere" color="#00ff88" />
      <FloatingGeometry position={[-2, -1, 0]} shape="box" color="#ff0080" />
      <FloatingGeometry position={[0, 2, -1]} shape="torus" color="#8800ff" />
      <FloatingGeometry position={[3, -0.5, 1]} shape="sphere" color="#ffff00" />
      <FloatingGeometry position={[-1.5, 0.5, 2]} shape="box" color="#00ffff" />
      
      <Text
        position={[0, -1, 0]}
        fontSize={0.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        FUTURE
      </Text>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Suspense>
  );
}

// Main Canvas wrapper
export default function Scene3DCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene3DContent />
      </Canvas>
    </div>
  );
}
