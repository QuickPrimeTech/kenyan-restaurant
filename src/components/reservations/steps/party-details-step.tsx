// components/reservations/steps/party-details.tsx

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Users } from "lucide-react";
import { toast } from "sonner";
import type { JSX } from "react";

// Import types and constants
import type { ReservationStepProps, OccasionType } from "@/types/reservations";
import { OCCASIONS } from "@/constants/reservation";
import { RESTAURANT_CONFIG } from "@/constants/reservation";

/**
 * PartyDetailsStep Component
 *
 * This component handles the second step of the reservation process where users
 * specify details about their dining party including size, occasion, and special requests.
 *
 * Features:
 * - Party size selection with increment/decrement controls
 * - Occasion selection for special events
 * - Special requests text area for additional accommodations
 * - Validation for maximum party size
 * - Toast notifications for user feedback
 *
 * @param data - Current reservation data
 * @param onUpdate - Function to update reservation data
 */
export function PartyDetailsStep({
  data,
  onUpdate,
}: ReservationStepProps): JSX.Element {
  /**
   * Handles party size changes with validation
   * Ensures party size stays within acceptable bounds
   *
   * @param increment - The amount to change party size by (positive or negative)
   */
  const handlePartySizeChange = (increment: number): void => {
    const newSize = data.partySize + increment;

    // Validate minimum party size
    if (newSize < 1) {
      toast.error("Party size must be at least 1 person.");
      return;
    }

    // Validate maximum party size
    if (newSize > RESTAURANT_CONFIG.MAX_PARTY_SIZE) {
      toast.error(
        `For parties larger than ${RESTAURANT_CONFIG.MAX_PARTY_SIZE}, please call us directly at +254 700 123 456.`
      );
      return;
    }

    // Update party size and show feedback
    onUpdate({ partySize: newSize });
  };

  /**
   * Handles occasion selection
   * Updates the occasion type and provides user feedback
   *
   * @param occasionValue - The selected occasion type
   */
  const handleOccasionSelect = (occasionValue: OccasionType): void => {
    const previousOccasion = data.occasion;
    onUpdate({ occasion: occasionValue });

    // Find the occasion label for feedback
    const selectedOccasion = OCCASIONS.find(
      (occ) => occ.value === occasionValue
    );
  };

  /**
   * Handles special requests text changes
   * Updates special requests without validation (optional field)
   *
   * @param value - The special requests text
   */
  const handleSpecialRequestsChange = (value: string): void => {
    onUpdate({ specialRequests: value });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Tell us about your party
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Help us prepare the perfect dining experience for your group
        </p>
      </div>

      {/* Party Size and Occasion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Party Size Selection Card */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Users className="h-5 w-5" />
              Party Size
            </CardTitle>
            <CardDescription>
              How many people will be dining? (Max{" "}
              {RESTAURANT_CONFIG.MAX_PARTY_SIZE})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Party Size Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePartySizeChange(-1)}
                disabled={data.partySize <= 1}
                aria-label="Decrease party size"
              >
                <Minus />
              </Button>

              {/* Party Size Display */}
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">
                  {data.partySize}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {data.partySize === 1 ? "Guest" : "Guests"}
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePartySizeChange(1)}
                disabled={data.partySize >= RESTAURANT_CONFIG.MAX_PARTY_SIZE}
                aria-label="Increase party size"
              >
                <Plus />
              </Button>
            </div>

            {/* Large Party Notice */}
            <p className="text-xs text-center text-gray-500 mt-4">
              For parties larger than {RESTAURANT_CONFIG.MAX_PARTY_SIZE}, please
              call us directly
            </p>
          </CardContent>
        </Card>

        {/* Occasion Selection Card */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg">Occasion</CardTitle>
            <CardDescription>
              What&apos;s the special occasion? (Optional)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Occasion Options */}
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {OCCASIONS.map((occasion) => {
                const Icon = occasion.icon;
                const isSelected = data.occasion === occasion.value;

                return (
                  <Button
                    key={occasion.value}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleOccasionSelect(occasion.value)}
                    className="justify-start h-auto py-2 sm:py-4 text-sm"
                    aria-pressed={isSelected}
                  >
                    <Icon className="h-4 w-4 mr-2 sm:mr-3" />
                    {occasion.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Special Requests Card */}
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-base sm:text-lg">
            Special Requests
          </CardTitle>
          <CardDescription>
            Any special accommodations, dietary restrictions, or requests?
            (Optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., Window seat, quiet table, birthday celebration setup, accessibility needs..."
            value={data.specialRequests}
            onChange={(e) => handleSpecialRequestsChange(e.target.value)}
            rows={3}
            className="resize-none"
            maxLength={500}
          />
          {/* Character count */}
          <div className="text-xs text-gray-500 mt-2 text-right">
            {data.specialRequests.length}/500 characters
          </div>
        </CardContent>
      </Card>

      {/* Party Summary Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4">
          <div className="text-center">
            <h3 className="font-semibold text-blue-900 mb-2">Party Summary</h3>
            <p className="text-blue-800 text-sm sm:text-base">
              <span className="font-medium">
                {data.partySize} {data.partySize === 1 ? "guest" : "guests"}
              </span>
              {data.occasion &&
                OCCASIONS.find((o) => o.value === data.occasion) && (
                  <>
                    {" for "}
                    <span className="font-medium">
                      {OCCASIONS.find((o) => o.value === data.occasion)?.label}
                    </span>
                  </>
                )}
            </p>
            {data.specialRequests && (
              <p className="text-xs text-blue-700 mt-2">
                Special requests noted
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
