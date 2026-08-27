import type { CatalogContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type FlavorsProps = CatalogContent & {
  formatPrice: (price?: number) => string;
};

export function Flavors({
  eyebrow,
  title,
  description,
  items,
  formatPrice,
}: FlavorsProps) {
  return (
    <section id="sabores" className="py-section-md">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-card border-border bg-card border p-6"
            >
              <h3 className="text-card-foreground text-xl font-semibold">
                {item.name}
              </h3>
              <p className="text-muted-foreground mt-3 leading-7">
                {item.description}
              </p>
              <p className="text-accent mt-5 text-sm font-semibold">
                {formatPrice(item.price)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
