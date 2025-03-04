"use client";

import Image from "next/image";

import { IBet } from "@/type/bet";
import { Slider } from "./ui/slider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IRollType } from "@/type/roll";
import { BET_STATUS, ROLE_TYPE, SIZE_SLIDER } from "@/const";
import { getResultBet, playAudio } from "@/utils/utils";

interface SilderCustomProps {
  bet?: IBet;
  setMarkPoint?: React.Dispatch<number>;
  markPoint: number;
  isDisplay?: boolean;
  rollType: IRollType;
  size?: (typeof SIZE_SLIDER)[keyof typeof SIZE_SLIDER];
}

let handleHide: NodeJS.Timeout | number | null = null;

export function SilderCustom({
  bet,
  setMarkPoint,
  markPoint,
  rollType,
  isDisplay,
  size = SIZE_SLIDER.md,
}: SilderCustomProps) {
  const [isHide, setIsHide] = useState<boolean>(true);

  useEffect(() => {
    handleHide && clearTimeout(handleHide);
    if (bet && bet.resultPoint) {
      setIsHide(false);
      if (!isDisplay) {
        handleHide = setTimeout(() => setIsHide(true), 1000);
      }
    }

    return () => {
      handleHide && clearTimeout(handleHide);
    };
  }, [bet, isDisplay]);

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="container-rectangle left-[0%]">
          <div className="rectangle">0</div>
        </div>
        <div className="container-rectangle left-1/4">
          <div className="rectangle">25</div>
        </div>
        <div className="container-rectangle left-1/2">
          <div className="rectangle">50</div>
        </div>
        <div className="container-rectangle left-3/4">
          <div className="rectangle">75</div>
        </div>
        <div className="container-rectangle left-full">
          <div className="rectangle">100</div>
        </div>
      </div>
      <div>
        <div
          className="translate-x"
          style={{ transform: `translate(${bet && bet.resultPoint}%, 0px)` }}
        >
          <div className={cn("hide-show", isHide && "is-hidden")}>
            <Image
              className="dice"
              src="./dice.svg"
              width={size === SIZE_SLIDER.sm ? 60 : 80}
              height={size === SIZE_SLIDER.sm ? 60 : 80}
              alt="result"
            />
            <div
              className={cn(
                "result",
                getResultBet(bet) === BET_STATUS.WIN
                  ? "text-green-600"
                  : "text-red-600",
                size === SIZE_SLIDER.sm ? "text-[14px]" : "text-[16px]"
              )}
            >
              {bet && bet.resultPoint}
            </div>
          </div>
        </div>
        <Slider
          value={[markPoint]}
          max={98}
          min={2}
          step={1}
          classNameTrack={
            rollType !== ROLE_TYPE.OVER ? "bg-red-600" : "bg-green-400"
          }
          classNameRange={
            rollType === ROLE_TYPE.OVER ? "bg-red-600" : "bg-green-400"
          }
          onValueChange={(value) => {
            setMarkPoint && setMarkPoint(value[0]);
            playAudio("./tick.mp3");
          }}
        />
      </div>
    </div>
  );
}
