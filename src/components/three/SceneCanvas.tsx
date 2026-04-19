import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/sceneStore';
import HeroScene from './HeroScene';
import FintechScene from './FintechScene';
import ProjectsScene from './ProjectsScene';
import SkillsScene from './SkillsScene';
import TimelineScene from './TimelineScene';
import CodingScene from './CodingScene';
import ArchitectureScene from './ArchitectureScene';
import ContactScene from './ContactScene';

const SectionScene = ({
  sectionIndex,
  children,
}: {
  sectionIndex: number;
  children: React.ReactNode;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const active = useSceneStore.getState().activeSection;
    groupRef.current.visible = active === sectionIndex;
  });

  return (
    <group ref={groupRef} visible={false}>
      {children}
    </group>
  );
};

const SceneCanvas = () => {
  const isLiteMode = useSceneStore((s) => s.isLiteMode);

  if (isLiteMode) return null;

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 8] }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Suspense fallback={null}>
          <SectionScene sectionIndex={0}><HeroScene /></SectionScene>
          <SectionScene sectionIndex={1}><FintechScene /></SectionScene>
          <SectionScene sectionIndex={2}><ProjectsScene /></SectionScene>
          <SectionScene sectionIndex={3}><SkillsScene /></SectionScene>
          <SectionScene sectionIndex={4}><TimelineScene /></SectionScene>
          <SectionScene sectionIndex={5}><CodingScene /></SectionScene>
          <SectionScene sectionIndex={6}><ArchitectureScene /></SectionScene>
          <SectionScene sectionIndex={7}><ContactScene /></SectionScene>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
