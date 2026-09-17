"use client";

import Image from "next/image";
import { ParallaxFloat } from "./parallax/ParallaxFloat";

export type LogoItem = {
  src: string;
  alt: string;
};

type LogoRailProps = {
  logos: LogoItem[];
  title?: string;
};

/** Bandeau logos (fichiers dans /public/logos). Rien n'est affiché si la liste est vide. */
export function LogoRail({ logos, title = "Partenaires & labels" }: LogoRailProps) {
  if (logos.length === 0) return null;

  return (
    <ParallaxFloat speed={0.25} distance={120} className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
        {title}
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-10 md:gap-14">
        {logos.map((logo, index) => (
          <li key={logo.src} className="opacity-80 transition hover:opacity-100">
            <ParallaxFloat speed={0.15 + index * 0.05} distance={80}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={64}
                className="h-12 w-auto object-contain md:h-14"
              />
            </ParallaxFloat>
          </li>
        ))}
      </ul>
    </ParallaxFloat>
  );
}
