import type { ProductContent } from "./content.types";

export const catalogContent = {
  title: "Nuestros Sabores",

  description: "La selección perfecta para una experiencia completa.",

  items: [
    {
      id: "newyork-philly",
      name: "NewYork Philly",
      ingredients: "salmón, queso crema, palta",
      image: {
        src: "/brand/products/philadelphia-roll.png",
        alt: "Sabor NewYork Philly",
      },
    },
    {
      id: "salmon-cocido",
      name: "Salmón cocido",
      ingredients: "salmón cocido",
      image: {
        src: "/brand/products/salmon-roll.png",
        alt: "Sabor Salmón cocido",
      },
    },
    {
      id: "tuna",
      name: "Tuna",
      ingredients: "atún",
      image: {
        src: "/brand/products/atun-roll.png",
        alt: "Sabor Tuna",
      },
    },
    {
      id: "pollo-y-verdeo",
      name: "Pollo y verdeo",
      ingredients: "pollo, cebolla de verdeo",
      image: {
        src: "/brand/products/langostino-roll.png",
        alt: "Sabor Pollo y verdeo",
      },
    },
    {
      id: "zanahoria",
      name: "Zanahoria",
      ingredients: "zanahoria",
      image: {
        src: "/brand/products/veggie-roll.png",
        alt: "Sabor Zanahoria",
      },
    },
    {
      id: "pepino",
      name: "Pepino",
      ingredients: "pepino",
      image: {
        src: "/brand/products/veggie-roll.png",
        alt: "Sabor Pepino",
      },
    },
    {
      id: "remolacha",
      name: "Remolacha",
      ingredients: "remolacha",
      image: {
        src: "/brand/products/veggie-roll.png",
        alt: "Sabor Remolacha",
      },
    },
    {
      id: "huevo",
      name: "Huevo",
      ingredients: "huevo",
      image: {
        src: "/brand/products/kani-roll.png",
        alt: "Sabor Huevo",
      },
    },
  ],
} satisfies ProductContent;
