import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0369a1",
};

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const cabinetHeroPreload = `${basePath}/images/cabinet/01.webp`;

  return (
    <html lang="fr" className={`${dmSans.variable} ${cormorant.variable} h-full`}>
      <head>
        <link rel="preload" as="image" href={cabinetHeroPreload} type="image/webp" />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
