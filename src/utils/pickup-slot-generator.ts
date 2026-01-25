// lib/pickup-utils.ts

import { RESTAURANT_HOURS } from "@/constants/opening-hours";

export type SelectOption = {
  label: {
    day: string;
    longDate?: string;
  };
  value: string;
  isClosed?: boolean;
};

export type TimeSlot={
    label: string;
    value: string;
}
const weekday = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
});

const longDate = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  day: "numeric",
});

export function generateAvailableDates(daysAhead = 7): SelectOption[] {
  const dates: SelectOption[] = [];
  const today = new Date();

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);


     const isClosed = RESTAURANT_HOURS.closedDays.includes(date.getDay());

    const label =
      i === 0
        ? "Today"
        : i === 1
        ? "Tomorrow"
        : weekday.format(date);

    dates.push({
      label: {
        day: label,
        longDate: isClosed ? "Closed" : longDate.format(date),
      },
      value: date.toISOString().split("T")[0], // YYYY-MM-DD,
      isClosed
    });
  }

  return dates;
}

export function generateTimeSlots(
  intervalMinutes = 15
): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const [openH, openM] = RESTAURANT_HOURS.openTime.split(":").map(Number);
  const [closeH, closeM] = RESTAURANT_HOURS.closeTime.split(":").map(Number);

  const start = new Date();
  start.setHours(openH, openM, 0, 0);

  const end = new Date();
  end.setHours(closeH, closeM, 0, 0);

  while (start <= end) {
    const value = start.toTimeString().slice(0, 5); // HH:mm
    const label = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    slots.push({ label, value });
    start.setMinutes(start.getMinutes() + intervalMinutes);
  }

  return slots;
}
