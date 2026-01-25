// @/components/cart/mpesa-steps/mpesa-processing-step.tsx
import { useCart } from "@/contexts/cart-provider";
import { useOrder } from "@/contexts/order-context";
import { CheckCircle, Smartphone } from "lucide-react";


export function MpesaProcessingStep() {
  const { grandTotal } = useCart();
  const {pickupInfo} = useOrder();

  return (
    <div className="text-center space-y-4 p-4 text-sm">
      {/* Icon */}
     <div className="size-18 mx-auto rounded-full bg-card border flex items-center justify-center">
            <div className="relative">
              <Smartphone className="size-8 text-green-600 dark:text-green-400 animate-pulse" strokeWidth={1.5} />
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div 
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-600 dark:via-green-400 to-transparent animate-scan-line"
                  style={{ animationDuration: "2s" }}
                />
              </div>
            </div>
          </div>
      {/* Heading */}
      <div>
        <h3 className="font-bold mb-1.5">Processing Payment</h3>
        <p className="text-muted-foreground max-w-sm mx-auto text-xs">
          Please check your phone for the M-Pesa prompt and enter your PIN to
          complete the payment.
        </p>
      </div>

      {/* Payment Info Card */}
      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded-lg p-4 text-left space-y-4">
        <div className="flex items-center gap-2 text-green-900 dark:text-green-50">
          <CheckCircle className="size-4" />
          <span className="font-medium">Payment Details</span>
        </div>

        {/* Phone Row */}
        <div>
          <p className="text-xs text-muted-foreground">
            Phone Number
          </p>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {pickupInfo.phone}
          </p>
        </div>

        {/* Amount Row */}
        <div>
          <p className="text-xs text-muted-foreground">Amount</p>
          <p className=" font-bold text-green-700 dark:text-green-200">
            Ksh {Math.ceil(grandTotal).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
