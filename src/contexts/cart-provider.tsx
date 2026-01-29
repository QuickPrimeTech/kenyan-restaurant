"use client";

import { CATERING_LEVY_RATE, TAX_RATE } from "@/constants/taxes";
import { compareChoices } from "@/helpers/menu";
import { CartItem, CartSnapshot, CartState } from "@/types/cart";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  addToCart: (cartItem: CartItem) => void;
  updateCartItem: (cartItem: CartItem) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSnapshot: CartSnapshot | null;
  setCartSnapshot: React.Dispatch<React.SetStateAction<CartSnapshot | null>>;
};

const CartContext = createContext<(CartState & CartContextType) | undefined>(
  undefined,
);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  /*-----------------CART STATES--------------------*/

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSnapshot, setCartSnapshot] = useState<CartSnapshot | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  /*-----------------CART FUNCTIONS--------------------*/

  const addToCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (prevCartItem) =>
          prevCartItem.id === cartItem.id &&
          prevCartItem.specialInstructions === cartItem.specialInstructions &&
          compareChoices(prevCartItem.choices ?? {}, cartItem.choices ?? {}),
      );

      //Adding the totalPrice
      if (existingItem) {
        return prevCartItems.map((prevCartItem) =>
          prevCartItem.id === cartItem.id
            ? {
                ...prevCartItem,
                quantity: prevCartItem.quantity + cartItem.quantity,
                price: prevCartItem.price + cartItem.price,
              }
            : prevCartItem,
        );
      } else {
        return [...prevCartItems, cartItem];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  const updateCartItem = (cartItem: CartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((prevCartItem) =>
        prevCartItem.cartItemId === cartItem.cartItemId
          ? cartItem
          : prevCartItem,
      ),
    );
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((prevCartItem) =>
        prevCartItem.cartItemId === cartItemId
          ? {
              ...prevCartItem,
              quantity,
              price: (prevCartItem.price / prevCartItem.quantity) * quantity,
            }
          : prevCartItem,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  /*-----------------Side Effects-------------------*/

  useEffect(() => {
    setCartItemsCount(
      cartItems.reduce(
        (totalItems, cartItem) => totalItems + cartItem.quantity,
        0,
      ),
    );
    setTotal(() =>
      cartItems.reduce(
        (totalPrice, cartItem) => totalPrice + cartItem.price,
        0,
      ),
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartSnapshot,
        setCartSnapshot,
        grandTotal: total + total * TAX_RATE + total * CATERING_LEVY_RATE,
        total,
        cartItemsCount,
        addToCart,
        updateCartItem,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside the CartProvider");
  }
  return context;
};
