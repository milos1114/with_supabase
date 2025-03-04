"use client";

import { ElementLabel } from "@/components/element-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import InputBet from "./input-bet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfinitySvg from "@/components/icon/infinity";
import { useBetStore } from "@/providers/bet-store-provider";
import DiceSvg from "@/components/icon/dice";

interface SideBarProps {
  handleClickBet: (value: number) => void;
}

export default function IconTab({ handleClickBet }: SideBarProps) {
  const { isRunning, setIsRunning, amount } = useBetStore((state) => state);
  const [numberOfBets, setNumberOfBets] = useState<number | "">(0);

  // Handle Auto Bet
  useEffect(() => {
    if (isRunning) {
      if (Number(numberOfBets) > 0) {
        handleClickBet(Number(amount));
        setTimeout(() => setNumberOfBets(Number(numberOfBets) - 1), 1000);
      } else {
        setIsRunning(false);
      }
    }
  }, [numberOfBets, isRunning]);

  const handleBet = () => setIsRunning(!isRunning);

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
            Icon={<InfinitySvg />}
            disabled={isRunning}
          />
        </ElementLabel>
        <ElementLabel labelText="Select Strategy">
          <Select disabled={isRunning}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="martingale">Martingale</SelectItem>
              <SelectItem value="delayed">Delayed Martingale</SelectItem>
              <SelectItem value="paroli">Paroli</SelectItem>
              <SelectItem value="alembert">D 'Alembert</SelectItem>
            </SelectContent>
          </Select>
        </ElementLabel>
        <ElementLabel labelText="Conditions" classNameContainer="mb-2">
          <div className="flex flex-row gap-2">
            {[1, 2, 3, 4].map((item) => (
              <Button
                key={item}
                disabled={isRunning}
                className="bg-grey-400 hover:bg-grey-300 text-grey-100 font-semibold w-[50px] h-[46px]"
              >
                {item}
              </Button>
            ))}
          </div>
        </ElementLabel>
        <Button
          className="w-full bg-grey-400 hover:bg-grey-300 text-grey-100 font-semibold"
          disabled={isRunning}
        >
          Create Strategy
        </Button>
        <Button
          className="w-full bg-grey-400 hover:bg-grey-300 text-grey-100 font-semibold"
          disabled={isRunning}
        >
          Edit Strategy
        </Button>
        <Button
          className="w-full bg-grey-400 hover:bg-grey-300 text-grey-100 font-semibold"
          disabled={isRunning}
        >
          Delete Strategy
        </Button>
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
