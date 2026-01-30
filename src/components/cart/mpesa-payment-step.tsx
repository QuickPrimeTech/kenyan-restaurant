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

  // Store orderId and phone for retry functionality
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [submittedPhone, setSubmittedPhone] = useState<string>("");

  const eventSourceRef = useRef<EventSource | null>(null);

  // Cleanup SSE on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handlePayment = async (values: PhoneData, isRetry = false) => {
    setStep("processing");

    // Only update cart snapshot on first attempt
    if (!isRetry) {
      setCartSnapshot({ items: cartItems, total: grandTotal });
    }

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
      // ↓↓↓ KEY: Include orderId on retry so backend doesn't create new order
      orderId: isRetry ? activeOrderId : undefined,
    };

    try {
      // 1. Initiate payment through Next.js
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

      const uniqueId = data.uniqueId || data.data?.uniqueId;
      const orderId = data.orderId || data.data?.orderId;

      if (!uniqueId) {
        throw new Error("No payment ID received for tracking");
      }

      // Store orderId and phone for potential retry (only on first attempt)
      if (!isRetry && orderId) {
        setActiveOrderId(orderId);
        setSubmittedPhone(values.phoneNumber);
      }

      // 2. Connect DIRECTLY to PrimeAPI SSE (bypass Next.js)
      // FIXED: Removed space after unique_id=
      const eventSource = new EventSource(
        `https://api.quickprimetech.com/v1/payments/stream?unique_id=${uniqueId}`,
      );

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log(
          `SSE connection opened for ${isRetry ? "RETRY" : "new"} payment`,
        );
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
          // Clear active order on success (payment flow complete)
          setActiveOrderId(null);
          setSubmittedPhone("");
          toast.success("Payment successful! Check your email for details.");
          setCurrentCheckoutStep("success");
        } else if (update.status === "failed") {
          eventSource.close();
          // Keep activeOrderId for retry!
          toast.error(update.resultDesc || "Payment failed. Please try again.");
          setStep("error");
        } else if (update.status === "timeout") {
          eventSource.close();
          toast.error("Payment timed out. Please check your M-Pesa messages.");
          setStep("error"); // Go to error step so they can retry
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
        toast.error("Connection lost. Please retry.");
        setStep("error");
      };
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed");
      setStep("error"); // Go to error step on exception too
    }
  };

  // Retry handler: uses stored phone and orderId
  const handleRetry = () => {
    if (!activeOrderId || !submittedPhone) {
      toast.error("Session expired, please start over");
      setStep("phone");
      return;
    }

    // Retry with same phone number and existing orderId
    handlePayment({ phoneNumber: submittedPhone }, true);
  };

  if (step === "processing") {
    return <MpesaProcessingStep />;
  }

  if (step === "error") {
    return (
      <MpesaErrorStep
        onRetry={handleRetry} // Now actually triggers payment, not just change step
        setStep={setStep}
      />
    );
  }

  return (
    <MpesaPaymentForm onSubmit={(values) => handlePayment(values, false)} />
  );
}
