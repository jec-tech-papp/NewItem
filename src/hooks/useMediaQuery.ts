"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  /* Évite un flash « mobile » au chargement sur desktop (parallaxe / mise en page). */
  if (matches === null) return true;
  return matches;
}

export function useDesktopEffects(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
