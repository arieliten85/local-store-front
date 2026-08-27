import type { FooterContent } from "./content.types";

export const footerContent = {
  reservations: {
    title: "RESERVAS",
    lines: ["Reservas abiertas toda la semana"],
  },
  deliveries: {
    title: "ENTREGAS",
    lines: ["Viernes y sábado", "18:00 — 21:00"],
  },
  coverage: {
    title: "ZONA DE DELIVERY",
    area: "Alejandro Korn",
    description: "Delivery gratis hasta 3 km.",
  },
  contact: {
    title: "CONTACTO",
    whatsappLabel: "WhatsApp",
  },
  linksTitle: "ENLACES",
  socialsTitle: "SEGUINOS",
  copyright: "Todos los derechos reservados.",
  legalLinks: [],
} satisfies FooterContent;
