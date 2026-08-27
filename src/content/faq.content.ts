import type { FaqContent } from "./content.types";

export const faqContent = {
  eyebrow: "FAQ",
  title: "Preguntas frecuentes listas para datos reales.",
  items: [
    {
      question: "¿Dónde cambio los datos del negocio?",
      answer:
        "En src/config y src/content, sin tocar componentes reutilizables.",
    },
    {
      question: "¿Por qué no hay dirección ni horarios?",
      answer: "Porque esos datos deben cargarse solo cuando estén confirmados.",
    },
    {
      question: "¿Este starter incluye checkout?",
      answer: "No. Solo deja preparada la lógica base de pedido, sin backend.",
    },
  ],
} satisfies FaqContent;
