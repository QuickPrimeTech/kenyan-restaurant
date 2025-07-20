"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, Loader2 } from "lucide-react";

interface CardPaymentFormProps {
  total: number;
  onSuccess: () => void;
  onBack: () => void;
}

export function CardPaymentForm({
  total,
  onSuccess,
  onBack,
}: CardPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (
      !formData.cardNumber ||
      formData.cardNumber.replace(/\s/g, "").length < 16
    ) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (!formData.expiryDate || formData.expiryDate.length < 5) {
      newErrors.expiryDate = "Please enter a valid expiry date";
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Please enter the cardholder name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsProcessing(false);
    onSuccess();
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, "");
    if (number.startsWith("4")) return "Visa";
    if (number.startsWith("5") || number.startsWith("2")) return "Mastercard";
    if (number.startsWith("3")) return "Amex";
    return "Card";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-blue-800 mb-2">
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium">Secure Payment</span>
        </div>
        <p className="text-xs text-blue-700">
          Your payment information is encrypted and secure
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              maxLength={19}
              className={errors.cardNumber ? "border-red-500" : ""}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-gray-500 font-medium">
                {getCardType(formData.cardNumber)}
              </span>
            </div>
          </div>
          {errors.cardNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              maxLength={5}
              className={errors.expiryDate ? "border-red-500" : ""}
            />
            {errors.expiryDate && (
              <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              type="text"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              maxLength={4}
              className={errors.cvv ? "border-red-500" : ""}
            />
            {errors.cvv && (
              <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="cardholderName">Cardholder Name</Label>
          <Input
            id="cardholderName"
            type="text"
            placeholder="John Doe"
            value={formData.cardholderName}
            onChange={(e) =>
              handleInputChange("cardholderName", e.target.value)
            }
            className={errors.cardholderName ? "border-red-500" : ""}
          />
          {errors.cardholderName && (
            <p className="text-xs text-red-500 mt-1">{errors.cardholderName}</p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-6">
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
          disabled={isProcessing}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Ksh {total.toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
