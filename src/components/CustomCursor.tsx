import { useEffect, useRef } from 'react';

const MAGNETIC_RADIUS = 80;
const ATTRACTION = 0.35;
const RING_LAG_FRAMES = 6;

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -200, mouseY = -200;
    let dotX = -200, dotY = -200;
    let ringX = -200, ringY = -200;
    // Ring position history for lag effect
    const history: { x: number; y: number }[] = Array(RING_LAG_FRAMES).fill({ x: -200, y: -200 });
    let historyIdx = 0;
    let isHovering = false;
    let isClicking = false;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Magnetic snap
      const magnetTargets = document.querySelectorAll<HTMLElement>('a, button, [data-magnetic]');
      let attracted = false;
      magnetTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - cx, mouseY - cy);
        if (dist < MAGNETIC_RADIUS) {
          mouseX += (cx - mouseX) * ATTRACTION;
          mouseY += (cy - mouseY) * ATTRACTION;
          attracted = true;
        }
      });

      isHovering = attracted;
    };

    const onDown = () => { isClicking = true; };
    const onUp = () => { isClicking = false; };

    const loop = () => {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      history[historyIdx] = { x: dotX, y: dotY };
      historyIdx = (historyIdx + 1) % RING_LAG_FRAMES;
      const lagged = history[historyIdx];
      ringX += (lagged.x - ringX) * 0.12;
      ringY += (lagged.y - ringY) * 0.12;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      dot.style.transform = `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      ring.style.transform = `translate(-50%, -50%) scale(${isHovering ? 1.6 : 1})`;
      ring.style.borderColor = isHovering
        ? 'hsl(var(--primary) / 0.9)'
        : 'hsl(var(--primary) / 0.5)';

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
      <style>{`
        * { cursor: none !important; }
        .custom-cursor-dot {
          width: 8px; height: 8px;
          background: hsl(var(--primary));
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease;
          box-shadow: 0 0 10px hsl(var(--primary) / 0.8);
          will-change: left, top;
        }
        .custom-cursor-ring {
          width: 32px; height: 32px;
          border: 2px solid hsl(var(--primary) / 0.5);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), border-color 0.2s ease;
          box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
          will-change: left, top;
        }
        @media (prefers-reduced-motion: reduce) {
          * { cursor: auto !important; }
          .custom-cursor-dot, .custom-cursor-ring { display: none; }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
