import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/class-names";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-button px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-accent",
        secondary:
          "border border-border bg-surface text-surface-foreground hover:bg-muted focus-visible:outline-accent",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

export function Button({
  className,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <a className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </a>
  );
}
