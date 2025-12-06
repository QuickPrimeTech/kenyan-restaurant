"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@ui/button";
import { ScrollArea } from "@ui/scroll-area";
import { Minus, Plus, X } from "lucide-react";

interface CartSidebarProps {
  orderMode: "delivery" | "pickup";
  onCheckout: () => void;
}

export function CartSidebar({ orderMode, onCheckout }: CartSidebarProps) {
  const { items, total, updateQuantity, removeItem } = useCart();

  const subtotal = total;
  const deliveryFee = orderMode === "delivery" ? 0.49 : 0;
  const serviceFee = 2.99;
  const tax = subtotal * 0.0875;
  const finalTotal = subtotal + deliveryFee + serviceFee + tax;

  return (
    <div className="sticky top-[120px] m-4 ml-0 border border-border rounded-xl bg-card overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="p-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold">Your cart</h2>
          <span className="text-sm text-muted-foreground">
            {items.length} items
          </span>
        </div>
        <p className="text-sm text-muted-foreground">from McDonald's</p>
      </div>

      {/* Items with ScrollArea */}
      <ScrollArea className="flex-1 max-h-[300px]">
        <div className="p-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 border-b border-border last:border-0"
            >
              <div className="flex gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-sm leading-tight">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 p-1 hover:bg-secondary rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Summary */}
      <div className="p-4 border-t border-border bg-secondary/30 shrink-0">
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {orderMode === "delivery" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-border">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium"
        >
          Go to checkout
        </Button>
      </div>
    </div>
  );
}
