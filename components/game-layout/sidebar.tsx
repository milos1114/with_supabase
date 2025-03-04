"use client";

import { useBetStore } from "@/providers/bet-store-provider";
import SwitchSvg from "../icon/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AutoTab from "./tab-sidebar/auto-tab";
import IconTab from "./tab-sidebar/icon-tab";
import ManualTab from "./tab-sidebar/manual-tab";
import { getMultiplier, getResultBet, getWinChance, playAudio } from "@/utils/utils";
import { IBet } from "@/type/bet";
import { BET_STATUS } from "@/const";
import { useEffect } from "react";

interface SideBarProps {
  handleBet: (bet: IBet) => void;
}

export default function Sidebar({ handleBet }: SideBarProps) {
  const { isRunning, setWallet, wallet, rollType, markPoint } = useBetStore((state) => state);

  const handleClickBet = (bet: IBet) => {
    playAudio("./rolling.mp3");
    handleBet(bet);

    const betResult = getResultBet(bet);

    // Update wallet
    const multiply = getMultiplier(getWinChance(rollType, markPoint));
    const profit = Number(bet.amount) * multiply - Number(bet.amount);
    setWallet(wallet + (betResult === BET_STATUS.WIN ? profit : -bet.amount));

    playAudio(betResult === BET_STATUS.WIN ? "./win.mp3" : "./lose.mp3");
  };

  return (
    <div className="flex flex-col md:w-[300px] md:min-w-[300px] w-full h-full p-3 rounded-tl-lg">
      <Tabs
        defaultValue="manual"
        className="w-full flex flex-col-reverse md:block"
      >
        <TabsList className="mt-4 md:mt-0">
          <TabsTrigger value="manual" className="flex-1" disabled={isRunning}>
            Manual
          </TabsTrigger>
          <TabsTrigger value="auto" className="flex-1" disabled={isRunning}>
            Auto
          </TabsTrigger>
          {/* <TabsTrigger value="icon" disabled={isRunning}>
            <SwitchSvg />
          </TabsTrigger> */}
        </TabsList>
        <TabsContent
          value="manual"
          className="flex flex-col-reverse md:flex-col gap-2"
        >
          <ManualTab handleClickBet={handleClickBet} />
        </TabsContent>
        <TabsContent
          value="auto"
          className="flex flex-col-reverse md:flex-col gap-2"
        >
          <AutoTab handleClickBet={handleClickBet} />
        </TabsContent>
        {/* <TabsContent
          value="icon"
          className="flex flex-col-reverse md:flex-col gap-2"
        >
          <IconTab handleClickBet={handleClickBet} />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
