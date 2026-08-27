import type { HeroContent } from "@/content/content.types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: HeroContent) {
  return (
    <section id="inicio" className="py-section-md sm:py-section-lg">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-accent mb-4 text-sm font-semibold tracking-[0.24em] uppercase">
            {eyebrow}
          </p>
          <h1 className="font-heading max-w-content-medium text-foreground text-4xl leading-tight font-semibold sm:text-6xl">
            {title}
          </h1>
          <p className="max-w-content-narrow text-muted-foreground mt-6 text-lg leading-8">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryAction.href}>{primaryAction.label}</Button>
            <Button href={secondaryAction.href} variant="secondary">
              {secondaryAction.label}
            </Button>
          </div>
        </div>
        <div className="rounded-card border-border bg-card border p-6 shadow-lg">
          <div
            className="bg-muted aspect-[4/3] rounded-lg"
            aria-hidden="true"
          />
        </div>
      </Container>
    </section>
  );
}
