import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/sceneStore';

const PARTICLE_COUNT = 1500;
const NODE_COUNT = 80;
const CONNECTION_DISTANCE = 1.2;

function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y) * radius;
    const theta = golden * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r, y * radius, Math.sin(theta) * r));
  }
  return points;
}

const HeroScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseXY = useSceneStore((s) => s.mouseXY);
  const scrollProgress = useSceneStore((s) => s.scrollProgress);

  const nodePositions = useMemo(() => fibonacciSphere(NODE_COUNT, 2.5), []);

  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECTION_DISTANCE) {
          positions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z,
          );
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodePositions]);

  const nodeGeometry = useMemo(() => {
    const positions = nodePositions.flatMap((p) => [p.x, p.y, p.z]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodePositions]);

  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.18,
      }),
    [],
  );

  const nodeMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0x00d4ff,
        size: 0.08,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      }),
    [],
  );

  const particleMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0x7b2fbe,
        size: 0.03,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const t = performance.now() * 0.001;

    // Mouse parallax
    groupRef.current.rotation.x +=
      (mouseXY.y * 0.15 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y +=
      (mouseXY.x * 0.15 - groupRef.current.rotation.y) * 0.05;

    // Breathing
    const breath = 1 + Math.sin(t * (Math.PI / 2)) * 0.04;
    groupRef.current.scale.setScalar(breath);

    // Line opacity pulse
    lineMaterial.opacity = 0.1 + Math.sin(t * 1.2) * 0.08;

    // Scroll: drift sphere right and fade particles
    if (scrollProgress > 0) {
      const s = Math.min(scrollProgress * 10, 1);
      groupRef.current.position.x = s * 3;
      if (particlesRef.current) {
        particleMaterial.opacity = Math.max(0, 0.5 - s * 0.5);
      }
    } else {
      groupRef.current.position.x += (0 - groupRef.current.position.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
      <points geometry={nodeGeometry} material={nodeMaterial} />
      <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
    </group>
  );
};

export default HeroScene;
