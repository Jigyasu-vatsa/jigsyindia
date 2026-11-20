import React, { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  isDark: boolean;
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * Lightweight, theme-aware interactive constellation & cursor-glow background.
 * Uses CSS pointer spotlight + subtle canvas network nodes that respond softly
 * to cursor movement while respecting prefers-reduced-motion.
 */
export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isDarkRef = useRef<boolean>(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const pointer = { x: width * 0.5, y: height * 0.35, active: false };

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const nodeCount = Math.min(34, Math.max(16, Math.floor((width * height) / 48000)));
    const nodes: NodePoint[] = Array.from({ length: nodeCount }, (_, idx) => ({
      x: ((idx * 137.5) % 100) * (width / 100),
      y: ((idx * 73.1 + 19) % 100) * (height / 100),
      vx: ((idx % 2 === 0 ? 1 : -1) * (0.16 + (idx % 5) * 0.04)),
      vy: ((idx % 3 === 0 ? 1 : -1) * (0.14 + (idx % 4) * 0.04)),
      r: 1.6 + (idx % 3) * 0.7,
    }));

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const dark = isDarkRef.current;
      const dotColor = dark ? 'rgba(96, 165, 250, 0.38)' : 'rgba(37, 99, 235, 0.24)';
      const accentDotColor = dark ? 'rgba(251, 191, 36, 0.34)' : 'rgba(217, 119, 6, 0.22)';

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }

        // Subtle attraction line to pointer
        if (pointer.active) {
          const dxp = pointer.x - n.x;
          const dyp = pointer.y - n.y;
          const distP = Math.hypot(dxp, dyp);
          if (distP < 175) {
            const alpha = (1 - distP / 175) * (dark ? 0.28 : 0.18);
            ctx.strokeStyle = dark
              ? `rgba(251, 191, 36, ${alpha.toFixed(3)})`
              : `rgba(37, 99, 235, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }

        // Connect neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 145) {
            const alpha = (1 - dist / 145) * (dark ? 0.16 : 0.11);
            ctx.strokeStyle = dark
              ? `rgba(148, 163, 184, ${alpha.toFixed(3)})`
              : `rgba(59, 130, 246, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = i % 4 === 0 ? accentDotColor : dotColor;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let timerId: number | null = null;
    let lastMoveTime = 0;

    const scheduleNext = () => {
      if (prefersReducedMotion) return;
      const isRecentlyActive = Date.now() - lastMoveTime < 1200;
      const delay = document.hidden ? 1000 : isRecentlyActive ? 45 : 110;
      timerId = window.setTimeout(() => {
        if (!document.hidden) {
          drawFrame();
        }
        scheduleNext();
      }, delay);
    };

    drawFrame();
    scheduleNext();

    const handlePointerMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      lastMoveTime = Date.now();
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mx', `${e.clientX}px`);
        spotlightRef.current.style.setProperty('--my', `${e.clientY}px`);
      }
      if (prefersReducedMotion) {
        drawFrame();
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener('resize', setSize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      if (timerId !== null) window.clearTimeout(timerId);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print"
      aria-hidden="true"
      data-testid="interactive-background"
    >
      {/* Interactive Cursor-Reactive Spotlight */}
      <div
        ref={spotlightRef}
        className="jigsy-cursor-spotlight absolute inset-0 transition-opacity duration-300"
      />
      {/* Subtle Drifting Geometric Constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
};
