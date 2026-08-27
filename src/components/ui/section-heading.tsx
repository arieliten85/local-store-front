import { cn } from "@/lib/class-names";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-content-narrow",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p className="text-accent mb-3 text-sm font-semibold tracking-[0.24em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-foreground text-3xl leading-tight font-semibold sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
