import type { ReactNode } from "react";

export const DOCTOLIB_BOOKING_URL =
  "https://www.doctolib.fr/dentiste/bures-sur-yvette/cristina-spanu-bures-sur-yvette";

type DoctolibButtonProps = {
  children?: ReactNode;
  href?: string;
  className?: string;
  /** Version compacte pour le header mobile */
  variant?: "default" | "header";
};

export function DoctolibButton({
  children = "Prendre rendez-vous sur Doctolib",
  href = DOCTOLIB_BOOKING_URL,
  className = "",
  variant = "default",
}: DoctolibButtonProps) {
  const variantClass =
    variant === "header" ? "doctolib-cta doctolib-cta-header" : "doctolib-cta";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantClass} ${className}`.trim()}
    >
      {children}
    </a>
  );
}
