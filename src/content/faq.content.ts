import type { FaqContent } from "./content.types";

export const faqContent = {
  title: "Preguntas Frecuentes",
  items: [
    {
      question: "¿Qué días hacen entregas?",
      answer:
        "Realizamos entregas los viernes y sábados, entre las 20:00 y las 23:00.",
    },
    {
      question: "¿Cuándo debo hacer mi reserva?",
      answer:
        "Podés reservar durante la semana. Recomendamos hacerlo con anticipación para asegurar tu tamaño y horario preferidos.",
    },
    {
      question: "¿El envío tiene costo?",
      answer:
        "El envío es gratuito dentro de Alejandro Korn, en un radio de hasta 3 km. Para entregas fuera de esta zona, el costo de envío se calcula según la distancia y te lo confirmaremos al momento de realizar tu consulta.",
    },
  ],
} satisfies FaqContent;
