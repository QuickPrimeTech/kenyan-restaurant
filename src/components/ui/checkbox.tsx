"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `
        size-4.5 shrink-0 rounded-[4px] border border-input
        text-background shadow-xs
        transition-all outline-none

        focus-visible:ring-[3px] focus-visible:ring-ring
        focus-visible:ring-offset-2

        disabled:cursor-not-allowed disabled:opacity-50

        data-[state=checked]:bg-foreground
        data-[state=checked]:text-background
        data-[state=checked]:border-foreground
        data-[state=checked]:shadow-md

        dark:bg-input/30
        dark:data-[state=checked]:bg-foreground
        dark:data-[state=checked]:text-background
        dark:data-[state=checked]:border-foreground
        `,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
