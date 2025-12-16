"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import { cn } from "@/lib/utils";

export function CartButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { cartItemsCount, total } = useCart();

  return (
    <Button
      size="lg"
      className={cn(
        "rounded-full shadow-lg fixed bottom-6 left-6 hover:shadow-xl transition-all duration-200 size-14.5 group z-50"
      )}
      {...props}
    >
      <div className="flex flex-col items-center">
        <ShoppingBag className="h-6 w-6" />
        <span className="text-xs font-medium mt-0.5">Cart</span>
      </div>

      {/* Item count badge */}
      {cartItemsCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
          {cartItemsCount > 99 ? "99+" : cartItemsCount}
        </span>
      )}

      {/* Total amount badge */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text- text-xs px-2 py-0.5 rounded-full font-medium">
        Ksh {total.toFixed(0)}
      </div>
    </Button>
  );
}
