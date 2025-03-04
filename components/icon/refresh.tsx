"use client";

import { SVGProps } from "react";

export default function RefreshSvg(props: SVGProps<SVGSVGElement>) {
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
        d="M19.94 21.198a15.999 15.999 0 0 0-3.673 7.496h5.066L10.667 43.707 0 28.694h5.467A26.667 26.667 0 0 1 49.653 11.84l-6.986 8a16 16 0 0 0-22.728 1.358Zm33.394-.904L64 35.307h-5.333A26.667 26.667 0 0 1 14.48 52.16l6.987-8a16 16 0 0 0 26.267-8.853h-5.067l10.667-15.013Z"
      ></path>
    </svg>
  );
}
