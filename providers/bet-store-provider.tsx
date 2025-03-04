"use client";

import { type BetStore, createBetStore } from "@/stores/bet-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type BetStoreApi = ReturnType<typeof createBetStore>;
export const BetStoreContext = createContext<BetStoreApi | undefined>(
  undefined
);

export interface BetStoreProviderProps {
  children: React.ReactNode;
}

export const BetStoreProvider = ({ children }: BetStoreProviderProps) => {
  const storeRef = useRef<BetStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createBetStore();
  }

  return (
    <BetStoreContext.Provider value={storeRef.current}>
      {children}
    </BetStoreContext.Provider>
  );
};

export const useBetStore = <T,>(selector: (store: BetStore) => T): T => {
  const storeContext = useContext(BetStoreContext);
  if (!storeContext) {
    throw new Error("useBetStore must be used within a BetStoreProvider");
  }
  return useStore(storeContext, selector);
};
