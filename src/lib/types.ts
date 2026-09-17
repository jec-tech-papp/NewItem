export interface SiteSettings {
  practitionerName: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  doctolibUrl: string;
  heroTagline: string;
  aboutText: string;
  openingHours: string;
  practitionerImage: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export const MAX_FEATURED_ARTICLES = 5;
