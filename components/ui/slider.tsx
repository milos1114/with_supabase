"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface CustomSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  classNameTrack?: string;
  classNameRange?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  CustomSliderProps
>(({ className, classNameTrack, classNameRange, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center shadow-[0_0_0_10px_var(--grey-700)] rounded-[100px]",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-2 w-full grow overflow-hidden rounded-full",
        classNameTrack
      )}
    >
      <SliderPrimitive.Range
        className={cn("absolute h-full", classNameRange)}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="h-[35px] w-[35px] rounded-sm bg-blue-500 hover:cursor-pointer transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 shadow-md flex items-center justify-center text-blue-600 font-bold text-xl">
      |||
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
