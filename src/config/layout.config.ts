import type { LayoutConfig } from "./config.types";

export const layoutConfig = {
  navigation: [
    { label: "Calidad", href: "#calidad" },
    { label: "Combos", href: "#combos" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "FAQ", href: "#faq" },
  ],
  note: "Entregas vie. y sáb. · 18–21 h",
  cta: { label: "Reservar", href: "#reservar" },
} satisfies LayoutConfig;
