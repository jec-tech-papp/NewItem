"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  /** Décalage vertical max en px à l'entrée / sortie de la zone */
  offset?: number;
  speed?: number;
};

export function ParallaxLayer({
  children,
  className = "",
  offset = 160,
  speed = 1,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const travel = offset * speed;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2 * speed, 0, 2 * speed]);

  if (reduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, rotate, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}
