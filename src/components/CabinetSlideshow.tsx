"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { assetUrl } from "@/lib/assetUrl";
import { prefetchImages } from "@/lib/prefetchImages";

export type CabinetSlide = {
  /** Chemin WebP optimisé (prioritaire) */
  src: string;
  alt: string;
  caption?: string;
};

/** WebP légers dans /public/images/cabinet/ — source PNG conservée pour réexport */
export const CABINET_SLIDES: CabinetSlide[] = [
  {
    src: "/images/cabinet/01.webp",
    alt: "Cabinet — espace d'accueil",
    caption: "Un espace d'accueil lumineux et apaisant",
  },
  {
    src: "/images/cabinet/02.webp",
    alt: "Cabinet — salle de soins",
    caption: "Des équipements modernes pour votre confort",
  },
  {
    src: "/images/cabinet/03.webp",
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
  const [loadedBySrc, setLoadedBySrc] = useState<Record<string, boolean>>({});
  const count = slides.length;
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    prefetchImages(slides.map((s) => s.src));
  }, [slides]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [count]);

  const markLoaded = useCallback((resolvedSrc: string) => {
    setLoadedBySrc((prev) =>
      prev[resolvedSrc] ? prev : { ...prev, [resolvedSrc]: true },
    );
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  if (count === 0) return null;

  const firstResolved = assetUrl(slides[0].src);
  const showPlaceholder = !loadedBySrc[firstResolved];

  return (
    <div
      className={`relative flex h-full min-h-[260px] flex-col bg-sky-900/20 sm:min-h-[320px] lg:min-h-0 lg:absolute lg:inset-6 ${className}`}
    >
      <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-xl sm:min-h-[320px] sm:rounded-2xl lg:min-h-[280px]">
        {showPlaceholder ? (
          <div className="absolute inset-0 animate-pulse bg-sky-800/40" aria-hidden />
        ) : null}

        {slides.map((item, i) => {
          const resolvedSrc = assetUrl(item.src);
          const isActive = i === index;
          return (
            <Image
              key={item.src}
              src={resolvedSrc}
              alt={isActive ? item.alt : ""}
              fill
              aria-hidden={!isActive}
              className={`object-cover transition-opacity duration-200 ${
                isActive ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 560px"
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              onLoad={() => markLoaded(resolvedSrc)}
            />
          );
        })}

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-sky-950/70 via-transparent to-sky-900/10"
          aria-hidden
        />

        {slide.caption ? (
          <p className="absolute inset-x-0 bottom-0 z-[3] p-4 text-sm text-sky-50/95 sm:p-5 sm:text-base">
            {slide.caption}
          </p>
        ) : null}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-900 shadow-md transition hover:bg-white"
              aria-label="Photo précédente"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-900 shadow-md transition hover:bg-white"
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
              onClick={() => goTo(i)}
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
