# Simple Sushi

Starter de sitio web para una tienda local de sushi. No incluye backend, checkout, CMS ni datos reales inventados.

## Stack

Next.js App Router, React, TypeScript strict, Tailwind CSS v4, Bun, Zod, CVA, clsx y tailwind-merge.

## Requisitos

Instala Bun y usa solo Bun para dependencias y scripts.

```bash
curl -fsSL https://bun.sh/install | bash
bun install
bun dev
```

## Scripts

`bun dev`, `bun build`, `bun start`, `bun lint`, `bun typecheck`, `bun format`, `bun format:check` y `bun check`.

## Arquitectura

`src/app` compone rutas y SEO. `src/config` guarda identidad e intención. `src/content` guarda textos tipados. `src/theme` define tokens y fuentes. `src/components` contiene UI y secciones. `src/features/order` guarda lógica de pedido sin checkout.

## Personalización

Cambiar clientes debería ocurrir principalmente en `src/config/**`, `src/content/**`, `src/theme/**` y `public/brand/**`.

## Estado visual

La home, el copy y el layout actuales sirven para validar la base técnica. Figma será la próxima fuente visual; se deben conservar la separación de configuración, contenido, tema y arquitectura.

## URL pública

Define `NEXT_PUBLIC_SITE_URL` para producción. En desarrollo se permite `localhost`; en producción, si falta la variable, no se publica canonical, sitemap ni URL pública falsa.

Lee también `AGENTS.md` y `ARCHITECTURE.md` antes de cambiar estructura o reglas del proyecto.
