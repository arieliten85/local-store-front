import type { SiteConfig } from "./config.types";
import { siteUrl } from "./url.config";

export const siteConfig: SiteConfig = {
 brand: "Business Name",
  name: "Business Name",
  logo: {
    alt: "Business Name",
  },
  locale: "es",
  url: siteUrl,
  contact: {},
  socials: {},
  business: {
    servesCuisine: "Sushi",
  },
} satisfies SiteConfig;
