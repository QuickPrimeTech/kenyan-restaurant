import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-provider";
import { PriceBreakdown } from "./price-breakdown";
import { ImageWithFallback } from "@ui/image";

export const OrderSummary = () => {
  const { cartItems } = useCart();

  return (
    <div className="bg-card rounded-xl p-4 space-y-3 shadow-luxury">
      <h4 className="font-semibold text-foreground">Order Summary</h4>

      <ScrollArea className="h-40 pr-2">
        <div className="space-y-2">
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.id}
              className="flex items-center gap-3 p-2 bg-background rounded-lg border border-border"
            >
              {cartItem.image_url && (
                <div className="relative w-10 h-10 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    fill
                    src={cartItem.image_url || "/placeholder.svg"}
                    alt={cartItem.name}
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{cartItem.name}</p>
                <p className="text-xs text-muted-foreground">
                  {cartItem.quantity}x Ksh {cartItem.price}
                </p>
              </div>

              <p className="text-sm font-semibold whitespace-nowrap">
                Ksh {(cartItem.price * cartItem.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      <PriceBreakdown />
    </div>
  );
};
