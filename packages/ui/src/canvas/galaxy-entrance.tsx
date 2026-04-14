"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../utils";

interface GalaxyEntranceProps {
  /** Duration of entrance in ms, or 'loop' */
  duration?: number | "loop";
  /** Max stars */
  maxStars?: number;
  /** Hue */
  hue?: number;
  /** Title to show during entrance */
  title?: string;
  /** Subtitle */
  subtitle?: string;
  /** Called when entrance completes */
  onComplete?: () => void;
  /** Additional className for container */
  className?: string;
}

class EntranceStar {
  orbitRadius: number;
  radius: number;
  orbitX: number;
  orbitY: number;
  timePassed: number;
  speed: number;
  alpha: number;
  color: string;
  z: number;

  constructor(w: number, h: number, maxStars: number) {
    const maxOrbit = Math.sqrt(w * w + h * h) / 2;
    this.orbitRadius = Math.random() * maxOrbit;
    this.radius = (Math.random() * 2 + 1) / 8;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = Math.random() * maxStars;
    this.speed = (Math.random() * this.orbitRadius) / 80000;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.z = Math.random();

    const h2 = Math.random() * 360;
    const s = 50 + Math.random() * 50;
    const l = 70 + Math.random() * 30;
    this.color = `hsl(${h2 | 0},${s | 0}%,${l | 0}%)`;
  }

  draw(ctx: CanvasRenderingContext2D, progress: number, isLoop: boolean) {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;

    const scale = isLoop ? 1 : 1 + this.z * progress * 12;
    const ax = isLoop ? x : (x - this.orbitX) * scale + this.orbitX;
    const ay = isLoop ? y : (y - this.orbitY) * scale + this.orbitY;
    const r = this.radius * scale;

    ctx.beginPath();
    ctx.arc(ax, ay, r, 0, 6.2832);
    ctx.fill();

    this.timePassed += this.speed;
  }
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function GalaxyEntrance({
  duration = 4000,
  maxStars = 1500,
  hue = 217,
  title = "8 Sync Verse",
  subtitle,
  onComplete,
  className,
}: GalaxyEntranceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const isMobile = w < 768;
    const count = isMobile ? Math.min(maxStars, 600) : maxStars;

    let stars = Array.from({ length: count }, () => new EntranceStar(w, h, count));

    const bgCanvas = document.createElement("canvas");
    bgCanvas.width = w;
    bgCanvas.height = h;
    const bgCtx = bgCanvas.getContext("2d", { alpha: false })!;
    bgCtx.fillStyle = `hsl(${hue},64%,4%)`;
    bgCtx.fillRect(0, 0, w, h);

    let startTime: number | null = null;
    const isLoop = duration === "loop";
    const dur = isLoop ? 5000 : (duration as number);

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const rawProgress = isLoop ? (elapsed % dur) / dur : Math.min(elapsed / dur, 1);
      const progress = easeInOutCubic(rawProgress);

      ctx.drawImage(bgCanvas, 0, 0);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < stars.length; i++) {
        stars[i].draw(ctx, progress, isLoop);
      }

      ctx.globalCompositeOperation = "source-over";

      // Whiteout at end
      if (!isLoop && rawProgress > 0.7) {
        const whiteAlpha = (rawProgress - 0.7) / 0.3;
        ctx.fillStyle = `rgba(10,10,15,${whiteAlpha * 0.8})`;
        ctx.fillRect(0, 0, w, h);
      }

      if (!isLoop && rawProgress >= 1) {
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 600);
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      w = canvas.width = bgCanvas.width = window.innerWidth;
      h = canvas.height = bgCanvas.height = window.innerHeight;
      bgCtx.fillStyle = `hsl(${hue},64%,4%)`;
      bgCtx.fillRect(0, 0, w, h);
      stars = Array.from({ length: count }, () => new EntranceStar(w, h, count));
    };

    let rt: ReturnType<typeof setTimeout>;
    const dr = () => {
      clearTimeout(rt);
      rt = setTimeout(onResize, 250);
    };
    window.addEventListener("resize", dr);

    return () => {
      window.removeEventListener("resize", dr);
      cancelAnimationFrame(rafRef.current);
    };
  }, [maxStars, hue, duration, onComplete]);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-600",
        fadeOut && "opacity-0",
        className,
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Title overlay */}
      <div className="relative z-10 text-center pointer-events-none">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          style={{
            background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #06b6d4)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmerText 3s linear infinite",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-white/60 animate-fade-in">{subtitle}</p>
        )}
      </div>

      <style>{`
        @keyframes shimmerText {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
