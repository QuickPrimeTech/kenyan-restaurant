// @/components/cart/mpesa-payment-step.tsx
"use client";

import { useState } from "react";
import { MpesaPaymentForm } from "./mpesa-steps/mpesa-payment-form";
import { MpesaProcessingStep } from "./mpesa-steps/mpesa-processing-step";
import { MpesaErrorStep } from "./mpesa-steps/mpesa-error-step";

export type MpesaStep = "phone" | "processing" | "error";

export function MpesaPaymentStep() {

  const [step, setStep] = useState<MpesaStep>("phone");
  const [formattedPhone, setFormattedPhone] = useState("");

  // 🔄 Step rendering
  if (step === "processing") {
    return <MpesaProcessingStep formattedPhone={formattedPhone} />;
  }

  if (step === "error") {
    return (
      <MpesaErrorStep
        onRetry={() => console.log("Hey there want to retry?")}
        formattedPhone={formattedPhone}
        onChangePhone={() => {
          setFormattedPhone("");
          setStep("phone");
        }}
      />
    );
  }

  return (
    <MpesaPaymentForm
    setStep={setStep}
    />
  );
}
