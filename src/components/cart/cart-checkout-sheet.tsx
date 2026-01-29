"use client";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  ArrowLeft,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-provider";
import { useCartUI } from "@/contexts/cart-ui-provider";
import { CartItem } from "./cart-item";
import { PickupForm } from "./pickup-form";
import { CartSuccess } from "./cart-success";
import { OrderSummary } from "./order-summary";
import { PriceBreakdown } from "./price-breakdown";
import { MpesaPaymentStep } from "./mpesa-payment-step";

const STEP_META = {
  cart: { title: (n: number) => `Your Cart (${n} items)`, icon: ShoppingCart },
  details: { title: "Pickup Details", icon: MapPin },
  payment: { title: "Payment", icon: CreditCard },
  success: { title: "Order Confirmed", icon: CheckCircle2 },
};

export function CartCheckoutSheet() {
  const { cartItems, cartSnapshot, cartItemsCount, clearCart } = useCart();
  const {
    isCartCheckoutOpen,
    openCartCheckout,
    currentCheckoutStep,
    setCurrentCheckoutStep,
  } = useCartUI();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const StepIcon = STEP_META[currentCheckoutStep]?.icon;

  const handleBack = () =>
    setCurrentCheckoutStep(
      currentCheckoutStep === "payment" ? "details" : "cart",
    );

  useEffect(() => {
    if (currentCheckoutStep === "success" && !isCartCheckoutOpen) {
      setCurrentCheckoutStep("cart");
    }
  }, [currentCheckoutStep, isCartCheckoutOpen]);

  const isDetailsStep = currentCheckoutStep === "details";
  const isPaymentStep = currentCheckoutStep === "payment";

  return (
    <>
      <Sheet open={isCartCheckoutOpen} onOpenChange={openCartCheckout}>
        <SheetContent className="sm:rounded-l-md overflow-hidden w-full sm:max-w-lg p-0 gap-0 flex flex-col h-screen bg-muted">
          {/* Header */}
          <SheetHeader className="py-4 px-4 border-b bg-card shadow-luxury">
            <SheetTitle className="flex items-center gap-2">
              {["details", "payment"].includes(currentCheckoutStep) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="p-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              {StepIcon && <StepIcon className="h-5 w-5" />}
              {typeof STEP_META[currentCheckoutStep]?.title === "function"
                ? STEP_META[currentCheckoutStep].title(cartItemsCount)
                : STEP_META[currentCheckoutStep]?.title}
            </SheetTitle>
          </SheetHeader>

          {/* Body */}
          <div className="flex flex-1 min-h-0 flex-col">
            {!cartItems.length && currentCheckoutStep !== "success" ? (
              <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add some delicious items to get started!
                </p>
                <Button asChild size="xl">
                  <Link href="/menu">
                    <ShoppingBag /> Start Shopping
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                {currentCheckoutStep === "cart" && (
                  <ScrollArea className="h-[calc(100vh-56px)]">
                    <ScrollArea className="h-[60vh] px-4">
                      <div className="space-y-4 py-4">
                        {cartItems.map((i) => (
                          <CartItem key={i.cartItemId} cartItem={i} />
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="border-t px-4 py-4 bg-card">
                      <div className="flex justify-between mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowClearConfirm(true)}
                          className="text-destructive border-destructive"
                        >
                          <Trash2 /> Clear All
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {cartItemsCount} items
                        </span>
                      </div>

                      <PriceBreakdown className="text-lg" />

                      <div className="flex gap-2 mt-2 max-sm:mb-12">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => openCartCheckout(false)}
                        >
                          Continue Shopping
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => setCurrentCheckoutStep("details")}
                        >
                          Continue to Pickup <ArrowRight />
                        </Button>
                      </div>
                    </div>
                    <ScrollBar />
                  </ScrollArea>
                )}

                {(isDetailsStep || isPaymentStep) && (
                  <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                    <OrderSummary />

                    {isDetailsStep && <PickupForm />}

                    {isPaymentStep && (
                      <div className="bg-background rounded-2xl">
                        <MpesaPaymentStep />
                      </div>
                    )}
                  </div>
                )}

                {currentCheckoutStep === "success" && <CartSuccess />}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Clear cart confirm */}
      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent className="bg-card border shadow-luxury">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Clear Cart?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearCart();
                setShowClearConfirm(false);
              }}
              className="bg-destructive"
            >
              Clear All Items
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
