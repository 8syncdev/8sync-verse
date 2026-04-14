"use client";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "../utils";

interface GalaxyBackgroundProps {
  /** Max stars to render */
  maxStars?: number;
  /** Base hue (HSL) — 217=blue, 270=purple, 180=cyan */
  hue?: number;
  /** Star size range */
  starSize?: [min: number, max: number];
  /** Speed factor — higher = slower */
  speedFactor?: number;
  /** Canvas z-index */
  zIndex?: number;
  /** Additional className */
  className?: string;
  /** Use multicolor stars */
  multiColor?: boolean;
  /** Performance: limit to 30fps on mobile */
  adaptivePerf?: boolean;
}

// Optimized star class — no React overhead, pure canvas
class Star {
  orbitRadius: number;
  radius: number;
  orbitX: number;
  orbitY: number;
  timePassed: number;
  speed: number;
  alpha: number;
  color: string;

  constructor(
    w: number,
    h: number,
    maxStars: number,
    sizeMin: number,
    sizeMax: number,
    speedFactor: number,
    multiColor: boolean,
    hue: number,
  ) {
    const maxOrbit = Math.sqrt(w * w + h * h) / 2;
    this.orbitRadius = Math.random() * maxOrbit;
    this.radius =
      (Math.random() * (Math.min(sizeMax, this.orbitRadius / 8) - sizeMin) + sizeMin) / 8;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = Math.random() * maxStars;
    this.speed = (Math.random() * this.orbitRadius) / speedFactor;
    this.alpha = Math.random() * 0.8 + 0.2;

    if (multiColor) {
      const h = Math.random() * 360;
      const s = 50 + Math.random() * 50;
      const l = 70 + Math.random() * 30;
      this.color = `hsl(${h | 0},${s | 0}%,${l | 0}%)`;
    } else {
      const l = 70 + Math.random() * 30;
      this.color = `hsl(${hue},61%,${l | 0}%)`;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;

    // Twinkle
    const r = Math.random();
    if (r < 0.05 && this.alpha > 0.1) this.alpha -= 0.05;
    else if (r > 0.95 && this.alpha < 1) this.alpha += 0.05;

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 6.2832); // Math.PI * 2
    ctx.fill();
    this.timePassed += this.speed;
  }
}

export function GalaxyBackground({
  maxStars = 800,
  hue = 217,
  starSize = [1, 3],
  speedFactor = 100000,
  zIndex = -1,
  className,
  multiColor = true,
  adaptivePerf = true,
}: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Detect mobile for perf
    const isMobile = adaptivePerf && window.innerWidth < 768;
    const actualStars = isMobile ? Math.min(maxStars, 400) : maxStars;
    const targetFps = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFps;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let stars = Array.from(
      { length: actualStars },
      () => new Star(w, h, actualStars, starSize[0], starSize[1], speedFactor, multiColor, hue),
    );

    // Offscreen bg
    const bgCanvas = document.createElement("canvas");
    bgCanvas.width = w;
    bgCanvas.height = h;
    const bgCtx = bgCanvas.getContext("2d", { alpha: false })!;
    bgCtx.fillStyle = `hsl(${hue},64%,4%)`;
    bgCtx.fillRect(0, 0, w, h);

    let lastFrame = 0;

    const animate = (time: number) => {
      rafRef.current = requestAnimationFrame(animate);

      if (time - lastFrame < frameInterval) return;
      lastFrame = time;

      ctx.drawImage(bgCanvas, 0, 0);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < stars.length; i++) {
        stars[i].draw(ctx);
      }

      ctx.globalCompositeOperation = "source-over";
    };

    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      w = canvas.width = bgCanvas.width = window.innerWidth;
      h = canvas.height = bgCanvas.height = window.innerHeight;
      bgCtx.fillStyle = `hsl(${hue},64%,4%)`;
      bgCtx.fillRect(0, 0, w, h);
      stars = Array.from(
        { length: actualStars },
        () => new Star(w, h, actualStars, starSize[0], starSize[1], speedFactor, multiColor, hue),
      );
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(onResize, 250);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [maxStars, hue, starSize, speedFactor, multiColor, adaptivePerf]);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 w-full h-full pointer-events-none", className)}
      style={{ zIndex }}
    />
  );
}
