"use client";

import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export default function CopySvg({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 64 64"
      className={cn("svg-icon", className)}
      {...props}
    >
      <title></title>
      <path d="M61.334 64H16V12.986h45.334V64ZM2.666 0v45.466H9.28V6.506h38.96V0H2.666Z"></path>
    </svg>
  );
}
