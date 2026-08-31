"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { OrderContent } from "@/content/content.types";
import { useOrderSchedule } from "../hooks/use-order-schedule";
import { formatPrice } from "../lib/format-order-summary";
import {
  canAddSize,
  computeOrderTotals,
} from "../lib/order-totals";
import { emptyOrderState } from "../model/order.defaults";
import type {
  OrderDelivery,
  OrderSize,
  OrderState,
} from "../model/order.types";
import { OrderConfirmationDialog } from "./order-confirmation-dialog";
import { OrderStepDateDialog } from "./order-step-date-dialog";
import { OrderStepAddressDialog } from "./order-step-address-dialog";
import { OrderStepCustomerDialog } from "./order-step-customer-dialog";

type OrderBuilderFormProps = {
  sizes: OrderSize[];
  delivery: OrderDelivery;
  whatsappNumber: string;
  content: OrderContent;
};

type ActiveStep = "date" | "address" | "customer" | "summary" | null;

export function OrderBuilderForm({
  sizes,
  delivery,
  whatsappNumber,
  content,
}: OrderBuilderFormProps) {
  const { dates, slots } = useOrderSchedule();
  const [order, setOrder] = useState<OrderState>(() => {
    const recommended = sizes.find((size) => size.status === "recommended");
    return {
      ...emptyOrderState,
      items: recommended ? [{ sizeId: recommended.id, quantity: 1 }] : [],
      deliveryDate: null,
      deliverySlot: null,
    };
  });
  const [activeStep, setActiveStep] = useState<ActiveStep>(null);

  const updateField = <K extends keyof OrderState>(
    key: K,
    value: OrderState[K],
  ) => {
    setOrder((current) => ({ ...current, [key]: value }));
  };

  const setSizeQuantity = (sizeId: string, quantity: number) => {
    setOrder((current) => {
      const exists = current.items.some((item) => item.sizeId === sizeId);
      if (exists) {
        return {
          ...current,
          items: current.items
            .map((item) =>
              item.sizeId === sizeId ? { ...item, quantity } : item,
            )
            .filter((item) => item.quantity > 0),
        };
      }
      return { ...current, items: [...current.items, { sizeId, quantity }] };
    });
  };

  const totals = computeOrderTotals(order.items, sizes);

  const openDateStep = () => {
    if (order.deliveryDate === null || order.deliverySlot === null) {
      updateField(
        "deliveryDate",
        dates.find((date) => date.status !== "soldOut")?.id ?? null,
      );
      updateField(
        "deliverySlot",
        slots.find((slot) => slot.status !== "soldOut")?.id ?? null,
      );
    }
    setActiveStep("date");
  };

  return (
    <div className="space-y-5 lg:space-y-4">
      <OrderConfirmationDialog
        open={activeStep === "summary"}
        onOpenChange={(open) => setActiveStep(open ? "summary" : null)}
        onBack={() => setActiveStep("customer")}
        order={order}
        sizes={sizes}
        dates={dates}
        slots={slots}
        delivery={delivery}
        whatsappNumber={whatsappNumber}
        content={content}
      />

      <OrderStepDateDialog
        open={activeStep === "date"}
        onOpenChange={(open) => setActiveStep(open ? "date" : null)}
        onContinue={() => setActiveStep("address")}
        onBack={() => setActiveStep(null)}
        order={order}
        updateField={updateField}
        dates={dates}
        slots={slots}
        content={content}
      />

      <OrderStepAddressDialog
        open={activeStep === "address"}
        onOpenChange={(open) => setActiveStep(open ? "address" : null)}
        onContinue={() => setActiveStep("customer")}
        onBack={() => setActiveStep("date")}
        order={order}
        updateField={updateField}
        content={content}
      />

      <OrderStepCustomerDialog
        open={activeStep === "customer"}
        onOpenChange={(open) => setActiveStep(open ? "customer" : null)}
        onContinue={() => setActiveStep("summary")}
        onBack={() => setActiveStep("address")}
        order={order}
        updateField={updateField}
        content={content}
      />

      <fieldset>
        <legend className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
          {content.steps.size.label}
        </legend>
        <div className="mt-2.5 grid gap-2">
          {sizes.map((size) => {
            const quantity =
              order.items.find((item) => item.sizeId === size.id)?.quantity ??
              0;
            const soldOut = size.status === "soldOut";
            const addDisabled =
              soldOut || !canAddSize(totals, size);
            return (
              <div
                key={size.id}
                className="border-border bg-card-product flex min-h-16 items-center justify-between gap-4 rounded-md border px-4 py-2.5 lg:min-h-14 lg:py-2"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-card-foreground flex items-center gap-2 text-lg font-medium">
                    {size.label}
                    {size.status === "recommended" ? (
                      <span className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-[10px] font-bold uppercase">
                        {content.recommendedBadge}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {formatPrice(size.price)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`${content.wizard.removeLabel} ${size.label}`}
                    disabled={quantity === 0 || soldOut}
                    onClick={() => setSizeQuantity(size.id, quantity - 1)}
                    className="border-border text-card-foreground hover:border-accent hover:text-accent focus-visible:outline-accent disabled:border-border/60 disabled:text-muted-foreground/50 inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-lg leading-none focus-visible:outline-3 focus-visible:outline-offset-3"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <span
                    className="text-card-foreground w-6 text-center text-base font-semibold tabular-nums"
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`${content.wizard.addLabel} ${size.label}`}
                    disabled={addDisabled}
                    onClick={() => setSizeQuantity(size.id, quantity + 1)}
                    className="border-border text-card-foreground hover:border-accent hover:text-accent focus-visible:outline-accent inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-lg leading-none focus-visible:outline-3 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:border-border/60 disabled:text-muted-foreground/50"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p
          aria-live="polite"
          className="bg-card-product text-card-foreground mt-3 flex flex-col gap-3 rounded-md px-4 py-4"
        >
          <span className="flex items-end justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              {content.wizard.totalLabel}
            </span>
            <span className="text-3xl font-bold leading-none tabular-nums tracking-tight">
              {formatPrice(totals.totalPrice)}
            </span>
          </span>
          <span className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {content.wizard.totalPiecesLabel}
            </span>
            <span className="font-semibold tabular-nums">
              {totals.totalPieces} {content.message.piecesLabel}
            </span>
          </span>
          <span className="border-t border-border pt-2 text-xs text-muted-foreground">
            {content.wizard.limitMessage}
          </span>
        </p>
      </fieldset>

      <div>
        <Button
          disabled={order.items.length === 0}
          onClick={openDateStep}
          className="w-full tracking-[0.16em] uppercase shadow-md"
        >
          {content.wizard.continueLabel}
        </Button>
      </div>
    </div>
  );
}
