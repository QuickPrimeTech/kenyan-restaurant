"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image";
import type { MenuItem } from "@/types/menu";
import { cn } from "@/lib/utils";
import React from "react";

const cardVariants = cva("relative cursor-pointer overflow-hidden", {
  variants: {
    orientation: {
      square: "w-40 lg:w-50",
      horizontal: "flex flex-row-reverse gap-4 shadow-sm rounded-md",
    },
    size: {
      default: "",
      large: "w-52 md:w-60 h-52 md:h-60",
    },
    variant: {
      popular: "bg-background",
      regular: "bg-card",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default",
    variant: "regular",
  },
});

type MenuItemCardProps = {
  item: MenuItem;
};

export function MenuItemCard({
  item,
  orientation,
  variant,
  size,
  ...props
}: VariantProps<typeof cardVariants> &
  React.ComponentProps<"div"> &
  MenuItemCardProps) {
  return (
    <div className={cardVariants({ orientation, variant, size })} {...props}>
      {/* Image */}
      <div
        className={cn(
          "relative w-40 aspect-square border border-border",
          orientation === "square" &&
            "lg:w-50 shrink-0 rounded-md overflow-hidden"
        )}
      >
        <ImageWithFallback
          fill
          src={item.image_url}
          placeholder={item.lqip ? "blur" : "empty"}
          blurDataURL={item.lqip || undefined}
          alt={item.name}
          className="object-cover"
        />

        <Button
          size="icon-lg"
          variant="outline"
          title={`Add ${item.name} to cart`}
          className="absolute bottom-2 right-2 shadow-lg hover:scale-105 transition-transform"
        >
          <Plus className="text-foreground" strokeWidth={3.5} />
        </Button>
      </div>

      <div
        className={cn(
          "flex-1 py-2 flex flex-col justify-center",
          orientation === "horizontal" && "px-4"
        )}
      >
        <h3 className="font-sans font-medium text-foreground leading-snug mb-1">
          {item.name}
        </h3>
        {orientation === "horizontal" && (
          <p className="text-sm text-muted-foreground leading-snug line-clamp-2 mb-2">
            {item.description}
          </p>
        )}
        <span className="text-[15px] text-foreground">
          Ksh {item.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
