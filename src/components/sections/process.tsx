import type { HomeContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type ProcessProps = HomeContent["process"];

const japaneseNumerals = ["壱", "弐", "参"];

export function Process({ eyebrow, title, items }: ProcessProps) {
  return (
    <section id="process" className="bg-background py-section-md">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
        <div className="max-w-content-wide relative mx-auto mt-20">
          <span
            aria-hidden="true"
            className="border-accent/45 absolute top-9 right-[16.666%] left-[16.666%] hidden border-t border-dashed md:block"
          />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
            {items.map((item, index) => {
              const numeral = japaneseNumerals[index] ?? String(index + 1);

              return (
                <li
                  key={item.title}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-accent/5 absolute -top-15 text-8xl"
                  >
                    {numeral}
                  </span>
                  <span className="border-accent bg-card text-accent font-heading relative flex size-18 items-center justify-center rounded-full border text-2xl shadow-md">
                    {index + 1}
                  </span>
                  <h3 className="font-heading text-foreground mt-7 text-xl font-medium">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 max-w-72 text-sm leading-6">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
