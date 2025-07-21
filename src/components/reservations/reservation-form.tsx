// components/reservations/steps/reservation-form.tsx

"use client";

import { JSX, useState } from "react";
import { toast } from "sonner";
import { DateTimeStep } from "./steps/date-time-step";
import { PartyDetailsStep } from "./steps/party-details-step";
import { TableSelectionStep } from "./steps/table-selection-step";
import { ContactInfoStep } from "./steps/contact-info-steps";
import { ConfirmationStep } from "./steps/confirmation-step";
import type { ReservationData } from "@/types/reservations";
import { RESERVATION_STEPS } from "@/constants/reservation";
import {
  validateReservationStep,
  showStepValidationError,
} from "@/utils/reservation-validation";
import { MultiStepFormWrapper } from "@/components/ui/multi-step-form-wrapper";

/**
 * ReservationForm Component
 *
 * This is the main component that orchestrates the entire reservation process.
 * It manages the multi-step form flow, data state, validation, and step navigation.
 *
 * Features:
 * - Multi-step form with progress tracking
 * - Comprehensive form validation at each step
 * - State management for all reservation data
 * - Error handling with toast notifications
 * - Responsive design for mobile and desktop
 *
 * Architecture:
 * - Uses a centralized state object for all form data
 * - Each step is a separate component with its own validation
 * - Navigation is controlled by validation rules
 * - Toast notifications provide user feedback
 */
export function ReservationForm(): JSX.Element {
  // Current step index (0-based)
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Main reservation data state - this holds all form data
  const [reservationData, setReservationData] = useState<ReservationData>({
    // Date and time selection
    date: null,
    time: "",

    // Party information
    partySize: 2,
    occasion: "",
    specialRequests: "",

    // Table selection
    diningArea: "indoor",
    tableId: "",
    tableName: "",

    // Contact information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dietaryRestrictions: "",
  });

  /**
   * Updates reservation data with partial updates
   * This function is passed to each step component to update the central state
   *
   * @param data - Partial reservation data to merge with current state
   */
  const updateReservationData = (data: Partial<ReservationData>): void => {
    setReservationData((prev: ReservationData) => ({
      ...prev,
      ...data,
    }));
  };

  /**
   * Handles navigation to the next step
   * Validates current step before allowing navigation
   */
  const handleNext = (): void => {
    // Validate current step before proceeding
    if (!validateReservationStep(currentStep, reservationData)) {
      showStepValidationError(currentStep, reservationData);
      return;
    }

    // Navigate to next step if not at the end
    if (currentStep < RESERVATION_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      toast.success("Step completed successfully!");
    }
  };

  /**
   * Handles navigation to the previous step
   * No validation required for going backwards
   */
  const handlePrevious = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Handles direct step navigation from progress indicators
   * Validates all previous steps before allowing jump navigation
   *
   * @param targetStep - The step index to navigate to
   */
  const handleStepChange = (targetStep: number): void => {
    // Don't allow navigation to future steps without validation
    if (targetStep > currentStep) {
      // Validate all steps up to the target step
      for (let i = 0; i <= targetStep - 1; i++) {
        if (!validateReservationStep(i, reservationData)) {
          showStepValidationError(i, reservationData);
          return;
        }
      }
    }

    // Allow navigation to the target step
    setCurrentStep(targetStep);
  };

  /**
   * Handles final reservation confirmation
   * This would typically submit the reservation to a backend service
   */
  const handleConfirmReservation = (): void => {
    try {
      // Here you would typically:
      // 1. Submit reservation data to your backend API
      // 2. Handle payment processing if required
      // 3. Send confirmation emails/SMS
      // 4. Update availability in your booking system

      // For now, we'll just show a success message
      toast.success(
        "Reservation confirmed successfully! You will receive a confirmation email shortly."
      );

      // Log the reservation data for debugging (remove in production)
      console.log("Reservation Data:", reservationData);

      // You could redirect to a success page or reset the form here
      // router.push('/reservation-success')
    } catch (error) {
      console.error("Reservation confirmation error:", error);
      toast.error(
        "Failed to confirm reservation. Please try again or contact us directly."
      );
    }
  };

  /**
   * Determines if the current step is valid for navigation
   * Used to enable/disable the Next button
   *
   * @returns Boolean indicating if current step is valid
   */
  const isCurrentStepValid = (): boolean => {
    return validateReservationStep(currentStep, reservationData);
  };

  /**
   * Renders the appropriate step component based on current step
   * Each step component receives the reservation data and update function
   *
   * @returns JSX element for the current step
   */
  const renderCurrentStep = (): JSX.Element => {
    const stepProps = {
      data: reservationData,
      onUpdate: updateReservationData,
    };

    switch (currentStep) {
      case 0:
        return <DateTimeStep {...stepProps} />;

      case 1:
        return <PartyDetailsStep {...stepProps} />;

      case 2:
        return <TableSelectionStep {...stepProps} />;

      case 3:
        return <ContactInfoStep {...stepProps} />;

      case 4:
        return (
          <ConfirmationStep
            data={reservationData}
            onConfirm={handleConfirmReservation}
          />
        );

      default:
        // Fallback - should never happen
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-2 sm:p-8">
      <MultiStepFormWrapper
        steps={RESERVATION_STEPS}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        nextDisabled={!isCurrentStepValid()}
        nextLabel="Continue"
        showNavigation={currentStep < RESERVATION_STEPS.length - 1} // Hide navigation on confirmation step
      >
        {renderCurrentStep()}
      </MultiStepFormWrapper>
    </div>
  );
}
