"use client";

import { useCart } from "@/contexts/cart-provider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency-formatters";
import { CartSnapshot } from "@/types/cart";

type PriceBreakdownProps = {
  className?: string;
  cartSnapshot?: CartSnapshot;
};

export const PriceBreakdown = ({
  className,
  cartSnapshot,
}: PriceBreakdownProps) => {
  const { cartItemsCount, total } = useCart();

  // Define tax rates
  const TOURISM_TAX = 0.16; // 16%
  const CATERING_LEVY = 0.02; // 2%

  const cartTotal = cartSnapshot
    ? cartSnapshot.total * (1 / (1 + TOURISM_TAX + CATERING_LEVY))
    : total;
  const tourismTaxAmount = cartTotal * TOURISM_TAX;
  const cateringLevyAmount = cartTotal * CATERING_LEVY;
  const grandTotal = cartTotal + tourismTaxAmount + cateringLevyAmount;

  return (
    <div className="space-y-1 text-sm mb-2">
      <Separator className="my-2" />
      <div className="flex justify-between">
        <span>
          Subtotal ({cartSnapshot ? cartSnapshot.items.length : cartItemsCount}{" "}
          items):
        </span>
        <span>Ksh {formatCurrency(cartTotal)}</span>
      </div>

      <div className="pl-2 text-muted-foreground">
        <div className="flex justify-between">
          <span>VAT tax(16%):</span>
          <span>Ksh {formatCurrency(tourismTaxAmount)}</span>
        </div>

        <div className="flex justify-between">
          <span>Catering Levy (2%):</span>
          <span>Ksh {formatCurrency(cateringLevyAmount)}</span>
        </div>
      </div>
      <Separator className="my-2" />

      <div
        className={cn(
          "flex justify-between font-semibold text-base text-primary",
          className,
        )}
      >
        <span>Total:</span>
        <span>Ksh {formatCurrency(grandTotal)}</span>
      </div>
    </div>
  );
};
