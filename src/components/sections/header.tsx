import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type HeaderProps = {
  name: string;
  navigation: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
};

export function Header({ name, navigation, cta }: HeaderProps) {
  return (
    <header className="border-border bg-background/90 border-b">
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <a href="#inicio" className="font-heading text-xl font-semibold">
          {name}
        </a>
        <nav
          aria-label="Principal"
          className="hidden items-center gap-6 md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button href={cta.href} className="hidden sm:inline-flex">
          {cta.label}
        </Button>
      </Container>
    </header>
  );
}
