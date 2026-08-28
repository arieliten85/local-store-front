"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { OrderContent } from "@/content/content.types";
import { cn } from "@/lib/class-names";
import { isOrderComplete } from "../lib/is-order-complete";
import { formatPrice } from "../lib/format-order-summary";
import { emptyOrderState } from "../model/order.defaults";
import type {
  DeliveryDate,
  DeliverySlot,
  OrderDelivery,
  OrderSize,
  OrderState,
} from "../model/order.types";
import { OrderConfirmationDialog } from "./order-confirmation-dialog";

type OrderBuilderFormProps = {
  sizes: OrderSize[];
  dates: DeliveryDate[];
  slots: DeliverySlot[];
  delivery: OrderDelivery;
  whatsappNumber: string;
  content: OrderContent;
};

type OptionStatusLabel = {
  note: string;
  className: string;
};

export function OrderBuilderForm({
  sizes,
  dates,
  slots,
  delivery,
  whatsappNumber,
  content,
}: OrderBuilderFormProps) {
  const [order, setOrder] = useState<OrderState>(() => ({
    ...emptyOrderState,
    size: sizes.find((size) => size.status === "recommended")?.id ?? null,
    deliveryDate: dates.find((date) => date.status !== "soldOut")?.id ?? null,
    deliverySlot: slots.find((slot) => slot.status !== "soldOut")?.id ?? null,
  }));
  const [dialogOpen, setDialogOpen] = useState(false);

  const updateField = <K extends keyof OrderState>(
    key: K,
    value: OrderState[K],
  ) => {
    setOrder((current) => ({ ...current, [key]: value }));
  };

  const complete = isOrderComplete(order);

  const statusLabel = (
    status: OrderSize["status"],
    note?: string,
  ): OptionStatusLabel => {
    if (status === "soldOut") {
      return {
        note: content.availabilityNotes.soldOut,
        className: "text-status-danger",
      };
    }
    if (note) {
      return { note, className: "text-accent" };
    }
    return {
      note: content.availabilityNotes.available,
      className: "text-status-success",
    };
  };

  const stepLabelClass =
    "text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase";

  return (
    <div className="space-y-5 lg:space-y-4">
      <OrderConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        order={order}
        sizes={sizes}
        dates={dates}
        slots={slots}
        delivery={delivery}
        whatsappNumber={whatsappNumber}
        content={content}
      />

      <fieldset>
        <legend className={stepLabelClass}>{content.steps.size.label}</legend>
        <div className="mt-2.5 grid gap-2">
          {sizes.map((size) => {
            const selected = order.size === size.id;
            const soldOut = size.status === "soldOut";
            return (
              <label key={size.id} className="block cursor-pointer">
                <input
                  type="radio"
                  name="order-size"
                  value={size.id}
                  checked={selected}
                  disabled={soldOut}
                  onChange={() => updateField("size", size.id)}
                  className="peer sr-only"
                />
                <span className="border-border bg-card-product peer-checked:border-accent peer-focus-visible:outline-accent relative flex min-h-16 items-center justify-between gap-4 rounded-md border px-4 py-2.5 transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 lg:min-h-14 lg:py-2">
                  <span className="flex flex-col gap-1">
                    <span className="font-heading text-card-foreground text-lg font-medium">
                      {size.label}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {formatPrice(size.price)}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                      selected ? "border-accent" : "border-border",
                    )}
                  >
                    <span
                      className={cn(
                        "bg-accent size-2.5 rounded-full transition-transform",
                        selected ? "scale-100" : "scale-0",
                      )}
                    />
                  </span>
                  {size.status === "recommended" ? (
                    <span className="bg-accent text-accent-foreground absolute -top-2.5 right-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase">
                      {content.recommendedBadge}
                    </span>
                  ) : null}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={stepLabelClass}>{content.steps.date.label}</legend>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {dates.map((date) => {
            const selected = order.deliveryDate === date.id;
            const soldOut = date.status === "soldOut";
            const availability = statusLabel(date.status, date.note);
            return (
              <label key={date.id} className="block cursor-pointer">
                <input
                  type="radio"
                  name="order-date"
                  value={date.id}
                  checked={selected}
                  disabled={soldOut}
                  onChange={() => updateField("deliveryDate", date.id)}
                  className="peer sr-only"
                />
                <span className="border-border bg-card-product peer-checked:border-accent peer-focus-visible:outline-accent grid min-h-14 gap-0.5 rounded-md border px-3 py-2 text-center transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-45 lg:min-h-12 lg:py-1.5">
                  <span className="text-card-foreground text-sm font-semibold">
                    {date.label}
                  </span>
                  <span className={availability.className}>
                    <span className="text-xs">{availability.note}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={stepLabelClass}>{content.steps.slot.label}</legend>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {slots.map((slot) => {
            const selected = order.deliverySlot === slot.id;
            const soldOut = slot.status === "soldOut";
            const availability = statusLabel(slot.status, slot.note);
            return (
              <label key={slot.id} className="block cursor-pointer">
                <input
                  type="radio"
                  name="order-slot"
                  value={slot.id}
                  checked={selected}
                  disabled={soldOut}
                  onChange={() => updateField("deliverySlot", slot.id)}
                  className="peer sr-only"
                />
                <span className="border-border bg-card-product peer-checked:border-accent peer-focus-visible:outline-accent grid min-h-14 gap-0.5 rounded-md border px-2 py-2 text-center transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-45 lg:min-h-12 lg:py-1.5">
                  <span className="text-card-foreground text-sm font-semibold">
                    {slot.label}
                  </span>
                  <span className={availability.className}>
                    <span className="text-xs">{availability.note}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={stepLabelClass}>
          {content.steps.address.label}
        </legend>
        <div className="mt-2.5">
          <label htmlFor="order-address" className="sr-only">
            {content.addressField.label}
          </label>
          <input
            id="order-address"
            type="text"
            required
            value={order.address}
            onChange={(event) => updateField("address", event.target.value)}
            placeholder={content.addressField.placeholder}
            className="border-border bg-card-product focus-visible:outline-accent text-card-foreground placeholder:text-placeholder min-h-11 w-full rounded-md border px-4 py-2.5 text-sm focus-visible:outline-3 focus-visible:outline-offset-2"
          />
          <p className="text-muted-foreground mt-1.5 flex items-start gap-2 text-xs leading-5">
            <span aria-hidden="true" className="mt-0.5">
              ⓘ
            </span>
            <span>{content.addressField.helper}</span>
          </p>
        </div>
      </fieldset>

      <div>
        <Button
          disabled={!complete}
          onClick={() => setDialogOpen(true)}
          className="w-full tracking-[0.16em] uppercase shadow-md"
        >
          {content.buyLabel}
        </Button>
      </div>
    </div>
  );
}
