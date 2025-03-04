"use client";

import { Button } from "@/components/ui/button";
import { useState, type ComponentProps } from "react";
import { Input } from "./ui/input";

export interface MaskInputNumberProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ReactNode;
  valueInput: number | string;
  length?: number;
}

export function MaskInputNumber({
  children,
  valueInput,
  length = 4,
  ...props
}: MaskInputNumberProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Input
      {...props}
      value={
        isFocus || valueInput === ""
          ? valueInput
          : Number(valueInput).toFixed(length)
      }
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
}
