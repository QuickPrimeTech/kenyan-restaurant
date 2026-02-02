import { create } from "zustand";
import { PickupInfo } from "@/contexts/order-context";

type OrderStore = {
  pickupInfo: PickupInfo;
  setPickupInfo: (pickupInfo: PickupInfo | ((prev: PickupInfo) => PickupInfo)) => void;
  phoneNumber: string | null;
  setPhoneNumber: (phone: string | null | ((prev: string | null) => string | null)) => void;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  reset: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  pickupInfo: {},
  setPickupInfo: (info) =>
    set((state) => ({
      pickupInfo: typeof info === "function" ? info(state.pickupInfo) : info,
    })),
  phoneNumber: null,
  setPhoneNumber: (phone) =>
    set((state) => ({
      phoneNumber: typeof phone === "function" ? phone(state.phoneNumber) : phone,
    })),
  openDialog: false,
  setOpenDialog: (open) => set({ openDialog: open }),
  reset: () => set({ pickupInfo: {}, phoneNumber: null, openDialog: false }),
}));
