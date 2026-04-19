import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PLATFORMS = [
  { color: 0xffa116, offset: new THREE.Vector3(-3, 1, 0), phase: 0 },
  { color: 0x24292e, offset: new THREE.Vector3(-1.5, -1, 0.5), phase: 1 },
  { color: 0x5b4638, offset: new THREE.Vector3(0, 1.5, -0.5), phase: 2 },
  { color: 0x1ba94c, offset: new THREE.Vector3(1.5, -0.5, 0), phase: 3 },
];

const CodingScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  const geo = useMemo(() => new THREE.OctahedronGeometry(0.2), []);
  const mats = useMemo(
    () =>
      PLATFORMS.map(
        (p) =>
          new THREE.MeshStandardMaterial({
            color: p.color,
            emissive: p.color,
            emissiveIntensity: 0.6,
          }),
      ),
    [],
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() * 0.001;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += 0.007;
      child.rotation.y += 0.005;
      child.position.y = PLATFORMS[i].offset.y + Math.sin(t * 0.6 + PLATFORMS[i].phase) * 0.2;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {PLATFORMS.map((p, i) => (
        <mesh key={i} position={p.offset} geometry={geo} material={mats[i]} />
      ))}
    </group>
  );
};

export default CodingScene;
