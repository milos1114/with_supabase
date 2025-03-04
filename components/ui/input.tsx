import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Icon, ...props }, ref) => {
    return (
      <div className="relative flex grow w-full">
        {Icon && <div className="after-icon">{Icon}</div>}
        <input
          type={type}
          className={cn(
            "flex h-[38px] w-full rounded-sm border-2 border-grey-400 hover:border-grey-300 focus:border-grey-300 text-grey-300 bg-grey-700 read-only:bg-grey-400 px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-grey-700",
            Icon && "pr-8",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
