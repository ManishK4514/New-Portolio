import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODES = [
  { pos: new THREE.Vector3(0, 2, 0), color: 0x00d4ff },
  { pos: new THREE.Vector3(-2, 0.5, 0), color: 0x7b2fbe },
  { pos: new THREE.Vector3(2, 0.5, 0), color: 0xffd700 },
  { pos: new THREE.Vector3(-1.5, -1, 0.5), color: 0xff4444 },
  { pos: new THREE.Vector3(0, -2, 0), color: 0x44aaff },
  { pos: new THREE.Vector3(1.5, -1, 0.5), color: 0x44ff88 },
  { pos: new THREE.Vector3(0, 0.5, 1.5), color: 0xff8844 },
];

const EDGES = [[0, 1], [0, 2], [0, 6], [1, 3], [2, 4], [2, 5], [3, 4], [4, 5]];

const ArchitectureScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.15, 12, 12), []);
  const nodeMats = useMemo(
    () => NODES.map((n) => new THREE.MeshStandardMaterial({ color: n.color, emissive: n.color, emissiveIntensity: 0.7 })),
    [],
  );

  const linesGeo = useMemo(() => {
    const positions: number[] = [];
    EDGES.forEach(([a, b]) => {
      const pa = NODES[a].pos;
      const pb = NODES[b].pos;
      positions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const linesMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.3 }),
    [],
  );

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <lineSegments geometry={linesGeo} material={linesMat} />
      {NODES.map((n, i) => (
        <mesh key={i} position={n.pos} geometry={nodeGeo} material={nodeMats[i]} />
      ))}
    </group>
  );
};

export default ArchitectureScene;
