"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { assetUrl } from "@/lib/assetUrl";
import { useDesktopEffects } from "@/hooks/useMediaQuery";

type LogoParallaxBackdropProps = {
  logoUrl: string;
  alt: string;
};

/**
 * Desktop : logo en filigrane (~70 % de transparence, opacité 30 %),
 * ancré à droite en bas au chargement, remonte au scroll.
 */
export function LogoParallaxBackdrop({ logoUrl, alt }: LogoParallaxBackdropProps) {
  const desktop = useDesktopEffects();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 2200], [0, -720]);
  const subtleRotate = useTransform(scrollY, [0, 2200], [0, -6]);

  if (!desktop || reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] hidden overflow-hidden lg:block"
      aria-hidden
    >
      <motion.div
        style={{ y, rotate: subtleRotate }}
        className="absolute bottom-[6%] right-[3%] w-[min(42vw,520px)] max-w-none opacity-30"
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
    </div>
  );
}
