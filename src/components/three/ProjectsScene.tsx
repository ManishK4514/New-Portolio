import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 60;

const ProjectsScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, speeds, phases } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    const ph = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = -4 - Math.random() * 3;
      spd[i] = 0.3 + Math.random() * 0.4;
      ph[i]  = Math.random() * Math.PI * 2;
    }
    return { positions: pos, speeds: spd, phases: ph };
  }, []);

  const geo = useMemo(() => new THREE.OctahedronGeometry(0.06), []);
  const mats = useMemo(
    () => [0x00d4ff, 0x7b2fbe, 0xffd700].map(
      (c) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.8 })
    ),
    [],
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() * 0.001;
    groupRef.current.children.forEach((child, i) => {
      child.position.y = positions[i * 3 + 1] + Math.sin(t * speeds[i] + phases[i]) * 0.4;
      child.rotation.x += 0.01;
      child.rotation.y += 0.007;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: COUNT }, (_, i) => (
        <mesh
          key={i}
          geometry={geo}
          material={mats[i % 3]}
          position={[positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]}
          scale={0.5 + Math.random() * 0.8}
        />
      ))}
    </group>
  );
};

export default ProjectsScene;
