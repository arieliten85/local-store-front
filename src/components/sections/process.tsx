import type { HomeContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type ProcessProps = HomeContent["process"];

export function Process({ eyebrow, title, items }: ProcessProps) {
  return (
    <section id="process" className="bg-muted py-section-md">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="rounded-card bg-surface p-6 shadow-sm"
            >
              <span className="text-accent text-sm font-semibold">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-3 leading-7">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
