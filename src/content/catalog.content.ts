import type { ProductContent } from "./content.types";

export const catalogContent = {
  title: "Los Sabores",

  description: "La selección perfecta para una experiencia completa.",

  items: [
    {
      name: "Salmón",
      ingredients: "salmón, queso crema",
      image: {
        src: "/brand/products/salmon-roll.png",
        alt: "Rollo de sushi de salmón con queso crema",
      },
    },
    {
      name: "Langostino",
      ingredients: "langostino, palta",
      image: {
        src: "/brand/products/langostino-roll.png",
        alt: "Rollo de sushi de langostino con palta",
      },
    },
    {
      name: "Atún",
      ingredients: "atún, wasabi",
      image: {
        src: "/brand/products/atun-roll.png",
        alt: "Rollo de sushi de atún con wasabi",
      },
    },
    {
      name: "Veggie",
      ingredients: "palta, pepino",
      image: {
        src: "/brand/products/veggie-roll.png",
        alt: "Rollo de sushi veggie con palta y pepino",
      },
    },
    {
      name: "Salmón Teriyaki",
      ingredients: "salmón, salsa teriyaki, sésamo",
      image: {
        src: "/brand/products/salmon-roll.png",
        alt: "Rollo de sushi de salmón teriyaki con sésamo",
      },
    },
    {
      name: "Langostino Crispy",
      ingredients: "langostino, palta, panko",
      image: {
        src: "/brand/products/langostino-roll.png",
        alt: "Rollo de sushi de langostino crispy con palta",
      },
    },
    {
      name: "Atún Picante",
      ingredients: "atún, salsa picante, cebolla de verdeo",
      image: {
        src: "/brand/products/atun-roll.png",
        alt: "Rollo de sushi de atún picante con cebolla de verdeo",
      },
    },
    {
      name: "Veggie Especial",
      ingredients: "palta, pepino, zanahoria, sésamo",
      image: {
        src: "/brand/products/veggie-roll.png",
        alt: "Rollo de sushi veggie con palta, pepino y zanahoria",
      },
    },
    {
      name: "Philadelphia",
      ingredients: "salmón, queso crema, palta",
      image: {
        src: "/brand/products/salmon-roll.png",
        alt: "Rollo de sushi Philadelphia con salmón y palta",
      },
    },
    {
      name: "Ebi Roll",
      ingredients: "langostino, queso crema, ciboulette",
      image: {
        src: "/brand/products/langostino-roll.png",
        alt: "Rollo de sushi de langostino con queso crema y ciboulette",
      },
    },
    {
      name: "Spicy Tuna",
      ingredients: "atún, mayonesa picante, sésamo",
      image: {
        src: "/brand/products/atun-roll.png",
        alt: "Rollo de sushi de atún con mayonesa picante",
      },
    },
    {
      name: "Green Roll",
      ingredients: "palta, pepino, queso crema",
      image: {
        src: "/brand/products/veggie-roll.png",
        alt: "Rollo de sushi veggie con palta, pepino y queso crema",
      },
    },
  ],
} satisfies ProductContent;
