import type { SiteConfig } from "@/config/config.types";

export function createRestaurantJsonLd(site: SiteConfig) {
  const sameAs = Object.values(site.socials).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    ...(site.url ? { url: site.url } : {}),
    ...(site.logo?.src
      ? {
          image: site.url
            ? new URL(site.logo.src, site.url).toString()
            : site.logo.src,
        }
      : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.business.address ? { address: site.business.address } : {}),
    ...(site.business.openingHours
      ? { openingHours: site.business.openingHours }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(site.business.servesCuisine
      ? { servesCuisine: site.business.servesCuisine }
      : {}),
  };
}
