import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/class-names";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "max-w-container mx-auto w-full px-5 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
