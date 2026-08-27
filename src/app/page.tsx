import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Flavors } from "@/components/sections/flavors";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Quality } from "@/components/sections/quality";
import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import { catalogContent } from "@/content/catalog.content";
import { faqContent } from "@/content/faq.content";
import { homeContent } from "@/content/home.content";

export default function Home() {
  const socials = Object.entries(
    siteConfig.socials as Record<string, string | undefined>,
  ).flatMap(([label, href]) => (href ? [{ label, href }] : []));
  const formatPrice = (price?: number) =>
    typeof price === "number" && siteConfig.currency
      ? new Intl.NumberFormat(siteConfig.locale, {
          style: "currency",
          currency: siteConfig.currency,
        }).format(price)
      : "Precio a confirmar";

  return (
    <>
      <Header
        name={siteConfig.name}
        navigation={layoutConfig.navigation}
        cta={layoutConfig.cta}
      />
      <main>
        <Hero {...homeContent.hero} />
        <Quality {...homeContent.quality} />
        <Flavors {...catalogContent} formatPrice={formatPrice} />
        <Process {...homeContent.process} />
        <Faq {...faqContent} />
        <FinalCta {...homeContent.finalCta} />
      </main>
      <Footer name={siteConfig.name} socials={socials} />
    </>
  );
}
