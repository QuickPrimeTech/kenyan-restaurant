"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const { pickupInfo, phoneNumber, setPhoneNumber } = useOrder();
  const [step, setStep] = useState<MpesaStep>("phone");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  // Use a cleanup function ref to ensure we always close connections
  const eventSourceRef = useRef<EventSource | null>(null);
  const isConnectingRef = useRef(false); // Prevent double-clicks

  // Centralized cleanup function
  const closeConnection = useCallback(() => {
    if (eventSourceRef.current) {
      console.log("Closing existing SSE connection");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    isConnectingRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, [closeConnection]);

  const handlePayment = async (values: PhoneData, isRetry = false) => {
    // Prevent multiple simultaneous connection attempts
    if (isConnectingRef.current) {
      console.log("Already connecting...");
      return;
    }

    setPhoneNumber(() => values.phoneNumber);

    isConnectingRef.current = true;
    setStep("processing");

    // CRITICAL: Close any existing connection before creating new one
    closeConnection();

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
      orderId: isRetry ? activeOrderId : undefined,
    };

    try {
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

      if (!isRetry && orderId) {
        setActiveOrderId(orderId);
        setPhoneNumber(values.phoneNumber);
      }

      // CRITICAL FIX: No space in URL!
      const eventSource = new EventSource(
        `https://api.quickprimetech.com/v1/payments/stream?unique_id=${uniqueId}`,
      );

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log(
          `SSE connected for ${isRetry ? "retry" : "new"} payment: ${uniqueId}`,
        );
      };

      eventSource.onmessage = (event) => {
        try {
          const update = JSON.parse(event.data);
          console.log("Payment update:", update);

          if (update.status === "listening" || update.status === "connected") {
            console.log("Waiting for M-Pesa confirmation...");
            return;
          }

          // Close connection and cleanup for all terminal states
          closeConnection();

          if (update.status === "success") {
            clearCart();
            setActiveOrderId(null);
            setPhoneNumber("");
            toast.success("Payment successful! Check your email for details.");
            setCurrentCheckoutStep("success");
          } else if (update.status === "failed") {
            toast.error(
              update.resultDesc || "Payment failed. Please try again.",
            );
            setStep("error");
          } else if (update.status === "timeout") {
            toast.error(
              "Payment timed out. Please check your M-Pesa messages.",
            );
            setStep("error");
          }
        } catch (parseError) {
          console.error("Failed to parse SSE data:", parseError);
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        closeConnection();
        toast.error("Connection lost. Please retry.");
        setStep("error");
      };
    } catch (error: any) {
      console.error("Payment error:", error);
      closeConnection();
      toast.error(error.message || "Payment failed");
      setStep("error");
    }
  };

  const handleRetry = () => {
    if (!activeOrderId || !phoneNumber) {
      toast.error("Session expired, please start over");
      setActiveOrderId(null);
      setStep("phone");
      return;
    }

    handlePayment({ phoneNumber }, true);
  };

  if (step === "processing") {
    return <MpesaProcessingStep />;
  }

  if (step === "error") {
    return <MpesaErrorStep onRetry={handleRetry} setStep={setStep} />;
  }

  return (
    <MpesaPaymentForm onSubmit={(values) => handlePayment(values, false)} />
  );
}
