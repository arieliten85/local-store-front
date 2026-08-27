import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
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
          "border border-border/60 bg-surface/20 text-surface-foreground hover:bg-surface/40 focus-visible:outline-accent",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonBaseProps = {
  children: ReactNode;
};

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = {
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
} & (ButtonAsAnchor | ButtonAsButton);

export function Button({
  className,
  variant,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

  if ("href" in props) {
    const { href, ...anchorProps } = props;
    return (
      <a
        href={href}
        className={classes}
        {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
