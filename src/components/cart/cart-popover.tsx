"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Eye, ArrowRight } from "lucide-react";
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
    <Popover open={isCartPopoverOpen} onOpenChange={openCartPopover}>
      <PopoverTrigger asChild>
        <CartButton />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="top" align="start">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="h-4 w-4" />
            <h3 className="font-semibold">Your Cart</h3>
            <span className="text-sm text-muted-foreground">
              ({cartItemsCount} items)
            </span>
          </div>

          <ScrollArea className="h-fit max-h-48">
            {cartItems.slice(0, maxItems).map((item) => (
              <EditCartCard
                orientation="horizontal"
                key={item.cartItemId}
                cartItem={item}
                menuItem={item.menuItem}
              />
            ))}

            {cartItemsCount > maxItems && (
              <div className="w-fit mx-auto py-2 bg-popover px-2">
                <p className="text-sm text-muted-foreground">
                  +{cartItemsCount - maxItems} more item
                  {cartItemsCount - maxItems > 1 && "s"}
                </p>
              </div>
            )}

            <ScrollBar orientation="vertical" />
          </ScrollArea>

          <Separator className="my-2.5" />

          <PriceBreakdown />
          <Separator />
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => openCartPopover(false)}
            >
              <Eye className="h-4 w-4 mr-1" />
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
