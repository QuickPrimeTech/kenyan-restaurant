"use client";

import { CartItem, CartState } from "@/types/cart";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  addToCart: (cartItem: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<(CartState & CartContextType) | undefined>(
  undefined
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside the CartProvider");
  }
  return context;
};

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  /*-----------------CART STATES--------------------*/

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  /*-----------------CART FUNCTIONS--------------------*/

  const addToCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (prevCartItem) => prevCartItem === cartItem
      );
      //Adding the totalPrice
      setTotal((prevTotal) => prevTotal + cartItem.price);
      if (existingItem) {
        return prevCartItems.map((i) =>
          i.id === cartItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCartItems, { ...cartItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  /*-----------------Side Effects-------------------*/

  useEffect(() => {
    setCartItemsCount(cartItems.length);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        cartItemsCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
