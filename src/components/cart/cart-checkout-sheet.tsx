"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  ArrowLeft,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import { CartItem } from "./cart-item";
import { PickupForm } from "./pickup-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartSuccess } from "./cart-success";
import { OrderSummary } from "./order-summary";
import { PriceBreakdown } from "./price-breakdown";
import { MpesaPaymentStep } from "./mpesa-payment-step";
import { toast } from "sonner";
import { CartItem as CartItemType } from "@/types/cart";
import { useCartUI } from "@/contexts/cart-ui-provider";
import Link from "next/link";

type LastOrder = {
  items: CartItemType[];
  total: number;
};


export function CartCheckoutSheet() {
  const { cartItems, total, cartItemsCount, clearCart } = useCart();
  const { isCartCheckoutOpen, openCartCheckout, currentCheckoutStep,setCurrentCheckoutStep } = useCartUI();

  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isMpesaProcessing, setIsMpesaProcessing] = useState(false);


  const handlePaymentSuccess = () => {
    const snapshot: LastOrder = {
      items: cartItems.map((i) => ({ ...i })),
      total,
    };

    setCurrentCheckoutStep("success");
    setLastOrder(snapshot);

    toast.success("You will receive an email shortly with your order details");
    clearCart();
  };

  const handleExitSuccess = () => {
    openCartCheckout(false);
    setCurrentCheckoutStep("cart");
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  if (currentCheckoutStep === "success" && !isCartCheckoutOpen) setCurrentCheckoutStep("cart");

  const getStepTitle = () => {
    switch (currentCheckoutStep) {
      case "cart":
        return `Your Cart (${cartItemsCount} items)`;
      case "details":
        return "Pickup Details";
      case "payment":
        return "Payment";
      case "success":
        return "Order Confirmed";
      default:
        return "Checkout";
    }
  };

  return (
    <>
      <Sheet open={isCartCheckoutOpen} onOpenChange={openCartCheckout}>
        <SheetContent className="w-full sm:max-w-lg p-0 gap-0 flex flex-col h-screen max-h-screen bg-muted text-foreground">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 p-6 border-b border-border bg-card shadow-luxury">
            <SheetTitle className="flex items-center gap-2">
              {(currentCheckoutStep === "details" || currentCheckoutStep === "payment") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    currentCheckoutStep === "details"
                      ? setCurrentCheckoutStep("cart")
                      : setCurrentCheckoutStep("details")
                  }}
                  className="p-0 h-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              {currentCheckoutStep === "cart" && <ShoppingCart className="h-5 w-5" />}
              {currentCheckoutStep === "details" && <MapPin className="h-5 w-5" />}
              {currentCheckoutStep === "payment" && <CreditCard className="h-5 w-5" />}
              {currentCheckoutStep === "success" && (
                <CheckCircle2 className="h-5 w-5" />
              )}
              {getStepTitle()}
            </SheetTitle>
          </SheetHeader>

          {/* Body */}
          <div className="flex flex-col flex-1 min-h-0">
            {cartItems.length === 0 && currentCheckoutStep !== "success" ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add some delicious items to get started!
                </p>
                <Button
                asChild
                size={"xl"}
                >
                  <Link href="/menu">
                  <ShoppingBag />
                 Start Shopping
                 </Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Step */}
                {currentCheckoutStep === "cart" && (
                  <>
                    <ScrollArea className="h-0 flex-1 px-4">
                      <div className="space-y-4 py-4">
                        {cartItems.map((item) => (
                          <CartItem key={item.cartItemId} cartItem={item} />
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="sticky bottom-0 border-t p-6 bg-card">
                      <div className="flex items-center justify-between mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowClearConfirm(true)}
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20 border-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Clear All
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {cartItemsCount} items
                        </span>
                      </div>

                      <PriceBreakdown className="text-lg" />

                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => openCartCheckout(false)}
                        >
                          <ShoppingBag />
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
                  </>
                )}

                {/* Details Step */}
                {currentCheckoutStep === "details" && (
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scroll p-6 space-y-6">
                    <OrderSummary />
                    <PickupForm  />
                  </div>
                )}

                {/* Payment Step */}
                {currentCheckoutStep === "payment" && (
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scroll p-6 space-y-6">
                    <OrderSummary />
                    <div className="bg-background p-5 rounded-2xl">
                      <h4 className="font-semibold mb-4">
                        Pay with Mpesa
                      </h4>
                      <div className="mt-4">
                          <MpesaPaymentStep
                          />
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Step */}
                {currentCheckoutStep === "success" && lastOrder && (
                  <CartSuccess
                    items={lastOrder.items}
                    total={lastOrder.total}
                    onClose={handleExitSuccess}
                  />
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Clear Cart Confirm */}
      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent className="bg-card text-foreground border border-border shadow-luxury">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Clear Cart?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove all items from your cart? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearCart}
              className="bg-destructive hover:bg-destructive/90"
            >
              Clear All Items
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
