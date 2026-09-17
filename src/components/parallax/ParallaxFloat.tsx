"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type ParallaxFloatProps = {
  children: ReactNode;
  className?: string;
  /** Vitesse relative : 0.2 = lent, 1.2 = rapide (effet de profondeur) */
  speed?: number;
  /** Décalage vertical max en px (amplifié par speed) */
  distance?: number;
};

export function ParallaxFloat({
  children,
  className = "",
  speed = 0.5,
  distance = 320,
}: ParallaxFloatProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const range = distance * speed;
  const y = useTransform(scrollY, [0, 4000], [0, range]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
