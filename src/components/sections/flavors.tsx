import Image from "next/image";
import type { ProductContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";

type FlavorsProps = ProductContent;

export function Flavors({ title, description, items }: FlavorsProps) {
  return (
    <section id="flavors" className="bg-background py-section-md">
      <Container>
        <SectionHeading title={title} description={description} />
        <Carousel prevLabel="Previous flavors" nextLabel="Next flavors">
          {items.map((item) => (
            <article
              key={item.name}
              data-carousel-item
              className="w-[78%] snap-start shrink-0 rounded-card-sm bg-card-product overflow-hidden shadow-sm sm:w-[45%] md:w-[32%] lg:w-[24%]"
            >
              <div className="bg-card-product-muted relative aspect-[508/512]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-foreground text-lg font-semibold">
                  {item.name}
                </h3>
                <p className="text-muted-foreground mt-2 leading-6">
                  {item.ingredients}
                </p>
              </div>
            </article>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
