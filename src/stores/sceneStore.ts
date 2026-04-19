import { create } from 'zustand';

interface SceneState {
  activeSection: number;
  scrollProgress: number;
  mouseXY: { x: number; y: number };
  isLiteMode: boolean;
  hoveredSkillId: string | null;
  setActiveSection: (n: number) => void;
  setScrollProgress: (p: number) => void;
  setMouseXY: (xy: { x: number; y: number }) => void;
  setLiteMode: (v: boolean) => void;
  setHoveredSkillId: (id: string | null) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  activeSection: 0,
  scrollProgress: 0,
  mouseXY: { x: 0, y: 0 },
  isLiteMode:
    typeof window !== 'undefined'
      ? localStorage.getItem('liteMode') === 'true' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  hoveredSkillId: null,
  setActiveSection: (n) => set({ activeSection: n }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setMouseXY: (xy) => set({ mouseXY: xy }),
  setLiteMode: (v) => {
    localStorage.setItem('liteMode', String(v));
    set({ isLiteMode: v });
  },
  setHoveredSkillId: (id) => set({ hoveredSkillId: id }),
}));
