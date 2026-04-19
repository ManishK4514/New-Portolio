import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/sceneStore';

const WAYPOINTS = [
  new THREE.Vector3(-3, 3, 0),
  new THREE.Vector3(-1.5, 1.5, 0.5),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1.5, -1.5, -0.5),
  new THREE.Vector3(3, -3, 0),
];

const TimelineScene = () => {
  const travRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useSceneStore((s) => s.scrollProgress);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(WAYPOINTS), []);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 100, 0.03, 8, false), [curve]);
  const travGeo = useMemo(() => new THREE.SphereGeometry(0.12, 16, 16), []);

  const tubeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.4, wireframe: true }),
    [],
  );
  const travMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 1.2 }),
    [],
  );

  useFrame(() => {
    if (!travRef.current) return;
    const t = Math.min(Math.max(scrollProgress * 3, 0), 1);
    const pt = curve.getPointAt(t);
    travRef.current.position.copy(pt);
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh geometry={tubeGeo} material={tubeMat} />
      <mesh ref={travRef} geometry={travGeo} material={travMat} />
      <pointLight color={0xffd700} intensity={1.5} distance={3} />
    </group>
  );
};

export default TimelineScene;
