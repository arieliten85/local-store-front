import type { HomeContent } from "@/content/content.types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type FinalCtaProps = HomeContent["finalCta"];

export function FinalCta({ title, description, action }: FinalCtaProps) {
  return (
    <section className="py-section-md">
      <Container>
        <div className="rounded-card bg-primary text-primary-foreground px-6 py-10 shadow-lg sm:px-10">
          <h2 className="font-heading max-w-content-narrow text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-content-narrow text-primary-foreground/80 mt-4 leading-7">
            {description}
          </p>
          <Button href={action.href} variant="secondary" className="mt-8">
            {action.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
