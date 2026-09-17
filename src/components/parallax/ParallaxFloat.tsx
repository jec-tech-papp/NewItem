"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useDesktopEffects } from "@/hooks/useMediaQuery";

type ParallaxFloatProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  distance?: number;
};

export function ParallaxFloat({
  children,
  className = "",
  speed = 0.5,
  distance = 320,
}: ParallaxFloatProps) {
  const reduceMotion = useReducedMotion();
  const desktopEffects = useDesktopEffects();
  const { scrollY } = useScroll();
  const range = distance * speed;
  const y = useTransform(scrollY, [0, 4000], [0, range]);

  if (reduceMotion || !desktopEffects) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
