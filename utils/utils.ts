import { BET_STATUS, ROLE_TYPE } from "@/const";
import { IBet, IBetResult } from "@/type/bet";
import { IRollType } from "@/type/roll";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function getResultBet(bet: IBet | undefined): IBetResult {
  if (bet === undefined) {
    return BET_STATUS.LOSE;
  }

  if (bet.rollType === ROLE_TYPE.OVER) {
    return bet.resultPoint > bet.markPoint ? BET_STATUS.WIN : BET_STATUS.LOSE;
  } else {
    return bet.resultPoint < bet.markPoint ? BET_STATUS.WIN : BET_STATUS.LOSE;
  }
}

export function getMultiplier(winChance: number): number {
  return 99 / winChance;
}

export function reverseWinChance(multiplier: number): number {
  return 99 / multiplier;
}

export function getWinChance(rollType: IRollType, markPoint: number): number {
  return rollType === ROLE_TYPE.OVER ? 100 - markPoint : markPoint;
}

export function playAudio(link: string): void {
  const audio = new Audio(link);
  audio.play().catch((e) => console.log(e));
}

export function createBet(
  amount: number,
  markPoint: number,
  rollType: IRollType
): IBet {
  return {
    id: uuidv4(),
    resultPoint: Number((Math.random() * 100).toFixed(2)),
    amount,
    markPoint,
    rollType,
    time: Date.now(),
  };
}
