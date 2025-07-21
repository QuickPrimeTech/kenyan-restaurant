/**
 * Time slot generation utilities
 * This file handles the generation and filtering of available time slots
 */

import { addHours, addMinutes, isSameDay } from "date-fns";
import { RESTAURANT_CONFIG } from "@/constants/reservation";

/**
 * Generates available time slots for the selected date based on rules
 * - Today: skips slots within MINIMUM_ADVANCE_HOURS from now
 * - Future: returns all slots between OPEN_HOUR and CLOSE_HOUR
 */
const slotCache: Record<string, string[]> = {};

export const filterAvailableTimeSlots = (selectedDate: Date): string[] => {
  const {
    OPEN_HOUR,
    CLOSE_HOUR,
    TIME_SLOT_INTERVAL_MINUTES,
    MINIMUM_ADVANCE_HOURS,
  } = RESTAURANT_CONFIG;

  const now = new Date();
  const isToday = isSameDay(selectedDate, now);
  const cacheKey = isToday ? "today" : "future";

  // ✅ Return cached result if available
  if (slotCache[cacheKey]) {
    return slotCache[cacheKey];
  }

  const slots: string[] = [];

  // Start and end of slot range for selected date
  let currentSlot = new Date(selectedDate);
  currentSlot.setHours(OPEN_HOUR, 0, 0, 0);

  const endSlot = new Date(selectedDate);
  endSlot.setHours(CLOSE_HOUR, 0, 0, 0);

  // For today, filter out early slots
  const minimumBookingTime = isToday
    ? addHours(now, MINIMUM_ADVANCE_HOURS)
    : null;

  while (currentSlot < endSlot) {
    if (!isToday || currentSlot > minimumBookingTime!) {
      const timeString = currentSlot.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      slots.push(timeString);
    }
    currentSlot = addMinutes(currentSlot, TIME_SLOT_INTERVAL_MINUTES);
  }

  // ✅ Cache the result
  slotCache[cacheKey] = slots;

  return slots;
};

/**
 * Gets the count of available time slots for a specific date
 * @param selectedDate - The date to check
 * @returns Number of available time slots
 */
export const getAvailableSlotCount = (selectedDate: Date): number => {
  return filterAvailableTimeSlots(selectedDate).length;
};

/**
 * Formats the earliest available booking time for display
 * @returns Formatted string showing the earliest booking time
 */
export const getEarliestBookingTime = (): string => {
  const now = new Date();
  const earliestTime = addHours(now, RESTAURANT_CONFIG.MINIMUM_ADVANCE_HOURS);

  return earliestTime.toLocaleString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

/**
 * Gets the next available time slot for today
 * @returns The next available time slot string, or null if none available today
 */
export const getNextAvailableTimeSlot = (): string | null => {
  const today = new Date();
  const availableSlots = filterAvailableTimeSlots(today);
  return availableSlots.length > 0 ? availableSlots[0] : null;
};
