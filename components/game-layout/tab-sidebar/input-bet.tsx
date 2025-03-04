"use client";

import { ElementLabel } from "@/components/element-label";
import BitCoinSvg from "@/components/icon/bitcoin";
import { MaskInputNumber } from "@/components/mask-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBetStore } from "@/providers/bet-store-provider";
import { Separator } from "@radix-ui/react-separator";

interface InputBetProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputBet(props: InputBetProps) {
  const { amount, setAmount, isRunning } = useBetStore((state) => state);

  return (
    <ElementLabel labelText="Bet Amount">
      <div className="flex flex-row shadow-sm bg-grey-400 items-center rounded-sm">
        <MaskInputNumber
          valueInput={amount}
          onChange={(e) => {
            if (e.target.value === "") {
              setAmount("");
              return;
            }
            setAmount(Number(e.target.value));
          }}
          type="number"
          className="text-white rounded-r-none shadow-none"
          Icon={<BitCoinSvg />}
          disabled={isRunning}
          length={8}
          {...props}
        />
        <Button
          className="h-[38px] text-white bg-grey-400 hover:bg-grey-300 rounded-none"
          onClick={() => {
            if (amount === "") return;
            setAmount(Number(amount) / 2);
          }}
          disabled={isRunning}
        >
          ½
        </Button>
        <Separator
          orientation="horizontal"
          className="w-[3px] h-[20px] bg-grey-600"
        />
        <Button
          className="h-[38px] text-white bg-grey-400 hover:bg-grey-300 rounded-none rounded-r-sm"
          onClick={() => {
            if (amount === "") return;
            setAmount(Number(amount) * 2);
          }}
          disabled={isRunning}
        >
          2×
        </Button>
      </div>
    </ElementLabel>
  );
}
