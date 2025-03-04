import { BET_STATUS } from "@/const";
import { cn } from "@/lib/utils";
import { IBet } from "@/type/bet";
import { getResultBet } from "@/utils/utils";

interface BetHistoryProps {
  pastBet: IBet;
  setShowResult: React.Dispatch<boolean>;
  setSelectedBet: React.Dispatch<IBet | undefined>;
}
export default function BetHistory({
  pastBet,
  setShowResult,
  setSelectedBet,
}: BetHistoryProps) {
  return (
    <button
      className={cn(
        "bet-history",
        getResultBet(pastBet) === BET_STATUS.WIN && "bg-green-500"
      )}
      onClick={() => {
        setShowResult(true);
        setSelectedBet(pastBet);
      }}
    >
      <span
        className={cn(
          "contents",
          getResultBet(pastBet) === BET_STATUS.WIN && "text-black"
        )}
      >
        {pastBet.resultPoint.toFixed(2)}
      </span>
    </button>
  );
}
