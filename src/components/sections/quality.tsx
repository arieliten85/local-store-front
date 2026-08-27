import Image from "next/image";
import type { HomeContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type QualityProps = HomeContent["quality"];

export function Quality({ title, items }: QualityProps) {
  return (
    <section id="quality" className="bg-background py-section-md">
      <Container>
        <SectionHeading title={title} />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="relative aspect-[422/512] overflow-hidden rounded-card-sm"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
