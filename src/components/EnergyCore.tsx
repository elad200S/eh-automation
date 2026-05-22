import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Orbital ring via torus ────────────────────────────────────
function Ring({
  radius,
  speed,
  tilt,
  color,
  opacity,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed;
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.004, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// ── Orbiting dot ──────────────────────────────────────────────
function OrbitDot({
  radius,
  speed,
  tilt,
  color,
  size,
  offset = 0,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  size: number;
  offset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = useRef(offset);

  useFrame((_, dt) => {
    angle.current += dt * speed;
    if (!ref.current) return;
    ref.current.position.x = Math.cos(angle.current) * radius;
    ref.current.position.y = Math.sin(angle.current) * radius * Math.cos(tilt);
    ref.current.position.z = Math.sin(angle.current) * radius * Math.sin(tilt);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// ── Floating ambient particles ────────────────────────────────
function Particles({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r     = 1.3 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// ── Pulsing core ─────────────────────────────────────────────
function Core() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) outerRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.07);
    if (innerRef.current) innerRef.current.scale.setScalar(1 + Math.sin(t * 2.2 + 1) * 0.05);
  });

  return (
    <group>
      {/* Outer glow shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.32, 28, 28]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.08} />
      </mesh>
      {/* Inner bright core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.19, 24, 24]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.82} />
      </mesh>
    </group>
  );
}

// ── Mouse-reactive wrapper ────────────────────────────────────
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const rot      = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, dt) => {
    rot.current.x += (mouse.current.y * 0.32 - rot.current.x) * 0.04;
    rot.current.y += (mouse.current.x * 0.40 - rot.current.y) * 0.04;
    if (groupRef.current) {
      groupRef.current.rotation.x = rot.current.x;
      groupRef.current.rotation.y = rot.current.y;
    }
  });

  const particleCount = typeof window !== 'undefined' && window.innerWidth < 640 ? 60 : 130;

  return (
    <group ref={groupRef}>
      {/* Rings */}
      <Ring radius={1.42} speed={0.11}  tilt={0.28} color="#10b981" opacity={0.22} />
      <Ring radius={1.0}  speed={-0.24} tilt={0.9}  color="#10b981" opacity={0.16} />
      <Ring radius={0.62} speed={0.48}  tilt={0.08} color="#06b6d4" opacity={0.28} />

      {/* Orbiting dots */}
      <OrbitDot radius={1.0}  speed={0.52}  tilt={0.9}  color="#10b981" size={0.052}  offset={0} />
      <OrbitDot radius={1.0}  speed={0.52}  tilt={0.9}  color="#06b6d4" size={0.042}  offset={Math.PI} />
      <OrbitDot radius={1.42} speed={0.19}  tilt={0.28} color="#10b981" size={0.036}  offset={Math.PI / 3} />
      <OrbitDot radius={0.62} speed={0.88}  tilt={0.08} color="#34d399" size={0.028}  offset={Math.PI * 1.5} />

      {/* Core */}
      <Core />

      {/* Particles */}
      <Particles count={particleCount} />
    </group>
  );
}

// ── Public export ─────────────────────────────────────────────
export default function EnergyCore({ className = '' }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
