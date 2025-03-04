import { ROLE_TYPE } from "@/const";
import { IRollType } from "@/type/roll";
import { createStore } from "zustand";

export type BetState = {
  isRunning: boolean;
  amount: number | string;
  markPoint: number;
  rollType: IRollType;
  wallet: number;
};

export type BetActions = {
  setIsRunning: (isRunning: boolean) => void;
  setAmount: (amount: number | string) => void;
  setIncrementAmount: (amount: number | string) => void;
  setMarkPoint: (markPoint: number) => void;
  setRoleType: (rollType: IRollType) => void;
  setWallet: (value: number) => void;
};

export type BetStore = BetState & BetActions;

export const defaultInitState: BetState = {
  isRunning: false,
  amount: 0,
  markPoint: 50,
  rollType: ROLE_TYPE.OVER,

  wallet: 100,
};

export const createBetStore = (initState: BetState = defaultInitState) => {
  return createStore<BetStore>((set) => ({
    ...initState,
    setIsRunning: (isRunning: boolean) => set({ isRunning }),
    setAmount: (amount: number | string) => set({ amount }),
    setIncrementAmount: (amountNew: number | string) =>
      set((state) => ({
        amount: Number(amountNew) + Number(state.amount),
      })),
    setMarkPoint: (markPoint: number) => set({ markPoint }),
    setRoleType: (rollType: IRollType) => set({ rollType }),
    setWallet: (wallet: number) => set({ wallet }),
  }));
};
