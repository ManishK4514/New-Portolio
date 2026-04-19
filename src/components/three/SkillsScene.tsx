import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STRAND_POINTS = 40;
const RADIUS = 2.5;
const HEIGHT = 8;

const SkillsScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { line1, line2, rungLines } = useMemo(() => {
    const pts1: number[] = [];
    const pts2: number[] = [];
    const rungPts: number[] = [];

    for (let i = 0; i <= STRAND_POINTS; i++) {
      const t = i / STRAND_POINTS;
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * HEIGHT;
      const x1 = Math.cos(angle) * RADIUS;
      const z1 = Math.sin(angle) * RADIUS;
      const x2 = Math.cos(angle + Math.PI) * RADIUS;
      const z2 = Math.sin(angle + Math.PI) * RADIUS;
      pts1.push(x1, y, z1);
      pts2.push(x2, y, z2);
      if (i % 5 === 0) {
        rungPts.push(x1, y, z1, x2, y, z2);
      }
    }

    const makeGeo = (pts: number[]) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      return g;
    };

    const mat1 = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.5 });
    const mat2 = new THREE.LineBasicMaterial({ color: 0x7b2fbe, transparent: true, opacity: 0.5 });
    const matR = new THREE.LineBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.25 });

    return {
      line1: new THREE.Line(makeGeo(pts1), mat1),
      line2: new THREE.Line(makeGeo(pts2), mat2),
      rungLines: new THREE.LineSegments(makeGeo(rungPts), matR),
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.004;
  });

  return (
    <group ref={groupRef} position={[3.5, 0, -3]}>
      <primitive object={line1} />
      <primitive object={line2} />
      <primitive object={rungLines} />
    </group>
  );
};

export default SkillsScene;
