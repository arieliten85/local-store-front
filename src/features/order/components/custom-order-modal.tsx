"use client";

import { useEffect, useRef, useState } from "react";
import type {
  OrderSize,
  OrderLineItem,
  CustomFlavorLine,
} from "../model/order.types";
import type { OrderContent } from "@/content/content.types";
import { Button } from "@/components/ui/button";
import { catalogContent } from "@/content/catalog.content";
import { flavorSalePrices } from "@/config/pricing";
import { formatPrice } from "../lib/format-order-summary";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sizes: OrderSize[];
  content: OrderContent;
  onConfirm: (item: OrderLineItem) => void;
};

export function CustomOrderModal({
  open,
  onOpenChange,
  sizes,
  content,
  onConfirm,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(1);
  const [pieces, setPieces] = useState<number>(16);
  const flavors = catalogContent.items;
  const [selectedFlavorIds, setSelectedFlavorIds] = useState<string[]>([]);
  const [flavorCounts, setFlavorCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    // reset when opened; defer to avoid setState-in-effect lint
    if (!open) return;
    const t = setTimeout(() => {
      setStep(1);
      setPieces(16);
      setSelectedFlavorIds([]);
      setFlavorCounts({});
    }, 0);
    return () => clearTimeout(t);
  }, [open]);

  const maxFlavors = 6;

  const toggleFlavor = (id: string) => {
    setSelectedFlavorIds((current) => {
      if (current.includes(id)) {
        const next = current.filter((c) => c !== id);
        setFlavorCounts((fc) => {
          const copy = { ...fc };
          delete copy[id];
          return copy;
        });
        return next;
      }
      if (current.length >= maxFlavors) return current;
      setFlavorCounts((fc) => ({ ...fc, [id]: 0 }));
      return [...current, id];
    });
  };

  const incrementFlavor = (id: string) => {
    setFlavorCounts((fc) => {
      const total = Object.values(fc).reduce((s, v) => s + v, 0);
      if (total >= pieces) return fc;
      return { ...fc, [id]: (fc[id] ?? 0) + 1 };
    });
  };

  const decrementFlavor = (id: string) => {
    setFlavorCounts((fc) => ({ ...fc, [id]: Math.max(0, (fc[id] ?? 0) - 1) }));
  };

  const distributeEvenly = () => {
    const n = selectedFlavorIds.length || 1;
    const base = Math.floor(pieces / n);
    const rem = pieces - base * n;
    const counts: Record<string, number> = {};
    selectedFlavorIds.forEach((id, idx) => {
      counts[id] = base + (idx < rem ? 1 : 0);
    });
    setFlavorCounts(counts);
  };

  const totalAssigned = Object.values(flavorCounts).reduce((s, v) => s + v, 0);

  const subtotal = Object.entries(flavorCounts).reduce((sum, [id, qty]) => {
    const price = flavorSalePrices[id] ?? 0;
    return sum + price * qty;
  }, 0);

  const canConfirm = totalAssigned === pieces && selectedFlavorIds.length > 0;

  const onConfirmInner = () => {
    // determine matching size id by pieceCount
    const size = sizes.find((s) => s.pieceCount === pieces) ?? sizes[0];
    const customFlavors: CustomFlavorLine[] = selectedFlavorIds.map((id) => ({
      flavorId: id,
      quantity: flavorCounts[id] ?? 0,
    }));
    const item: OrderLineItem = { sizeId: size.id, quantity: 1, customFlavors };
    onConfirm(item);
    onOpenChange(false);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onOpenChange(false)}
      className="bg-card text-card-foreground rounded-card-sm fixed top-1/2 left-1/2 m-0 max-h-[88dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-lg sm:top-0 sm:right-0 sm:bottom-0 sm:left-auto sm:m-0 sm:h-full sm:max-h-none sm:w-[26rem] sm:max-w-none sm:translate-x-0 sm:translate-y-0 sm:rounded-none sm:border-l"
    >
      <div className="flex max-h-[88dvh] flex-col sm:h-full sm:max-h-none">
        <header className="border-border flex items-start justify-between gap-4 border-b px-6 py-5">
          <div>
            <h2 className="font-heading text-xl font-semibold">
              Personalizá tu tabla
            </h2>
            <p className="text-muted-foreground text-sm">Paso {step} de 3</p>
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
          {step === 1 && (
            <fieldset>
              <legend className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                Piezas
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[16, 32, 48].map((p) => (
                  <label key={p} className="block cursor-pointer">
                    <input
                      type="radio"
                      name="custom-pieces"
                      value={p}
                      checked={pieces === p}
                      onChange={() => {
                        setPieces(p);
                        setStep(2);
                      }}
                      className="peer sr-only"
                    />
                    <span className="border-border bg-card-product peer-checked:border-accent grid min-h-14 gap-0.5 rounded-md border px-3 py-3 text-center transition-colors">
                      <span className="text-card-foreground text-sm font-semibold">
                        {p} piezas
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                Elegí hasta {maxFlavors} sabores
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {flavors.map((f) => {
                  const selected = selectedFlavorIds.includes(f.id);
                  return (
                    <label key={f.id} className="block cursor-pointer">
                      <input
                        type="checkbox"
                        name="custom-flavor"
                        value={f.id}
                        checked={selected}
                        onChange={() => toggleFlavor(f.id)}
                        className="peer sr-only"
                      />
                      <span className="border-border bg-card-product peer-checked:border-accent flex min-h-16 flex-col gap-1 rounded-md border px-3 py-3 text-left transition-colors">
                        <span className="text-card-foreground block text-sm font-semibold">
                          {f.name}
                        </span>
                        <span className="text-muted-foreground block text-xs">
                          {f.ingredients}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="text-muted-foreground mt-3 text-xs">
                Seleccionados: {selectedFlavorIds.length}/{maxFlavors}
              </p>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                Cantidad por sabor
              </legend>
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    Te quedan: <strong>{pieces - totalAssigned}</strong> piezas
                  </p>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={distributeEvenly}>
                      Repartir parejo
                    </Button>
                  </div>
                </div>

                {selectedFlavorIds.map((id) => {
                  const flavor = flavors.find((f) => f.id === id)!;
                  const qty = flavorCounts[id] ?? 0;
                  return (
                    <div
                      key={id}
                      className="border-border flex items-center justify-between rounded-md border px-3 py-2"
                    >
                      <div>
                        <div className="font-semibold">{flavor.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {flavor.ingredients}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decrementFlavor(id)}
                          className="h-8 w-8 rounded border"
                        >
                          -
                        </button>
                        <div className="w-8 text-center">{qty}</div>
                        <button
                          type="button"
                          onClick={() => incrementFlavor(id)}
                          className="h-8 w-8 rounded border"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-muted-foreground text-xs">
                        Precio estimado
                      </div>
                      <div className="text-xl font-bold">
                        {formatPrice(subtotal)}
                      </div>
                    </div>
                    <div className="text-muted-foreground text-right text-xs">
                      {totalAssigned}/{pieces} piezas
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          )}
        </div>

        <footer className="border-border mt-auto border-t px-6 py-5">
          <div className="flex flex-col gap-3">
            {step < 3 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 2 && selectedFlavorIds.length === 0}
                className="w-full"
              >
                Continuar
              </Button>
            ) : (
              <Button
                disabled={!canConfirm}
                onClick={onConfirmInner}
                className="w-full"
              >
                Confirmar
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  if (step === 1) onOpenChange(false);
                  else setStep((s) => s - 1);
                }}
                className="w-full"
              >
                Volver
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
