import { assetUrl } from "./assetUrl";

/** Précharge des images en arrière-plan pour affichage quasi instantané au changement de slide */
export function prefetchImages(paths: string[]): void {
  if (typeof window === "undefined") return;
  for (const path of paths) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = assetUrl(path);
  }
}
