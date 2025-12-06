"use client";

import { MapPin, ChevronDown, ShoppingBag } from "lucide-react";
import { Button } from "@ui/button";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { MobileCart } from "@/sections/menu/mobile-cart";

interface HeaderProps {
  orderMode: "delivery" | "pickup";
  onOrderModeChange: (mode: "delivery" | "pickup") => void;
  onCheckout: () => void;
}

export function Header({
  orderMode,
  onOrderModeChange,
  onCheckout,
}: HeaderProps) {
  const { items, total } = useCart();
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 h-[60px] flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center">
              <span className="text-background font-bold text-lg">U</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Uber Eats</span>
          </div>

          {/* Delivery Toggle - now functional */}
          <div className="hidden md:flex items-center bg-secondary rounded-full p-1">
            <button
              onClick={() => onOrderModeChange("delivery")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                orderMode === "delivery"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => onOrderModeChange("pickup")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                orderMode === "pickup"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pickup
            </button>
          </div>

          {/* Address - only show for delivery */}
          {orderMode === "delivery" && (
            <button className="hidden md:flex items-center gap-1 text-sm font-medium hover:bg-secondary px-3 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              <span className="max-w-[200px] truncate">
                1600 Amphitheatre Pkwy
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          {/* Time */}
          <button className="hidden lg:flex items-center gap-1 text-sm font-medium hover:bg-secondary px-3 py-2 rounded-full">
            <span>Now</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="flex-1" />

          {/* Cart Button - Mobile */}
          {itemCount > 0 && (
            <Button
              className="lg:hidden rounded-full bg-foreground text-background hover:bg-foreground/90"
              onClick={() => setMobileCartOpen(true)}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              <span className="font-medium">${total.toFixed(2)}</span>
            </Button>
          )}

          {/* Sign In */}
          <Button variant="ghost" className="hidden sm:flex font-medium">
            Log in
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium">
            Sign up
          </Button>
        </div>
      </header>

      <MobileCart
        open={mobileCartOpen}
        onOpenChange={setMobileCartOpen}
        onCheckout={onCheckout}
      />
    </>
  );
}
