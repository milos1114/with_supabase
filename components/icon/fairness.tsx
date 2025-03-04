"use client";

import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export default function FairnessSvg({
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
      <path d="M54.727 15.006h3.12V8.37H34.654V2.61H27.99v5.758H4.746v6.637h4.505L0 37.452c0 7.037 5.704 12.741 12.741 12.741 7.038 0 12.741-5.704 12.741-12.741l-9.25-22.446h11.73v39.745h-9.303v6.638h25.165V54.75h-9.171V15.006h13.115l-9.25 22.446c0 7.037 5.703 12.741 12.74 12.741C58.297 50.193 64 44.489 64 37.452l-9.273-22.446ZM5.334 37.452l7.411-17.887 7.357 17.887H5.334Zm38.492 0 7.357-17.887 7.463 17.887h-14.82Z"></path>
    </svg>
  );
}
