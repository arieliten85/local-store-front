import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Quality } from "@/components/sections/quality";
import { Flavors } from "@/components/sections/flavors";
import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import { homeContent } from "@/content/home.content";
import { catalogContent } from "@/content/catalog.content";

export default function Home() {
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
      </main>
    </>
  );
}
