import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LayerProps {
  count: number;
  rMin: number;
  rMax: number;
  color: string;
  size: number;
  rotSpeed: number;
  opacity: number;
}

function ParticleLayer({ count, rMin, rMax, color, size, rotSpeed, opacity }: LayerProps) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r     = rMin + Math.random() * (rMax - rMin);
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, rMin, rMax]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * rotSpeed;
    ref.current.rotation.x = Math.sin(t * rotSpeed * 0.55) * 0.14;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={opacity}
      />
    </points>
  );
}

function Ring({ radius, speed, tilt, color, opacity }: {
  radius: number; speed: number; tilt: number; color: string; opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.z += dt * speed; });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.007, 8, 140]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Core() {
  const outerRef = useRef<THREE.Mesh>(null);
  const midRef   = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) outerRef.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.14);
    if (midRef.current)   midRef.current.scale.setScalar(1 + Math.sin(t * 1.9 + 1) * 0.09);
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(t * 2.6 + 2) * 0.06);
      (innerRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.82 + Math.sin(t * 3.2) * 0.14;
    }
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshBasicMaterial color="#064e3b" transparent opacity={0.06} />
      </mesh>
      <mesh ref={midRef}>
        <sphereGeometry args={[0.40, 28, 28]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.13} />
      </mesh>
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.21, 24, 24]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.88} />
      </mesh>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const rot      = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, dt) => {
    rot.current.x += (mouse.current.y * 0.26 - rot.current.x) * 0.036;
    rot.current.y += (mouse.current.x * 0.33 - rot.current.y) * 0.036;
    if (groupRef.current) {
      groupRef.current.rotation.x = rot.current.x;
      groupRef.current.rotation.y = rot.current.y;
    }
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <group ref={groupRef}>
      {/* 3 particle shells — dense inner / mid ring / outer halo */}
      <ParticleLayer count={isMobile ? 300 : 900}  rMin={0.05} rMax={0.95} color="#10b981" size={0.036} rotSpeed={0.062}  opacity={0.72} />
      <ParticleLayer count={isMobile ? 350 : 1050} rMin={0.90} rMax={1.65} color="#06b6d4" size={0.025} rotSpeed={0.039}  opacity={0.62} />
      <ParticleLayer count={isMobile ? 200 : 600}  rMin={1.60} rMax={2.60} color="#34d399" size={0.017} rotSpeed={0.022}  opacity={0.46} />

      {/* Orbital rings */}
      <Ring radius={1.55} speed={0.10}  tilt={0.25} color="#10b981" opacity={0.32} />
      <Ring radius={1.05} speed={-0.20} tilt={0.88} color="#10b981" opacity={0.24} />
      <Ring radius={0.65} speed={0.42}  tilt={0.07} color="#06b6d4" opacity={0.38} />
      <Ring radius={1.90} speed={0.06}  tilt={1.08} color="#34d399" opacity={0.17} />

      {/* Core */}
      <Core />
    </group>
  );
}

export default function EnergyCore({ className = '' }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
