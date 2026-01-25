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
export const weekday = new Intl.DateTimeFormat("en-GB", {
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

function roundUpToInterval(date: Date, intervalMinutes: number) {
  const rounded = new Date(date);
  const minutes = rounded.getMinutes();
  const remainder = minutes % intervalMinutes;

  if (remainder !== 0) {
    rounded.setMinutes(minutes + (intervalMinutes - remainder));
  }

  rounded.setSeconds(0, 0);
  return rounded;
}


export function generateTimeSlots(
  selectedDate: string, // YYYY-MM-DD
  intervalMinutes = 15
): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const [openH, openM] = RESTAURANT_HOURS.openTime.split(":").map(Number);
  const [closeH, closeM] = RESTAURANT_HOURS.closeTime.split(":").map(Number);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const isToday = selectedDate === todayStr;

  // Opening time
  let start = new Date();
  start.setHours(openH, openM, 0, 0);

  // If today → move start forward to "now (rounded up)"
  if (isToday) {
    const nowRounded = roundUpToInterval(today, intervalMinutes);

    if (nowRounded > start) {
      start = nowRounded;
    }
  }

  // Closing time
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


export function formatPickupDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
  });
}