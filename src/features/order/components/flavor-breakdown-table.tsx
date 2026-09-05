import type {
  OrderSize,
  ProductComposition,
} from "@/features/order/model/order.types";
import type { OrderContent } from "@/content/content.types";

type FlavorBreakdownTableProps = {
  composition: ProductComposition;
  sizes: OrderSize[];
  content: OrderContent;
};

/** Separa "Nombre (descripción)" en nombre y descripción opcional. */
function splitFlavorLabel(flavor: string) {
  const match = flavor.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  if (!match) return { name: flavor.trim(), description: null };
  return { name: match[1].trim(), description: match[2].trim() };
}

export function FlavorBreakdownTable({
  composition,
  sizes,
  content,
}: FlavorBreakdownTableProps) {
  if (composition.length === 0) return null;
  const { flavorBreakdown } = content;

  return (
    <div className="mt-4">
      <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.18em] uppercase">
        {flavorBreakdown.includesLabel}
      </p>
      <table className="mt-1.5 w-full text-sm" role="table">
        <thead>
          <tr className="text-muted-foreground border-border/40 border-b text-left text-[10px] font-semibold tracking-wide uppercase">
            <th className="pr-3 pb-1.5" scope="col">
              {composition.length} {flavorBreakdown.flavorCountLabel}
            </th>
            {sizes.map((size) => (
              <th
                key={size.id}
                className="px-1.5 pb-1.5 text-center tabular-nums"
                scope="col"
              >
                {size.pieceCount} {flavorBreakdown.unitLabel}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {composition.map((item) => {
            const { name, description } = splitFlavorLabel(item.flavor);
            return (
              <tr
                key={item.flavor}
                className="border-border/30 border-b last:border-b-0"
              >
                <td className="text-card-foreground py-1 pr-3">
                  <span className="text-[10px] font-semibold tracking-wide uppercase">
                    {name}
                  </span>
                  {description ? (
                    <span className="text-muted-foreground text-[11px] italic">
                      {` (${description})`}
                    </span>
                  ) : null}
                </td>
                {sizes.map((size) => (
                  <td
                    key={size.id}
                    className="text-accent px-1.5 py-1 text-center font-medium tabular-nums"
                  >
                    {item.quantities[size.id as keyof typeof item.quantities] ??
                      "–"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
