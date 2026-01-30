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
  grandTotal: number;
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

export type CartSnapshot = {
  items: CartItem[];
  total: number;
};

export type OrderPayload = {
  items: CartItem[];
  phone: string;
  pickupInfo: {
    fullName: string;
    email: string;
    phone: string;
    pickupDate: string;
    pickupTime: string;
    specialInstructions?: string;
  };
  orderId?: string;
  total: number;
  paymentMethod: string;
};
