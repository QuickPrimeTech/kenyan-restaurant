"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronDown, Clock, MapPin, X } from "lucide-react";

/* ------------------ Data ------------------ */

const AVAILABLE_DATES = [
  { label: "Today", date: "Jan 23", value: "today" },
  { label: "Tomorrow", date: "Jan 24", value: "tomorrow" },
];

const MORE_DATES = [
  { label: "Friday", date: "Jan 25", value: "fri" },
  { label: "Saturday", date: "Jan 26", value: "sat" },
  { label: "Sunday", date: "Jan 27", value: "sun" },
];

const TIME_SLOTS = [
  { time: "1:30 PM", value: "130" },
  { time: "1:45 PM", value: "145" },
  { time: "2:00 PM", value: "200" },
  { time: "2:15 PM", value: "215" },
  { time: "2:30 PM", value: "230" },
];

/* ------------------ Component ------------------ */

export function PickupSelector() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showMoreDates, setShowMoreDates] = useState(false);

  /* ------------------ Helpers ------------------ */

  const getDateLabel = () => {
    const allDates = [...AVAILABLE_DATES, ...MORE_DATES];
    const match = allDates.find((d) => d.value === selectedDate);
    return match ? `${match.label} ${match.date}` : null;
  };

  const getTimeLabel = () => {
    return TIME_SLOTS.find((t) => t.value === selectedTime)?.time ?? null;
  };

  const pickupLabel =
    selectedDate && selectedTime
      ? `${getDateLabel()}, ${getTimeLabel()}`
      : "Select pickup time";

  /* ------------------ Render ------------------ */

  return (
    <>
      {/* Selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 mb-8">
        <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium">
          <MapPin className="h-4 w-4" />
          Pickup
        </div>

        <Button
          variant="outline"
          onClick={() => setDialogOpen(true)}
          className="flex items-center justify-between gap-2 rounded-full px-6 py-4 text-sm font-medium bg-transparent"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span
              className={
                pickupLabel === "Select pickup time"
                  ? "text-muted-foreground"
                  : ""
              }
            >
              {pickupLabel}
            </span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-full max-w-md rounded-2xl p-0">
          <DialogHeader className="relative border-b px-6 py-4">
            <DialogTitle className="text-xl font-semibold">
              Order time
            </DialogTitle>
            <button
              onClick={() => setDialogOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="space-y-6 px-6 py-6">
            {/* Dates */}
            <div className="space-y-4">
              <div className="flex gap-3">
                {AVAILABLE_DATES.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => {
                      setSelectedDate(d.value);
                      setShowMoreDates(false);
                    }}
                    className={`flex-1 rounded-2xl px-4 py-3 text-sm transition-all ${
                      selectedDate === d.value
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
                <button
                  onClick={() => setShowMoreDates(true)}
                  className="w-full rounded-2xl border px-4 py-3 text-sm hover:border-foreground/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    More dates <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
              ) : (
                <div className="space-y-2 rounded-2xl border bg-muted/30 p-3">
                  {MORE_DATES.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => {
                        setSelectedDate(d.value);
                        setShowMoreDates(false);
                      }}
                      className={`block w-full rounded-lg px-4 py-2 text-left text-sm ${
                        selectedDate === d.value
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

            {/* Time */}
            <RadioGroup
              value={selectedTime ?? ""}
              onValueChange={setSelectedTime}
            >
              {TIME_SLOTS.map((slot) => (
                <div
                  key={slot.value}
                  className="flex items-center space-x-3 rounded-lg px-4 py-3 hover:bg-muted/50"
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
              onClick={() => setDialogOpen(false)}
              disabled={!selectedDate || !selectedTime}
              className="w-full rounded-2xl"
            >
              Schedule order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
PickupSelector.displayName = "PickupSelector";
