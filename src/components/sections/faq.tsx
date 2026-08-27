import type { FaqContent } from "@/content/content.types";
import { Container } from "@/components/ui/container";

export function Faq({ title, items }: FaqContent) {
  return (
    <section id="faq" className="bg-surface py-section-md">
      <Container>
        <h2 className="font-heading text-foreground text-center text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
        <div className="max-w-content-medium mx-auto mt-10 grid gap-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border-border bg-card rounded-md border"
            >
              <summary className="text-card-foreground focus-visible:outline-accent flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-md px-5 py-3 text-sm font-medium focus-visible:outline-3 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-accent shrink-0 text-lg transition-transform group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>
              <p className="border-border text-muted-foreground border-t px-5 py-4 text-sm leading-6">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
