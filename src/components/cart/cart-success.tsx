"use client";
import Image from "next/image";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/currency-formatters";
import { PriceBreakdown } from "./price-breakdown";
import { useCart } from "@/contexts/cart-provider";
import { useCartUI } from "@/contexts/cart-ui-provider";

export function CartSuccess() {
  const { cartSnapshot } = useCart();
  const { openCartCheckout, setCurrentCheckoutStep } = useCartUI();

  const handleCompletion = () => {
    // Close the cart checkout and reset to cart step
    openCartCheckout(false);
    setCurrentCheckoutStep("cart");
  };
  if (!cartSnapshot) return null;
  return (
    <ScrollArea className="flex flex-col h-[calc(100vh-57px)] items-center text-center space-y-6 sm:px-6">
      {/* Icon */}
      <CheckCircle className="mx-auto mb-8 size-16 text-green-500 mt-4" />
      {/* Heading */}
      <div className="space-y-1 mb-4">
        <h2 className="text-2xl font-bold text-foreground">
          Order Confirmed 🎉
        </h2>
        <p className="text-muted-foreground">
          You&apos;ll receive a Email notification with your order details.
        </p>
      </div>

      {/* Order Summary */}
      <Card className="mb-8 w-full bg-card/60 border-border/40 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Pickup Details
          </h4>

          <ScrollArea className="gap-3 h-40 pr-2">
            {cartSnapshot.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center gap-3 p-2 bg-background/50 rounded-lg border border-border/40"
              >
                {item.image_url && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      fill
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × Ksh {item.price / item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold whitespace-nowrap">
                  Ksh {formatCurrency(item.price)}
                </p>
              </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>

          <PriceBreakdown cartSnapshot={cartSnapshot || undefined} />
        </CardContent>
      </Card>

      {/* Action */}
      <Button
        onClick={handleCompletion}
        size="xl"
        className="w-full rounded-xl shadow-md"
      >
        Done
        <CheckCircle2 className="size-6" />
      </Button>
      <ScrollBar />
    </ScrollArea>
  );
}
