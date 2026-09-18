import type { Metadata } from "next";
import type { Article, SiteSettings } from "@/lib/types";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

const DEFAULT_OG_IMAGE = "/practitioner.jpg";

function parseCityField(city: string): { postalCode: string; locality: string } {
  const match = city.match(/^(\d{5})\s+(.+)$/);
  if (match) {
    return { postalCode: match[1], locality: match[2] };
  }
  return { postalCode: "", locality: city };
}

function phoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("33")) return `+${digits}`;
  if (digits.startsWith("0")) return `+33${digits.slice(1)}`;
  return `+${digits}`;
}

export function buildPageDescription(settings: SiteSettings): string {
  return `${settings.practitionerName}, ${settings.title.toLowerCase()} à Bures-sur-Yvette (Essonne). Parodontologie, prothèse sur implant et esthétique dentaire. ${settings.address}, ${settings.city}. Rendez-vous sur Doctolib ou au ${settings.phone}.`;
}

export function buildPageTitle(settings: SiteSettings): string {
  return `${settings.practitionerName} | ${settings.title} à Bures-sur-Yvette (91440)`;
}

export function buildSiteMetadata(settings: SiteSettings): Metadata {
  const siteUrl = getSiteUrl();
  const title = buildPageTitle(settings);
  const description = buildPageDescription(settings);
  const ogImage = absoluteUrl(settings.practitionerImage || DEFAULT_OG_IMAGE);

  const keywords = [
    "dentiste Bures-sur-Yvette",
    "chirurgien-dentiste 91440",
    "Dr Cristina Spanu",
    "parodontologie Essonne",
    "implant dentaire Bures-sur-Yvette",
    "esthétique dentaire",
    "prothèse sur implant",
    "cabinet dentaire Bures-sur-Yvette",
  ];

  return {
    metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`),
    title: {
      default: title,
      template: `%s | ${settings.practitionerName}`,
    },
    description,
    keywords,
    authors: [{ name: settings.practitionerName }],
    creator: settings.practitionerName,
    publisher: settings.practitionerName,
    category: "health",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: siteUrl,
      siteName: settings.practitionerName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${settings.practitionerName}, ${settings.title} à Bures-sur-Yvette`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/logos/spanu-logo.png", type: "image/png" }],
      apple: [{ url: "/logos/spanu-logo.png", type: "image/png" }],
    },
    other: {
      "geo.region": "FR-91",
      "geo.placename": "Bures-sur-Yvette",
    },
  };
}

/** Données structurées Schema.org (Dentist + WebSite + conseils patients). */
export function buildStructuredData(
  settings: SiteSettings,
  articles: Article[],
): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const { postalCode, locality } = parseCityField(settings.city);
  const imageUrl = absoluteUrl(settings.practitionerImage || DEFAULT_OG_IMAGE);
  const logoUrl = absoluteUrl(settings.logoUrl || "/logos/spanu-logo.png");

  const dentist: Record<string, unknown> = {
    "@type": "Dentist",
    "@id": `${siteUrl}/#dentiste`,
    name: settings.practitionerName,
    description: settings.aboutIntro,
    url: siteUrl,
    image: imageUrl,
    logo: logoUrl,
    telephone: phoneE164(settings.phone),
    medicalSpecialty: ["Dentistry", "Periodontics"],
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    sameAs: [settings.doctolibUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: locality,
      postalCode: postalCode || "91440",
      addressRegion: "Essonne",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.6974,
      longitude: 2.1628,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "15:00",
        closes: "18:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Bures-sur-Yvette",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Soins dentaires",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Parodontologie" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Prothèse sur implant" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Esthétique dentaire" },
        },
      ],
    },
  };

  if (settings.email) {
    dentist.email = settings.email;
  }

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: settings.practitionerName,
    description: buildPageDescription(settings),
    inLanguage: "fr-FR",
    publisher: { "@id": `${siteUrl}/#dentiste` },
  };

  const graph: Record<string, unknown>[] = [
    website,
    dentist,
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: buildPageTitle(settings),
      description: buildPageDescription(settings),
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#dentiste` },
      inLanguage: "fr-FR",
      primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
    },
  ];

  for (const article of articles) {
    graph.push({
      "@type": "Article",
      "@id": `${siteUrl}/#article-${article.id}`,
      headline: article.title,
      description: article.excerpt,
      articleBody: article.content,
      datePublished: article.createdAt,
      author: { "@id": `${siteUrl}/#dentiste` },
      isPartOf: { "@id": `${siteUrl}/#webpage` },
      inLanguage: "fr-FR",
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
