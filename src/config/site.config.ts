import type { SiteConfig } from "./config.types";
import { siteUrl } from "./url.config";

export const siteConfig: SiteConfig = {
  brand: "Simple Sushi",
  name: "Simple Sushi",
  logo: {
    src: "/brand/logo/logo.png",
    alt: "Simple Sushi",
  },
  locale: "es",
  url: siteUrl,
  contact: {},
  socials: {},
  business: {
    servesCuisine: "Sushi",
  },
} satisfies SiteConfig;
