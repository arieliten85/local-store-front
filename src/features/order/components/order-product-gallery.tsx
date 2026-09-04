"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageContent } from "@/content/content.types";
import { Carousel } from "@/components/ui/carousel";
import { cn } from "@/lib/class-names";

type OrderProductGalleryProps = {
  label: string;
  viewLabel: string;
  prevLabel: string;
  nextLabel: string;
  featured: ImageContent;
  thumbnails: ImageContent[];
};

export function OrderProductGallery({
  label,
  viewLabel,
  prevLabel,
  nextLabel,
  featured,
  thumbnails,
}: OrderProductGalleryProps) {
  const images = [featured, ...thumbnails];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <div aria-label={label}>
      <div className="relative aspect-[458/430] overflow-hidden rounded-md lg:aspect-[1.3/1]">
        <Image
          key={selectedImage.src}
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <Carousel
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        viewportClassName="mt-2.5 sm:mt-3"
        controlsClassName="mt-4"
      >
        {images.map((image, index) => {
          const selected = index === selectedIndex;

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              data-carousel-item
              aria-label={`${viewLabel}: ${image.alt}`}
              aria-pressed={selected}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "focus-visible:outline-accent relative aspect-square w-[24%] shrink-0 snap-start overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 sm:w-[18%] lg:w-[20%]",
                selected
                  ? "border-accent"
                  : "hover:border-border border-transparent",
              )}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 18vw, 20vw"
                className="object-cover"
              />
            </button>
          );
        })}
      </Carousel>
    </div>
  );
}
