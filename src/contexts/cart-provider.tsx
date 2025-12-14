"use client";

import { compareChoices } from "@/helpers/menu";
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
  updateCartItem: (cartItem: CartItem) => void;
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
      console.log(prevCartItems);
      const existingItem = prevCartItems.find(
        (prevCartItem) =>
          prevCartItem.id === cartItem.id &&
          prevCartItem.specialInstructions === cartItem.specialInstructions &&
          compareChoices(prevCartItem.choices ?? {}, cartItem.choices ?? {})
      );

      console.log("existingItem ---->", existingItem);
      console.log("cartItem ---->", cartItem);
      //Adding the totalPrice
      if (existingItem) {
        return prevCartItems.map((i) =>
          i.id === cartItem.id
            ? { ...i, quantity: i.quantity + cartItem.quantity }
            : i
        );
      } else {
        return [...prevCartItems, cartItem];
      }
    });
    setTotal((prevTotal) => prevTotal + cartItem.price);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateCartItem = (cartItem: CartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((prevCartItem) =>
        prevCartItem.cartItemId === cartItem.cartItemId
          ? cartItem
          : prevCartItem
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
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
