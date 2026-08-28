"use client";

import { useEffect, useRef } from "react";
import type {
  DeliveryDate,
  DeliverySlot,
  OrderDelivery,
  OrderSize,
  OrderState,
} from "../model/order.types";
import {
  buildOrderMessage,
  buildWhatsAppHref,
} from "../lib/build-order-message";
import { formatOrderSummary } from "../lib/format-order-summary";
import { Button } from "@/components/ui/button";
import type { OrderContent } from "@/content/content.types";

type OrderConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderState;
  sizes: OrderSize[];
  dates: DeliveryDate[];
  slots: DeliverySlot[];
  delivery: OrderDelivery;
  whatsappNumber: string;
  content: OrderContent;
};

export function OrderConfirmationDialog({
  open,
  onOpenChange,
  order,
  sizes,
  dates,
  slots,
  delivery,
  whatsappNumber,
  content,
}: OrderConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const { rows, total } = formatOrderSummary({
    order,
    sizes,
    dates,
    slots,
    delivery,
    content,
  });

  const message = buildOrderMessage({
    order,
    sizes,
    dates,
    slots,
    content,
  });
  const whatsappHref = buildWhatsAppHref(whatsappNumber, message);

  const dialog = content.dialog;
  const titleId = "order-confirmation-title";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => onOpenChange(false)}
      className="bg-card text-card-foreground rounded-card-sm sm:border-border fixed top-1/2 left-1/2 m-0 max-h-[88dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-lg sm:top-0 sm:right-0 sm:bottom-0 sm:left-auto sm:m-0 sm:h-full sm:max-h-none sm:w-[26rem] sm:max-w-none sm:translate-x-0 sm:translate-y-0 sm:rounded-none sm:border-l"
    >
      <div className="flex max-h-[88dvh] flex-col sm:h-full sm:max-h-none">
        <header className="border-border flex items-start justify-between gap-4 border-b px-6 py-5">
          <div>
            <h2 id={titleId} className="font-heading text-xl font-semibold">
              {dialog.title}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              {dialog.subtitle}
            </p>
          </div>
          <button
            type="button"
            aria-label={dialog.closeLabel}
            onClick={() => onOpenChange(false)}
            className="border-border text-muted-foreground hover:text-foreground focus-visible:outline-accent inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border focus-visible:outline-3 focus-visible:outline-offset-3"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>
        </header>

        <div className="border-border divide-border divide-y overflow-y-auto px-6 py-4">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <span className="text-muted-foreground shrink-0 text-sm">
                {row.label}
              </span>
              <span className="text-card-foreground text-right text-sm font-medium">
                {row.value}
              </span>
            </div>
          ))}
          {total !== null ? (
            <div className="flex items-baseline justify-between gap-4 pt-4">
              <span className="text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                {dialog.totalLabel}
              </span>
              <span className="text-accent text-right text-lg font-semibold">
                {total}
              </span>
            </div>
          ) : null}
        </div>

        <footer className="border-border mt-auto border-t px-6 py-5">
          <p className="text-muted-foreground text-sm leading-6">
            {dialog.footnote}
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Button
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              {dialog.confirmLabel}
            </Button>
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              {dialog.backLabel}
            </Button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
