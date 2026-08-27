import type { Metadata } from "next";
import type { SeoConfig } from "./config.types";
import { siteConfig } from "./site.config";
import { siteUrl } from "./url.config";

export const seoConfig = {
  title: "Sushi fresco para pedidos simples",
  description:
    "Sitio inicial para una tienda local de sushi con contenido editable, SEO server-rendered y estructura lista para personalizar.",
  keywords: ["sushi", "tienda local", "pedidos"],
} satisfies SeoConfig;

export const defaultMetadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: seoConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
  },
} satisfies Metadata;
