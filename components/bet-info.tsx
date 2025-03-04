"use client";

import { IRollType } from "@/type/roll";
import { ElementLabel } from "./element-label";
import PercentSvg from "./icon/percent";
import RefreshSvg from "./icon/refresh";
import XSvg from "./icon/x";
import { Input } from "./ui/input";
import { ROLE_TYPE } from "@/const";
import { cn } from "@/lib/utils";
import { getMultiplier, getWinChance, reverseWinChance } from "@/utils/utils";
import { useState } from "react";
import { MaskInputNumber } from "./mask-input";

interface BetInfoProps {
  readOnly?: boolean;
  setMarkPoint?: React.Dispatch<number>;
  markPoint: number;
  setRoleType?: (rollType: IRollType) => void;
  rollType: IRollType;
  disabled: boolean;
}

export function BetInfo({
  markPoint,
  setMarkPoint,
  setRoleType,
  rollType,
  readOnly = false,
  disabled = false,
}: BetInfoProps) {
  const winChance = getWinChance(rollType, markPoint);
  const multiply = getMultiplier(winChance);

  const handleChangeMultiply = (e: React.ChangeEvent<HTMLInputElement>) => {
    const multiply = Number(e.target.value);
    const value = reverseWinChance(multiply);
    setMarkPoint &&
      setMarkPoint(rollType === ROLE_TYPE.OVER ? 100 - value : value);
  };

  const handleChangePercent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMarkPoint &&
      setMarkPoint(rollType === ROLE_TYPE.OVER ? 100 - value : value);
  };

  const handleChangeRollType = () => {
    setMarkPoint && setMarkPoint(100 - Number(markPoint));
    setRoleType &&
      setRoleType(
        rollType === ROLE_TYPE.OVER ? ROLE_TYPE.UNDER : ROLE_TYPE.OVER
      );
  };

  return (
    <div className="bg-grey-500 w-full flex gap-2 p-4 rounded-sm shadow-md">
      <ElementLabel labelText="Multiplier" classNameContainer="grow">
        <MaskInputNumber
          className="text-white font-semibold"
          type="number"
          Icon={<XSvg />}
          readOnly={readOnly}
          valueInput={multiply}
          onChange={handleChangeMultiply}
          disabled={disabled}
        />
      </ElementLabel>
      <ElementLabel
        className="capitalize"
        labelText={`Roll ${rollType}`}
        classNameContainer="grow"
      >
        <Input
          className={cn(
            "text-white font-semibold cursor-pointer text-left",
            !readOnly && "read-only:bg-grey-700"
          )}
          type="number"
          Icon={<RefreshSvg />}
          readOnly={true}
          value={markPoint.toFixed(2)}
          onClick={handleChangeRollType}
          disabled={disabled}
        />
      </ElementLabel>
      <ElementLabel labelText="Win Chance" classNameContainer="grow">
        <MaskInputNumber
          className="text-white font-semibold"
          type="number"
          Icon={<PercentSvg />}
          readOnly={readOnly}
          valueInput={winChance}
          onChange={handleChangePercent}
          disabled={disabled}
        />
      </ElementLabel>
    </div>
  );
}
