"use client";

import React, { useState } from "react";

import { IBet } from "@/type/bet";
import { cn } from "@/lib/utils";

import { SilderCustom } from "../slider-custom";
import { GameResultDialog } from "../game-result-dialog";
import { BetInfo } from "../bet-info";
import BetHistory from "./bet-history";
import { useBetStore } from "@/providers/bet-store-provider";

interface ContentProps {
  pastBets: Array<IBet>;
}

export default function Content({ pastBets = [] }: ContentProps) {
  const { markPoint, rollType, setMarkPoint, setRoleType, isRunning } = useBetStore(
    (state) => state
  );

  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedBet, setSelectedBet] = useState<IBet | undefined>(undefined);

  return (
    <div className="flex flex-col grow md:min-h-[630px] min-h-[330px] w-full bg-grey-700 pt-[3rem] p-[1rem] relative overflow-hidden rounded-tr-lg rounded-tl-lg md:rounded-none">
      <div className={cn("past-bets", pastBets.length === 13 && "full")}>
        {pastBets.map((pastBet) => (
          <BetHistory
            key={pastBet.id}
            pastBet={pastBet}
            setSelectedBet={setSelectedBet}
            setShowResult={setShowResult}
          />
        ))}
      </div>
      <div className="flex justify-center items-center grow w-full">
        <SilderCustom
          bet={pastBets[0]}
          setMarkPoint={setMarkPoint}
          markPoint={markPoint}
          rollType={rollType}
        />
      </div>
      <BetInfo
        markPoint={markPoint}
        setMarkPoint={setMarkPoint}
        setRoleType={setRoleType}
        rollType={rollType}
        disabled={isRunning}
      />
      <GameResultDialog
        show={showResult}
        setOpen={setShowResult}
        bet={selectedBet}
      />
    </div>
  );
}
