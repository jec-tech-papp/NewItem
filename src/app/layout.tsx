import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dr Cristina Spanu | Chirurgien-dentiste implantologue",
  description:
    "Cabinet dentaire spécialisé en implantologie. Soins de qualité dans un environnement serein. Prenez rendez-vous sur Doctolib.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
