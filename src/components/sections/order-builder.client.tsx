"use client";

import type { RefObject } from "react";
import { OrderBuilder } from "./order-builder";
import type { OrderBuilderFormHandle } from "@/features/order/components/order-builder-form";
import type {
  OrderSize,
  OrderDelivery,
  ProductComposition,
} from "@/features/order/model/order.types";
import type { OrderContent } from "@/content/content.types";

type Props = {
  formRef: RefObject<OrderBuilderFormHandle | null>;
  sizes: OrderSize[];
  delivery: OrderDelivery;
  whatsappNumber: string;
  content: OrderContent;
  composition?: ProductComposition;
};

export function OrderBuilderClient({
  formRef,
  sizes,
  delivery,
  whatsappNumber,
  content,
  composition,
}: Props) {
  return (
    <OrderBuilder
      sizes={sizes}
      delivery={delivery}
      whatsappNumber={whatsappNumber}
      content={content}
      composition={composition}
      formRef={formRef}
    />
  );
}
