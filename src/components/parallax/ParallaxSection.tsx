"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useDesktopEffects } from "@/hooks/useMediaQuery";

type ParallaxSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: ReactNode;
};

/**
 * Parallaxe légère sur le fond uniquement — le contenu reste centré (pas de scale/opacity).
 */
export function ParallaxSection({
  children,
  className = "",
  id,
  background,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const desktopEffects = useDesktopEffects();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -120]);

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      {background ? (
        desktopEffects && !reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ y: bgY }}
            aria-hidden
          >
            {background}
          </motion.div>
        ) : (
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
            {background}
          </div>
        )
      ) : null}
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function ParallaxColumn({
  children,
  className = "",
  progress,
  direction = 1,
}: {
  children: ReactNode;
  className?: string;
  progress: MotionValue<number>;
  direction?: 1 | -1;
}) {
  const reduceMotion = useReducedMotion();
  const desktopEffects = useDesktopEffects();
  const y = useTransform(progress, [0, 1], [48 * direction, -72 * direction]);

  if (reduceMotion || !desktopEffects) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
