/**
 * Reservation validation utilities
 * This file contains all validation logic for the reservation system
 */

import { addDays, addHours, isAfter, isBefore } from "date-fns";
import { toast } from "sonner";
import { RESTAURANT_CONFIG } from "@/constants/reservation";
import type { ReservationData } from "@/types/reservations";

/**
 * Validates if a date is within the allowed booking window
 * @param date - The date to validate
 * @returns Object with validation result and error message
 */
export const validateReservationDate = (
  date: Date
): { isValid: boolean; errorMessage?: string } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDateStart = new Date(date);
  selectedDateStart.setHours(0, 0, 0, 0);

  const maxDate = addDays(today, RESTAURANT_CONFIG.MAX_ADVANCE_DAYS);

  // Check if date is in the past (before today, not including today)
  if (isBefore(selectedDateStart, today)) {
    return {
      isValid: false,
      errorMessage:
        "Cannot select a date in the past. Please choose today or a future date.",
    };
  }

  // Check if date is beyond maximum advance booking window
  if (isAfter(date, maxDate)) {
    return {
      isValid: false,
      errorMessage: `Reservations can only be made up to ${RESTAURANT_CONFIG.MAX_ADVANCE_DAYS} days in advance. Please select an earlier date.`,
    };
  }

  return { isValid: true };
};

/**
 * Validates if a time slot is available for booking
 * @param date - The selected date
 * @param timeSlot - The time slot string (e.g., "7:00 PM")
 * @returns Object with validation result and error message
 */
export const validateTimeSlot = (
  date: Date,
  timeSlot: string
): { isValid: boolean; errorMessage?: string } => {
  const now = new Date();

  // Parse the time slot back to a Date object
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

  // Create a Date object for this time slot on the selected date
  const slotDateTime = new Date(date);
  slotDateTime.setHours(hour, minute, 0, 0);

  // Check if this slot is at least the minimum hours from now
  const minimumBookingTime = addHours(
    now,
    RESTAURANT_CONFIG.MINIMUM_ADVANCE_HOURS
  );

  if (!isAfter(slotDateTime, minimumBookingTime)) {
    return {
      isValid: false,
      errorMessage: `Reservations must be made at least ${RESTAURANT_CONFIG.MINIMUM_ADVANCE_HOURS} hours in advance. Please choose a later time.`,
    };
  }

  return { isValid: true };
};

/**
 * Validates contact information fields
 * @param data - The reservation data to validate
 * @returns Object with validation result and error messages
 */
export const validateContactInfo = (
  data: ReservationData
): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Validate first name
  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  // Validate last name
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate phone number (Kenyan format)
  const phoneRegex = /^(\+254|254|0)[17]\d{8}$/;
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Please enter a valid Kenyan phone number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates if the current step has all required data
 * @param step - The current step index
 * @param data - The reservation data to validate
 * @returns Boolean indicating if the step is valid
 */
export const validateReservationStep = (
  step: number,
  data: ReservationData
): boolean => {
  switch (step) {
    case 0: // Date & Time step
      return !!(data.date && data.time);

    case 1: // Party Details step
      return (
        data.partySize > 0 && data.partySize <= RESTAURANT_CONFIG.MAX_PARTY_SIZE
      );

    case 2: // Table Selection step
      return !!(data.tableId && data.diningArea && data.tableName);

    case 3: // Contact Info step
      const contactValidation = validateContactInfo(data);
      return contactValidation.isValid;

    case 4: // Confirmation step
      return true;

    default:
      return false;
  }
};

/**
 * Shows appropriate error toast for validation failures
 * @param step - The current step index
 * @param data - The reservation data
 */
export const showStepValidationError = (
  step: number,
  data: ReservationData
): void => {
  switch (step) {
    case 0:
      if (!data.date) {
        toast.error("Please select a date for your reservation.");
      } else if (!data.time) {
        toast.error("Please select a time for your reservation.");
      }
      break;

    case 1:
      if (data.partySize <= 0) {
        toast.error("Party size must be at least 1 person.");
      } else if (data.partySize > RESTAURANT_CONFIG.MAX_PARTY_SIZE) {
        toast.error(
          `For parties larger than ${RESTAURANT_CONFIG.MAX_PARTY_SIZE}, please call us directly.`
        );
      }
      break;

    case 2:
      if (!data.diningArea) {
        toast.error("Please select a dining area.");
      } else if (!data.tableId) {
        toast.error("Please select a table.");
      }
      break;

    case 3:
      const contactValidation = validateContactInfo(data);
      if (!contactValidation.isValid) {
        const firstError = Object.values(contactValidation.errors)[0];
        toast.error(firstError);
      }
      break;

    default:
      toast.error("Please complete all required fields.");
  }
};
