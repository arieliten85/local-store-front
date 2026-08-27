import { Container } from "@/components/ui/container";

type FooterProps = {
  name: string;
  socials: Array<{ label: string; href: string }>;
};

export function Footer({ name, socials }: FooterProps) {
  return (
    <footer className="border-border border-t py-8">
      <Container className="text-muted-foreground flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          Copyright {new Date().getFullYear()} {name}. Todos los derechos
          reservados.
        </p>
        {socials.length > 0 ? (
          <nav aria-label="Social links" className="flex gap-4">
            {socials.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </Container>
    </footer>
  );
}
