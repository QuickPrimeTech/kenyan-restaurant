"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronDown, X } from "lucide-react";
import {
  AVAILABLE_DATES,
  MORE_DATES,
  TIME_SLOTS,
} from "@/constants/opening-hours";
import { useOrder } from "@/contexts/order-context";

export const PickupDialog = () => {
  const [showMoreDates, setShowMoreDates] = useState(false);
  const { pickupInfo, setPickupInfo, openDialog, setOpenDialog } = useOrder();

  const handleSelectDate = (value: string) => {
    setPickupInfo((prev) => ({ ...prev, pickupDate: value }));
    setShowMoreDates(false);
  };

  const handleSelectTime = (value: string) => {
    setPickupInfo((prev) => ({ ...prev, pickupTime: value }));
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="w-full max-w-md rounded-2xl p-0">
        <DialogHeader className="relative border-b px-6 py-4">
          <DialogTitle className="text-xl font-semibold">
            Order time
          </DialogTitle>
          <button
            onClick={() => setOpenDialog(false)}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <div className="space-y-6 px-6 py-6">
          {/* Date Selection */}
          <div className="space-y-4">
            <div className="flex gap-3">
              {AVAILABLE_DATES.map((d) => (
                <button
                  key={d.value}
                  onClick={() => handleSelectDate(d.value)}
                  className={`flex-1 rounded-2xl px-4 py-3 text-sm transition-all ${
                    pickupInfo.pickupDate === d.value
                      ? "bg-foreground text-background"
                      : "border bg-background hover:border-foreground/20"
                  }`}
                >
                  <div className="font-semibold">{d.label}</div>
                  <div className="text-xs">{d.date}</div>
                </button>
              ))}
            </div>

            {!showMoreDates ? (
              <Button
                variant="outline"
                onClick={() => setShowMoreDates(true)}
                className="w-full rounded-2xl"
              >
                More dates <ChevronDown className="h-4 w-4" />
              </Button>
            ) : (
              <div className="space-y-2 rounded-2xl border bg-muted/30 p-3">
                {MORE_DATES.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => handleSelectDate(d.value)}
                    className={`block w-full rounded-lg px-4 py-2 text-left text-sm ${
                      pickupInfo.pickupDate === d.value
                        ? "bg-foreground text-background"
                        : "hover:bg-muted"
                    }`}
                  >
                    {d.label} – {d.date}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time Selection */}
          <RadioGroup
            value={pickupInfo.pickupTime ?? ""}
            onValueChange={handleSelectTime}
            className="grid gap-3"
          >
            {TIME_SLOTS.map((slot) => (
              <div
                key={slot.value}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 cursor-pointer transition-colors hover:bg-muted/50`}
              >
                <RadioGroupItem value={slot.value} id={slot.value} />
                <Label htmlFor={slot.value} className="flex-1 cursor-pointer">
                  {slot.time}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="border-t px-6 py-4">
          <Button
            onClick={() => setOpenDialog(false)}
            disabled={!pickupInfo.pickupDate || !pickupInfo.pickupTime}
            className="w-full rounded-2xl"
          >
            Schedule order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
