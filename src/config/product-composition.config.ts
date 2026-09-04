import type { ProductComposition } from "@/features/order/model/order.types";

export const productCompositions: Record<string, ProductComposition> = {
  "simple-sushi": [
    {
      flavor: "NewYork Philly",
      quantities: { "size-16": 2, "size-32": 4, "size-48": 6 },
    },
    {
      flavor: "Salmón cocido",
      quantities: { "size-16": 2, "size-32": 4, "size-48": 6 },
    },
    {
      flavor: "Tuna",
      quantities: { "size-16": 2, "size-32": 4, "size-48": 6 },
    },
    {
      flavor: "Pollo y verdeo",
      quantities: { "size-16": 2, "size-32": 4, "size-48": 6 },
    },
    {
      flavor: "Zanahoria",
      quantities: { "size-16": 2, "size-32": 4, "size-48": 6 },
    },
    {
      flavor: "Pepino",
      quantities: { "size-16": 2, "size-32": 4, "size-48": 6 },
    },
    {
      flavor: "Remolacha",
      quantities: { "size-16": 2, "size-32": 4, "size-48": 6 },
    },
    {
      flavor: "Huevo",
      quantities: { "size-16": 2, "size-32": 4, "size-48": 6 },
    },
  ],
};
