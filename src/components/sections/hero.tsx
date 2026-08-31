import Image from "next/image";
import type { HeroContent } from "@/content/content.types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero({
  title,
  description,
  image,
  badges,
  coverage,
  action,
}: HeroContent) {
  return (
    <section
      id="home"
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
          <ul className="mb-6 flex max-w-3xl flex-wrap gap-2">
            {badges.map((badge) => (
              <li
                key={badge.label}
                className="border-border/45 bg-surface/45 text-foreground rounded-button flex w-fit items-center gap-2 border px-3 py-2 text-xs font-medium backdrop-blur-sm"
              >
                <Image
                  src={badge.icon}
                  alt=""
                  width={badge.iconWidth * 0.8}
                  height={badge.iconHeight * 0.8}
                  aria-hidden="true"
                />

                <span>{badge.label}</span>
              </li>
            ))}
          </ul>
          <h1 className="font-heading text-foreground max-w-4xl text-6xl leading-[0.9] font-semibold sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-base leading-7 sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={action.href}>{action.label}</Button>
            <a
              href={coverage.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-2 text-sm transition-colors"
            >
              <Image
                src="/brand/social/coverage-icon.svg"
                alt=""
                width={15}
                height={15}
                aria-hidden="true"
              />
              <span>{coverage.label}</span>
              <span className="underline underline-offset-4">
                {coverage.linkLabel}
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
