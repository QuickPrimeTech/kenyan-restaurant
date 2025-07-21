// components/ui/multi-step-form-wrapper.tsx

"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface MultiStepFormWrapperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
  className?: string;
  showProgress?: boolean;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
  nextLabel?: string;
  previousLabel?: string;
}

export function MultiStepFormWrapper({
  steps,
  currentStep,
  onStepChange,
  children,
  className,
  showProgress = true,
  showNavigation = true,
  onNext,
  onPrevious,
  nextDisabled = false,
  previousDisabled = false,
  nextLabel = "Next",
  previousLabel = "Previous",
}: MultiStepFormWrapperProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {showProgress && (
        <div className="mb-8">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Indicators - More mobile friendly */}
          <div className="flex flex-wrap justify-between items-start">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center cursor-pointer transition-all duration-200 mb-4",
                  index <= currentStep ? "text-primary" : "text-gray-400",
                  "w-[calc(20%-4px)] sm:w-auto" // Fixed width on mobile, auto on larger screens
                )}
                onClick={() => onStepChange(index)}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-200",
                    index < currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : index === currentStep
                      ? "border-primary text-primary bg-background"
                      : "border-gray-300 text-gray-400 bg-background"
                  )}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <div className="mt-2 text-center">
                  {/* Hide step names on mobile, show on desktop */}
                  <p className="text-sm font-medium hidden sm:block">
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="min-h-[400px]">{children}</div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t gap-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={previousDisabled || currentStep === 0}
            className="flex items-center gap-2 bg-transparent w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4" />
            {previousLabel}
          </Button>

          {/* Hide step counter on mobile */}
          <div className="text-sm text-muted-foreground order-first sm:order-none mb-2 sm:mb-0 hidden sm:block">
            Step {currentStep + 1} of {steps.length}
          </div>

          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            {nextLabel}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
