import type { CatalogContent } from "./content.types";

export const catalogContent = {
  eyebrow: "Propuesta",
  title: "Opciones pensadas para presentar lo que ofrece tu negocio.",
  description:
    "Este catálogo funciona como una base flexible para mostrar productos, servicios o propuestas de manera clara y ordenada.",

  items: [
    {
      id: "opcion-principal",
      name: "Opción principal",
      description:
        "Elemento destacado para presentar una propuesta relevante del negocio.",
    },
    {
      id: "opcion-destacada",
      name: "Opción destacada",
      description:
        "Alternativa pensada para mostrar otra opción importante dentro de la oferta.",
    },
    {
      id: "opcion-adicional",
      name: "Opción adicional",
      description:
        "Contenido flexible para completar la propuesta con otra alternativa.",
    },
  ],
} satisfies CatalogContent;
