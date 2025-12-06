"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { MobileCart } from "@/sections/menu/mobile-cart";

interface MobileCartButtonProps {
  onCheckout: () => void;
}

export function MobileCartButton({ onCheckout }: MobileCartButtonProps) {
  const { items, total } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) return null;

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-50">
        <button
          onClick={() => setCartOpen(true)}
          className="w-full h-14 bg-foreground text-background rounded-lg font-medium text-base flex items-center justify-between px-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-background/20 rounded-full flex items-center justify-center text-sm">
              {totalItems}
            </span>
            <span>View cart</span>
          </div>
          <span>${total.toFixed(2)}</span>
        </button>
      </div>

      <MobileCart
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={onCheckout}
      />
    </>
  );
}
