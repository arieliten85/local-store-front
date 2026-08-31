"use client";

import { useEffect, useRef } from "react";
import type {
  DeliveryDate,
  DeliverySlot,
  OrderState,
} from "../model/order.types";
import { Button } from "@/components/ui/button";
import type { OrderContent } from "@/content/content.types";

type OrderStepDateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  onBack?: () => void;
  order: OrderState;
  updateField: <K extends keyof OrderState>(key: K, value: OrderState[K]) => void;
  dates: DeliveryDate[];
  slots: DeliverySlot[];
  content: OrderContent;
};

type OptionStatusLabel = {
  note: string;
  className: string;
};

export function OrderStepDateDialog({
  open,
  onOpenChange,
  onContinue,
  onBack,
  order,
  updateField,
  dates,
  slots,
  content,
}: OrderStepDateDialogProps) {
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

  const statusLabel = (
    status: DeliveryDate["status"],
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
  const titleId = "order-step-date-title";
  const canContinue = order.deliveryDate !== null && order.deliverySlot !== null;

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
              {content.wizard.stepDateTitle}
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
          <fieldset>
            <legend className={stepLabelClass}>
              {content.steps.date.label}
            </legend>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {dates.map((date) => {
                const selected = order.deliveryDate === date.id;
                const soldOut = date.status === "soldOut";
                const availability = statusLabel(date.status, date.note);
                return (
                  <label key={date.id} className="block cursor-pointer">
                    <input
                      type="radio"
                      name="order-date-modal"
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

          <fieldset className="mt-5">
            <legend className={stepLabelClass}>
              {content.steps.slot.label}
            </legend>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {slots.map((slot) => {
                const selected = order.deliverySlot === slot.id;
                const soldOut = slot.status === "soldOut";
                const availability = statusLabel(slot.status, slot.note);
                return (
                  <label key={slot.id} className="block cursor-pointer">
                    <input
                      type="radio"
                      name="order-slot-modal"
                      value={slot.id}
                      checked={selected}
                      disabled={soldOut}
                      onChange={() => updateField("deliverySlot", slot.id)}
                      className="peer sr-only"
                    />
                    <span className="border-border bg-card-product peer-checked:border-accent peer-focus-visible:outline-accent flex min-h-14 items-center justify-center rounded-md border px-2 py-2 text-center transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-45 lg:min-h-12 lg:py-1.5">
                      <span className="text-card-foreground text-sm font-semibold">
                        {slot.label}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
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
