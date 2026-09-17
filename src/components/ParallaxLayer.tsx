"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

export function ParallaxLayer({
  children,
  className = "",
  offset = 80,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
