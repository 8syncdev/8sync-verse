import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none cursor-pointer focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_20px_oklch(0.72_0.15_195/15%)] hover:brightness-110 hover:shadow-[0_0_32px_oklch(0.72_0.15_195/25%)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-muted hover:text-foreground",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground shadow-[0_0_20px_oklch(0.58_0.22_292/15%)] hover:brightness-110",
        glass: "glass hover:bg-muted/30",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-lg [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3.5 text-xs rounded-lg",
        default: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-sm",
        xl: "h-12 px-8 text-base rounded-2xl [&_svg:not([class*='size-'])]:size-5",
        "2xl": "h-14 px-10 text-lg rounded-2xl [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
