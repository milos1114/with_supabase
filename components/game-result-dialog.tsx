"use client";

import { IBet } from "@/type/bet";
import { BetInfo } from "./bet-info";
import { SilderCustom } from "./slider-custom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ReportSvg from "./icon/report";
import { Separator } from "./ui/separator";
import BitCoinSvg from "./icon/bitcoin";
import { ROLE_TYPE, SIZE_SLIDER } from "@/const";
import moment from "moment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ElementLabel } from "./element-label";
import { Input } from "./ui/input";
import CopySvg from "./icon/copy";
import { ScrollArea } from "./ui/scroll-area";

interface GameResultDialogProps {
  show: boolean;
  setOpen: (show: boolean) => void;
  bet?: IBet;
}

export function GameResultDialog({
  show,
  setOpen,
  bet,
}: GameResultDialogProps) {
  if (!bet) return null;

  const winChance =
    bet.rollType === ROLE_TYPE.OVER ? 100 - bet.markPoint : bet.markPoint;
  const multiply = 99 / winChance;

  return (
    <Dialog open={show} onOpenChange={setOpen}>
      <DialogContent className="md:w-[500px] p-0 w-[calc(100%-1rem)]">
        <DialogHeader className="p-4">
          <ReportSvg />
          <DialogTitle>Bet</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-[600px]">
          <div className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold leading-none text-white">
                Dice
              </div>
              <div className="text-lg font-semibold leading-none mt-2 text-white">
                ID 327,957,190,678
              </div>

              <div className="text-sm text-grey-200 mt-6">
                Placed by <span className="font-semibold">nartoan</span>
              </div>
              <div className="text-sm text-grey-200">
                on {moment(bet.time).format("MM/DD/YYYY [at] hh:mm A")}
              </div>

              <Separator className="h-[3px] bg-grey-400 mt-6" />

              <div className="w-full flex justify-around mt-4 bg-grey-700 rounded-sm p-[14px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-semibold text-grey-200">Bet</div>
                  <div className="text-sm font-semibold">
                    {bet.amount.toFixed(8)} <BitCoinSvg />
                  </div>
                </div>
                <Separator
                  className="bg-grey-400 h-[45px]"
                  orientation="vertical"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-semibold text-grey-200">
                    Multiplier
                  </div>
                  <div className="text-sm font-semibold flex flex-row justify-start">
                    {multiply.toFixed(2)}
                    <span className="leading-none">×</span>
                  </div>
                </div>
                <Separator
                  className="bg-grey-400 h-[45px]"
                  orientation="vertical"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-semibold text-grey-200">
                    Payout
                  </div>
                  <div className="text-sm font-semibold text-green-500">
                    {(bet.amount * multiply).toFixed(8)} <BitCoinSvg />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center grow w-full mt-6">
                <SilderCustom
                  bet={bet}
                  isDisplay
                  markPoint={bet.markPoint}
                  rollType={bet.rollType}
                  size={SIZE_SLIDER.sm}
                />
              </div>
              <BetInfo
                readOnly
                markPoint={bet.markPoint}
                rollType={bet.rollType}
                disabled={false}
              />
            </div>
            <DialogFooter className="sm:justify-center mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-grey-400 hover:bg-grey-300 text-white font-semibold shadow-md"
                >
                  Play Dice
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
          <Accordion type="single" collapsible className="bg-grey-800 px-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white font-semibold text-[14px]">
                Provable Fairness
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <ElementLabel labelText="Server Seed" classNameContainer="grow">
                  <Input
                    className="text-white font-semibold cursor-pointer text-left"
                    type="text"
                    readOnly
                    value={
                      "e07f07e98dd1289a71e628fece84bd7fcec0a2409ed348c3c9297df5ffc39fff"
                    }
                  />
                </ElementLabel>
                <ElementLabel
                  labelText="Server Seed (Hashed)"
                  classNameContainer="grow"
                >
                  <div className="flex items-center">
                    <Input
                      className="text-white font-semibold cursor-pointer text-left rounded-r-none border-r-0 shadow-none"
                      type="text"
                      readOnly
                      value={
                        "e07f07e98dd1289a71e628fece84bd7fcec0a2409ed348c3c9297df5ffc39fff"
                      }
                    />
                    <Button className="h-[38px] bg-grey-400 hover:bg-grey-300 rounded-l-none text-white">
                      <CopySvg />
                    </Button>
                  </div>
                </ElementLabel>
                <div className="flex flex-row gap-4">
                  <ElementLabel
                    labelText="Client Seed"
                    classNameContainer="w-full"
                  >
                    <div className="flex items-center">
                      <Input
                        className="text-white font-semibold cursor-pointer text-left rounded-r-none border-r-0 shadow-none"
                        type="text"
                        readOnly
                        value={"JiTzaB_hWQ"}
                      />
                      <Button className="h-full bg-grey-400 hover:bg-grey-300 rounded-l-none text-white">
                        <CopySvg />
                      </Button>
                    </div>
                  </ElementLabel>
                  <ElementLabel labelText="Nonce" classNameContainer="grow">
                    <div className="flex items-center">
                      <Input
                        className="text-white font-semibold cursor-pointer text-left rounded-r-none border-r-0 shadow-none"
                        type="text"
                        readOnly
                        value={"686"}
                      />
                      <Button className="h-full bg-grey-400 hover:bg-grey-300 rounded-l-none text-white">
                        <CopySvg />
                      </Button>
                    </div>
                  </ElementLabel>
                </div>
                <div className="text-sm text-grey-200 font-semibold text-center">
                  Rotate your seed pair in order to verify this bet
                </div>
                <div className="text-sm text-grey-200 font-semibold text-center">
                  What is Provable Fairness?
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
