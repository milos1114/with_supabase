"use client";

import { SVGProps } from "react";

export default function RectangleSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 64 64"
      className="svg-icon"
      {...props}
    >
      <title></title>
      <path d="M64 58.5H0v-53h64v53Zm-56-8h48v-37H8v37Z"></path>
    </svg>
  );
}
