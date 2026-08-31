import { deliveryHours } from "@/content/delivery.content";
import type { LayoutConfig } from "./config.types";
 

export const layoutConfig = {
  navigation: [
    { label: "Calidad", href: "#quality" },
    { label: "Combos", href: "#flavors" },
    { label: "Cómo funciona", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],

  note: `Entregas vie. y sáb. · ${deliveryHours}`,

  cta: { label: "Reservar", href: "#reserve" },
} satisfies LayoutConfig;