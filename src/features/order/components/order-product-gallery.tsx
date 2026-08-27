"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageContent } from "@/content/content.types";
import { cn } from "@/lib/class-names";

type OrderProductGalleryProps = {
  label: string;
  viewLabel: string;
  featured: ImageContent;
  thumbnails: ImageContent[];
};

export function OrderProductGallery({
  label,
  viewLabel,
  featured,
  thumbnails,
}: OrderProductGalleryProps) {
  const images = [featured, ...thumbnails];
  const [selectedImage, setSelectedImage] = useState(featured);

  return (
    <div>
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

      <div
        className="mt-2.5 grid grid-cols-4 gap-2 sm:mt-3 lg:gap-3"
        aria-label={label}
      >
        {images.map((image) => {
          const selected = image.src === selectedImage.src;

          return (
            <button
              key={image.src}
              type="button"
              aria-label={`${viewLabel}: ${image.alt}`}
              aria-pressed={selected}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "focus-visible:outline-accent relative aspect-square overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 sm:aspect-[1.45/1]",
                selected
                  ? "border-accent"
                  : "hover:border-border border-transparent",
              )}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 22vw, 12vw"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
