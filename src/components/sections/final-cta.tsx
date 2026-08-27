import Image from "next/image";
import type { HomeContent } from "@/content/content.types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type FinalCtaProps = HomeContent["finalCta"];

export function FinalCta({
  eyebrow,
  title,
  description,
  image,
  action,
}: FinalCtaProps) {
  const titleParts = title.split(/(para vos.)/i);

  return (
    <section className="bg-surface py-section-md">
      <Container>
        <div className="rounded-card-sm relative isolate min-h-80 overflow-hidden shadow-lg sm:min-h-96">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1200px) 100vw, 72rem"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="bg-background/65 absolute inset-0 -z-10"
          />
          <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center sm:min-h-96">
            <p className="border-accent text-accent rounded-sm border px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
              {eyebrow}
            </p>
            <h2 className="font-heading text-foreground mt-5 max-w-2xl text-3xl leading-tight font-semibold sm:text-5xl">
              {titleParts.map((part, index) =>
                part.toLowerCase() === "para vos." ? (
                  <span key={`${part}-${index}`} className="text-accent">
                    {part}
                  </span>
                ) : (
                  <span key={`${part}-${index}`}>{part}</span>
                ),
              )}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl leading-7">
              {description}
            </p>
            <Button href={action.href} className="mt-7">
              {action.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
