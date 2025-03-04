"use client";

import { useState } from "react";

import Content from "@/components/game-layout/content";
import Footer from "@/components/game-layout/footer";
import Sidebar from "@/components/game-layout/sidebar";
import { IBet } from "@/type/bet";

export default function Home() {
  const [pastBets, setPastBets] = useState<Array<IBet>>([]);

  const handleBet = (bet: IBet) => {
    setPastBets((prevBets) => {
      const newBests = [bet, ...prevBets];
      if (newBests.length > 13) {
        newBests.splice(-1);
      }
      return newBests;
    });
  };

  return (
    <div className="md:w-[calc(100%-6vw)] w-[400px] flex flex-col items-center md:mt-10 mt-3 shadow-lg mx-[3vw]">
      <div className="w-full flex flex-col-reverse md:flex-row grow min-w-[300px] bg-grey-500 border-b-[3px] border-grey-500 rounded-tr-lg rounded-tl-lg">
        <Sidebar handleBet={handleBet} />
        <Content pastBets={pastBets} />
      </div>
      <Footer />
    </div>
  );
}
