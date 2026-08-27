import type { HomeContent } from "./content.types";

export const homeContent = {
  hero: {
    eyebrow: "EL SUSHI DEL FINDE.",
    title: "Tabla Surtida de Sushi",
    description:
      "Hecho a pedido. Reservá durante la semana y recibilo viernes o sábado.",
    image: {
      src: "/brand/hero/hero-table.png",
      alt: "Tabla surtida de sushi de Simple Sushi",
    },
    badges: [
      {
        label: "Entregas viernes y sábado",
        icon: "/brand/social/delivery-calendar-icon.svg",
        iconWidth: 14,
        iconHeight: 15,
      },
      {
        label: "18 a 21 h",
        icon: "/brand/social/time-icon.svg",
        iconWidth: 15,
        iconHeight: 15,
      },
      {
        label: "Delivery gratis en Alejandro Korn",
        icon: "/brand/social/delivery-icon.svg",
        iconWidth: 17,
        iconHeight: 12,
      },
      {
        label: "Radio de cobertura: hasta 3 km",
        icon: "/brand/social/coverage-icon.svg",
        iconWidth: 17,
        iconHeight: 17,
      },
    ],
    primaryAction: { label: "Reservar mi tabla", href: "#reservar" },
    secondaryAction: { label: "Ver Combos", href: "#combos" },
  },

  quality: {
    eyebrow: "Propuesta",
    title:
      "Una estructura preparada para comunicar valor desde el primer vistazo.",
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
