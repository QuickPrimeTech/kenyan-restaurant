"use client";

import { Badge } from "@/components/ui/badge";
import { formatChoicesSummary } from "@/helpers/menu";
import { CartItem } from "@/types/cart";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { ItemDetail } from "./item-detail";
import { MenuItem } from "@/types/menu";

type EditCartCardProps = { cartItem: CartItem; menuItem: MenuItem };
export function EditCartCard({ cartItem, menuItem }: EditCartCardProps) {
  const [open, onOpenChange] = useState(false);
  return (
    <>
      <div
        onClick={() => onOpenChange(true)}
        className="cursor-pointer rounded-sm border bg-background/80 backdrop-blur-sm shadow-sm p-4 space-y-2"
      >
        <div className="flex justify-between gap-1 cartItems-center flex-wrap">
          <Badge variant="secondary">{cartItem.quantity} cartItems</Badge>
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
