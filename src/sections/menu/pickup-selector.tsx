"use client";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ChevronDown } from "lucide-react";
import { useOrder } from "@/contexts/order-context";
import { cn } from "@/lib/utils";

export function PickupSelector() {
  const { pickupInfo, setOpenDialog } = useOrder();

  const label =
    pickupInfo.pickupDate && pickupInfo.pickupTime
      ? `${pickupInfo.pickupDate}, ${pickupInfo.pickupTime}`
      : "Select pickup time";

  return (
    <>
      <div className="flex gap-2 mb-8">
        <div className="flex items-center gap-2 px-6 rounded-full bg-muted text-sm font-bold">
          <MapPin className="size-5" />
          Pickup
        </div>

        <Button
          variant="outline"
          onClick={() => setOpenDialog(true)}
          size={"xl"}
          className="shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Clock />
            <span
              className={cn("font-bold",
                !pickupInfo.pickupDate || !pickupInfo.pickupTime
                  && "text-muted-foreground")
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
