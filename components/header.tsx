"use client";

import { useBetStore } from "@/providers/bet-store-provider";
import BitCoinSvg from "./icon/bitcoin";
import { Button } from "./ui/button";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export interface HeaderCustomProps {
}

export function HeaderCustom({ }: HeaderCustomProps) {
  const { wallet } = useBetStore((state) => state);

  return (
    <div className="w-full max-w-5xl flex justify-around items-center p-3 px-5 text-sm">
      <div className="text-md text-white font-semibold shadow-md bg-grey-700 h-[47px] flex items-center rounded-sm">
        <Select value="btc">
          <SelectTrigger className="w-full py-[13px] pl-4 rounded-l-sm border-none">
            <SelectValue placeholder="Select wallet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="btc">{wallet.toFixed(6)} <BitCoinSvg /></SelectItem>
          </SelectContent>
        </Select>
        <Button
          size="sm"
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-500 h-full py-[13px] px-4 font-semibold rounded-l-none"
        >
          <Link href="/sign-up">Wallet</Link>
        </Button>
      </div>
    </div>
  );
}
