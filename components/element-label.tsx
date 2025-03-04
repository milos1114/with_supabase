"use client";

import { type ComponentProps } from "react";
import { Input } from "@/components//ui/input";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Input> & {
  labelText?: string;
  classNameContainer?: string;
};

export function ElementLabel({
  children,
  classNameContainer,
  className,
  labelText,
  ...props
}: Props) {
  return (
    <div className={`flex flex-col gap-1 ${classNameContainer}`}>
      <label
        htmlFor={props.id}
        className={cn("text-sm font-bold text-grey-200", className)}
      >
        {labelText}
      </label>
      {children}
    </div>
  );
}
