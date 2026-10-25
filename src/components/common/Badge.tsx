import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "bestseller" | "discount" | "attribute" | "outline" | "concern";
  className?: string;
}

export function Badge({ children, variant = "attribute", className }: BadgeProps) {
  const variantStyles = {
    bestseller:
      "bg-ayur-primary text-ayur-cream font-medium tracking-wider uppercase text-[10px] px-2.5 py-0.5 rounded-sm shadow-sm",
    discount:
      "bg-ayur-accent text-white font-medium text-[10px] px-2 py-0.5 rounded-sm",
    attribute:
      "bg-ayur-sageSubtle text-ayur-secondary border border-ayur-sage/30 text-[11px] px-2 py-0.5 rounded-sm",
    outline:
      "border border-ayur-border text-ayur-muted text-[11px] px-2 py-0.5 rounded-sm bg-white/70",
    concern:
      "bg-ayur-parchment text-ayur-dark font-medium text-[11px] px-2.5 py-1 rounded-sm border border-ayur-sand",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center transition-colors whitespace-nowrap",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
