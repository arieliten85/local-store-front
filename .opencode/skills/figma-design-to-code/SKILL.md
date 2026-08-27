---
name: figma-design-to-code
description: Convert future Figma sections into Simple Sushi code safely.
---

# Figma design to code

- Inspect the Figma node before coding.
- Use screenshot and layout context to understand intent.
- Treat generated code as reference, not final architecture.
- Respect this repo architecture and reuse existing components first.
- Download real assets into `public/brand/**`; never keep temporary Figma URLs.
- Validate responsive behavior, accessibility, spacing, and typography.
- Avoid copying absolute positioning unless it is truly part of the design intent.
- Keep business copy in `src/content` and brand decisions in `src/config` or `src/theme`.
