"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type ParallaxSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Fond décoratif qui défile plus lentement */
  background?: ReactNode;
};

export function ParallaxSection({
  children,
  className = "",
  id,
  background,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [120, -200]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.85]);

  if (reduceMotion) {
    return (
      <section id={id} ref={ref} className={className}>
        {background}
        {children}
      </section>
    );
  }

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      {background ? (
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          style={{ y: bgY }}
          aria-hidden
        >
          {background}
        </motion.div>
      ) : null}
      <motion.div style={{ y: contentY, scale, opacity, willChange: "transform" }}>
        {children}
      </motion.div>
    </section>
  );
}

/** Colonne avec vitesse de parallaxe opposée (effet split) */
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
  const y = useTransform(progress, [0, 1], [60 * direction, -90 * direction]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
