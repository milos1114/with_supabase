"use client";

import { SVGProps } from "react";

export default function ChartSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 64 64"
      className="svg-icon"
      {...props}
    >
      <title></title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.013 19.707 64 0v12.64L30.987 33.627 18.133 18.853 0 30.693V17.947L20.107 4.853l12.906 14.854ZM16 64H5.333V35.173L16 28.213V64Zm13.707-21.653-3.04-3.52V64h10.666V37.493l-2.773 1.76-4.853 3.094ZM58.667 64H48V30.72l10.667-6.8V64Z"
      ></path>
    </svg>
  );
}
