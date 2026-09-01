import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type HeaderProps = {
  name: string;
  logo?: { src?: string; alt: string };
  navigation: Array<{ label: string; href: string }>;
  note: string;
  cta: { label: string; href: string };
};

export function Header({ name, logo, navigation, note, cta }: HeaderProps) {
  return (
    <header className="border-border/10 bg-surface/80 sticky top-0 z-20 border-b backdrop-blur-md">
      <Container className="flex min-h-[5.6875rem] items-center justify-between gap-4 py-3 lg:px-10">
        <a
          href="#home"
          className="focus-visible:outline-accent flex shrink-0 items-center rounded-sm"
          aria-label={`${name}: go to home`}
        >
          {logo?.src ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={266}
              height={175}
              className="h-8 w-auto object-contain sm:h-10 lg:h-12" />
          ) : (
            <span className="font-heading text-xl font-semibold">{name}</span>
          )}
        </a>
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground focus-visible:outline-accent rounded-sm text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <p className="text-muted-foreground hidden text-right text-xs leading-5 font-medium xl:block">
            {note}
          </p>
          <Button href={cta.href} className="min-h-10 px-4 py-2">
            {cta.label}
          </Button>
        </div>
      </Container>
    </header>
  );
}
