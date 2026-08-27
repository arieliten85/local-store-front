import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Quality } from "@/components/sections/quality";
import { Flavors } from "@/components/sections/flavors";
import { OrderBuilder } from "@/components/sections/order-builder";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import { homeContent } from "@/content/home.content";
import { catalogContent } from "@/content/catalog.content";
import { orderContent } from "@/content/order.content";
import { faqContent } from "@/content/faq.content";
import { footerContent } from "@/content/footer.content";
import {
  deliveryDates,
  deliverySlots,
  orderDelivery,
  orderSizes,
  orderWhatsAppNumber,
} from "@/config/order.config";

export default function Home() {
  const socials = Object.entries(siteConfig.socials).map(([label, href]) => ({
    label,
    href,
  }));
  return (
    <>
      <Header
        name={siteConfig.name}
        logo={siteConfig.logo}
        navigation={layoutConfig.navigation}
        note={layoutConfig.note}
        cta={layoutConfig.cta}
      />
      <main>
        <Hero {...homeContent.hero} />
        <Quality {...homeContent.quality} />
        <Flavors {...catalogContent} />
        <OrderBuilder
          sizes={orderSizes}
          dates={deliveryDates}
          slots={deliverySlots}
          delivery={orderDelivery}
          whatsappNumber={orderWhatsAppNumber}
          content={orderContent}
        />
        <Process {...homeContent.process} />
        <Faq {...faqContent} />
        <FinalCta {...homeContent.finalCta} />
      </main>
      <Footer
        name={siteConfig.name}
        logo={siteConfig.logo}
        content={footerContent}
        navigation={layoutConfig.navigation}
        socials={socials}
        whatsappHref={`https://wa.me/${orderWhatsAppNumber}`}
      />
    </>
  );
}
