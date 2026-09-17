"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useDesktopEffects } from "@/hooks/useMediaQuery";

/** Couches fixes qui réagissent au scroll global — effet de profondeur visible sur toute la page */
export function ParallaxBackdrop() {
  const reduceMotion = useReducedMotion();
  const desktopEffects = useDesktopEffects();
  const { scrollY, scrollYProgress } = useScroll();

  const layer1Y = useTransform(scrollY, [0, 5000], [0, 900]);
  const layer2Y = useTransform(scrollY, [0, 5000], [0, -650]);
  const layer3Y = useTransform(scrollY, [0, 5000], [0, 420]);
  const layer4Rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const layer1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1.25]);

  const staticBackdrop = (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <div className="absolute -left-[20%] top-[8%] h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/30 blur-3xl" />
      <div className="absolute -right-[15%] top-[35%] h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-gradient-to-tl from-sky-300/35 to-white/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent_55%)]" />
    </div>
  );

  if (reduceMotion || !desktopEffects) {
    return staticBackdrop;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <motion.div
        style={{ y: layer1Y, scale: layer1Scale }}
        className="absolute -left-[20%] top-[8%] h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-100/30 blur-3xl"
      />
      <motion.div
        style={{ y: layer2Y }}
        className="absolute -right-[15%] top-[35%] h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-gradient-to-tl from-sky-300/35 to-white/20 blur-3xl"
      />
      <motion.div
        style={{ y: layer3Y, rotate: layer4Rotate }}
        className="absolute left-[30%] top-[62%] hidden h-64 w-64 rounded-[40%] border border-sky-200/40 bg-sky-50/30 backdrop-blur-sm sm:block"
      />
      <motion.div
        style={{ y: layer2Y }}
        className="absolute bottom-[-10%] left-[10%] h-96 w-96 rounded-full bg-cyan-200/25 blur-3xl"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent_55%)]"
      />
    </div>
  );
}
