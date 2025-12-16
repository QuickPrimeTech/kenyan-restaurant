"use client";
// contexts/cart-ui-context.tsx

import { createContext, useContext, useState, ReactNode } from "react";

type CartUIContextType = {
  isCartPopoverOpen: boolean;
  openCartPopover: (open: boolean) => void;
  isCartCheckoutOpen: boolean;
  openCartCheckout: (open: boolean) => void;
  currentCheckoutStep: number;
  setCurrentCheckoutStep: (step: number) => void;
};

const CartUIContext = createContext<CartUIContextType | undefined>(undefined);

export function CartUIProvider({ children }: { children: ReactNode }) {
  /*-------------Cart UI States ------------- */
  const [isCartPopoverOpen, openCartPopover] =
    useState<CartUIContextType["isCartPopoverOpen"]>(false);
  const [isCartCheckoutOpen, openCartCheckout] =
    useState<CartUIContextType["isCartCheckoutOpen"]>(false);
  const [currentCheckoutStep, setCurrentCheckoutStep] =
    useState<CartUIContextType["currentCheckoutStep"]>(1);

  return (
    <CartUIContext.Provider
      value={{
        isCartPopoverOpen,
        openCartPopover,
        isCartCheckoutOpen,
        openCartCheckout,
        currentCheckoutStep,
        setCurrentCheckoutStep,
      }}
    >
      {children}
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const context = useContext(CartUIContext);
  if (context === undefined) {
    throw new Error("useCartUI must be used within a CartUIProvider");
  }
  return context;
}
