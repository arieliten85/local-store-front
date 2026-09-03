import type { HomeContent } from "./content.types";

export const homeContent = {
  hero: {
    title: "El sushi del finde",
    description: "Reservá con anticipación y asegurá tu pedido.",
    image: {
      src: "/brand/hero/hero-table.png",
      alt: "Tabla surtida de sushi de Simple Sushi",
    },
    badges: [
      // {
      //   label: "Entregas viernes y sábado",
      //   icon: "/brand/social/delivery-calendar-icon.svg",
      //   iconWidth: 14,
      //   iconHeight: 15,
      // },
      // {
      //   label: "18 a 21 h",
      //   icon: "/brand/social/time-icon.svg",
      //   iconWidth: 15,
      //   iconHeight: 15,
      // },
      {
        label: "Delivery gratis en Alejandro Korn",
        icon: "/brand/social/delivery-icon.svg",
        iconWidth: 17,
        iconHeight: 12,
      },
    ],
    coverage: {
      label: "¿Estás dentro de la zona?",
      linkLabel: "Ver en el mapa",
      href: "https://www.google.com/maps/place/Alejandro+Korn,+Provincia+de+Buenos+Aires/@-34.9870952,-58.4222166,12.71z/data=!4m6!3m5!1s0x95bd2cafe5b125e1:0x6f0057ac8cd3c419!8m2!3d-34.984519!4d-58.3760181!16zL20vMGR2eTVn?hl=es&entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D",
    },
    action: { label: "Nuestros sabores", href: "#flavors" },
  },

  quality: {
    title: "Nuestro compromiso",
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
