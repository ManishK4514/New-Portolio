import { useSceneStore } from '@/stores/sceneStore';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import BackgroundScene from './BackgroundScene';

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
        <Suspense fallback={null}>
          <BackgroundScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
