"use client";

import { ChevronDown } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import FairnessSvg from "./icon/fairness";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { ElementLabel } from "./element-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CopySvg from "./icon/copy";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRef } from "react";

interface FairnessDialogProps {
  show: boolean;
  setOpen: (show: boolean) => void;
}

export function FairnessDialog({ show, setOpen }: FairnessDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={show} onOpenChange={setOpen}>
      <DialogContent className="md:w-[500px] p-0 w-[calc(100%-1rem)]">
        <DialogHeader className="p-4">
          <FairnessSvg />
          <DialogTitle>Fairness</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-[520px]">
          <Tabs
            defaultValue="seeds"
            className="w-full flex flex-col items-center"
          >
            <TabsList className="mt-4 w-1/3 min-w-[166px]">
              <TabsTrigger value="seeds" className="flex-1">
                Seeds
              </TabsTrigger>
              <TabsTrigger value="verify" className="flex-1">
                Verify
              </TabsTrigger>
            </TabsList>
            <TabsContent value="seeds" className="flex flex-col w-full">
              <div className="flex flex-col gap-2 p-4">
                <ElementLabel
                  labelText="Active Client Seed"
                  classNameContainer="grow"
                >
                  <Input
                    className="text-white font-semibold cursor-pointer text-left"
                    type="text"
                    readOnly
                    defaultValue={"JiTzaB_hWQ"}
                  />
                </ElementLabel>
                <ElementLabel
                  labelText="Active Server Seed (Hashed)"
                  classNameContainer="grow"
                >
                  <div className="flex items-center">
                    <Input
                      className="text-white font-semibold cursor-pointer text-left rounded-r-none border-r-0 shadow-none"
                      type="text"
                      readOnly
                      defaultValue={
                        "e07f07e98dd1289a71e628fece84bd7fcec0a2409ed348c3c9297df5ffc39fff"
                      }
                    />
                    <Button className="h-[38px] bg-grey-400 hover:bg-grey-300 rounded-l-none text-white">
                      <CopySvg />
                    </Button>
                  </div>
                </ElementLabel>
                <ElementLabel
                  labelText="Total bets made with pair"
                  classNameContainer="grow"
                >
                  <Input
                    className="text-white font-semibold cursor-pointer text-left"
                    type="text"
                    readOnly
                    defaultValue={"689"}
                  />
                </ElementLabel>
              </div>

              <div className="flex flex-col items-center bg-grey-800 px-4 gap-4 pb-4">
                <div className="text-md font-semibold text-white mt-4">
                  Rotate Seed Pair
                </div>
                <ElementLabel
                  labelText="New Client Seed *"
                  classNameContainer="grow w-full"
                >
                  <div className="flex items-center">
                    <Input
                      className="text-white font-semibold cursor-pointer text-left rounded-r-none border-r-0 shadow-none"
                      type="text"
                      defaultValue="2"
                    />
                    <Button className="h-full bg-green-500 hover:bg-green-400 rounded-l-none text-black">
                      Change
                    </Button>
                  </div>
                </ElementLabel>
                <ElementLabel
                  labelText="Next Server Seed (Hashed)"
                  classNameContainer="grow w-full"
                >
                  <div className="flex items-center">
                    <Input
                      className="text-white font-semibold cursor-pointer text-left rounded-r-none border-r-0 shadow-none"
                      type="text"
                      readOnly
                      defaultValue={
                        "48ea3f3a6ad139d8fe601bd227df48e3a199ad6ec23157a35c70eafc20ae8820"
                      }
                    />
                    <Button className="h-[38px] bg-grey-400 hover:bg-grey-300 rounded-l-none text-white">
                      <CopySvg />
                    </Button>
                  </div>
                </ElementLabel>
              </div>
            </TabsContent>
            <TabsContent value="verify" className="flex flex-col w-full">
              <div className="flex flex-col gap-2 p-4">
                <div className="w-full h-[180px] border border-grey-200 border-dashed rounded-sm flex flex-col items-center justify-center">
                  <div className="text-md leading-none mt-2 text-grey-200 text-[14px]">
                    More inputs are required to verify result
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 bg-grey-800 p-4">
                <ElementLabel labelText="Game" classNameContainer="grow w-full">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="martingale">Dice</SelectItem>
                      <SelectItem value="delayed">Dice</SelectItem>
                      <SelectItem value="paroli">Dice</SelectItem>
                      <SelectItem value="alembert">Dice</SelectItem>
                    </SelectContent>
                  </Select>
                </ElementLabel>
                <ElementLabel
                  labelText="Client Seed"
                  classNameContainer="grow w-full"
                >
                  <Input
                    className="text-white font-semibold cursor-pointer text-left"
                    type="text"
                  />
                </ElementLabel>
                <ElementLabel
                  labelText="Server Seed"
                  classNameContainer="grow w-full"
                >
                  <Input
                    className="text-white font-semibold cursor-pointer text-left"
                    type="text"
                  />
                </ElementLabel>
                <ElementLabel
                  labelText="Nonce"
                  classNameContainer="grow w-full"
                >
                  <div className="flex items-center bg-grey-400 rounded-sm">
                    <Input
                      className="text-white font-semibold cursor-pointer text-left rounded-r-none shadow-none h-[44px]"
                      type="number"
                      defaultValue={0}
                      ref={inputRef}
                    />
                    <Button
                      className="h-[44px] text-white bg-grey-400 hover:bg-grey-300 rounded-none"
                      onClick={() =>
                        inputRef.current &&
                        (inputRef.current.value = `${Number(inputRef.current.value) - 1}`)
                      }
                    >
                      <ChevronDown />
                    </Button>
                    <Separator
                      orientation="horizontal"
                      className="w-[2px] h-[20px] bg-grey-600"
                    />
                    <Button
                      className="h-[44px] text-white bg-grey-400 hover:bg-grey-300 rounded-none rounded-l-sm rotate-180"
                      onClick={() =>
                        inputRef.current &&
                        (inputRef.current.value = `${Number(inputRef.current.value) + 1}`)
                      }
                    >
                      <ChevronDown className="text-[12px]" />
                    </Button>
                  </div>
                </ElementLabel>
                <div className="text-md leading-none mt-2 text-grey-200 text-[14px]">
                  View Calculation Breakdown
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
