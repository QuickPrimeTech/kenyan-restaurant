"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AVAILABLE_DATES, TIME_SLOTS } from "@/constants/opening-hours";
import { useOrder } from "@/contexts/order-context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const PickupDialog = () => {
  const { pickupInfo, setPickupInfo, openDialog, setOpenDialog } = useOrder();

  const handleSelectDate = (value: string) => {
    setPickupInfo((prev) => ({ ...prev, pickupDate: value }));
  };

  const handleSelectTime = (value: string) => {
    setPickupInfo((prev) => ({ ...prev, pickupTime: value }));
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="flex flex-col w-full max-w-md h-[85vh] rounded-2xl p-0">
        <DialogHeader className="relative border-b px-6 py-4">
          <DialogTitle className="text-xl font-semibold">
            Order time
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col px-6 gap-4 py-4 h-full overflow-hidden">
          {/* Date Selection */}
          <ScrollArea className="pb-3">
            <div className="flex gap-3">
              {AVAILABLE_DATES.map((d) => (
                <button
                  key={d.value}
                  onClick={() => handleSelectDate(d.value)}
                  className={`flex gap-12 items-center justify-between flex-1 rounded-2xl px-4 py-3 text-sm transition-all ${
                    pickupInfo.pickupDate === d.value
                      ? "bg-foreground text-background"
                      : "border bg-background hover:border-foreground/20"
                  }`}
                >
                  <p className="font-bold">{d.label}</p>
                  <p className="text-xs font-bold whitespace-nowrap">
                    {d.date}
                  </p>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="mt-2" />
          </ScrollArea>

          <ScrollArea className="h-0 flex-1 rounded-2xl">
            {/* Time Selection */}
            <div className="bg-muted/30">
              <RadioGroup
                value={pickupInfo.pickupTime ?? ""}
                onValueChange={handleSelectTime}
                className="gap-0 rounded-none"
              >
                {TIME_SLOTS.map((slot) => (
                  <div
                    key={slot.value}
                    className={`flex items-center space-x-3 pl-4 border-t first:border-t-0 cursor-pointer transition-colors hover:bg-muted/50`}
                  >
                    <RadioGroupItem value={slot.value} id={slot.value} />
                    <Label
                      htmlFor={slot.value}
                      className="text-base font-semibold flex-1 cursor-pointer py-4"
                    >
                      {slot.time}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
