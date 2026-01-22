"use client";

import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { buttonVariants, Button } from "@ui/button";
import { cn } from "@/lib/utils";
import { Input, inputVariants } from "./input";
import { Label } from "@ui/label";

//Number field Context
type NumberFieldContext = {
  id: string;
};

const NumberFieldContext = React.createContext<NumberFieldContext | undefined>(
  undefined,
);

const useNumberFieldContext = (): NumberFieldContext => {
  const context = React.useContext(NumberFieldContext);
  if (!context) {
    throw new Error(
      "useNumberFieldContext should be used inside NumberFieldComponent",
    );
  }
  return context;
};

function NumberField({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Root>) {
  const id = React.useId();
  return (
    <NumberFieldContext.Provider value={{ id: id }}>
      <NumberFieldPrimitive.Root
        id={id}
        data-slot="numberfield"
        className={cn("border h-fit rounded-sm w-fit", className)}
        {...props}
      />
    </NumberFieldContext.Provider>
  );
}

function NumberFieldScrubArea({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubArea>) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="numberfield-scrub-area"
      className={cn("drop-shadow-[0_1px_1px_#0008] filter", className)}
      {...props}
    />
  );
}

function NumberFieldScrubAreaCursor({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubAreaCursor>) {
  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      data-slot="numberfield-scrub-area-cursor"
      className={cn("cursor-w-resize", className)}
      {...props}
    />
  );
}

function NumberFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { id } = useNumberFieldContext();

  return (
    <Label
      htmlFor={id}
      className={cn(
        "cursor-ew-resize text-sm font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function NumberFieldGroup({
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Group>) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="numberfield-group"
      className={cn("flex")}
      {...props}
    />
  );
}

function NumberFieldInput({
  size,
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Input> &
  React.ComponentProps<typeof Input>) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="numberfield-input"
      className={cn(
        inputVariants({ size }),
        "text-center max-w-10 font-semibold h-auto rounded-none",
        className,
      )}
      {...props}
    />
  );
}

function NumberFieldIncrement({
  size,
  variant = "ghost",
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Increment> &
  React.ComponentProps<typeof Button>) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="numberfield-increment"
      className={cn(
        buttonVariants({ variant, size }),
        "rounded-r-sm rounded-l-none",
        className,
      )}
      {...props}
    />
  );
}

function NumberFieldDecrement({
  size,
  variant = "ghost",
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Decrement> &
  React.ComponentProps<typeof Button>) {
  return (
    <NumberFieldPrimitive.Decrement
      className={cn(
        buttonVariants({ variant, size }),
        "rounded-l-sm rounded-r-none",
        className,
      )}
      data-slot="numberfield-decrement"
      {...props}
    />
  );
}

export {
  NumberField,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
  NumberFieldLabel,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
};
