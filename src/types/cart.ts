import { MenuItem } from "./menu";

export type CartItem = {
  cartItemId: string;
  id: number;
  name: string;
  image_url: string | null;
  price: number;
  menuItem: MenuItem;
} & CartOptions;

export type CartState = {
  cartItems: CartItem[];
  total: number;
  cartItemsCount: number;
};

export type CartOptions = {
  quantity: number;
  specialInstructions: string;
  choices?: CartItemChoices;
};

export type CartItemChoices = Record<string, string | string[]>;

export type RawCartOptions = {
  [optionId: string]: string | string[];
} & Omit<CartOptions, "choices">;


export type CheckoutStep = "cart" | "details" | "payment" | "success";