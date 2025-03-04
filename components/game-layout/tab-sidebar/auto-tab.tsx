"use client";

import { ElementLabel } from "@/components/element-label";
import BitCoinSvg from "@/components/icon/bitcoin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import InputBet from "./input-bet";
import InfinitySvg from "@/components/icon/infinity";
import PercentSvg from "@/components/icon/percent";
import { cn } from "@/lib/utils";
import DiceSvg from "@/components/icon/dice";
import { useBetStore } from "@/providers/bet-store-provider";
import { createBet, getResultBet } from "@/utils/utils";
import { BET_STATUS } from "@/const";
import { IBet } from "@/type/bet";

let intervalFunc: string | number | NodeJS.Timeout | undefined;

interface SideBarProps {
  handleClickBet: (bet: IBet) => void;
}

export default function AutoTab({ handleClickBet }: SideBarProps) {
  const {
    isRunning,
    setIsRunning,
    amount,
    setAmount,
    setIncrementAmount,
    markPoint,
    rollType,
    wallet,
  } = useBetStore((state) => state);

  const [numberOfBets, setNumberOfBets] = useState<number | "">(0);
  const [numberOfBetsHidden, setNumberOfBetsHidden] = useState<number>(0);
  const [isResetOnWin, setIsResetOnWin] = useState<boolean>(true);
  const [isResetOnLoss, setIsResetOnLoss] = useState<boolean>(true);
  const [isInfinity, setIsInfinity] = useState(false);

  const [originAmount, setOriginAmount] = useState<number>(0);
  const [originWallet, setOriginWallet] = useState<number>(0);

  const incrementOnWinRef = useRef<HTMLInputElement>(null);
  const incrementOnLossRef = useRef<HTMLInputElement>(null);

  const stopOnProfitRef = useRef<HTMLInputElement>(null);
  const stopOnLossRef = useRef<HTMLInputElement>(null);

  const _handleClickBet = (amount: number) => {
    const bet = createBet(Number(amount), markPoint, rollType);
    handleClickBet(bet);

    // Update amount
    const betResult = getResultBet(bet);
    if (betResult === BET_STATUS.WIN) {
      if (isResetOnWin === false && incrementOnWinRef.current) {
        setIncrementAmount(
          Number(amount) * (Number(incrementOnWinRef.current.value) / 100)
        );
      } else {
        setAmount(originAmount);
      }
    } else {
      if (isResetOnLoss === false && incrementOnLossRef.current) {
        setIncrementAmount(
          Number(amount) * (Number(incrementOnLossRef.current.value) / 100)
        );
      } else {
        setAmount(originAmount);
      }
    }
  };

  // Handle Auto Bet
  useEffect(() => {
    if (!isRunning) {
      intervalFunc && clearInterval(intervalFunc);
      return;
    }

    if (wallet === 0) {
      setIsRunning(false);
      return;
    }

    // Stop when Stop loss or Take profit
    const isOverSL =
      stopOnLossRef.current &&
      stopOnLossRef.current.value !== "" &&
      originWallet - wallet >= Number(stopOnLossRef.current.value);
    const isOverTP =
      stopOnProfitRef.current &&
      stopOnProfitRef.current.value !== "" &&
      wallet - originWallet >= Number(stopOnProfitRef.current.value);
    if (isInfinity && (isOverSL || isOverTP)) {
      setIsRunning(false);
      return;
    }
    if (Number(wallet) >= Number(amount) && Number(numberOfBetsHidden) > 0) {
      _handleClickBet(Number(amount));
      !isInfinity && setNumberOfBets(numberOfBetsHidden - 1);

      const timeoutFunc = setTimeout(() => {
        setNumberOfBetsHidden((prev) => {
          const newNumberOfBet = (prev as number) - 1;
          if (isInfinity && newNumberOfBet === 0) {
            return Number.MAX_SAFE_INTEGER; // Continue update value
          }
          return newNumberOfBet;
        });
      }, 1000);
      return () => clearTimeout(timeoutFunc);
    } else {
      setIsRunning(false);
    }
  }, [numberOfBetsHidden, isRunning, isInfinity]);

  const handleBet = () => {
    setOriginAmount(Number(amount));
    setOriginWallet(wallet);
    setIsRunning(!isRunning);
    setIsInfinity(numberOfBets === 0);
    if (numberOfBets === 0) {
      setNumberOfBetsHidden(Number.MAX_SAFE_INTEGER);
    } else {
      setNumberOfBetsHidden(Number(numberOfBets));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <InputBet />
        <ElementLabel labelText="Number of Bets">
          <Input
            type="number"
            className="text-white font-semibold"
            value={numberOfBets}
            onChange={(e) => {
              if (e.target.value === "") {
                setNumberOfBets("");
                return;
              }
              setNumberOfBets(Number(e.target.value));
            }}
            Icon={
              numberOfBets === 0 || numberOfBets === "" ? <InfinitySvg /> : ""
            }
            disabled={isRunning}
          />
        </ElementLabel>
        <ElementLabel labelText="On Win">
          <div
            className={cn(
              "flex flex-row shadow-sm bg-grey-400 items-center rounded-sm",
              isRunning && "opacity-50 cursor-not-allowed"
            )}
          >
            <Button
              className={cn(
                "h-[34px] text-white bg-grey-400 hover:bg-grey-300 text-[12px] font-semibold ml-[1px] rounded-sm",
                isResetOnWin && "bg-grey-700 hover:bg-grey-700 text-grey-200"
              )}
              size="sm"
              onClick={() => {
                setIsResetOnWin(true);
                incrementOnWinRef.current &&
                  (incrementOnWinRef.current.value = "");
              }}
              disabled={isRunning}
            >
              Reset
            </Button>
            <Button
              className={cn(
                "h-[34px] text-white bg-grey-400 hover:bg-grey-300 text-[12px] font-semibold rounded-sm",
                !isResetOnWin && "bg-grey-700 hover:bg-grey-700 text-grey-200"
              )}
              size="sm"
              onClick={() => setIsResetOnWin(false)}
              disabled={isRunning}
            >
              Increment by:
            </Button>
            <Input
              className="text-white rounded-r-none shadow-none read-only:bg-grey-500"
              type="number"
              Icon={<PercentSvg />}
              readOnly={isResetOnWin}
              disabled={isRunning}
              ref={incrementOnWinRef}
            />
          </div>
        </ElementLabel>
        <ElementLabel labelText="On Loss">
          <div
            className={cn(
              "flex flex-row shadow-sm bg-grey-400 items-center rounded-sm",
              isRunning && "opacity-50 cursor-not-allowed"
            )}
          >
            <Button
              className={cn(
                "h-[34px] text-white bg-grey-400 hover:bg-grey-300 text-[12px] font-semibold ml-[1px] rounded-sm",
                isResetOnLoss && "bg-grey-700 hover:bg-grey-700 text-grey-200"
              )}
              size="sm"
              onClick={() => {
                setIsResetOnLoss(true);
                incrementOnLossRef.current &&
                  (incrementOnLossRef.current.value = "");
              }}
              disabled={isRunning}
            >
              Reset
            </Button>
            <Button
              className={cn(
                "h-[34px] text-white bg-grey-400 hover:bg-grey-300 text-[12px] font-semibold rounded-sm",
                !isResetOnLoss && "bg-grey-700 hover:bg-grey-700 text-grey-200"
              )}
              size="sm"
              onClick={() => setIsResetOnLoss(false)}
              disabled={isRunning}
            >
              Increment by:
            </Button>
            <Input
              className="text-white rounded-r-none shadow-none read-only:bg-grey-500"
              type="number"
              Icon={<PercentSvg />}
              readOnly={isResetOnLoss}
              disabled={isRunning}
              ref={incrementOnLossRef}
            />
          </div>
        </ElementLabel>
        <ElementLabel labelText="Stop on Profit">
          <Input
            type="number"
            className="text-white font-semibold"
            Icon={<BitCoinSvg />}
            disabled={isRunning}
            ref={stopOnProfitRef}
          />
        </ElementLabel>
        <ElementLabel labelText="Stop on Loss">
          <Input
            type="number"
            className="text-white font-semibold"
            Icon={<BitCoinSvg />}
            disabled={isRunning}
            ref={stopOnLossRef}
          />
        </ElementLabel>
      </div>
      <Button
        className="w-full bg-green-500 hover:bg-green-400 py-[1.125rem] px-[1.75rem] h-auto text-md font-semibold leading-4"
        onClick={handleBet}
        disabled={Number(amount) <= 0}
      >
        {isRunning ? "Stop Autobet" : "Start Autobet"}
        {isRunning && (
          <div className="ml-2 roll">
            <DiceSvg />
          </div>
        )}
      </Button>
    </>
  );
}
