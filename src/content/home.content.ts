import type { HomeContent } from "./content.types";

export const homeContent = {
  hero: {
    eyebrow: "Una experiencia clara y profesional",
    title: "Una base flexible para presentar tu negocio.",
    description:
      "Una estructura pensada para adaptarse a diferentes marcas, contenidos y estilos sin tener que reconstruir la interfaz.",
    primaryAction: { label: "Conocer más", href: "#contenido" },
    secondaryAction: { label: "Cómo funciona", href: "#proceso" },
  },

  quality: {
    eyebrow: "Propuesta",
    title: "Una estructura preparada para comunicar valor desde el primer vistazo.",
    description:
      "Cada sección puede adaptarse al contenido, identidad y necesidades de cada negocio.",
    items: [
      {
        title: "Contenido flexible",
        description:
          "Los textos y datos pueden actualizarse sin modificar la estructura visual.",
      },
      {
        title: "Identidad adaptable",
        description:
          "Colores, tipografías, imágenes y estilos pueden personalizarse para cada marca.",
      },
      {
        title: "Base consistente",
        description:
          "La estructura mantiene una experiencia clara, ordenada y fácil de recorrer.",
      },
    ],
  },

  process: {
    eyebrow: "Proceso",
    title: "Una base lista para adaptarse a cada proyecto.",
    items: [
      {
        title: "Definir identidad",
        description:
          "Configura la marca, el estilo visual y la información principal.",
      },
      {
        title: "Cargar contenido",
        description:
          "Personaliza textos, imágenes, secciones y llamadas a la acción.",
      },
      {
        title: "Publicar y evolucionar",
        description:
          "La estructura queda preparada para crecer según las necesidades del proyecto.",
      },
    ],
  },

  finalCta: {
    title: "Una base preparada para tu próxima idea.",
    description:
      "Personaliza la identidad, el contenido y los recursos visuales para adaptar la experiencia a cada negocio.",
    action: { label: "Explorar contenido", href: "#contenido" },
  },
} satisfies HomeContent;