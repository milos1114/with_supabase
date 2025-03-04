"use client";

import { ElementLabel } from "@/components/element-label";
import BitCoinSvg from "@/components/icon/bitcoin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputBet from "./input-bet";
import { createBet, getMultiplier, getWinChance } from "@/utils/utils";
import { useBetStore } from "@/providers/bet-store-provider";
import DiceSvg from "@/components/icon/dice";
import { IBet } from "@/type/bet";
import { useEffect } from "react";

interface SideBarProps {
  handleClickBet: (bet: IBet) => void;
}

export default function ManualTab({ handleClickBet }: SideBarProps) {
  const { amount, rollType, markPoint, isRunning, setIsRunning, wallet, setAmount } = useBetStore(
    (state) => state
  );

    useEffect(() => {
      if (Number(wallet) < Number(amount)) {
        setAmount(wallet);
      }
    }, [wallet, amount]);

  const multiply = getMultiplier(getWinChance(rollType, markPoint));

  const handleBet = () => {
    setIsRunning(true);
    handleClickBet(createBet(Number(amount), markPoint, rollType));
    setTimeout(() => setIsRunning(false), 1000);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <InputBet />
        <ElementLabel labelText="Profit on Win">
          <Input
            type="number"
            className="text-white font-semibold"
            Icon={<BitCoinSvg />}
            value={(Number(amount) * multiply - Number(amount)).toFixed(8)}
            readOnly
            disabled={isRunning}
          />
        </ElementLabel>
      </div>
      <Button
        className="w-full bg-green-500 hover:bg-green-400 py-[1.125rem] px-[1.75rem] h-auto text-md font-semibold leading-4"
        onClick={handleBet}
        disabled={Number(amount) <= 0 || isRunning}
      >
        {!isRunning && "Bet"}
        {isRunning && (
          <div className="ml-2 roll">
            <DiceSvg />
          </div>
        )}
      </Button>
    </>
  );
}
