"use client";

import { useCallback, useState, type RefObject } from "react";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoStarOutline } from "react-icons/io5";
import type { OrderBuilderFormHandle } from "@/features/order/components/order-builder-form";
import { Button } from "@/components/ui/button";
import { CustomOrderModal } from "@/features/order/components/custom-order-modal";
import type {
  OrderLineItem,
  OrderSize,
} from "@/features/order/model/order.types";
import type { OrderContent } from "@/content/content.types";

type Props = {
  formRef: RefObject<OrderBuilderFormHandle | null>;
  sizes: OrderSize[];
  content: OrderContent;
};

export function CustomOrderSection({ formRef, sizes, content }: Props) {
  const [open, setOpen] = useState(false);
  const { customOrder, gallery } = content;
  const featuredImage = gallery.featured;

  const handleConfirm = useCallback(
    (item: OrderLineItem) => {
      formRef.current?.addCustomOrderItem(item);
      setOpen(false);
    },
    [formRef],
  );

  return (
    <section className="mt-8 p-5" aria-labelledby="custom-order-title">
      <div className="max-w-content-wide mx-auto">
        <div className="group border-border/60 bg-surface relative overflow-hidden rounded-[28px] border shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
          <div
            aria-hidden="true"
            className="bg-primary/8 pointer-events-none absolute top-1/2 -left-40 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="via-accent/40 pointer-events-none absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
          />

          <div className="relative grid overflow-hidden lg:grid-cols-[1fr_1.05fr]">
            <div className="relative z-10 flex flex-col justify-center px-7 py-12 sm:px-12 sm:py-16 lg:px-14 lg:py-20">
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="bg-accent/70 h-px w-7" />
                <span className="text-accent text-[10px] font-bold tracking-[0.22em] uppercase sm:text-[11px]">
                  {customOrder.eyebrow}
                </span>
              </div>

              <h2
                id="custom-order-title"
                className="font-heading text-foreground mt-6 max-w-md text-[3.2rem] leading-[0.94] font-medium tracking-tight sm:text-6xl lg:text-7xl"
              >
                {customOrder.title}

                <span className="text-accent block italic">
                  {customOrder.highlight}
                </span>
              </h2>

              <p className="text-muted-foreground mt-6 max-w-md text-[15px] leading-relaxed sm:text-base">
                {customOrder.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="group/cta h-13 rounded-xl px-7 text-[14px] font-semibold shadow-[0_10px_30px_rgba(var(--primary-rgb),0.2)] transition-all duration-300 hover:-translate-y-0.5"
                  aria-label={customOrder.cta}
                >
                  {customOrder.cta}
                  <HiOutlineArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Button>

                <span className="text-muted-foreground text-xs">
                  {customOrder.helper}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 overflow-hidden lg:relative lg:inset-auto lg:min-h-full">
              <Image
                src={featuredImage.src}
                alt={featuredImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />

              <div
                aria-hidden="true"
                className="from-surface via-surface/85 to-surface/65 pointer-events-none absolute inset-0 bg-gradient-to-b lg:hidden"
              />
              <div
                aria-hidden="true"
                className="from-surface via-surface/75 pointer-events-none absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r via-35% to-transparent lg:block"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-black/65 via-black/15 to-transparent lg:block"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-black/35 to-transparent lg:block"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-black/25 to-transparent lg:block"
              />

              <div className="absolute right-7 bottom-7 hidden rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md lg:block">
                <span className="text-[10px] font-medium tracking-[0.16em] text-white/80 uppercase">
                  {customOrder.badge}
                </span>
              </div>
            </div>

            <div className="border-accent/45 bg-surface/90 absolute top-[7%] left-[calc(50%-56px)] z-20 hidden h-28 w-28 items-center justify-center rounded-full border shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:flex">
              <div
                aria-hidden="true"
                className="border-accent/15 absolute inset-1.5 rounded-full border"
              />

              <div className="relative flex flex-col items-center">
                <IoStarOutline
                  aria-hidden="true"
                  className="text-accent h-5 w-5"
                />

                <span className="text-accent mt-2 text-lg font-bold">100%</span>

                <span className="text-foreground/70 mt-0.5 text-[8px] font-bold tracking-[0.16em] uppercase">
                  {customOrder.badge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomOrderModal
        open={open}
        onOpenChange={setOpen}
        sizes={sizes}
        content={content}
        onConfirm={handleConfirm}
      />
    </section>
  );
}
