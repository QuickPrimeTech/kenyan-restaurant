"use client"

import { Button } from "@/components/ui/button";
import { Edit2, Plus } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/types/menu";
import { useFindAvailability } from "@/utils/cart";
import { CartOptions } from "@/types/cart";
import { useFormContext } from "react-hook-form";
import { calculateTotalPrice } from "@/helpers/menu";

export function AddToCartButton({
  size,
  menuItem,
  type,
  className,
  children,
  totalPrice: propTotalPrice,
  defaultValues,
  ...props
}: React.ComponentProps<typeof Button> & {
  menuItem: MenuItem;
  totalPrice?: number;
  defaultValues?: Partial<CartOptions>;
}) {
  const isAvailable = useFindAvailability(menuItem)
  const form = useFormContext();

  // Calculate price from form state if available, otherwise use prop or base price
  let totalPrice = propTotalPrice;

  if (totalPrice === undefined && form) {
    const values = form.watch();
    totalPrice = calculateTotalPrice(values, menuItem.choices, menuItem.price);
  } else if (totalPrice === undefined) {
    totalPrice = menuItem.price;
  }

  const Icon = defaultValues ? Edit2 : Plus;
  const text = defaultValues ? "Edit" : "Add to";

  return (
    <Button
      type={type || "submit"}
      size={size || "lg"}
      disabled={!isAvailable}
      className={cn("flex-1 lg:h-12 lg:text-base lg:font-semibold", className)}
      {...props}
    >
      <Icon />
      {children ? children :
        (`${text} order ${isAvailable ? ` • Ksh ${totalPrice.toFixed(2)}` : "(Unavailable)"}`)}
    </Button>
  );
}
