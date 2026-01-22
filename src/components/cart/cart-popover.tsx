"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PriceBreakdown } from "./price-breakdown";
import { EditCartCard } from "@/sections/menu/edit-cart-card";
import { useCartUI } from "@/contexts/cart-ui-provider";
import { CartButton } from "./cart-button";

export function CartPopover() {
  const { cartItems, cartItemsCount } = useCart();
  const { isCartPopoverOpen, openCartPopover, openCartCheckout } = useCartUI();

  const maxItems = 3;
  return (
    <>
      {cartItemsCount > 0 && (
        <Popover open={isCartPopoverOpen} onOpenChange={openCartPopover}>
          <PopoverTrigger asChild>
            <CartButton />
          </PopoverTrigger>
          <PopoverContent
            className="flex flex-col h-80 w-80 p-4"
            side="top"
            align="start"
          >
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="h-4 w-4" />
                <h3 className="font-semibold">Your Cart</h3>
                <span className="text-sm text-muted-foreground">
                  ({cartItemsCount} items)
                </span>
              </div>

              <ScrollArea className="min-h-13 flex-1 mb-3">
                {cartItems.slice(0, maxItems).map((item) => (
                  <EditCartCard key={item.cartItemId} cartItem={item} />
                ))}

                <ScrollBar orientation="vertical" />
              </ScrollArea>

              {cartItems.length > maxItems && (
                <div className="relative w-fit mx-auto bg-popover z-10 px-2 my-2">
                  <p className="text-sm text-muted-foreground">
                    +{cartItems.length - maxItems} more item
                    {cartItems.length - maxItems > 1 && "s"}
                  </p>
                </div>
              )}
              <Separator className="-mt-4.5 mb-4" />

              <PriceBreakdown />
              <Separator />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => openCartPopover(false)}
                >
                  <ShoppingBag className="mr-1" />
                  Continue Shopping
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => openCartCheckout(true)}
                >
                  Checkout
                  <ArrowRight />
                </Button>
              </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
