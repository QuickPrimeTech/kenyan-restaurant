"use client";

import { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { MenuChoice } from "@/types/menu";

type ChoicesFormContextValue = {
  form: UseFormReturn<any>;
  choices: MenuChoice[];
  basePrice: number;
  totalPrice: number;
};

const ChoicesFormContext = createContext<ChoicesFormContextValue | null>(null);

export function useChoicesForm() {
  const context = useContext(ChoicesFormContext);
  if (!context) {
    throw new Error("useChoicesForm must be used within ChoicesFormProvider");
  }
  return context;
}

export function ChoicesFormProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ChoicesFormContextValue;
}) {
  return (
    <ChoicesFormContext.Provider value={value}>
      {children}
    </ChoicesFormContext.Provider>
  );
}
