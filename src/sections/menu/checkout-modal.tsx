"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderMode: "delivery" | "pickup";
}

type Step = "review" | "delivery" | "payment" | "confirm" | "success";

export function CheckoutModal({
  open,
  onOpenChange,
  orderMode,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("review");
  const [deliveryAddress, setDeliveryAddress] = useState(
    "1600 Amphitheatre Pkwy, Mountain View, CA"
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, total, clearCart } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const subtotal = total;
  const deliveryFee = orderMode === "delivery" ? 0.49 : 0;
  const serviceFee = 2.99;
  const tax = subtotal * 0.0875;
  const finalTotal = subtotal + deliveryFee + serviceFee + tax;

  const handleBack = () => {
    switch (step) {
      case "delivery":
        setStep("review");
        break;
      case "payment":
        setStep(orderMode === "delivery" ? "delivery" : "review");
        break;
      case "confirm":
        setStep("payment");
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (step) {
      case "review":
        setStep(orderMode === "delivery" ? "delivery" : "payment");
        break;
      case "delivery":
        setStep("payment");
        break;
      case "payment":
        setStep("confirm");
        break;
      case "confirm":
        handlePayment();
        break;
      default:
        break;
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate M-Pesa STK push
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setStep("success");
  };

  const handleClose = () => {
    if (step === "success") {
      clearCart();
      setStep("review");
    }
    onOpenChange(false);
  };

  const getStepTitle = () => {
    switch (step) {
      case "review":
        return "Review your order";
      case "delivery":
        return "Delivery details";
      case "payment":
        return "Payment method";
      case "confirm":
        return "Confirm order";
      case "success":
        return "Order placed!";
      default:
        return "";
    }
  };

  const getStepNumber = () => {
    switch (step) {
      case "review":
        return 1;
      case "delivery":
        return 2;
      case "payment":
        return orderMode === "delivery" ? 3 : 2;
      case "confirm":
        return orderMode === "delivery" ? 4 : 3;
      default:
        return 0;
    }
  };

  const totalSteps = orderMode === "delivery" ? 4 : 3;

  const content = (
    <div className="flex flex-col h-full max-h-[90vh] md:max-h-[85vh]">
      {/* Header */}
      {step !== "success" && (
        <div className="flex items-center gap-3 p-4 border-b border-border shrink-0">
          {step !== "review" && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-secondary rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1">
            <h2 className="text-lg font-bold">{getStepTitle()}</h2>
            <p className="text-sm text-muted-foreground">
              Step {getStepNumber()} of {totalSteps}
            </p>
          </div>
          {/* Step indicators */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < getStepNumber() ? "bg-foreground" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Step: Review */}
          {step === "review" && (
            <div className="space-y-4">
              {/* Order Type */}
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                {orderMode === "delivery" ? (
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Clock className="w-5 h-5 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <p className="font-medium">
                    {orderMode === "delivery" ? "Delivery" : "Pickup"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderMode === "delivery"
                      ? "25-35 min"
                      : "Ready in 15-20 min"}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                <h3 className="font-medium">Your items</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {orderMode === "delivery" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step: Delivery Details */}
          {step === "delivery" && (
            <div className="space-y-4">
              {/* Address */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Delivery Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-secondary rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-foreground"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full h-12 pl-11 pr-4 bg-secondary rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Delivery Instructions */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  placeholder="Gate code, building instructions, etc."
                  className="w-full h-20 p-3 bg-secondary rounded-xl text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Estimated Time */}
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Estimated delivery</p>
                  <p className="text-sm text-muted-foreground">25-35 minutes</p>
                </div>
              </div>
            </div>
          )}

          {/* Step: Payment */}
          {step === "payment" && (
            <div className="space-y-4">
              {/* M-Pesa Option */}
              <div className="p-4 border-2 border-foreground rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#00A651] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">M-Pesa</p>
                    <p className="text-sm text-muted-foreground">
                      Pay with M-Pesa mobile money
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-foreground" />
                </div>

                {/* M-Pesa Phone Number */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    M-Pesa Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      value={mpesaNumber}
                      onChange={(e) => setMpesaNumber(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full h-12 pl-11 pr-4 bg-secondary rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    You will receive an STK push to confirm payment
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-secondary/50 rounded-xl">
                <div className="flex gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-sm text-muted-foreground">
                      Your payment is processed securely through Safaricom
                      M-Pesa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step: Confirm */}
          {step === "confirm" && (
            <div className="space-y-4">
              {/* Order Summary Card */}
              <div className="p-4 bg-secondary/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Order type</span>
                  <span className="font-medium capitalize">{orderMode}</span>
                </div>
                {orderMode === "delivery" && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deliver to</span>
                    <span className="font-medium text-right max-w-[60%] truncate">
                      {deliveryAddress}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium">
                    M-Pesa ({mpesaNumber || "Not set"})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">
                    {items.reduce((sum, i) => sum + i.quantity, 0)} items
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="p-4 border border-[#00A651] bg-[#00A651]/5 rounded-xl">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#00A651] rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <div>
                    <p className="font-medium">M-Pesa Payment</p>
                    <p className="text-sm text-muted-foreground">
                      After clicking "Place Order", you will receive an M-Pesa
                      prompt on {mpesaNumber || "your phone"}. Enter your PIN to
                      complete payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step: Success */}
          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-[#00A651] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your order has been placed successfully. You will receive a
                confirmation shortly.
              </p>

              <div className="p-4 bg-secondary/50 rounded-xl text-left space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Number</span>
                  <span className="font-medium">
                    #UE{Math.random().toString().slice(2, 8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="font-medium">
                    {orderMode === "delivery" ? "25-35 min" : "15-20 min"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium text-[#00A651]">
                    M-Pesa Confirmed
                  </span>
                </div>
              </div>

              <Button
                onClick={handleClose}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      {step !== "success" && (
        <div className="p-4 border-t border-border shrink-0 bg-background">
          <Button
            onClick={handleNext}
            disabled={isProcessing || (step === "payment" && !mpesaNumber)}
            className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing payment...
              </span>
            ) : step === "confirm" ? (
              `Place order • $${finalTotal.toFixed(2)}`
            ) : (
              <span className="flex items-center gap-1">
                Continue
                <ChevronRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );

  // Desktop: Dialog
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-[500px] p-0 gap-0 overflow-hidden rounded-2xl">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile: Drawer
  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[95vh]">{content}</DrawerContent>
    </Drawer>
  );
}
