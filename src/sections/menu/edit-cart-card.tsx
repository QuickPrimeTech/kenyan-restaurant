"use client";
import { CartItem } from "@/types/cart";
import { useState } from "react";
import { ItemDetail } from "./item-detail-dialog";
import { ImageWithFallback } from "@/components/ui/image";

export function EditCartCard({ cartItem }: { cartItem: CartItem }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  const priceDisplay = `Ksh ${(cartItem.price / cartItem.quantity).toFixed(2)}`;
  const totalPriceDisplay = `Ksh ${cartItem.price.toFixed(2)}`;

  return (
    <>
      <div
        key={cartItem.cartItemId}
        onClick={handleClick}
        className="flex cursor-pointer items-center gap-3 bg-card mt-2 pr-1.5 overflow-hidden rounded-xs border "
      >
        {/* Image */}
        {cartItem.image_url && (
          <div className="relative h-12 aspect-square bg-muted flex-shrink-0 overflow-hidden">
            <ImageWithFallback
              iconProps={{ className: "w-5 h-5" }}
              textProps={{ className: "hidden" }}
              src={cartItem.image_url}
              alt={cartItem.name}
              fill
              sizes="2.5rem"
              className="object-cover"
            />
          </div>
        )}

        {/* Item Details */}
        <div className="flex-1 min-w-0 py-1.5">
          <p className="text-sm font-medium truncate">{cartItem.name}</p>
          <p className="text-xs text-muted-foreground">
            {cartItem.quantity} x {priceDisplay}
          </p>
        </div>

        {/* Price & Edit Icon */}
        <p className="text-sm font-medium">{totalPriceDisplay}</p>
      </div>

      {cartItem.menuItem && (
        <ItemDetail
          item={cartItem.menuItem}
          open={open}
          onOpenChange={setOpen}
          defaultValues={cartItem}
        />
      )}
    </>
  );
}
