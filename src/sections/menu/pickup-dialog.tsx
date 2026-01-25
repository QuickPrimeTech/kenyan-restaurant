  "use client";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Label } from "@/components/ui/label";
  import { useOrder } from "@/contexts/order-context";
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
  import { Button } from "@/components/ui/button";
  import z from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
  import { useEffect } from "react";
import { generateAvailableDates, generateTimeSlots } from "@/utils/pickup-slot-generator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

  const pickupSchema = z.object({
    pickupDate: z.string().min(1),
    pickupTime: z.string().min(1),
  });

  export type PickupFormValues = z.infer<typeof pickupSchema>;
  

  export const PickupDialog = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

    const AVAILABLE_DATES = generateAvailableDates(7);

   const defaultDate = AVAILABLE_DATES.find(d => !d.isClosed)?.value;;
   
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
    
    const selectedDate = form.watch("pickupDate");
    const TIME_SLOTS = selectedDate
      ? generateTimeSlots(selectedDate, 15)
      : [];
  
  const defaultTime = TIME_SLOTS[0]?.value;

    const pickupContent = (
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="h-[calc(85vh-230px)] rounded-2xl">
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
                                type={"button"}
                                key={d.value}
                                disabled={d.isClosed}
                                onClick={() => field.onChange(d.value)}
                                className={`gap-8 rounded-2xl transition-all shadow-sm cursor-pointer ${
                                  field.value === d.value
                                    ? "bg-foreground dark:bg-foreground text-background dark:hover:bg-foreground/95 hover:bg-foreground/95 hover:text-background"
                                    : "border bg-background hover:border-foreground/20"
                                }`}
                              >
                                <p className="text-base font-bold">{d.label.day}</p>
                                <p className="font-bold whitespace-nowrap">
                                  {d.label.longDate}
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
                        Select Time:
                      </FormLabel>
                        {/* Time Selection */}
                        <div className="bg-muted/30">
                          <RadioGroup
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                            className="gap-0 rounded-none"
                          >
                            {TIME_SLOTS.map((slot) => (
                              <div
                                key={slot.value}
                                className={`flex items-center space-x-3 pl-4 border-t first:border-t-0 cursor-pointer transition-colors hover:bg-muted/50`}
                              >
                                <RadioGroupItem
                                  value={slot.value}
                                  id={slot.value}
                                />
                                <Label
                                  htmlFor={slot.value}
                                  className="text-base font-semibold flex-1 cursor-pointer py-4"
                                >
                                  {slot.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        <ScrollBar />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              </ScrollArea>
              <div className="border-t p-4">
                <Button type="submit" size={"xl"} className="w-full">
                  Schedule Pickup
                </Button>
              </div>
            </form>
          </Form>
    )
if(isMobile) {
  return (
    <Drawer open={openDialog} onOpenChange={setOpenDialog}>
      <DrawerContent>
         <DrawerHeader>
            <DrawerTitle>Choose Pickup date and time</DrawerTitle>
          </DrawerHeader>
        {pickupContent}
      </DrawerContent>
    </Drawer>
  )
}
    return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="flex flex-col w-full max-w-md max-h-[90vh] rounded-2xl p-0">
          <DialogHeader className="relative border-b px-6 py-4">
            <DialogTitle className="text-xl font-semibold">
              Choose Pickup Date & Time
            </DialogTitle>
          </DialogHeader>
        {pickupContent}
        </DialogContent>
      </Dialog>
    );
  };
