import type { OrderContent } from "./content.types";

export const orderContent = {
  heading: {
    title: "Tabla Simple Sushi",
  },
  gallery: {
    label: "Product images",
    viewLabel: "View product image",
    featured: {
      src: "/brand/hero/hero-table.png",
      alt: "Tabla surtida de sushi lista para compartir",
    },
    thumbnails: [
      {
        src: "/brand/products/langostino-roll.png",
        alt: "Pieza de langostino de la tabla",
      },
      {
        src: "/brand/products/atun-roll.png",
        alt: "Pieza de atún de la tabla",
      },
      {
        src: "/brand/products/salmon-roll.png",
        alt: "Pieza de salmón de la tabla",
      },
    ],
  },
  steps: {
    size: {
      label: "1. ELEGIR TAMAÑO",
    },
    date: {
      label: "2. FECHA DE ENTREGA",
    },
    slot: {
      label: "3. FRANJA HORARIA",
    },
    address: {
      label: "4. DIRECCIÓN DE ENVÍO",
    },
  },
  productName: "Tabla Simple Sushi",
  recommendedBadge: "Más elegida",
  availabilityNotes: {
    available: "Disponible",
    soldOut: "Sin cupos",
  },
  buyLabel: "COMPRAR",
  addressField: {
    label: "Dirección de envío",
    placeholder: "Av. San Martín 1234, Alejandro Korn",
    helper: "Envío gratuito exclusivo en Alejandro Korn (radio 3km).",
    requiredMessage: "Ingresá tu dirección para continuar.",
  },
  dialog: {
    title: "Confirmá tu reserva",
    subtitle: "Revisá tu pedido antes de continuar por WhatsApp.",
    sizeLabel: "Tamaño",
    dateLabel: "Día",
    slotLabel: "Horario",
    addressLabel: "Dirección de envío",
    deliveryLabel: "Delivery",
    coverageLabel: "Cobertura",
    totalLabel: "TOTAL",
    freeDeliveryValue: "Gratis",
    coverageValue: "Hasta 3 km",
    footnote:
      "Tu reserva se confirmará por WhatsApp. No realizaremos ningún cobro desde esta pantalla.",
    backLabel: "Volver y editar",
    confirmLabel: "Confirmar por WhatsApp",
    closeLabel: "Cerrar",
  },
  message: {
    greeting: "Hola, quiero reservar mi tabla de Simple Sushi:",
    sizeLabel: "Tamaño",
    scheduleLabel: "Día y horario",
    addressLabel: "Dirección de envío",
    totalLabel: "Total",
  },
} satisfies OrderContent;
