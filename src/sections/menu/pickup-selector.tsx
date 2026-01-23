"use client";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ChevronDown } from "lucide-react";
import { useOrder } from "@/contexts/order-context";

export function PickupSelector() {
  const { pickupInfo, setOpenDialog } = useOrder();

  const label =
    pickupInfo.pickupDate && pickupInfo.pickupTime
      ? `${pickupInfo.pickupDate}, ${pickupInfo.pickupTime}`
      : "Select pickup time";

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 mb-8">
        <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium">
          <MapPin className="h-4 w-4" />
          Pickup
        </div>

        <Button
          variant="outline"
          onClick={() => setOpenDialog(true)}
          className="flex items-center justify-between gap-2 rounded-full px-6 py-4 text-sm font-medium bg-transparent"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span
              className={
                pickupInfo.pickupDate && pickupInfo.pickupTime
                  ? ""
                  : "text-muted-foreground"
              }
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
