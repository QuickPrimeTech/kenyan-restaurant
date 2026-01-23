"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image";
import type { MenuItem } from "@/types/menu";
import { cn } from "@/lib/utils";
import React from "react";
import { useCart } from "@/contexts/cart-provider";
import { countItems } from "@/helpers/menu";
import { useRouter } from "next/navigation";

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
      regular: "max-sm:border-b max-sm:rounded-bl-none md:bg-card",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default",
    variant: "regular",
  },
});

type MenuItemCardProps = {
  menuItem: MenuItem;
};

export function MenuItemCard({
  menuItem,
  orientation,
  variant,
  size,
  ...props
}: VariantProps<typeof cardVariants> &
  React.ComponentProps<"div"> &
  MenuItemCardProps) {
  const router = useRouter();
  const { cartItems } = useCart();
  const cartItemsCount = countItems(cartItems, menuItem);
  return (
    <div className={cardVariants({ orientation, variant, size })} {...props}>
      {/* Image */}
      <div
        className={cn(
          "relative w-36 aspect-square border border-border",
          orientation === "square" &&
            "lg:w-50 shrink-0 rounded-md overflow-hidden",
        )}
      >
        <ImageWithFallback
          fill
          src={menuItem.image_url}
          placeholder={menuItem.lqip ? "blur" : "empty"}
          blurDataURL={menuItem.lqip || undefined}
          alt={menuItem.name}
          className="object-cover"
        />

        <Button
          size="icon-lg"
          variant="outline"
          title={`Add ${menuItem.name} to cart`}
          className="absolute bottom-2 right-2 shadow-lg hover:scale-105 transition-transform"
        >
          <Plus className="text-foreground" strokeWidth={3.5} />
        </Button>
        {cartItemsCount > 0 && (
          <Button
            variant="secondary"
            title={`${cartItemsCount} ${menuItem.name} in cart`}
            className="border group aspect-square hover:aspect-auto justify-center absolute top-2 right-2 items-center gap-1 shadow-lg overflow-hidden
               transition-all duration-300 ease-out"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/menu/${menuItem.slug}`);
            }}
          >
            <span className="group-hover:hidden font-medium  ml-1">
              {cartItemsCount}
            </span>

            {/* Hover text */}
            <span
              className="whitespace-nowrap text-xs opacity-100 translate-x-3 max-w-0
                 group-hover:opacity-100 group-hover:translate-x-0 group-hover:max-w-[160px]
                 transition-all duration-300 ease-out"
            >
              View {cartItemsCount} item(s) in cart
            </span>
          </Button>
        )}
      </div>

      <div
        className={cn(
          "flex-1 py-2 flex flex-col justify-center",
          orientation === "horizontal" && "md:px-4",
        )}
      >
        <h3 className="font-sans font-medium text-foreground leading-snug mb-1">
          {menuItem.name}
        </h3>
        {orientation === "horizontal" && (
          <p className="text-sm text-muted-foreground leading-snug line-clamp-2 mb-2">
            {menuItem.description}
          </p>
        )}
        <span className="text-[15px] text-foreground">
          Ksh {menuItem.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
