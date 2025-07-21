// components/reservations/steps/date-time-step.tsx

"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CalendarIcon, AlertCircle } from "lucide-react";
import { format, addDays, isAfter, isBefore, isSameDay } from "date-fns";
import { toast } from "sonner";
import type { JSX } from "react/jsx-runtime";

// Import types and utilities
import type { ReservationStepProps } from "@/types/reservations";
import { RESTAURANT_CONFIG } from "@/constants/reservation";
import { validateReservationDate } from "@/utils/reservation-validation";
import {
  filterAvailableTimeSlots,
  getAvailableSlotCount,
  getEarliestBookingTime,
  debugTimeSlots,
} from "@/utils/time-slot-generator";

/**
 * DateTimeStep Component
 *
 * CLEAR LOGIC:
 * - For TODAY: Only show time slots that are 3+ hours from current time
 * - For FUTURE DATES: Show all restaurant operating hours
 * - Calendar: Only allow booking up to 7 days from today
 */
export function DateTimeStep({
  data,
  onUpdate,
}: ReservationStepProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    data.date || undefined
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  /**
   * Update available time slots when date changes
   */
  useEffect(() => {
    if (selectedDate) {
      // Debug the time slot calculation
      debugTimeSlots(selectedDate);

      const slots = filterAvailableTimeSlots(selectedDate);
      setAvailableTimeSlots(slots);

      // Clear selected time if it's no longer available
      if (data.time && !slots.includes(data.time)) {
        onUpdate({ time: "" });
        toast.error(
          "Selected time is no longer available. Please choose a different time."
        );
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDate, data.time, onUpdate]);

  /**
   * Handle date selection
   */
  const handleDateSelect = (date: Date | undefined): void => {
    if (!date) {
      setSelectedDate(undefined);
      onUpdate({ date: null, time: "" });
      return;
    }

    // Validate the selected date
    const dateValidation = validateReservationDate(date);
    if (!dateValidation.isValid) {
      toast.error(dateValidation.errorMessage || "Invalid date selected");
      return;
    }

    // Set the selected date
    setSelectedDate(date);
    onUpdate({ date, time: "" }); // Clear time when date changes

    // Provide feedback
    const availableCount = getAvailableSlotCount(date);
    const isToday = isSameDay(date, new Date());

    if (availableCount > 0) {
      toast.success(
        `${
          isToday ? "Today" : format(date, "EEEE, MMMM do")
        } selected. ${availableCount} time slot${
          availableCount === 1 ? "" : "s"
        } available.`
      );
    } else {
      if (isToday) {
        toast.info(
          `No available slots for today. All remaining times are within 3 hours. Next available: ${getEarliestBookingTime()}`
        );
      } else {
        toast.info(
          `No time slots available for ${format(date, "EEEE, MMMM do")}.`
        );
      }
    }
  };

  /**
   * Handle time slot selection
   */
  const handleTimeSelect = (time: string): void => {
    if (!selectedDate) {
      toast.error("Please select a date first.");
      return;
    }

    onUpdate({ time });
    toast.success(`Time selected: ${time}`);
  };

  /**
   * Determine if a date should be disabled in the calendar
   * RULE: Only allow booking up to 7 days from today
   */
  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateStart = new Date(date);
    dateStart.setHours(0, 0, 0, 0);

    // Disable past dates (before today)
    if (isBefore(dateStart, today)) {
      return true;
    }

    // Disable dates beyond 7 days from today
    const maxDate = addDays(today, RESTAURANT_CONFIG.MAX_ADVANCE_DAYS);
    if (isAfter(date, maxDate)) {
      return true;
    }

    return false;
  };

  const today = new Date();
  const isSelectedDateToday = selectedDate && isSameDay(selectedDate, today);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          When would you like to dine?
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Select your preferred date and time for your reservation
        </p>
      </div>

      {/* Booking Rules Information Card */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">
                Booking Rules
              </h3>
              <div className="text-xs sm:text-sm text-amber-800 space-y-1">
                <p>
                  • <strong>For today:</strong> Reservations must be at least{" "}
                  {RESTAURANT_CONFIG.MINIMUM_ADVANCE_HOURS} hours from now
                </p>
                <p>
                  • <strong>For future dates:</strong> All restaurant hours
                  available ({RESTAURANT_CONFIG.OPEN_HOUR}:00 AM -{" "}
                  {RESTAURANT_CONFIG.CLOSE_HOUR}:00 PM)
                </p>
                <p>
                  • <strong>Booking window:</strong> Up to{" "}
                  {RESTAURANT_CONFIG.MAX_ADVANCE_DAYS} days in advance only
                </p>
                <p>
                  • <strong>Current time:</strong>{" "}
                  {format(new Date(), "h:mm a")} - Earliest booking:{" "}
                  {format(new Date(Date.now() + 3 * 60 * 60 * 1000), "h:mm a")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date and Time Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Date Selection Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
            <CardDescription>
              Choose your dining date (up to{" "}
              {RESTAURANT_CONFIG.MAX_ADVANCE_DAYS} days from today)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-1 sm:p-4">
            <div className="w-full max-w-sm">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                className="rounded-md border w-full"
                modifiers={{
                  today: today,
                }}
                modifiersStyles={{
                  today: {
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                    fontWeight: "bold",
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Time Selection Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Clock className="h-5 w-5" />
              Select Time
            </CardTitle>
            <CardDescription>
              {selectedDate ? (
                <>
                  {isSelectedDateToday
                    ? "Today's"
                    : format(selectedDate, "EEEE's")}{" "}
                  available times
                  {availableTimeSlots.length > 0 && (
                    <span className="text-green-600 font-medium">
                      {" "}
                      ({availableTimeSlots.length} available)
                    </span>
                  )}
                </>
              ) : (
                "Please select a date first"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            {selectedDate ? (
              availableTimeSlots.length > 0 ? (
                // Show available time slots
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 sm:max-h-80 overflow-y-auto">
                  {availableTimeSlots.map((time: string) => (
                    <Button
                      key={time}
                      variant={data.time === time ? "default" : "outline"}
                      onClick={() => handleTimeSelect(time)}
                      className="justify-center text-xs sm:text-sm py-2 h-auto hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                // No available times message
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-2">No Available Times</p>
                  {isSelectedDateToday ? (
                    <div className="text-sm space-y-2">
                      <p>
                        All remaining time slots for today are within the 3-hour
                        advance booking requirement.
                      </p>
                      <p className="text-blue-600 font-medium">
                        Next available slot: {getEarliestBookingTime()}
                      </p>
                      <p className="text-gray-400">
                        Try selecting tomorrow or a future date.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm">
                      No time slots are available for this date.
                    </p>
                  )}
                </div>
              )
            ) : (
              // No date selected message
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a date to see available times</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Date and Time Summary */}
      {selectedDate && data.time && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4">
            <div className="text-center">
              <h3 className="font-semibold text-green-900 mb-2">
                ✅ Reservation Time Selected
              </h3>
              <p className="text-green-800 text-sm sm:text-base">
                <span className="font-medium">
                  {format(selectedDate, "EEEE, MMMM do, yyyy")}
                </span>
                {" at "}
                <span className="font-medium">{data.time}</span>
              </p>
              {isSelectedDateToday && (
                <p className="text-xs text-green-700 mt-1">
                  ✓ This is{" "}
                  {Math.ceil(
                    (new Date(
                      selectedDate.toDateString() + " " + data.time
                    ).getTime() -
                      Date.now()) /
                      (1000 * 60 * 60)
                  )}{" "}
                  hours from now
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
