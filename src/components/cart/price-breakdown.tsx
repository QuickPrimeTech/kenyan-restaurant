"use client";

import { useCart } from "@/contexts/cart-provider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency-formatters";

type PriceBreakdownProps = {
  className?: string;
};

export const PriceBreakdown = ({ className }: PriceBreakdownProps) => {
  const { cartItemsCount, total } = useCart();
  return (
    <div className="space-y-1 text-sm mb-2">
      <div className="flex justify-between">
        <span>Subtotal ({cartItemsCount} items):</span>
        <span>Ksh {formatCurrency(total)}</span>
      </div>
      <Separator className="my-2" />
      <div
        className={cn(
          "flex justify-between font-semibold text-base text-primary",
          className
        )}
      >
        <span>Total:</span>
        <span>Ksh {formatCurrency(total)}</span>
      </div>
    </div>
  );
};
