export type SiteContact = {
  email?: string;
  phone?: string;
  whatsapp?: string;
};

export type SiteSocials = Partial<
  Record<"instagram" | "facebook" | "tiktok" | "x", string>
>;

export type BusinessInfo = {
  legalName?: string;
  address?: string;
  openingHours?: string[];
  servesCuisine?: string;
};

export type SiteConfig = {
  brand: string;
  name: string;
  logo?: {
    src?: string;
    alt: string;
  };
  url?: string;
  locale: "es" | "es-AR" | "es-UY" | "es-CL" | "es-MX";
  currency?: "ARS" | "UYU" | "CLP" | "MXN" | "USD";
  contact: SiteContact;
  socials: SiteSocials;
  business: BusinessInfo;
};

export type SeoConfig = {
  title: string;
  description: string;
  keywords: string[];
};

export type LayoutConfig = {
  navigation: Array<{ label: string; href: string }>;
  note: string;
  cta: { label: string; href: string };
};
