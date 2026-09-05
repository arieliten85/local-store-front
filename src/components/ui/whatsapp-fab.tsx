"use client";

import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppHref } from "@/features/order/lib/build-order-message";
import { orderWhatsAppNumber } from "@/config/order.config";

export function WhatsAppFab({ message }: { message: string }) {
  const href = buildWhatsAppHref(orderWhatsAppNumber, message);

  return (
    <div className="fixed right-6 bottom-6 z-50 sm:right-8 sm:bottom-8">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}
