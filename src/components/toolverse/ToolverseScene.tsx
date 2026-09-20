import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { CategoryMeta } from '@/types';

interface WorldNodeProps {
  category: CategoryMeta;
  position: [number, number, number];
  index: number;
  onHover: (index: number | null) => void;
  hovered: boolean;
}

function WorldNode({ category, position, index, onHover, hovered }: WorldNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const color = useMemo(() => new THREE.Color(category.color), [category.color]);

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current || !ringRef.current) return;
    const t = state.clock.getElapsedTime();
    const offset = index * 0.7;

    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + offset) * 0.15;
    meshRef.current.rotation.y = t * 0.3 + offset;
    meshRef.current.rotation.x = t * 0.15;

    const targetScale = hovered ? 1.25 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    ringRef.current.rotation.z = t * 0.4 + offset;
    ringRef.current.rotation.x = Math.PI / 2;
    const ringScale = hovered ? 1.5 : 1.2;
    ringRef.current.scale.lerp(new THREE.Vector3(ringScale, ringScale, ringScale), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(index);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Core octahedron */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.3}
          metalness={0.7}
          roughness={0.2}
          flatShading
        />
      </mesh>

      {/* Outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.7, 0.015, 8, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          transparent
          opacity={hovered ? 0.8 : 0.4}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh scale={hovered ? 1.1 : 0.9}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.08 : 0.04} />
      </mesh>

      {/* Light */}
      <pointLight color={color} intensity={hovered ? 2 : 0.8} distance={3} />
    </group>
  );
}

interface ToolverseSceneProps {
  onHover: (index: number | null) => void;
  hoveredIndex: number | null;
  categories: CategoryMeta[];
}

export function ToolverseScene({ onHover, hoveredIndex, categories }: ToolverseSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const radius = 3;
    return categories.map((_, i) => {
      const angle = (i / categories.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(i * 0.5) * 0.3;
      return [x, y, z] as [number, number, number];
    });
  }, [categories]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#1de2c8" />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#8b5cf6" />

      <group ref={groupRef}>
        {categories.map((cat, i) => (
          <WorldNode
            key={cat.id}
            category={cat}
            position={positions[i]}
            index={i}
            onHover={onHover}
            hovered={hoveredIndex === i}
          />
        ))}

        {/* Central core */}
        <CentralCore hovered={hoveredIndex !== null} />
      </group>

      {/* Particle field */}
      <ParticleField />
    </>
  );
}

function CentralCore({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.2;
    ref.current.rotation.x = t * 0.1;
    const scale = hovered ? 0.55 : 0.5;
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#1de2c8"
        emissive="#1de2c8"
        emissiveIntensity={0.4}
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#1de2c8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}
