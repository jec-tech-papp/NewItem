"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useDesktopEffects } from "@/hooks/useMediaQuery";

/** Fond doux sans bordure nette — blobs flous uniquement */
export function ParallaxBackdrop() {
  const reduceMotion = useReducedMotion();
  const desktopEffects = useDesktopEffects();
  const { scrollY, scrollYProgress } = useScroll();

  const layer1Y = useTransform(scrollY, (v) => v * 0.12);
  const layer2Y = useTransform(scrollY, (v) => v * -0.08);
  const layer1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const baseWash = (
    <>
      <div
        className="absolute inset-0 bg-[#f4f9fc]"
        aria-hidden
      />
      <div
        className="absolute inset-[-20%] bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(125,211,252,0.22),transparent_70%)]"
        aria-hidden
      />
      <div
        className="absolute inset-[-15%] bg-[radial-gradient(ellipse_90%_70%_at_100%_40%,rgba(186,230,253,0.28),transparent_72%)]"
        aria-hidden
      />
      <div
        className="absolute inset-[-15%] bg-[radial-gradient(ellipse_80%_60%_at_0%_80%,rgba(224,242,254,0.35),transparent_75%)]"
        aria-hidden
      />
    </>
  );

  const blobs = (
    <>
      <div
        className="absolute -left-[35%] top-[-10%] h-[min(140vmax,1600px)] w-[min(140vmax,1600px)] rounded-full bg-sky-200/25 blur-[100px]"
      />
      <div
        className="absolute -right-[30%] top-[20%] h-[min(120vmax,1400px)] w-[min(120vmax,1400px)] rounded-full bg-cyan-100/30 blur-[120px]"
      />
      <div
        className="absolute bottom-[-25%] left-[5%] h-[min(100vmax,1200px)] w-[min(100vmax,1200px)] rounded-full bg-sky-100/35 blur-[110px]"
      />
    </>
  );

  if (reduceMotion || !desktopEffects) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-20" aria-hidden>
        {baseWash}
        {blobs}
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-20" aria-hidden>
      {baseWash}
      <motion.div style={{ y: layer1Y, scale: layer1Scale }} className="absolute inset-0">
        {blobs}
      </motion.div>
    </div>
  );
}
