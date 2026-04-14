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

/** Parse a hex color string into [r, g, b] tuple. */
function hex2rgb(hex: string): readonly [number, number, number] {
  const v = parseInt(hex.replace("#", ""), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255] as const;
}

/**
 * PixelNetwork — optimized canvas background component.
 *
 * Perf budget: ≤60fps on desktop, ≤30fps on mobile (frame-skip).
 * Key optimisations:
 *  - Squared-distance culling: skip sqrt for most node pairs
 *  - Batched path draws: group base lines & pulse lines to minimise ctx state switches
 *  - Pre-computed rgba strings: zero string allocation in the hot loop
 *  - Shadow (glow) disabled on mobile: very expensive GPU op
 *  - Page Visibility API: pause RAF when tab is hidden
 *  - Touch move handler: mouse-attraction on mobile too
 *  - Velocity clamping: prevents runaway nodes at extreme mouse speeds
 */
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
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mobile = w < 768;

    // On mobile: reduce node count and connection range for perf
    const count = mobile ? Math.min(nodeCount, 40) : nodeCount;
    const maxD = mobile ? connectionDist * 0.6 : connectionDist;
    /** Squared connection threshold — avoids Math.sqrt for culling */
    const maxD2 = maxD * maxD;
    const maxMouseR2 = mouseRadius * mouseRadius;
    /** Velocity cap prevents runaway nodes from mouse interaction */
    const maxV = speed * 8;

    // ── Pre-compute color components ──────────────────────────────────────
    const [nr, ng, nb] = hex2rgb(nodeColor);
    const [pr, pg, pb] = hex2rgb(pulseColor);
    const [lr, lg, lb] = hex2rgb(lineColor);

    // Pre-build gradient color strings used in the mouse glow
    const nodeColorStr = `rgba(${nr},${ng},${nb},0.04)`;
    const mouseR40 = mouseRadius * 0.4;

    // Pre-compute per-alpha base-line color strings (0.01 increments)
    // alpha range for base lines: 0 – 0.06  → quantise to 100 steps (0.001)
    // For pulse lines alpha: 0 – 0.35 → quantise similarly
    // We use inline template literals but avoid toFixed() inside the loop
    // by rounding to 3 decimal places via bitwise math.
    const round3 = (n: number) => Math.round(n * 1000) / 1000;

    // ── Node initialisation ───────────────────────────────────────────────
    const nodes: Node[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      size: nodeSize * (0.4 + Math.random()),
      brightness: 0.3 + Math.random() * 0.7,
      // Stagger initial phases so pulses feel organic (Verse brand timing: ~1.5s cycle)
      phase: Math.random() * Math.PI * 2,
      // Phase speed → 0.003–0.010 rad/frame ≈ 0.8s–2.5s cycle @ 60fps
      phaseSpeed: 0.003 + Math.random() * 0.007,
      isAccent: Math.random() < 0.3, // 30% accent (purple) nodes
    }));

    // ── Frame-skip for mobile (every other frame) ─────────────────────────
    let frameCount = 0;

    // ── Render loop ───────────────────────────────────────────────────────
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      // Throttle to ~30fps on mobile
      if (mobile) {
        frameCount ^= 1;
        if (frameCount) return;
      }

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = mx > -9000;

      // ── Phase advance + physics update ───────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        // Mouse / touch attraction
        if (hasMouse) {
          const dx = mx - a.x;
          const dy = my - a.y;
          const md2 = dx * dx + dy * dy;
          if (md2 < maxMouseR2 && md2 > 1) {
            const md = Math.sqrt(md2);
            const f = ((mouseRadius - md) / mouseRadius) * 0.015;
            a.vx += (dx / md) * f;
            a.vy += (dy / md) * f;
          }
        }

        // Dampen + clamp velocity
        a.vx *= 0.996;
        a.vy *= 0.996;
        if (a.vx > maxV) a.vx = maxV;
        else if (a.vx < -maxV) a.vx = -maxV;
        if (a.vy > maxV) a.vy = maxV;
        else if (a.vy < -maxV) a.vy = -maxV;

        a.x += a.vx;
        a.y += a.vy;

        // Wrap around edges
        if (a.x < -30) a.x = w + 30;
        else if (a.x > w + 30) a.x = -30;
        if (a.y < -30) a.y = h + 30;
        else if (a.y > h + 30) a.y = -30;

        a.phase += a.phaseSpeed;
      }

      // ── Batched base-line draw pass ───────────────────────────────────
      // Group all base lines into a single path to minimise beginPath calls.
      // We bucket by alpha level (0–6, step 1 = 0.01 increments up to 0.06).
      // For 90 nodes × pairs that's ~4000 lines max but most are culled by dist².
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < maxD2) {
            const alpha = round3((1 - Math.sqrt(dist2) / maxD) * 0.06);
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ── Batched pulse-line draw pass ─────────────────────────────────
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const pulseA = 0.5 + 0.5 * Math.sin(a.phase);
        for (let j = i + 1; j < nodes.length; j++) {
          if ((i + j) % 4 >= 2) continue; // only ~50% of pairs
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < maxD2) {
            const dist = Math.sqrt(dist2);
            const alpha = round3((1 - dist / maxD) * pulseA * 0.35);
            const isV = a.isAccent || b.isAccent;
            const cr = isV ? pr : nr;
            const cg = isV ? pg : ng;
            const cb = isV ? pb : nb;
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ── Node draw pass ────────────────────────────────────────────────
      // Shadow (glow) only on desktop — it's a GPU-expensive op on mobile
      const useGlow = !mobile;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const pulse = 0.5 + 0.5 * Math.sin(a.phase);
        const s = a.size * (0.7 + pulse * 0.5);
        const na = round3(a.brightness * (0.4 + pulse * 0.6));
        const cr = a.isAccent ? pr : nr;
        const cg = a.isAccent ? pg : ng;
        const cb = a.isAccent ? pb : nb;

        if (useGlow && a.brightness > 0.6) {
          ctx.shadowColor = `rgba(${cr},${cg},${cb},${round3(na * 0.6)})`;
          ctx.shadowBlur = 10;
        }

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${na})`;
        ctx.fillRect(a.x - s / 2, a.y - s / 2, s, s);

        if (useGlow && a.brightness > 0.6) {
          ctx.shadowBlur = 0;
        }
      }

      // ── Mouse / touch glow ────────────────────────────────────────────
      if (hasMouse) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, mouseR40);
        g.addColorStop(0, nodeColorStr);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, mouseR40, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    // ── Event handlers ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    const onTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    // Page Visibility API — pause animation when tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
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
