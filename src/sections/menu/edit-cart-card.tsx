"use client";
import { Badge } from "@/components/ui/badge";
import { formatChoicesSummary } from "@/helpers/menu";
import { CartItem } from "@/types/cart";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { ItemDetail } from "./item-detail";
import { MenuItem } from "@/types/menu";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/image";

const editCardVariants = cva(
  "cursor-pointer rounded-sm border bg-background/80 backdrop-blur-sm shadow-sm",
  {
    variants: {
      orientation: {
        vertical: "p-4 space-y-2",
        horizontal: "flex items-center px-2 py-1.5 mt-2 gap-3",
      },
      size: {
        default: "",
        lg: "",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      size: "default",
    },
  }
);

type EditCartCardProps = {
  cartItem: CartItem;
  menuItem?: MenuItem;
  orientation?: "vertical" | "horizontal";
  size?: "default" | "lg";
};

export function EditCartCard({
  orientation = "vertical",
  size = "default",
  cartItem,
  menuItem,
}: EditCartCardProps) {
  const [open, onOpenChange] = useState(false);

  const handleClick = () => onOpenChange(true);

  const priceDisplay = `Ksh ${cartItem.price.toFixed(2)}`;
  const totalPriceDisplay = `Ksh ${(cartItem.quantity * cartItem.price).toFixed(
    2
  )}`;
  const quantityText = `${cartItem.quantity} item${
    cartItem.quantity > 1 ? "s" : ""
  }`;

  return (
    <>
      <div
        key={cartItem.cartItemId}
        onClick={handleClick}
        className={cn(editCardVariants({ orientation, size }))}
      >
        {orientation === "vertical" ? (
          <>
            <div className="flex justify-between gap-1 items-center flex-wrap">
              <Badge variant="secondary">{quantityText}</Badge>
              <div className="text-xs text-muted-foreground">
                {formatChoicesSummary(cartItem.choices)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">{priceDisplay}</p>
              <Edit2 className="size-3" />
            </div>
          </>
        ) : (
          <>
            <div className="relative w-10 h-10 bg-muted rounded-xs flex-shrink-0 overflow-hidden">
              <ImageWithFallback
                iconProps={{ className: "size-5" }}
                textProps={{ className: "hidden" }}
                src={cartItem.image_url}
                alt={cartItem.name}
                fill
                sizes="2.5rem"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{cartItem.name}</p>
              <p className="text-xs text-muted-foreground">
                {cartItem.quantity}x {priceDisplay}
              </p>
            </div>
            <p className="text-sm font-medium">{totalPriceDisplay}</p>
          </>
        )}
      </div>
      {menuItem && (
        <ItemDetail
          item={menuItem}
          open={open}
          onOpenChange={onOpenChange}
          defaultValues={cartItem}
        />
      )}
    </>
  );
}
