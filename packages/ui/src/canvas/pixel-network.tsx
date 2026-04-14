"use client";
import { useEffect, useRef } from "react";
import { cn } from "../utils";

interface PixelNetworkProps {
  nodeCount?: number;
  /** Primary node color */
  nodeColor?: string;
  /** Accent pulse color */
  pulseColor?: string;
  /** Connection line color */
  lineColor?: string;
  connectionDist?: number;
  nodeSize?: number;
  speed?: number;
  mouseRadius?: number;
  className?: string;
  zIndex?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  brightness: number;
  phase: number;
  phaseSpeed: number;
  isAccent: boolean;
}

export function PixelNetwork({
  nodeCount = 90,
  nodeColor = "#06b6d4",
  pulseColor = "#8b5cf6",
  lineColor = "#ffffff",
  connectionDist = 150,
  nodeSize = 4,
  speed = 0.12,
  mouseRadius = 200,
  className,
  zIndex = 0,
}: PixelNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mobile = w < 768;
    const count = mobile ? Math.min(nodeCount, 45) : nodeCount;
    const maxD = mobile ? connectionDist * 0.65 : connectionDist;

    const hex2rgb = (h: string) => {
      const v = parseInt(h.slice(1), 16);
      return [(v >> 16) & 255, (v >> 8) & 255, v & 255] as const;
    };
    const [nr, ng, nb] = hex2rgb(nodeColor);
    const [pr, pg, pb] = hex2rgb(pulseColor);
    const [lr, lg, lb] = hex2rgb(lineColor);

    const nodes: Node[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      size: nodeSize * (0.4 + Math.random()),
      brightness: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.004 + Math.random() * 0.012,
      isAccent: Math.random() < 0.35,
    }));

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        // Mouse attraction
        const dx = mx - a.x;
        const dy = my - a.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < mouseRadius && md > 1) {
          const f = ((mouseRadius - md) / mouseRadius) * 0.015;
          a.vx += (dx / md) * f;
          a.vy += (dy / md) * f;
        }

        a.vx *= 0.996;
        a.vy *= 0.996;
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < -30) a.x = w + 30;
        if (a.x > w + 30) a.x = -30;
        if (a.y < -30) a.y = h + 30;
        if (a.y > h + 30) a.y = -30;

        a.phase += a.phaseSpeed;
        const pulse = 0.5 + 0.5 * Math.sin(a.phase);

        // Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const cx = a.x - b.x;
          const cy = a.y - b.y;
          const dist = Math.sqrt(cx * cx + cy * cy);

          if (dist < maxD) {
            const alpha = 1 - dist / maxD;

            // Base line
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},${(alpha * 0.06).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Pulse line on some connections
            if ((i + j) % 4 < 2) {
              const pa = alpha * pulse * 0.35;
              const isV = a.isAccent || b.isAccent;
              const cr = isV ? pr : nr;
              const cg = isV ? pg : ng;
              const cb = isV ? pb : nb;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${cr},${cg},${cb},${pa.toFixed(3)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Draw node (square pixel)
        const s = a.size * (0.7 + pulse * 0.5);
        const na = a.brightness * (0.4 + pulse * 0.6);
        const cr = a.isAccent ? pr : nr;
        const cg = a.isAccent ? pg : ng;
        const cb = a.isAccent ? pb : nb;

        // Glow
        if (a.brightness > 0.6) {
          ctx.shadowColor = `rgba(${cr},${cg},${cb},${(na * 0.6).toFixed(3)})`;
          ctx.shadowBlur = 10;
        }

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${na.toFixed(3)})`;
        ctx.fillRect(a.x - s / 2, a.y - s / 2, s, s);
        ctx.shadowBlur = 0;
      }

      // Mouse glow
      if (mx > 0 && my > 0) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius * 0.4);
        g.addColorStop(0, `rgba(${nr},${ng},${nb},0.04)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, mouseRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let rt: ReturnType<typeof setTimeout>;
    const onR = () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 250);
    };
    window.addEventListener("resize", onR);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onR);
    };
  }, [nodeCount, nodeColor, pulseColor, lineColor, connectionDist, nodeSize, speed, mouseRadius]);

  return (
    // biome-ignore lint/a11y/noInteractiveElementToNoninteractiveRole: canvas is purely decorative
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full", className)}
      style={{ zIndex }}
      role="presentation"
    />
  );
}
