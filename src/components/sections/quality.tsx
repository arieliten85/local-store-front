import Image from "next/image";
import type { HomeContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";

type QualityProps = HomeContent["quality"];

export function Quality({ title, items }: QualityProps) {
  return (
    <section id="quality" className="bg-background py-section-md">
      <Container>
        <SectionHeading title={title} />
        <Carousel
          prevLabel="Previous promises"
          nextLabel="Next promises"
          viewportClassName="-mr-5 mt-10 gap-4 pb-3 pr-5 sm:mr-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:pb-0 sm:pr-0 lg:grid-cols-4"
          controlsClassName="sm:hidden"
        >
          {items.map((item, index) => (
            <article
              key={item.title}
              data-carousel-item
              className="group rounded-card-sm shadow-md relative aspect-[4/5] w-[78vw] max-w-[22rem] shrink-0 snap-start overflow-hidden ring-1 ring-white/10 sm:w-auto sm:max-w-none"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 motion-reduce:transition-none sm:group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
              />
              <span
                aria-hidden="true"
                className="font-heading text-accent absolute top-5 left-6 text-xs font-semibold tracking-[0.2em]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-4 h-px w-8 bg-accent/70" aria-hidden="true" />
                <h3 className="text-lg font-semibold leading-tight text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.7)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 min-h-[2.375rem] text-xs leading-snug text-white/80 [text-shadow:0_1px_8px_rgb(0_0_0/0.8)]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
