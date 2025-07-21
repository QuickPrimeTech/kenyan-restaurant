// app/components/PromotionalBanner.tsx (or any server file)
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { PromoCountdown } from "@/components/promo-countdown";

const couponCode = "FEAST25";
const discountAmount = "25%";
const minimumOrder = "Ksh 1,500";

export default function PromotionalBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Gradient BG */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-destructive animate-[pulse_8s_infinite]" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary to-orange-600 opacity-80 animate-[pulse_8s_infinite]"
        style={{ animationDelay: "4s" }}
      />

      {/* Icons */}
      <Sparkles className="absolute top-2 left-4 h-4 w-4 text-yellow-300 animate-bounce" />
      <Zap className="absolute top-4 right-8 h-5 w-5 text-yellow-300 animate-bounce [animation-delay:.5s]" />
      <Gift className="absolute bottom-2 left-8 h-4 w-4 text-yellow-300 animate-bounce [animation-delay:1s]" />
      <Sparkles className="absolute bottom-4 right-4 h-3 w-3 text-yellow-300 animate-bounce [animation-delay:1.5s]" />

      <Card className="relative bg-transparent border-0 shadow-xl">
        <div className="relative z-10 p-6 sm:p-8 text-center text-primary-foreground">
          <Badge
            variant="secondary"
            className="font-bold text-sm px-3 py-1 mb-2 animate-pulse"
          >
            🔥 LIMITED TIME OFFER
          </Badge>

          <h2 className="text-2xl sm:text-4xl font-bold text-primary-foreground mb-2">
            Save {discountAmount} on Your Order!
          </h2>

          <p className="text-lg sm:text-xl text-white/90 mb-4">
            Use code <strong>{couponCode}</strong> for {discountAmount} off
            orders over {minimumOrder}
          </p>

          {/* Dynamic countdown + copy UI */}
          <PromoCountdown couponCode={couponCode} />

          <Button
            size="lg"
            variant="outline"
            className="animate-bounce hover:animate-none transition-transform"
            asChild
          >
            <Link href="/menu">
              <Gift className="size-5" />
              Order Now & Save!
            </Link>
          </Button>

          <div className="text-xs sm:text-sm text-white/70 space-y-1 mt-6">
            <p>• Valid for orders over {minimumOrder}</p>
            <p>• Cannot be combined with other offers</p>
            <p>• Valid for delivery and pickup orders</p>
            <p>• One use per customer</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
