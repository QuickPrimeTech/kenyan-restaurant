// components/reservations/steps/booking-rules-card.tsx

"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { RESTAURANT_CONFIG } from "@/constants/reservation";

export function BookingRulesCard() {
  return (
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
                • <strong>Current time:</strong> {format(new Date(), "h:mm a")}{" "}
                - Earliest booking:{" "}
                {format(new Date(Date.now() + 3 * 60 * 60 * 1000), "h:mm a")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
