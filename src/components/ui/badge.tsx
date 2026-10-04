import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.68rem] font-mono tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-accent/40 bg-accent/15 text-paper hover:bg-accent/25",
        secondary:
          "border-line bg-bg/80 text-stone-300 hover:border-paper/40 hover:text-paper",
        destructive:
          "border-red-500/40 bg-red-500/15 text-red-300 hover:bg-red-500/25",
        outline: "border-line text-stone-300",
        accent: "border-accent bg-accent text-bg font-semibold",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
