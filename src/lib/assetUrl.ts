/** Préfixe les fichiers de /public pour GitHub Pages (ex. /NewItem/practitioner.jpg). */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
