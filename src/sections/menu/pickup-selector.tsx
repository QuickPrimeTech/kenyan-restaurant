"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Clock } from "lucide-react";

interface PickupSelectorProps {
  selectedTime: string;
  onSelectClick: () => void;
}

export function PickupSelector({
  selectedTime,
  onSelectClick,
}: PickupSelectorProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
      {/* Pickup Tab */}
      <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground">
        <MapPin className="h-4 w-4" />
        Pickup
      </div>

      {/* Time Selector */}
      <Button
        onClick={onSelectClick}
        variant="outline"
        className="flex items-center justify-between gap-2 rounded-full px-6 py-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground sm:px-6 bg-transparent"
      >
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{selectedTime}</span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
