// components/promo-countdown.tsx
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Clock } from "lucide-react";
import { toast } from "sonner";

interface Props {
  couponCode: string;
}

export function PromoCountdown({ couponCode }: Props) {
  const countdownEndTimeRef = useRef(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const diff = countdownEndTimeRef.current.getTime() - now;

      if (diff <= 0) {
        setIsVisible(false);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setIsCopied(true);
      toast.success(`Coupon code "${couponCode}" copied!`);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Failed to copy coupon code");
    }
  };

  const expired = useMemo(
    () => Object.values(timeLeft).every((val) => val === 0),
    [timeLeft]
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Coupon */}
      <div className="inline-flex items-center gap-3 bg-muted/30 backdrop-blur-sm rounded-lg p-4 border border-border mb-6">
        <div className="text-left">
          <p className="text-sm text-muted-foreground mb-1">Coupon Code:</p>
          <p className="text-2xl sm:text-3xl font-mono font-bold text-primary-foreground tracking-wider">
            {couponCode}
          </p>
        </div>
        <Button onClick={handleCopy} size="sm" variant={"outline"}>
          {isCopied ? (
            <>
              <Check className="h-4 w-4 mr-1" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </>
          )}
        </Button>
      </div>

      {/* Countdown */}
      {!expired ? (
        <>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-white" />
            <p className="text-lg font-semibold text-white">
              Offer expires in:
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mb-6">
            {(
              Object.entries(timeLeft) as [keyof typeof timeLeft, number][]
            ).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30 text-center"
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold ${
                    unit === "seconds"
                      ? "text-red-300 animate-pulse"
                      : "text-yellow-300"
                  }`}
                >
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm text-white/80 uppercase tracking-wide">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-xl font-bold text-red-300 mb-6">
          <Clock /> Offer Expired!
        </p>
      )}
    </>
  );
}
