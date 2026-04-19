import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CARD_COUNT = 7;

const FintechScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  const cards = useMemo(() => {
    return Array.from({ length: CARD_COUNT }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        -1 - Math.random() * 2,
      ),
      rotSpeed: (Math.random() - 0.5) * 0.003,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x7b2fbe,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const geos = useMemo(
    () => cards.map(() => new THREE.PlaneGeometry(1, 1.4)),
    [cards],
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() * 0.001;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.y += cards[i].rotSpeed;
      (child as THREE.Mesh).position.y = cards[i].position.y + Math.sin(t * 0.5 + cards[i].phase) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {cards.map((c, i) => (
        <mesh key={i} position={c.position} geometry={geos[i]} material={mat} />
      ))}
    </group>
  );
};

export default FintechScene;
