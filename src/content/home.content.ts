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
    primaryAction: { label: "Reservar mi tabla", href: "#reserve" },
    secondaryAction: { label: "Ver Combos", href: "#flavors" },
  },

  quality: {
    title: "Nuestra Promesa",
    items: [
      {
        title: "Ingredientes seleccionados",
        description: "Calidad premium garantizada en cada corte.",
        image: {
          src: "/brand/quality/selected-ingredients.png",
          alt: "Ingredientes seleccionados de sushi de alta calidad",
        },
      },
      {
        title: "Preparado a pedido",
        description: "Fresco, armado exclusivamente para tu entrega.",
        image: {
          src: "/brand/quality/made-to-order.png",
          alt: "Sushi preparado a pedido, listo para entregar",
        },
      },
      {
        title: "Elaboración artesanal",
        description: "Técnicas tradicionales y respeto por el producto.",
        image: {
          src: "/brand/quality/artisan-preparation.png",
          alt: "Elaboración artesanal de sushi",
        },
      },
      {
        title: "Cadena de frío cuidada",
        description: "Control estricto desde el origen hasta tu mesa.",
        image: {
          src: "/brand/quality/cold-chain.png",
          alt: "Sushi mantenido en una cadena de frío cuidada",
        },
      },
    ],
  },

  process: {
    eyebrow: "",
    title: "Cómo funciona",
    items: [
      {
        title: "Reserva",
        description:
          "Elegí el tamaño ideal para tu noche y envianos un mensaje directo. Confirmamos stock al instante para asegurar tu lugar.",
      },
      {
        title: "Preparación",
        description:
          "Nuestros sushiman elaboran tu pedido pocas horas antes de la entrega. Frescura absoluta y precisión artesanal en cada pieza.",
      },
      {
        title: "Disfrutá",
        description:
          "Recibí tu pedido en la puerta de tu casa. Todo listo para una experiencia gastronómica de nivel.",
      },
    ],
  },

  finalCta: {
    eyebrow: "SIMPLE SUSHI",
    title: "Reservá durante la semana. Nosotros lo preparamos para vos.",
    description: "Reservá durante la semana y elegí el día que más te guste.",
    image: {
      src: "/brand/hero/hero-table.png",
      alt: "Tabla surtida de sushi preparada por Simple Sushi",
    },
    action: { label: "Reservar mi tabla", href: "#reserve" },
  },
} satisfies HomeContent;
