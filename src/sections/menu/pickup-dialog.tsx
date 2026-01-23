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
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useEffect } from "react";

const pickupSchema = z.object({
  pickupDate: z.string().min(1),
  pickupTime: z.string().min(1),
});

type PickupFormValues = z.infer<typeof pickupSchema>;

export const PickupDialog = () => {
  const defaultDate = AVAILABLE_DATES[0]?.label;
  const defaultTime = TIME_SLOTS[0]?.time;

  const { pickupInfo, setPickupInfo, openDialog, setOpenDialog } = useOrder();

  const form = useForm<PickupFormValues>({
    resolver: zodResolver(pickupSchema),
    defaultValues: {
      pickupDate: pickupInfo.pickupDate ?? "",
      pickupTime: pickupInfo.pickupTime ?? "",
    },
  });

  useEffect(() => {
    if (!openDialog) return;

    // Only set defaults if user hasn't chosen yet
    if (!pickupInfo.pickupDate && defaultDate) {
      form.setValue("pickupDate", defaultDate, { shouldDirty: false });
    }

    if (!pickupInfo.pickupTime && defaultTime) {
      form.setValue("pickupTime", defaultTime, { shouldDirty: false });
    }
  }, [openDialog]);

  function onSubmit(values: PickupFormValues) {
    setPickupInfo(values);
    setOpenDialog(false);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="flex flex-col w-full max-w-md max-h-[90vh] rounded-2xl p-0">
        <DialogHeader className="relative border-b px-6 py-4">
          <DialogTitle className="text-xl font-semibold">
            Choose Pickup Date & Time
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-4 h-full overflow-hidden">
              <FormField
                control={form.control}
                name="pickupDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex">
                      {/* Date Selection */}
                      <ScrollArea className="w-0 flex-1 pb-3 -ml-4">
                        <div className="flex gap-3 pl-4">
                          {AVAILABLE_DATES.map((d) => (
                            <Button
                              variant={"outline"}
                              size={"xl"}
                              key={d.label}
                              onClick={() => field.onChange(d.label)}
                              className={`gap-12 rounded-2xl transition-all shadow-sm cursor-pointer ${
                                field.value === d.label
                                  ? "bg-foreground dark:bg-foreground text-background dark:hover:bg-foreground/95 hover:bg-foreground/95 hover:text-background"
                                  : "border bg-background hover:border-foreground/20"
                              }`}
                            >
                              <p className="text-base font-bold">{d.label}</p>
                              <p className="font-bold whitespace-nowrap">
                                {d.date}
                              </p>
                            </Button>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="mt-2" />
                      </ScrollArea>
                    </div>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Select Time
                    </FormLabel>
                    <ScrollArea className="h-[calc(95vh-330px)] rounded-2xl">
                      {/* Time Selection */}
                      <div className="bg-muted/30">
                        <RadioGroup
                          value={field.value ?? ""}
                          onValueChange={field.onChange}
                          className="gap-0 rounded-none"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <div
                              key={slot.time}
                              className={`flex items-center space-x-3 pl-4 border-t first:border-t-0 cursor-pointer transition-colors hover:bg-muted/50`}
                            >
                              <RadioGroupItem
                                value={slot.time}
                                id={slot.time}
                              />
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
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="border-t p-4">
              <Button type="submit" size={"xl"} className="w-full">
                Schedule Pickup
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
