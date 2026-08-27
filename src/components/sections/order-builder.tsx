import { Container } from "@/components/ui/container";
import type { OrderContent } from "@/content/content.types";
import { OrderBuilderForm } from "@/features/order/components/order-builder-form";
import { OrderProductGallery } from "@/features/order/components/order-product-gallery";
import type {
  DeliveryDate,
  DeliverySlot,
  OrderDelivery,
  OrderSize,
} from "@/features/order/model/order.types";

type OrderBuilderProps = {
  sizes: OrderSize[];
  dates: DeliveryDate[];
  slots: DeliverySlot[];
  delivery: OrderDelivery;
  whatsappNumber: string;
  content: OrderContent;
};

export function OrderBuilder({
  sizes,
  dates,
  slots,
  delivery,
  whatsappNumber,
  content,
}: OrderBuilderProps) {
  const { heading, gallery } = content;
  return (
    <section
      id="order-builder"
      aria-labelledby="order-builder-title"
      className="bg-surface py-section-sm lg:py-7"
    >
      <Container>
        <h2
          id="order-builder-title"
          className="font-heading text-accent text-center text-2xl tracking-[0.12em] uppercase"
        >
          {heading.title}
        </h2>
        <div aria-hidden="true" className="bg-accent mx-auto mt-3 h-px w-12" />

        <div className="max-w-content-wide mx-auto mt-6 grid items-start gap-6 lg:grid-cols-[1.03fr_0.97fr] lg:gap-6">
          <OrderProductGallery
            label={gallery.label}
            viewLabel={gallery.viewLabel}
            featured={gallery.featured}
            thumbnails={gallery.thumbnails}
          />

          <div className="rounded-card-sm bg-card p-4 shadow-md sm:p-5">
            <OrderBuilderForm
              sizes={sizes}
              dates={dates}
              slots={slots}
              delivery={delivery}
              whatsappNumber={whatsappNumber}
              content={content}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
