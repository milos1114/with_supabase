"use client";

import { useState } from "react";
import { FairnessDialog } from "../fairness-dialog";
import ChartSvg from "../icon/chart";
import RectangleSvg from "../icon/rectangle";
import SettingSvg from "../icon/setting";
import StarSvg from "../icon/star";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Footer() {
  const [showFairness, setShowFairness] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between h-[63px] w-full bg-grey-700 rounded-bl-lg rounded-br-lg p-2 text-sm">
      <div className="flex items-center h-3/4">
        <Button variant="ghost" size="icon">
          <SettingSvg className="w-[14px] h-[14px]" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <RectangleSvg className="w-[14px] h-[14px]" />
        </Button>
        <Button variant="ghost" size="icon">
          <ChartSvg className="w-[14px] h-[14px]" />
        </Button>
        <Button variant="ghost" size="icon">
          <StarSvg className="w-[14px] h-[14px]" />
        </Button>
        <Separator orientation="vertical" className="bg-grey-500" />
      </div>
      <div
        className="px-[.625rem] py-0 leading-none font-semibold hover:text-grey-100 hover:cursor-pointer"
        onClick={() => setShowFairness(true)}
      >
        Fairness
      </div>
      <FairnessDialog setOpen={setShowFairness} show={showFairness} />
    </div>
  );
}
