"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export type PickupInfo = {
  fullName?: string;
  phone?: string;
  email?: string;
  instructions?: string;
  pickupDate?: string; // string value from AVAILABLE_DATES or MORE_DATES
  pickupTime?: string; // string value from TIME_SLOTS
};

type OrderContextType = {
  pickupInfo: PickupInfo;
  setPickupInfo: React.Dispatch<React.SetStateAction<PickupInfo>>;
  phoneNumber: string | null;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string | null>>;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [pickupInfo, setPickupInfo] = useState<PickupInfo>({});
  const [phoneNumber, setPhoneNumber] =
    useState<OrderContextType["phoneNumber"]>(null);
  const [openDialog, setOpenDialog] = useState(false);
  console.log(pickupInfo);
  return (
    <OrderContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        pickupInfo,
        setPickupInfo,
        openDialog,
        setOpenDialog,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
}
