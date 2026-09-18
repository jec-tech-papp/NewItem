/** Lien Google Maps pour l’itinéraire vers le cabinet */
export function googleMapsDirectionsUrl(address: string, city: string): string {
  const destination = encodeURIComponent(`${address}, ${city}`.trim());
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}
