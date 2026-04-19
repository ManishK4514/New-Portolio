import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ContactScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const { geo, origPos } = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(2, 2);
    const orig = new Float32Array(g.attributes.position.array);
    return { geo: g, origPos: orig };
  }, []);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x7b2fbe,
        emissiveIntensity: 0.4,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      }),
    [],
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useFrame(() => {
    const t = performance.now() * 0.001;
    if (meshRef.current) {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const nx = origPos[i * 3];
        const ny = origPos[i * 3 + 1];
        const nz = origPos[i * 3 + 2];
        const disp = Math.sin(t + nx * 2) * 0.15;
        pos.setXYZ(i, nx + nx * disp, ny + ny * disp, nz + nz * disp);
      }
      pos.needsUpdate = true;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = t * (Math.PI / 6);
    }
  });

  return (
    <group position={[0, 0, -1]}>
      <mesh ref={meshRef} geometry={geo} material={mat} />
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]} material={ringMat}>
        <ringGeometry args={[3.5, 3.6, 64]} />
      </mesh>
    </group>
  );
};

export default ContactScene;
