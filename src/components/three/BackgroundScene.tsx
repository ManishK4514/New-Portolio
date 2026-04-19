import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/sceneStore';

const COUNT = 1200;

// section-based hue targets (degrees): blue→cyan→purple→teal→gold→violet→green→magenta
const SECTION_HUES = [210, 190, 270, 180, 45, 280, 150, 300];

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

const BackgroundScene = () => {
  const posRef = useRef<THREE.BufferAttribute>(null!);
  const colRef = useRef<THREE.BufferAttribute>(null!);
  const origPos = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // spread across a wide slab; z pushed back
      p[i * 3]     = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = -5 - Math.random() * 15;
    }
    return p;
  }, []);

  const speeds = useMemo(() => Float32Array.from({ length: COUNT }, () => 0.3 + Math.random() * 1.4), []);
  const phases = useMemo(() => Float32Array.from({ length: COUNT }, () => Math.random() * Math.PI * 2), []);

  const positions = useMemo(() => new Float32Array(origPos), [origPos]);
  const colors    = useMemo(() => new Float32Array(COUNT * 3).fill(1), []);

  // target hue lerp state
  const hueRef = useRef(210);

  useFrame(() => {
    const { scrollProgress, mouseXY, activeSection } = useSceneStore.getState();
    const t = performance.now() * 0.001;

    // lerp hue toward section target
    const targetHue = SECTION_HUES[activeSection] ?? 210;
    hueRef.current += (targetHue - hueRef.current) * 0.02;
    const hue = hueRef.current;

    const mx = mouseXY.x * 6; // mouse world-x
    const my = mouseXY.y * 4;

    for (let i = 0; i < COUNT; i++) {
      const ox = origPos[i * 3];
      const oy = origPos[i * 3 + 1];
      const oz = origPos[i * 3 + 2];

      // warp tunnel: scroll accelerates z toward camera
      const warpZ = oz + scrollProgress * 18 * speeds[i];
      // wrap z back into field when it passes camera
      const wrappedZ = ((warpZ + 5) % 20) - 20;

      // gentle sinusoidal drift
      const dx = Math.sin(t * 0.3 + phases[i]) * 0.4;
      const dy = Math.cos(t * 0.25 + phases[i]) * 0.25;

      // mouse repulsion
      const px = ox + dx;
      const py = oy + dy;
      const distX = px - mx;
      const distY = py - my;
      const dist2 = distX * distX + distY * distY;
      const repel = dist2 < 4 ? (1 - dist2 / 4) * 1.5 : 0;

      positions[i * 3]     = px + distX * repel * 0.3;
      positions[i * 3 + 1] = py + distY * repel * 0.3;
      positions[i * 3 + 2] = wrappedZ;

      // color: bright near camera, dim far; hue shift per section
      const depthFactor = 1 - (Math.abs(wrappedZ) / 20); // 0..1
      const warpBrightness = 0.4 + scrollProgress * 0.6; // dim→bright on scroll
      const brightness = depthFactor * warpBrightness;
      const [r, g, b] = hslToRgb(hue + (i % 60) - 30, 80, 55 + brightness * 35);
      colors[i * 3]     = r * brightness;
      colors[i * 3 + 1] = g * brightness;
      colors[i * 3 + 2] = b * brightness;
    }

    if (posRef.current) { posRef.current.array.set(positions); posRef.current.needsUpdate = true; }
    if (colRef.current) { colRef.current.array.set(colors);    colRef.current.needsUpdate = true; }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={posRef}
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          ref={colRef}
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default BackgroundScene;
