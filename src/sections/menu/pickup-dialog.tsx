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
import { Button } from "@/components/ui/button";

export const PickupDialog = () => {
  const { pickupInfo, setPickupInfo, openDialog, setOpenDialog } = useOrder();

  const handleSelectDate = (value: string) => {
    setPickupInfo((prev) => ({ ...prev, pickupDate: value }));
  };

  const handleSelectTime = (value: string) => {
    console.log(`The time selected is ${value}`);
    setPickupInfo((prev) => ({ ...prev, pickupTime: value }));
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="flex flex-col w-full max-w-md max-h-[85vh] rounded-2xl p-0">
        <DialogHeader className="relative border-b px-6 py-4">
          <DialogTitle className="text-xl font-semibold">
            Choose Pickup Date & Time
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col px-6 gap-4 py-4 h-full overflow-hidden">
          {/* Date Selection */}
          <ScrollArea className="pb-3">
            <div className="flex gap-3">
              {AVAILABLE_DATES.map((d) => (
                <Button
                  variant={"outline"}
                  size={"xl"}
                  key={d.label}
                  onClick={() => handleSelectDate(d.label)}
                  className={`gap-12 rounded-2xl transition-all shadow-sm cursor-pointer ${
                    pickupInfo.pickupDate === d.label
                      ? "bg-foreground dark:bg-foreground text-background dark:hover:bg-foreground/95 hover:bg-foreground/95 hover:text-background"
                      : "border bg-background hover:border-foreground/20"
                  }`}
                >
                  <p className="text-base font-bold">{d.label}</p>
                  <p className="font-bold whitespace-nowrap">{d.date}</p>
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="mt-2" />
          </ScrollArea>

          <ScrollArea className="h-[calc(85vh-275px)] rounded-2xl">
            {/* Time Selection */}
            <div className="bg-muted/30">
              <RadioGroup
                value={pickupInfo.pickupTime ?? ""}
                onValueChange={handleSelectTime}
                className="gap-0 rounded-none"
              >
                {TIME_SLOTS.map((slot) => (
                  <div
                    key={slot.time}
                    className={`flex items-center space-x-3 pl-4 border-t first:border-t-0 cursor-pointer transition-colors hover:bg-muted/50`}
                  >
                    <RadioGroupItem value={slot.time} id={slot.time} />
                    <Label
                      htmlFor={slot.time}
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
        <div className="border-t p-4">
          <Button size={"xl"} className="w-full">
            Schedule Pickup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
