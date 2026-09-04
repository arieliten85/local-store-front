import type { Metadata } from "next";
import type { ReactNode } from "react";
import { defaultMetadata } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";
import { createRestaurantJsonLd } from "@/lib/seo/json-ld";
import { bodyFont, headingFont } from "@/theme/fonts";
import "./globals.css";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const restaurantJsonLd = createRestaurantJsonLd(siteConfig);

  return (
    <html
      lang="es"
      className={`${headingFont.variable} ${bodyFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
