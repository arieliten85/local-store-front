<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Simple Sushi repository rules

La estructura y los componentes son código.
La identidad del negocio es configuración.

Configuración controla intención.
Componentes controlan implementación.

## Permanent rules

- Use Bun as the only package manager.
- Use Next.js App Router.
- Keep TypeScript strict.
- Use Tailwind CSS v4.
- Prefer Server Components by default.
- Use Client Components only when state, event handlers, effects, or browser APIs require them.
- Keep business configuration separate from components.
- Keep content separate from presentation.
- Use semantic design tokens for themes.
- Do not hardcode brand colors in components.
- Do not hardcode business copy in reusable components.
- Do not create `src/types` as a dumping ground.
- Keep types close to their owner.
- Features contain domain logic.
- Generic UI does not know business context.
- Do not add dependencies when Next, React, or Web APIs solve the problem correctly.
- Do not create speculative abstractions.
- Do not create a page builder, CMS, multi-tenant system, or monorepo.
- Do not implement a backend yet.
- Keep important SEO server-rendered.
- Accessibility is required.
- Use `next/image` for images.
- Name static brand assets with clean descriptive kebab-case slugs; never commit generated export/import suffixes or hashes (e.g. `selected-ingredients.png`, not `selected-ingredients-1f67ef.png`).
- Keep internal identifiers in English: DOM `id` attributes, anchor hashes (`href="#..."`), `aria-label` technical values, and prop values (e.g. `id="flavors"`, `prevLabel="Previous flavors"`). User-visible business copy (button labels, section titles, descriptions, alt texts) stays in the business language (Spanish).
- Use `next/font` for fonts.
- Do not use temporary Figma URLs in production.
- Run lint, typecheck, and build before finishing structural changes.

## Customization boundary

Future client customization should mainly happen in:

- `src/config/**`
- `src/content/**`
- `src/theme/**`
- `public/brand/**`
