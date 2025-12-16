// @/components/cart/mpesa-payment-step.tsx
"use client";
import { useState } from "react";
import { MpesaPaymentForm } from "./mpesa-steps/mpesa-payment-form";
import { MpesaProcessingStep } from "./mpesa-steps/mpesa-processing-step";
import { MpesaErrorStep } from "./mpesa-steps/mpesa-error-step";
import { useCart } from "@/contexts/cart-provider";
import { useOrder } from "@/contexts/order-context";

interface MpesaPaymentStepProps {
  onSuccess: () => void;
  onBack: () => void;
  onProcessingChange?: (processing: boolean) => void;
}

export function MpesaPaymentStep({
  onSuccess,
  onBack,
  onProcessingChange,
}: MpesaPaymentStepProps) {
  const { cartItems } = useCart();
  const { pickupInfo } = useOrder();

  const [step, setStep] = useState<"phone" | "processing" | "error">("phone");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

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
          setUniqueId(null);
          setStep("phone");
        }}
      />
    );
  }

  return (
    <MpesaPaymentForm
      onSubmit={() => console.log("hey there mpesa payment form")}
      onBack={onBack}
    />
  );
}
