import type { FaqContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Faq({ eyebrow, title, items }: FaqContent) {
  return (
    <section id="faq" className="py-section-md">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
        <div className="max-w-content-medium divide-border rounded-card border-border bg-card mx-auto mt-10 divide-y border px-6">
          {items.map((item) => (
            <article key={item.question} className="py-6">
              <h3 className="text-card-foreground font-semibold">
                {item.question}
              </h3>
              <p className="text-muted-foreground mt-2 leading-7">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
