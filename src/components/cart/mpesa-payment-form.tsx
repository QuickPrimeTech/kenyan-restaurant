"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Shield, Loader2, CheckCircle } from "lucide-react";

interface MpesaPaymentFormProps {
  total: number;
  onSuccess: () => void;
  onBack: () => void;
}

export function MpesaPaymentForm({
  total,
  onSuccess,
  onBack,
}: MpesaPaymentFormProps) {
  const [step, setStep] = useState<"phone" | "pin" | "processing">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.startsWith("254")) {
      return cleaned.slice(0, 12);
    }
    if (cleaned.startsWith("0")) {
      return "254" + cleaned.slice(1, 10);
    }
    if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
      return "254" + cleaned.slice(0, 9);
    }
    return cleaned.slice(0, 12);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formatted = formatPhoneNumber(phoneNumber);
    if (formatted.length !== 12) {
      setError("Please enter a valid phone number");
      return;
    }

    setPhoneNumber(formatted);
    setStep("pin");
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (pin.length !== 4) {
      setError("Please enter your 4-digit M-Pesa PIN");
      return;
    }

    setStep("processing");

    // Simulate M-Pesa processing
    await new Promise((resolve) => setTimeout(resolve, 4000));

    onSuccess();
  };

  const formatDisplayPhone = (phone: string) => {
    if (phone.startsWith("254")) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(
        6,
        9
      )} ${phone.slice(9)}`;
    }
    return phone;
  };

  if (step === "processing") {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Smartphone className="h-8 w-8 text-green-600 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
          <p className="text-gray-600 mb-4">
            Please check your phone for the M-Pesa prompt and enter your PIN to
            complete the payment.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Payment Request Sent</span>
            </div>
            <p className="text-xs text-green-700">
              Amount: Ksh {total.toFixed(2)} to{" "}
              {formatDisplayPhone(phoneNumber)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-green-600" />
          <span className="text-sm text-gray-600">
            Waiting for confirmation...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-green-800 mb-2">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">M-Pesa Secure Payment</span>
        </div>
        <p className="text-xs text-green-700">
          Pay securely using your M-Pesa mobile money account
        </p>
      </div>

      {step === "phone" && (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div>
            <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="0712345678 or 254712345678"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError("");
              }}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Enter the phone number registered with M-Pesa
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-xl font-bold text-green-600">
                Ksh {total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 bg-transparent"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Continue
            </Button>
          </div>
        </form>
      )}

      {step === "pin" && (
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Payment Details</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                Amount:{" "}
                <span className="font-semibold">Ksh {total.toFixed(2)}</span>
              </p>
              <p>
                To:{" "}
                <span className="font-semibold">
                  {formatDisplayPhone(phoneNumber)}
                </span>
              </p>
              <p>
                Merchant: <span className="font-semibold">Restaurant App</span>
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="pin">M-Pesa PIN</Label>
            <Input
              id="pin"
              type="password"
              placeholder="Enter your 4-digit PIN"
              value={pin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                setPin(value);
                setError("");
              }}
              maxLength={4}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Enter your M-Pesa PIN to authorize the payment
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("phone")}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Shield className="h-4 w-4 mr-2" />
              Pay Ksh {total.toFixed(2)}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
