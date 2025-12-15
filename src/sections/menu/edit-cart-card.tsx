"use client";

import { Badge } from "@/components/ui/badge";
import { formatChoicesSummary } from "@/helpers/menu";
import { CartItem } from "@/types/cart";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { ItemDetail } from "./item-detail";
import { MenuItem } from "@/types/menu";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const editCardVariants = cva(
  "cursor-pointer rounded-sm border bg-background/80 backdrop-blur-sm shadow-sm space-y-2",
  {
    variants: {
      orientation: {
        vertical: "",
        horizontal: "",
      },
      size: {
        default: "p-4",
        lg: "",
      },
    },

    defaultVariants: {
      orientation: "vertical",
      size: "default",
    },
  }
);

type EditCartCardProps = { cartItem: CartItem; menuItem: MenuItem };
export function EditCartCard({
  orientation,
  size,
  cartItem,
  menuItem,
}: EditCartCardProps & VariantProps<typeof editCardVariants>) {
  const [open, onOpenChange] = useState(false);
  return (
    <>
      <div
        onClick={() => onOpenChange(true)}
        className={cn(editCardVariants({ size, orientation }))}
      >
        <div className="flex justify-between gap-1 cartItems-center flex-wrap">
          <Badge variant="secondary">
            {cartItem.quantity} item{cartItem.quantity > 1 && "s"}
          </Badge>
          <div className="text-xs text-muted-foreground">
            {formatChoicesSummary(cartItem.choices)}
          </div>
        </div>
        <div className="flex justify-between cartItems-center">
          <p className="font-semibold text-sm">
            Ksh {cartItem.price.toFixed(2)}
          </p>
          <Edit2 className="size-3" />
        </div>
      </div>
      <ItemDetail
        item={menuItem}
        open={open}
        onOpenChange={onOpenChange}
        defaultValues={cartItem}
      />
    </>
  );
}
