"use client";

import { useEffect, useRef } from "react";
import type { OrderState } from "../model/order.types";
import { Button } from "@/components/ui/button";
import type { OrderContent } from "@/content/content.types";

type OrderStepCustomerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  onBack?: () => void;
  order: OrderState;
  updateField: <K extends keyof OrderState>(key: K, value: OrderState[K]) => void;
  content: OrderContent;
};

export function OrderStepCustomerDialog({
  open,
  onOpenChange,
  onContinue,
  onBack,
  order,
  updateField,
  content,
}: OrderStepCustomerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const suppressCloseRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      suppressCloseRef.current = true;
      dialog.close();
    }
  }, [open]);

  const titleId = "order-step-customer-title";
  const canContinue = order.customerName.trim().length > 0;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => {
        if (suppressCloseRef.current) {
          suppressCloseRef.current = false;
          return;
        }
        onOpenChange(false);
      }}
      className="bg-card text-card-foreground rounded-card-sm sm:border-border fixed top-1/2 left-1/2 m-0 max-h-[88dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-lg sm:top-0 sm:right-0 sm:bottom-0 sm:left-auto sm:m-0 sm:h-full sm:max-h-none sm:w-[26rem] sm:max-w-none sm:translate-x-0 sm:translate-y-0 sm:rounded-none sm:border-l"
    >
      <div className="flex max-h-[88dvh] flex-col sm:h-full sm:max-h-none">
        <header className="border-border flex items-start justify-between gap-4 border-b px-6 py-5">
          <div>
            <h2 id={titleId} className="font-heading text-xl font-semibold">
              {content.wizard.stepCustomerTitle}
            </h2>
          </div>
          <button
            type="button"
            aria-label={content.dialog.closeLabel}
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

        <div className="overflow-y-auto px-6 py-5">
          <div className="space-y-3">
            <div>
              <label htmlFor="order-customer-name-modal" className="sr-only">
                {content.customerNameField.label}
              </label>
              <input
                id="order-customer-name-modal"
                type="text"
                required
                value={order.customerName}
                onChange={(event) =>
                  updateField("customerName", event.target.value)
                }
                placeholder={content.customerNameField.placeholder}
                className="border-border bg-card-product focus-visible:outline-accent text-card-foreground placeholder:text-placeholder min-h-11 w-full rounded-md border px-4 py-2.5 text-sm focus-visible:outline-3 focus-visible:outline-offset-2"
              />
            </div>

            <div>
              <label htmlFor="order-phone-modal" className="sr-only">
                {content.phoneField.label}
              </label>
              <input
                id="order-phone-modal"
                type="tel"
                inputMode="tel"
                value={order.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder={
                  content.phoneField.optionalHint
                    ? `${content.phoneField.placeholder} · ${content.phoneField.optionalHint}`
                    : content.phoneField.placeholder
                }
                className="border-border bg-card-product focus-visible:outline-accent text-card-foreground placeholder:text-placeholder min-h-11 w-full rounded-md border px-4 py-2.5 text-sm focus-visible:outline-3 focus-visible:outline-offset-2"
              />
              {content.phoneField.helper ? (
                <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                  {content.phoneField.helper}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <footer className="border-border mt-auto border-t px-6 py-5">
          <div className="flex flex-col gap-3">
            <Button
              disabled={!canContinue}
              onClick={onContinue}
              className="w-full tracking-[0.16em] uppercase shadow-md"
            >
              {content.wizard.continueLabel}
            </Button>
            <Button
              variant="secondary"
              onClick={() => (onBack ? onBack() : onOpenChange(false))}
              className="w-full"
            >
              {content.wizard.backLabel}
            </Button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
