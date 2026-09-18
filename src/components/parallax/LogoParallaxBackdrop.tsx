"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { assetUrl } from "@/lib/assetUrl";
import { useDesktopEffects } from "@/hooks/useMediaQuery";

type LogoParallaxBackdropProps = {
  logoUrl: string;
};

/**
 * Desktop uniquement : filigrane ~70 % transparent, bas-droite → haut au scroll (adapté 4K / hauteur fenêtre).
 */
export function LogoParallaxBackdrop({ logoUrl }: LogoParallaxBackdropProps) {
  const desktop = useDesktopEffects();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const top = useTransform(scrollYProgress, [0, 1], ["68vh", "5vh"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.08]);

  if (!desktop || reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed right-[2.5%] z-[1] hidden w-[min(36vw,640px)] opacity-30 lg:block"
      style={{ top, rotate, scale }}
      aria-hidden
    >
      <Image
        src={assetUrl(logoUrl)}
        alt=""
        width={767}
        height={325}
        className="h-auto w-full object-contain object-right"
        priority={false}
      />
    </motion.div>
  );
}
