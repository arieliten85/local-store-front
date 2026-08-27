# Simple Sushi architecture

Simple Sushi is a reusable Next.js starter for small production websites. It is not a page builder, CMS, multi-tenant platform, marketplace, or backend application.

Core idea:

> La estructura y los componentes son código. La identidad del negocio es configuración.

> Configuración controla intención. Componentes controlan implementación.

## Directory responsibilities

### `src/app`

Owns routes, layouts, metadata, and route-level composition. It imports content/config/theme and passes data into sections. It should not contain reusable business logic.

### `src/components/ui`

Business-agnostic primitives such as buttons, containers, and headings. UI primitives must not import `features`, `content`, or `config`.

### `src/components/sections`

Reusable page sections such as hero, quality, FAQ, CTA, header, and footer. Sections receive content and configuration through props. They do not import global content directly.

### `src/features`

Domain-focused logic and interactive flows. A feature may contain its own components, model, schemas, and helpers. Shared generic UI should stay outside features.

### `src/config`

Business configuration: brand identity, site metadata, SEO defaults, locale, currency, contact, socials, and layout intent. Config expresses intention and must not store arbitrary Tailwind classes.

### `src/content`

Typed business copy and catalog-like content. Content is plain TypeScript using `satisfies`; components receive it through props.

### `src/theme`

Design tokens, CSS theme variables, and fonts. Components use semantic tokens like `primary`, `surface`, and `foreground`, never business-specific token names.

### `src/lib`

Small shared utilities with clear ownership, such as SEO helpers and class-name merging. Avoid large generic `utils.ts` files.

### `public/brand`

Stable brand assets for each client, grouped by purpose: logo, hero, products, quality, and social. Do not commit temporary Figma URLs as production assets.

## Dependency direction

- `ui` does not depend on `features`.
- `ui` does not depend on `content`.
- `ui` does not depend on `config`.
- `sections` receive content by props.
- `features` contain interactive and domain logic.
- `app` only composes routes, layout, and metadata.
- `config` contains business configuration.
- `content` contains copy and catalog content.
- `theme` contains tokens and fonts.

## Client customization

Future clients should mainly require changes in:

- `src/config/**`
- `src/content/**`
- `src/theme/**`
- `public/brand/**`

Changing `src/app`, `src/features`, or `src/components` should only be necessary when the product behavior or reusable structure truly changes.
