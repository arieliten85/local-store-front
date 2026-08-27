import type { LayoutConfig } from "./config.types";

export const layoutConfig = {
  navigation: [
    { label: "Calidad", href: "#calidad" },
    { label: "Sabores", href: "#sabores" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Ver opciones", href: "#sabores" },
} satisfies LayoutConfig;
