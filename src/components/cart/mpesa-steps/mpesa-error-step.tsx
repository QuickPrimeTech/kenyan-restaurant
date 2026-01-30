// @/components/cart/mpesa-steps/mpesa-error-step.tsx
import { useCart } from "@/contexts/cart-provider";
import { Smartphone, XCircle } from "lucide-react";
import { useOrder } from "@/contexts/order-context";
import { MpesaStep } from "../mpesa-payment-step";
import { Button } from "@/components/ui/button";

type MpesaErrorStepProps = {
  onRetry: () => void;
  setStep: (step: MpesaStep) => void; // <-- new prop
};

export function MpesaErrorStep({ onRetry, setStep }: MpesaErrorStepProps) {
  const { grandTotal } = useCart();
  const { pickupInfo } = useOrder();

  return (
    <div className="text-center space-y-4 p-4 text-sm">
      {/* Icon */}
      <div className="size-18 mx-auto rounded-full flex items-center justify-center bg-red-200 dark:bg-red-950">
        <div className="relative">
          <Smartphone
            className="size-8 text-red-600 dark:text-red-200 animate-pulse"
            strokeWidth={1.5}
          />
        </div>
      </div>
      {/* Heading */}
      <div>
        <h3 className="font-bold mb-1.5">Payment Failed</h3>
        <p className="text-muted-foreground max-w-sm mx-auto text-xs">
          Please make sure you've entered the correct PIN on your M-Pesa and try
          again
        </p>
      </div>

      {/* Payment Info Card */}
      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-700 rounded-lg p-4 text-left space-y-4">
        <div className="flex items-center gap-2 text-red-900 dark:text-red-50">
          <XCircle className="size-4" />
          <span className="font-medium">Payment Failed</span>
        </div>

        {/* Phone Row */}
        <div>
          <p className="text-xs text-muted-foreground">Phone Number</p>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {pickupInfo.phone}
          </p>
        </div>

        {/* Amount Row */}
        <div>
          <p className="text-xs text-muted-foreground">Amount</p>
          <p className=" font-bold text-red-700 dark:text-green-200">
            Ksh {Math.ceil(grandTotal).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => setStep("phone")}
          variant={"outline"}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button onClick={onRetry} className="flex-1">
          Retry Payment
        </Button>
      </div>
    </div>
  );
}
