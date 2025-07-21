/**
 * Time slot generation utilities
 * This file handles the generation and filtering of available time slots
 */

import { addHours, isAfter, isSameDay } from "date-fns";
import { RESTAURANT_CONFIG } from "@/constants/reservation";

/**
 * Generates all possible time slots within restaurant operating hours
 * @returns Array of time slot strings in 12-hour format
 */
export const generateAllTimeSlots = (): string[] => {
  const slots: string[] = [];
  const { OPEN_HOUR, CLOSE_HOUR, TIME_SLOT_INTERVAL_MINUTES } =
    RESTAURANT_CONFIG;

  // Generate slots from opening to closing time
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += TIME_SLOT_INTERVAL_MINUTES) {
      const time = new Date();
      time.setHours(hour, minute, 0, 0);

      // Format time in 12-hour format with AM/PM
      const timeString = time.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      slots.push(timeString);
    }
  }

  return slots;
};

/**
 * Filters time slots based on availability rules for a specific date
 * For TODAY: Only shows slots that are 3+ hours from current time
 * For FUTURE DATES: Shows all restaurant operating hour slots
 * @param selectedDate - The date for which to filter time slots
 * @returns Array of available time slot strings
 */
export const filterAvailableTimeSlots = (selectedDate: Date): string[] => {
  const now = new Date();
  const allSlots = generateAllTimeSlots();
  const availableSlots: string[] = [];

  // Check if the selected date is today
  const isToday = isSameDay(selectedDate, now);

  for (const timeSlot of allSlots) {
    // Parse the time slot to get hour and minute
    const [time, period] = timeSlot.split(" ");
    const [hourStr, minuteStr] = time.split(":");
    let hour = Number.parseInt(hourStr, 10);
    const minute = Number.parseInt(minuteStr, 10);

    // Convert to 24-hour format
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    // Create the actual datetime for this slot on the selected date
    const slotDateTime = new Date(selectedDate);
    slotDateTime.setHours(hour, minute, 0, 0);

    if (isToday) {
      // FOR TODAY: Only show slots that are 3+ hours from current time
      const minimumBookingTime = addHours(
        now,
        RESTAURANT_CONFIG.MINIMUM_ADVANCE_HOURS
      );

      // Only include if the slot time is AFTER the minimum booking time
      if (isAfter(slotDateTime, minimumBookingTime)) {
        availableSlots.push(timeSlot);
      }
    } else {
      // FOR FUTURE DATES: Show all operating hour slots (no time restriction)
      availableSlots.push(timeSlot);
    }
  }

  return availableSlots;
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

/**
 * Debug function to show what's happening with time calculations
 * @param selectedDate - The date to debug
 * @returns Debug information
 */
export const debugTimeSlots = (selectedDate: Date) => {
  const now = new Date();
  const isToday = isSameDay(selectedDate, now);
  const minimumBookingTime = addHours(
    now,
    RESTAURANT_CONFIG.MINIMUM_ADVANCE_HOURS
  );

  console.log("=== TIME SLOT DEBUG ===");
  console.log("Current time:", now.toLocaleString());
  console.log("Selected date:", selectedDate.toDateString());
  console.log("Is today?", isToday);
  console.log(
    "Minimum booking time (current + 3h):",
    minimumBookingTime.toLocaleString()
  );

  if (isToday) {
    console.log(
      "FOR TODAY: Only showing slots after",
      minimumBookingTime.toLocaleTimeString()
    );
  } else {
    console.log("FOR FUTURE DATE: Showing all restaurant operating hours");
  }

  const available = filterAvailableTimeSlots(selectedDate);
  console.log("Available slots:", available);
  console.log("======================");

  return { now, isToday, minimumBookingTime, available };
};
