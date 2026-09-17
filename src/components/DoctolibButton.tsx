import type { CSSProperties, ReactNode } from "react";

export const DOCTOLIB_BOOKING_URL =
  "https://www.doctolib.fr/dentiste/bures-sur-yvette/cristina-spanu-bures-sur-yvette";

const doctolibLinkStyle: CSSProperties = {
  backgroundColor: "#0596de",
  color: "white",
  padding: "12px 24px",
  textDecoration: "none",
  borderRadius: "4px",
  display: "inline-block",
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  textAlign: "center",
};

type DoctolibButtonProps = {
  children?: ReactNode;
  href?: string;
  className?: string;
};

export function DoctolibButton({
  children = "Prendre rendez-vous sur Doctolib",
  href = DOCTOLIB_BOOKING_URL,
  className,
}: DoctolibButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={doctolibLinkStyle}
      className={className}
    >
      {children}
    </a>
  );
}
