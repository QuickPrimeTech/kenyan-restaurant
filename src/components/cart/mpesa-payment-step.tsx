"use client";

import { useEffect, useRef, useState } from "react";
import { MpesaPaymentForm } from "./mpesa-steps/mpesa-payment-form";
import { MpesaProcessingStep } from "./mpesa-steps/mpesa-processing-step";
import { MpesaErrorStep } from "./mpesa-steps/mpesa-error-step";
import { useCart } from "@/contexts/cart-provider";
import { useOrder } from "@/contexts/order-context";
import { PhoneData } from "@/schemas/cart/mpesa-payment";
import { toast } from "sonner";
import { useCartUI } from "@/contexts/cart-ui-provider";

export type MpesaStep = "phone" | "processing" | "error";

export function MpesaPaymentStep() {
  const { cartItems, grandTotal, setCartSnapshot, clearCart } = useCart();
  const { setCurrentCheckoutStep } = useCartUI();
  const { pickupInfo } = useOrder();
  const [step, setStep] = useState<MpesaStep>("phone");
  const eventSourceRef = useRef<EventSource | null>(null);

  // Cleanup SSE on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handlePayment = async (values: PhoneData) => {
    setStep("processing");
    setCartSnapshot({ items: cartItems, total: grandTotal });

    const payload = {
      items: cartItems,
      phone: values.phoneNumber,
      pickupInfo: {
        fullName: pickupInfo.fullName || "",
        email: pickupInfo.email || "",
        phone: pickupInfo.phone || "",
        pickupDate: pickupInfo.pickupDate || "",
        pickupTime: pickupInfo.pickupTime || "",
        specialInstructions: pickupInfo.instructions || "",
      },
      total: grandTotal,
      paymentMethod: "Mpesa",
    };

    try {
      // 1. Initiate payment through Next.js (secure, hides API key)
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Payment failed");
      }

      const data = await response.json();
      console.log("Payment initiated:", data);

      // EXTRACT uniqueId (not just orderId!)
      const uniqueId = data.uniqueId || data.data?.uniqueId;
      const orderId = data.orderId || data.data?.orderId;

      if (!uniqueId) {
        throw new Error("No payment ID received for tracking");
      }

      // 2. Connect DIRECTLY to PrimeAPI SSE (bypass Next.js)
      // This requires CORS to be enabled on your Express server
      const eventSource = new EventSource(
        `https://api.quickprimetech.com/v1/payments/stream?unique_id=${uniqueId}`,
      );

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log("SSE connection opened");
      };

      eventSource.onmessage = (event) => {
        const update = JSON.parse(event.data);
        console.log("Payment update:", update);

        // Handle initial connection message
        if (update.status === "listening" || update.status === "connected") {
          console.log("Waiting for M-Pesa confirmation...");
          return;
        }

        // Handle completion
        if (update.status === "success") {
          eventSource.close();
          clearCart();
          toast.success("Payment successful! Check your email for details.");
          setCurrentCheckoutStep("success");
        } else if (update.status === "failed") {
          eventSource.close();
          toast.error(update.resultDesc || "Payment failed. Please try again.");
          setStep("phone");
        } else if (update.status === "timeout") {
          eventSource.close();
          toast.error("Payment timed out. Please check your M-Pesa messages.");
          setStep("phone");
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
        // Don't immediately fail—maybe retry once or let user check status manually
        toast.error("Connection lost. Checking status...");

        // Fallback: You could poll a status endpoint here
        setTimeout(() => setStep("phone"), 3000);
      };
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed");
      setStep("phone");
    }
  };

  if (step === "processing") {
    return <MpesaProcessingStep />;
  }

  if (step === "error") {
    return (
      <MpesaErrorStep onRetry={() => setStep("processing")} setStep={setStep} />
    );
  }

  return <MpesaPaymentForm onSubmit={handlePayment} />;
}
