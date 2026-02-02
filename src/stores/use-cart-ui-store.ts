import { create } from "zustand";
import { CheckoutStep } from "@/types/cart";

type CartUIStore = {
    isCartCheckoutOpen: boolean;
    openCartCheckout: (open: boolean) => void;
    currentCheckoutStep: CheckoutStep;
    setCurrentCheckoutStep: (step: CheckoutStep) => void;
};

export const useCartUIStore = create<CartUIStore>((set) => ({
    isCartCheckoutOpen: false,
    openCartCheckout: (open: boolean) => set({ isCartCheckoutOpen: open }),
    currentCheckoutStep: "cart",
    setCurrentCheckoutStep: (step: CheckoutStep) => set({ currentCheckoutStep: step }),
}));
