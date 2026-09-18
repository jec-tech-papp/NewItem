"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { assetUrl } from "@/lib/assetUrl";

export type CabinetSlide = {
  src: string;
  alt: string;
  caption?: string;
};

/** Remplacer les fichiers dans /public/images/cabinet/ (01.jpg, 02.jpg, …) */
export const CABINET_SLIDES: CabinetSlide[] = [
  {
    src: "/images/cabinet/01.jpg",
    alt: "Cabinet — espace d'accueil",
    caption: "Un espace d'accueil lumineux et apaisant",
  },
  {
    src: "/images/cabinet/02.jpg",
    alt: "Cabinet — salle de soins",
    caption: "Des équipements modernes pour votre confort",
  },
  {
    src: "/images/cabinet/03.jpg",
    alt: "Cabinet — détail",
    caption: "Un cadre pensé pour votre sérénité",
  },
];

type CabinetSlideshowProps = {
  slides?: CabinetSlide[];
  className?: string;
};

export function CabinetSlideshow({ slides = CABINET_SLIDES, className = "" }: CabinetSlideshowProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [count]);

  if (count === 0) return null;

  const slide = slides[index];

  return (
    <div
      className={`relative flex h-full min-h-[260px] flex-col bg-sky-900/20 sm:min-h-[320px] lg:min-h-0 lg:absolute lg:inset-6 ${className}`}
    >
      <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-xl sm:min-h-[320px] sm:rounded-2xl lg:min-h-[280px]">
        {slides.map((item, i) => (
          <div
            key={item.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={assetUrl(item.src)}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={i === 0}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-transparent to-sky-900/10"
              aria-hidden
            />
          </div>
        ))}

        {slide.caption ? (
          <p className="absolute inset-x-0 bottom-0 p-4 text-sm text-sky-50/95 sm:p-5 sm:text-base">
            {slide.caption}
          </p>
        ) : null}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-900 shadow-md transition hover:bg-white"
              aria-label="Photo précédente"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-900 shadow-md transition hover:bg-white"
              aria-label="Photo suivante"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mt-3 flex justify-center gap-2 lg:absolute lg:bottom-3 lg:left-0 lg:right-0 lg:mt-0">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Afficher la photo ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
