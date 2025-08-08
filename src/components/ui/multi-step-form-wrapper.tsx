"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "./progress";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface MultiStepFormWrapperProps {
  steps: Step[];
  currentStep: number;
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

  // Ref for auto-scroll
  const formRef = React.useRef<HTMLDivElement>(null);

  // Scroll to top of the form on step change
  React.useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentStep]);

  return (
    <div
      ref={formRef}
      className={cn("w-full max-w-4xl mx-auto mb-24", className)}
    >
      {showProgress && (
        <div className="mb-8">
          {/* Progress bar using ShadCN UI */}
          <Progress value={progress} className="h-2 mb-6" />

          {/* Step indicators (closer together, no wrapping) */}
          <div className="flex flex-wrap justify-between items-start gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center cursor-pointer transition-all duration-200 flex-1 min-w-[48px] max-w-[72px]",
                  index <= currentStep ? "text-primary" : "text-gray-400"
                )}
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
                  {index < currentStep ? (
                    <Check className="size-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Only show titles/descriptions on desktop */}
                <div className="mt-2 text-center hidden sm:block">
                  <p className="text-sm font-medium">{step.title}</p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1">
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
