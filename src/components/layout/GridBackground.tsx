import { useRef, useEffect } from 'react';

/*
 * Clean grid background with mouse-reactive wave effect.
 * Simple horizontal + vertical grid lines that deform
 * around the cursor and ripple through neighbors.
 */

const CELL       = 30;
const LINE_ALPHA = 0.12;
const DOT_ALPHA  = 0.3;
const DOT_R      = 1.2;
const MOUSE_R    = 60;
const PUSH       = 22;
const WAVE_DECAY = 0.5;
const WAVE_SPEED = 3;
const DRIFT_AMP  = 2;
const HUE        = 200;

interface Node {
  rx: number; ry: number;
  x: number; y: number;
  pushX: number; pushY: number;
  waveX: number; waveY: number;
  row: number; col: number;
  pX: number; pY: number; fX: number; fY: number; aX: number; aY: number;
}

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext('2d')!;
    let nodes: Node[] = [];
    let cols = 0, rows = 0;

    const nodeAt = (r: number, c: number): Node | null =>
      r >= 0 && r < rows && c >= 0 && c < cols ? nodes[r * cols + c] : null;

    const build = () => {
      const w = window.innerWidth, h = window.innerHeight;
      cvs.width = w; cvs.height = h;
      cols = Math.ceil(w / CELL) + 2;
      rows = Math.ceil(h / CELL) + 2;
      nodes = [];
      const ox = (w - (cols - 1) * CELL) / 2;
      const oy = (h - (rows - 1) * CELL) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const rx = ox + c * CELL, ry = oy + r * CELL;
          nodes.push({
            rx, ry, x: rx, y: ry,
            pushX: 0, pushY: 0, waveX: 0, waveY: 0,
            row: r, col: c,
            pX: Math.random() * 6.28, pY: Math.random() * 6.28,
            fX: 0.03 + Math.random() * 0.06, fY: 0.03 + Math.random() * 0.06,
            aX: (0.3 + Math.random() * 0.7) * DRIFT_AMP,
            aY: (0.3 + Math.random() * 0.7) * DRIFT_AMP,
          });
        }
      }
    };

    build();
    window.addEventListener('resize', build);
    const onMM = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onML = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    window.addEventListener('mousemove', onMM);
    document.documentElement.addEventListener('mouseleave', onML);

    let frame = 0;

    const tick = () => {
      const { x: mx, y: my } = mouse.current;
      const W = cvs.width, H = cvs.height;
      const now = performance.now() * 0.001;
      ctx.clearRect(0, 0, W, H);
      frame++;

      /* ── update positions ── */
      for (const n of nodes) {
        const dX = Math.sin(now * n.fX + n.pX) * n.aX;
        const dY = Math.cos(now * n.fY + n.pY) * n.aY;
        const bx = n.rx + dX, by = n.ry + dY;
        const dx = bx - mx, dy = by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_R && dist > 0.1) {
          const f = (1 - dist / MOUSE_R) ** 1.5 * PUSH;
          n.pushX = (dx / dist) * f;
          n.pushY = (dy / dist) * f;
        } else {
          n.pushX *= 0.88;
          n.pushY *= 0.88;
        }
        n.x = bx + n.pushX + n.waveX;
        n.y = by + n.pushY + n.waveY;
      }

      /* ── wave propagation ── */
      if (frame % WAVE_SPEED === 0) {
        const wx = new Float32Array(nodes.length), wy = new Float32Array(nodes.length);
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]; let sx = 0, sy = 0, cnt = 0;
          for (const nb of [nodeAt(n.row-1,n.col),nodeAt(n.row+1,n.col),nodeAt(n.row,n.col-1),nodeAt(n.row,n.col+1)]) {
            if (nb) { sx += nb.pushX + nb.waveX; sy += nb.pushY + nb.waveY; cnt++; }
          }
          if (cnt) { wx[i] = (sx / cnt) * WAVE_DECAY; wy[i] = (sy / cnt) * WAVE_DECAY; }
        }
        for (let i = 0; i < nodes.length; i++) { nodes[i].waveX = wx[i]; nodes[i].waveY = wy[i]; }
      }

      /* ── draw grid lines ── */
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = nodes[r * cols + c];

          // Line to right neighbor
          if (c < cols - 1) {
            const nb = nodes[r * cols + c + 1];
            const midDm = Math.sqrt(((n.x+nb.x)/2-mx)**2 + ((n.y+nb.y)/2-my)**2);
            const near = midDm < MOUSE_R * 1.3 ? 1 - midDm / (MOUSE_R * 1.3) : 0;
            const alpha = LINE_ALPHA + near * 0.25;
            const l = 50 + near * 30;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.strokeStyle = `hsla(${HUE}, 70%, ${l}%, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.5 + near * 0.8;
            ctx.stroke();
          }

          // Line to bottom neighbor
          if (r < rows - 1) {
            const nb = nodes[(r + 1) * cols + c];
            const midDm = Math.sqrt(((n.x+nb.x)/2-mx)**2 + ((n.y+nb.y)/2-my)**2);
            const near = midDm < MOUSE_R * 1.3 ? 1 - midDm / (MOUSE_R * 1.3) : 0;
            const alpha = LINE_ALPHA + near * 0.25;
            const l = 50 + near * 30;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.strokeStyle = `hsla(${HUE}, 70%, ${l}%, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.5 + near * 0.8;
            ctx.stroke();
          }
        }
      }

      /* ── draw dots at intersections ── */
      for (const n of nodes) {
        const td = Math.sqrt((n.pushX + n.waveX) ** 2 + (n.pushY + n.waveY) ** 2);
        const intensity = Math.min(td / PUSH, 1);
        const alpha = DOT_ALPHA + intensity * 0.6;
        const l = 55 + intensity * 30;
        const r = DOT_R + intensity * 1.5;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${HUE}, 80%, ${l}%, ${alpha.toFixed(3)})`;
        ctx.fill();

        // Glow halo near cursor
        if (intensity > 0.1) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 4 + intensity * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${HUE}, 90%, 65%, ${(intensity * 0.12).toFixed(3)})`;
          ctx.fill();
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', build);
      window.removeEventListener('mousemove', onMM);
      document.documentElement.removeEventListener('mouseleave', onML);
    };
  }, []);

  return (
    <div className="grid-background">
      <canvas ref={canvasRef}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
  );
};

export default GridBackground;
