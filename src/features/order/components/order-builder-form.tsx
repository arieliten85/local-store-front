"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { OrderContent } from "@/content/content.types";
import { useOrderSchedule } from "../hooks/use-order-schedule";
import { formatPrice } from "../lib/format-order-summary";
import { canAddSize, computeOrderTotals } from "../lib/order-totals";
import { emptyOrderState } from "../model/order.defaults";
import type {
  OrderDelivery,
  OrderSize,
  OrderState,
  ProductComposition,
} from "../model/order.types";
import { FlavorBreakdownTable } from "./flavor-breakdown-table";
import { OrderConfirmationDialog } from "./order-confirmation-dialog";
import { OrderStepDateDialog } from "./order-step-date-dialog";
import { OrderStepAddressDialog } from "./order-step-address-dialog";
import { OrderStepCustomerDialog } from "./order-step-customer-dialog";
import { OrderStepPaymentDialog } from "./order-step-payment-dialog";

type OrderBuilderFormProps = {
  sizes: OrderSize[];
  delivery: OrderDelivery;
  whatsappNumber: string;
  content: OrderContent;
  composition?: ProductComposition;
};

type ActiveStep =
  "date" | "address" | "customer" | "payment" | "summary" | null;

export function OrderBuilderForm({
  sizes,
  delivery,
  whatsappNumber,
  content,
  composition,
}: OrderBuilderFormProps) {
  const { dates, slots } = useOrderSchedule(content.availabilityNotes.soldOut);
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
    <div className="space-y-4 lg:space-y-3">
      <OrderConfirmationDialog
        open={activeStep === "summary"}
        onOpenChange={(open) => setActiveStep(open ? "summary" : null)}
        onBack={() => setActiveStep("payment")}
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
        onContinue={() => setActiveStep("payment")}
        onBack={() => setActiveStep("address")}
        order={order}
        updateField={updateField}
        content={content}
      />

      <OrderStepPaymentDialog
        open={activeStep === "payment"}
        onOpenChange={(open) => setActiveStep(open ? "payment" : null)}
        onContinue={() => setActiveStep("summary")}
        onBack={() => setActiveStep("customer")}
        order={order}
        updateField={updateField}
        content={content}
      />

      <fieldset>
        <legend className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
          {content.steps.size.label}
        </legend>
        <div className="mt-2 grid gap-1.5">
          {sizes.map((size) => {
            const quantity =
              order.items.find((item) => item.sizeId === size.id)?.quantity ??
              0;
            const soldOut = size.status === "soldOut";
            const addDisabled = soldOut || !canAddSize(totals, size);
            return (
              <div
                key={size.id}
                className="border-border bg-card-product flex min-h-13 items-center justify-between gap-3 rounded-md border px-3.5 py-2"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-heading text-card-foreground flex items-center gap-2 text-base font-medium">
                    {size.label}
                    {size.status === "recommended" ? (
                      <span className="bg-accent text-accent-foreground rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase">
                        {content.recommendedBadge}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {formatPrice(size.price)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
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
                    className="border-border text-card-foreground hover:border-accent hover:text-accent focus-visible:outline-accent disabled:border-border/60 disabled:text-muted-foreground/50 inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-lg leading-none focus-visible:outline-3 focus-visible:outline-offset-3 disabled:cursor-not-allowed"
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
        {composition ? (
          <FlavorBreakdownTable composition={composition} sizes={sizes} />
        ) : null}
        <p
          aria-live="polite"
          className="text-card-foreground mt-3 flex flex-col gap-1 pt-3"
        >
          <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.18em]">
            {content.wizard.totalLabel}
          </span>
          <span className="flex items-baseline gap-3">
            <span className="text-3xl leading-none font-bold tracking-tight tabular-nums">
              {formatPrice(totals.totalPrice)}
            </span>
            <span className="text-muted-foreground text-sm">
              {totals.totalPieces} {content.message.piecesLabel}
            </span>
          </span>
          {/* <span className="text-muted-foreground text-xs">
            {content.wizard.limitMessage}
          </span> */}
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
