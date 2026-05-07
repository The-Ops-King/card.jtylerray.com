"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Layered, slowly-drifting geometric background.
 * - Static SVG grid + diagonal gold guides
 * - Three rotating polygons
 * - A canvas particle field with gentle parallax
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]"
    >
      {/* Radial gold spotlight */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 110%, rgba(139,105,20,0.18), transparent 60%)",
        }}
      />

      {/* Geometric grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.4"
              opacity="0.6"
            />
          </pattern>
          <linearGradient id="diag" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="50%" stopColor="#f5d76e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Drifting polygons */}
      <FloatingShape
        size={420}
        sides={6}
        x="8%"
        y="12%"
        delay={0}
        duration={36}
      />
      <FloatingShape
        size={300}
        sides={3}
        x="78%"
        y="22%"
        delay={4}
        duration={42}
      />
      <FloatingShape
        size={520}
        sides={8}
        x="65%"
        y="78%"
        delay={2}
        duration={50}
      />
      <FloatingShape
        size={220}
        sides={4}
        x="14%"
        y="74%"
        delay={6}
        duration={32}
      />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}

function polygonPoints(size: number, sides: number) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = (Math.PI * 2 * i) / sides - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(" ");
}

function FloatingShape({
  size,
  sides,
  x,
  y,
  delay,
  duration,
}: {
  size: number;
  sides: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.55,
        x: [0, 30, -20, 0],
        y: [0, -25, 20, 0],
        rotate: [0, 120, 240, 360],
      }}
      transition={{
        opacity: { duration: 2, delay },
        x: { duration, repeat: Infinity, ease: "easeInOut", delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        rotate: {
          duration: duration * 1.4,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full"
        style={{ filter: "drop-shadow(0 0 24px rgba(212,175,55,0.15))" }}
      >
        <polygon
          points={polygonPoints(size, sides)}
          fill="none"
          stroke="#d4af37"
          strokeWidth="0.8"
          opacity="0.45"
        />
        <polygon
          points={polygonPoints(size * 0.7, sides)}
          transform={`translate(${size * 0.15} ${size * 0.15})`}
          fill="none"
          stroke="#f5d76e"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
    </motion.div>
  );
}

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const particles: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      const count = Math.min(80, Math.floor((w * h) / 22000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.4 + 0.4,
          hue: 40 + Math.random() * 20,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140) {
            const o = 1 - d2 / (140 * 140);
            ctx.strokeStyle = `rgba(212,175,55,${o * 0.18})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `hsla(${p.hue}, 80%, 70%, 0.9)`);
        grd.addColorStop(1, `hsla(${p.hue}, 80%, 50%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    seed();
    tick();
    window.addEventListener("resize", () => {
      resize();
      seed();
    });
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
