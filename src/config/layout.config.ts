import type { LayoutConfig } from "./config.types";

export const layoutConfig = {
  navigation: [
    { label: "Calidad", href: "#quality" },
    { label: "Combos", href: "#flavors" },
    { label: "Cómo funciona", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  note: "Entregas vie. y sáb. · 18–21 h",
  cta: { label: "Reservar", href: "#reserve" },
} satisfies LayoutConfig;
