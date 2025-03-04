import { BET_STATUS } from "@/const";
import { IRollType } from "@/type/roll";

export type IBet = {
  id: string;
  amount: number;
  resultPoint: number;
  markPoint: number;
  rollType: IRollType;
  time: number;
};

export type IBetResult = (typeof BET_STATUS)[keyof typeof BET_STATUS];