import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useChoicesForm } from "@/contexts/choices-form-context";
import React from "react";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  size,
  type,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { totalPrice } = useChoicesForm();

  return (
    <Button
      type={type || "submit"}
      size={size || "lg"}
      className={cn("flex-1 lg:h-12 lg:text-base lg:font-semibold", className)}
      {...props}
    >
      <Plus />
      Add to order • Ksh {totalPrice.toFixed(2)}
    </Button>
  );
}
