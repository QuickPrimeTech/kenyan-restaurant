import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/stores/use-cart-store";
import { PriceBreakdown } from "./price-breakdown";
import { CartItem } from "./cart-item";

export const OrderSummary = () => {
  const { cartItems } = useCartStore();

  return (
    <div className="bg-card rounded-xl p-4 space-y-3 shadow-luxury">
      <h4 className="font-semibold text-foreground">Order Summary</h4>

      <ScrollArea className="h-40 pr-2">
        <div className="space-y-2">
          {cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.cartItemId} size="small" />
          ))}
        </div>
      </ScrollArea>

      <PriceBreakdown />
    </div>
  );
};
