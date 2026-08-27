import Image from "next/image";
import type { HeroContent } from "@/content/content.types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero({
  eyebrow,
  title,
  description,
  image,
  badges,
  primaryAction,
  secondaryAction,
}: HeroContent) {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[calc(100svh-5.6875rem)] overflow-hidden"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="from-background via-background/80 absolute inset-0 -z-10 bg-gradient-to-r to-transparent" />
      <Container className="py-section-md sm:py-section-lg flex min-h-[calc(100svh-5.6875rem)] items-center">
        <div className="max-w-content-medium">
          <p className="text-accent mb-4 text-sm font-semibold tracking-[0.24em] uppercase sm:mb-5">
            {eyebrow}
          </p>
          <h1 className="font-heading text-foreground max-w-3xl text-5xl leading-[0.95] font-semibold sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
            {description}
          </p>
          <ul className="mt-8 flex max-w-3xl flex-wrap gap-3">
            {badges.map((badge) => (
              <li
                key={badge.label}
                className="border-border/45 bg-surface/45 text-foreground rounded-button flex w-fit items-center gap-3 border px-4 py-3 text-sm font-medium backdrop-blur-sm"
              >
                <Image
                  src={badge.icon}
                  alt=""
                  width={badge.iconWidth}
                  height={badge.iconHeight}
                  aria-hidden="true"
                />
                <span>{badge.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryAction.href}>{primaryAction.label}</Button>
            <Button href={secondaryAction.href} variant="secondary">
              {secondaryAction.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
