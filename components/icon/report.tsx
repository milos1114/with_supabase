"use client";

import { SVGProps } from "react";

export default function ReportSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 64 64"
      className="svg-icon"
      {...props}
    >
      <title></title>
      <path d="M59.732 0H4.266A4.266 4.266 0 0 0 0 4.266V60c0 2.21 1.79 4 4 4h56c2.21 0 4-1.79 4-4V4.266A4.266 4.266 0 0 0 59.734 0h-.002ZM17.998 50.24l-8-8 4.266-4.266 3.866 3.894 9.734-9.866 4.266 4.266L17.998 50.24Zm0-20-8-8 4.134-4.374 3.866 3.894 9.866-9.894 4.266 4.266L17.998 30.24Zm36 14.774h-14v-6.026h14v6.026Zm0-20h-14v-6.026h14v6.026Z"></path>
    </svg>
  );
}
