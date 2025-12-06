"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@ui/sheet";
import { ScrollArea } from "@ui/scroll-area";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@ui/button";
import { Minus, Plus, X } from "lucide-react";

interface MobileCartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: () => void;
}

export function MobileCart({
  open,
  onOpenChange,
  onCheckout,
}: MobileCartProps) {
  const { items, total, updateQuantity, removeItem } = useCart();

  const subtotal = total;
  const deliveryFee = 0.49;
  const serviceFee = 2.99;
  const tax = subtotal * 0.0875;
  const finalTotal = subtotal + deliveryFee + serviceFee + tax;

  const handleCheckout = () => {
    onOpenChange(false);
    onCheckout();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-2xl flex flex-col p-0"
      >
        <SheetHeader className="px-4 py-4 border-b border-border shrink-0">
          <SheetTitle className="text-left text-lg">
            Your cart
            <span className="text-muted-foreground font-normal ml-2 text-base">
              from McDonald's
            </span>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-4 border-b border-border last:border-0"
            >
              <div className="flex gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-[15px] leading-tight">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 p-1 hover:bg-secondary rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-medium text-sm w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Summary */}
        <div className="px-4 py-4 border-t border-border bg-background shrink-0">
          <div className="space-y-1.5 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium text-base rounded-lg"
          >
            Go to checkout • ${finalTotal.toFixed(2)}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
