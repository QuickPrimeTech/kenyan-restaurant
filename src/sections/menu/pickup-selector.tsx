"use client";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ChevronDown } from "lucide-react";
import { useOrder } from "@/contexts/order-context";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatTime } from "@/utils/time-formatters";
import { formatPickupDate } from "@/utils/pickup-slot-generator";
import { VariantProps, cva } from "class-variance-authority";

const pickupSelectorVariants = cva(
  "flex items-center gap-2 px-6 rounded-full bg-muted text-sm font-bold",
  {
    variants: {
      variant: {
        default: "",
        dark: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function PickupSelector({
  variant,
}: VariantProps<typeof pickupSelectorVariants>) {
  const isMobile = useMediaQuery("(max-width:640px)");
  const { pickupInfo, setOpenDialog } = useOrder();

  const label =
    pickupInfo.pickupDate && pickupInfo.pickupTime
      ? `${formatPickupDate(pickupInfo.pickupDate)}, ${formatTime(pickupInfo.pickupTime)}`
      : "Select pickup time";

  return (
    <>
      <div className="flex gap-2 mb-8">
        <div className={cn(pickupSelectorVariants({ variant }))}>
          <MapPin className="size-5" />
          Pickup
        </div>

        <Button
          variant="outline"
          onClick={() => setOpenDialog(true)}
          size={isMobile ? "default" : "xl"}
          className="shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Clock />
            <span
              className={cn(
                "font-bold",
                !pickupInfo.pickupDate ||
                  (!pickupInfo.pickupTime && "text-muted-foreground"),
              )}
            >
              {label}
            </span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

PickupSelector.displayName = "PickupSelector";
