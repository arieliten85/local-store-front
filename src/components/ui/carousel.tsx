"use client";

import { useRef, type ReactNode } from "react";

type CarouselProps = {
  children: ReactNode;
  prevLabel: string;
  nextLabel: string;
};

export function Carousel({ children, prevLabel, nextLabel }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;
    const firstItem = container.querySelector<HTMLElement>(
      "[data-carousel-item]",
    );
    const step = firstItem ? firstItem.offsetWidth + 32 : container.clientWidth;
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
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
        className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-6 flex justify-center gap-4 sm:justify-end">
        <button
          type="button"
          aria-label={prevLabel}
          onClick={() => scrollByCard("prev")}
          className="border-current inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-surface/40 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent"
        >
          {chevron("prev")}
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => scrollByCard("next")}
          className="border-current inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-surface/40 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent"
        >
          {chevron("next")}
        </button>
      </div>
    </div>
  );
}
