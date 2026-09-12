"use client";
import React, { useId, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

/**
 * Self-contained replacement for the registry's tsparticles-backed SparklesCore —
 * that version pins an API (`initParticlesEngine`) the installed `@tsparticles/react`
 * no longer exports, and pulling the full particle engine is heavy for a small
 * decorative glow. This keeps the same prop contract with a lightweight CSS/motion
 * dot field instead.
 */
export const SparklesCore = (props: ParticlesProps) => {
  const {
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleColor = "#ffffff",
    particleDensity = 40,
  } = props;
  const generatedId = useId();

  const dots = useMemo(() => {
    const count = Math.max(4, Math.round(particleDensity / 20));
    // Deterministic pseudo-random spread (no Math.random) — keeps this pure for
    // render and stable across server/client hydration.
    return Array.from({ length: count }, (_, i) => {
      const a = Math.sin(i * 12.9898) * 43758.5453;
      const b = Math.sin(i * 78.233) * 12345.6789;
      const c = Math.sin(i * 39.425) * 5678.1234;
      const frac = (n: number) => n - Math.floor(n);
      return {
        id: `${generatedId}-${i}`,
        top: Math.round(frac(a) * 100),
        left: Math.round(frac(b) * 100),
        size: minSize + frac(c) * (maxSize - minSize),
        delay: frac(a + b) * 2,
        duration: 1.5 + frac(b + c) * 1.5,
      };
    });
  }, [generatedId, particleDensity, minSize, maxSize]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} style={{ background }}>
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            width: `${dot.size * 4}px`,
            height: `${dot.size * 4}px`,
            background: particleColor,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};
