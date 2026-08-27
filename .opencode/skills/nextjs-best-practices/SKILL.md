---
name: nextjs-best-practices
description: Apply Simple Sushi Next.js App Router standards.
---

# Next.js best practices

- Use the App Router and keep routes composed in `src/app`.
- Prefer Server Components. Add `"use client"` only for state, event handlers, effects, or browser APIs.
- Keep client boundaries small and push static/SEO-critical content to the server.
- Use the Metadata API and App Router metadata files for SEO.
- Use `next/image` for real image assets and `next/font` for configured fonts.
- Compose routes from typed content, config, and reusable sections.
- Avoid unnecessary client JavaScript, providers, and dependencies.
- Keep business identity in `src/config`, `src/content`, `src/theme`, and `public/brand`.
