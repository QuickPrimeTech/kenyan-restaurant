"use client"

import { Button } from "@/components/ui/button";
import { Edit2, Plus } from "lucide-react";
import { useChoicesForm } from "@/contexts/choices-form-context";
import React from "react";
import { cn } from "@/lib/utils";
import {MenuItem} from "@/types/menu";
import {useFindAvailability} from "@/utils/cart";


export function AddToCartButton({
  size,
    menuItem,
  type,
  className,
    children,
  ...props
}: React.ComponentProps<typeof Button>& {menuItem: MenuItem}) {
  const { totalPrice, defaultValues } = useChoicesForm();

const isAvailable = useFindAvailability(menuItem)
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
      (`${text} order • Ksh ${totalPrice.toFixed(2)}`)
      }
    </Button>
  );
}
