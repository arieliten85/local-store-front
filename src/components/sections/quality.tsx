import type { HomeContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type QualityProps = HomeContent["quality"];

export function Quality({ eyebrow, title, description, items }: QualityProps) {
  return (
    <section id="calidad" className="bg-surface py-section-md">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-card border-border bg-card border p-6 shadow-sm"
            >
              <h3 className="text-card-foreground text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-3 leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
