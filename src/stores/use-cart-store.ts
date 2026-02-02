import { create } from "zustand";
import { CartItem, CartSnapshot } from "@/types/cart";
import { compareChoices } from "@/helpers/menu";
import { CATERING_LEVY_RATE, TAX_RATE } from "@/constants/taxes";

type CartStore = {
    cartItems: CartItem[];
    cartSnapshot: CartSnapshot | null;
    setCartSnapshot: (snapshot: CartSnapshot | null) => void;

    // Computed values
    total: number;
    cartItemsCount: number;
    grandTotal: number;

    addToCart: (cartItem: CartItem) => void;
    updateCartItem: (cartItem: CartItem) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    removeFromCart: (cartItemId: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
    cartItems: [],
    cartSnapshot: null,
    setCartSnapshot: (snapshot) => set({ cartSnapshot: snapshot }),

    total: 0,
    cartItemsCount: 0,
    grandTotal: 0,

    addToCart: (cartItem: CartItem) => {
        set((state: CartStore) => {
            const prevCartItems = state.cartItems;
            const existingItem = prevCartItems.find(
                (prevCartItem: CartItem) =>
                    prevCartItem.id === cartItem.id &&
                    prevCartItem.specialInstructions === cartItem.specialInstructions &&
                    compareChoices(prevCartItem.choices ?? {}, cartItem.choices ?? {}),
            );

            let newCartItems: CartItem[];
            if (existingItem) {
                newCartItems = prevCartItems.map((prevCartItem: CartItem) =>
                    prevCartItem.id === cartItem.id &&
                        prevCartItem.specialInstructions === cartItem.specialInstructions &&
                        compareChoices(prevCartItem.choices ?? {}, cartItem.choices ?? {})
                        ? {
                            ...prevCartItem,
                            quantity: prevCartItem.quantity + cartItem.quantity,
                            price: prevCartItem.price + cartItem.price,
                        }
                        : prevCartItem,
                );
            } else {
                newCartItems = [...prevCartItems, cartItem];
            }

            const total = newCartItems.reduce((acc: number, item: CartItem) => acc + item.price, 0);
            const cartItemsCount = newCartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
            const grandTotal = total + total * TAX_RATE + total * CATERING_LEVY_RATE;

            return { cartItems: newCartItems, total, cartItemsCount, grandTotal };
        });
    },

    updateCartItem: (cartItem: CartItem) => {
        set((state: CartStore) => {
            const newCartItems = state.cartItems.map((prevCartItem: CartItem) =>
                prevCartItem.cartItemId === cartItem.cartItemId ? cartItem : prevCartItem
            );
            const total = newCartItems.reduce((acc: number, item: CartItem) => acc + item.price, 0);
            const cartItemsCount = newCartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
            const grandTotal = total + total * TAX_RATE + total * CATERING_LEVY_RATE;
            return { cartItems: newCartItems, total, cartItemsCount, grandTotal };
        });
    },

    updateQuantity: (cartItemId: string, quantity: number) => {
        set((state: CartStore) => {
            const newCartItems = state.cartItems.map((prevCartItem: CartItem) =>
                prevCartItem.cartItemId === cartItemId
                    ? {
                        ...prevCartItem,
                        quantity,
                        price: (prevCartItem.price / prevCartItem.quantity) * quantity,
                    }
                    : prevCartItem
            );
            const total = newCartItems.reduce((acc: number, item: CartItem) => acc + item.price, 0);
            const cartItemsCount = newCartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
            const grandTotal = total + total * TAX_RATE + total * CATERING_LEVY_RATE;
            return { cartItems: newCartItems, total, cartItemsCount, grandTotal };
        });
    },

    removeFromCart: (cartItemId: string) => {
        set((state: CartStore) => {
            const newCartItems = state.cartItems.filter((item: CartItem) => item.cartItemId !== cartItemId);
            const total = newCartItems.reduce((acc: number, item: CartItem) => acc + item.price, 0);
            const cartItemsCount = newCartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
            const grandTotal = total + total * TAX_RATE + total * CATERING_LEVY_RATE;
            return { cartItems: newCartItems, total, cartItemsCount, grandTotal };
        });
    },

    clearCart: () => {
        set({ cartItems: [], total: 0, cartItemsCount: 0, grandTotal: 0 });
    },
}));
