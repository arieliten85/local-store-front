"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Container } from "@/components/ui/container";
import type { FooterContent } from "@/content/content.types";

type FooterProps = {
  name: string;
  logo?: { src?: string; alt: string };
  content: FooterContent;
  navigation: Array<{ label: string; href: string }>;
  socials: Array<{ label: string; href: string }>;
  whatsappHref: string;
  whatsappNumber: string;
};

function formatWhatsAppNumber(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 10) return number;

  if (digits.startsWith("54")) {
    const local = digits.slice(2);
    return `+54 9 ${local.slice(0, 2)} ${local.slice(2, 6)}-${local.slice(6)}`;
  }

  return number;
}

export function Footer({
  name,
  logo,
  content,
  navigation,
  socials,
  whatsappHref,
  whatsappNumber,
}: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const formattedNumber = formatWhatsAppNumber(whatsappNumber);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(pointer: coarse)");

    const update = () =>
      setIsMobile(media.matches || navigator.maxTouchPoints > 0);
    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const handleContactClick = async () => {
    if (isMobile) {
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copiar número de WhatsApp", formattedNumber);
    }
  };

  return (
    <footer className="border-border bg-background border-t py-12">
      <Container>
        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.15fr_0.85fr_1fr_0.8fr] lg:gap-8">
          <div className="flex items-center justify-center sm:justify-start lg:pt-0">
            {logo?.src ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={666}
                height={375}
                className="h-12 w-auto object-contain sm:h-10 lg:h-12"
              />
            ) : (
              <p className="font-heading text-foreground text-xl">{name}</p>
            )}
          </div>

          <div className="grid content-start gap-7">
            <FooterGroup
              title={content.reservations.title}
              lines={content.reservations.lines}
            />
            <FooterGroup
              title={content.deliveries.title}
              lines={content.deliveries.lines}
            />
          </div>

          <div className="grid content-start gap-7">
            <div>
              <FooterTitle>{content.coverage.title}</FooterTitle>
              <p className="text-foreground mt-3 text-sm">
                {content.coverage.area}
              </p>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {content.coverage.description}
              </p>
            </div>
            <div>
              <FooterTitle>{content.contact.title}</FooterTitle>
              <button
                type="button"
                onClick={handleContactClick}
                aria-label="Contact on WhatsApp"
                className="text-muted-foreground hover:text-accent focus-visible:outline-accent mt-3 inline-flex items-center gap-2 rounded-sm text-sm transition-colors focus-visible:outline-3 focus-visible:outline-offset-3"
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">{formattedNumber}</span>
                {!isMobile &&
                  (copied ? (
                    <FiCheck
                      className="h-4 w-4 text-status-success"
                      aria-hidden="true"
                    />
                  ) : (
                    <FiCopy className="h-4 w-4" aria-hidden="true" />
                  ))}
              </button>
            </div>
          </div>

          <div className="grid content-start gap-7">
            <nav aria-label="Links">
              <FooterTitle>{content.linksTitle}</FooterTitle>
              <ul className="mt-3 grid gap-2.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-accent focus-visible:outline-accent rounded-sm text-sm transition-colors focus-visible:outline-3 focus-visible:outline-offset-3"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {socials.length > 0 ? (
              <nav aria-label="Social media">
                <FooterTitle>{content.socialsTitle}</FooterTitle>
                <ul className="mt-3 flex flex-wrap justify-center gap-4 sm:justify-start">
                  {socials.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-accent focus-visible:outline-accent rounded-sm text-sm capitalize transition-colors focus-visible:outline-3 focus-visible:outline-offset-3"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>

        <div className="border-border text-muted-foreground mt-12 flex flex-col gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-center">
          <p className="text-center">
            © {new Date().getFullYear()} {name}. {content.copyright}
          </p>
          {content.legalLinks.length > 0 ? (
            <nav
              aria-label="Legal"
              className="flex flex-wrap justify-center gap-5"
            >
              {content.legalLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-foreground focus-visible:outline-accent rounded-sm transition-colors focus-visible:outline-3 focus-visible:outline-offset-3"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

function FooterTitle({ children }: { children: string }) {
  return (
    <h2 className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
      {children}
    </h2>
  );
}

function FooterGroup({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>
      <div className="text-muted-foreground mt-3 grid gap-1 text-sm leading-6">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
