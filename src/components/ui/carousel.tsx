"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/class-names";

type CarouselProps = {
  children: ReactNode;
  prevLabel: string;
  nextLabel: string;
  viewportClassName?: string;
  controlsClassName?: string;
};

export function Carousel({
  children,
  prevLabel,
  nextLabel,
  viewportClassName,
  controlsClassName,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;
    const firstItem = container.querySelector<HTMLElement>(
      "[data-carousel-item]",
    );
    const nextItem = firstItem?.nextElementSibling as HTMLElement | null;
    const step =
      firstItem && nextItem
        ? nextItem.offsetLeft - firstItem.offsetLeft
        : container.clientWidth;
    container.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  const chevron = (direction: "prev" | "next") =>
    direction === "prev" ? (
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    );

  return (
    <div>
      <div
        ref={scrollRef}
        className={cn(
          "flex snap-x snap-mandatory [scrollbar-width:none] gap-8 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden",
          viewportClassName,
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "mt-6 flex justify-center gap-4 sm:justify-end",
          controlsClassName,
        )}
      >
        <button
          type="button"
          aria-label={prevLabel}
          onClick={() => scrollByCard("prev")}
          className="hover:bg-surface/40 focus-visible:outline-accent inline-flex h-10 w-10 items-center justify-center rounded-full border border-current transition-colors focus-visible:outline-3 focus-visible:outline-offset-3"
        >
          {chevron("prev")}
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => scrollByCard("next")}
          className="hover:bg-surface/40 focus-visible:outline-accent inline-flex h-10 w-10 items-center justify-center rounded-full border border-current transition-colors focus-visible:outline-3 focus-visible:outline-offset-3"
        >
          {chevron("next")}
        </button>
      </div>
    </div>
  );
}
