"use client";

import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { buttonVariants, Button } from "@ui/button";
import { cn } from "@/lib/utils";
import { Input, inputVariants } from "./input";

function NumberField({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Root>) {
  const id = React.useId();
  return (
    <NumberFieldPrimitive.Root
      id={id}
      data-slot="numberfield"
      className={cn("border p-2 rounded-xl w-fit", className)}
      {...props}
    />
  );
}

function NumberFieldScrubArea({
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubArea>) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="numberfield-scrub-area"
      {...props}
    />
  );
}

function NumberFieldScrubAreaCursor({
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.ScrubAreaCursor>) {
  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      data-slot="numberfield-scrub-area-cursor"
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
      className={cn("flex gap-2")}
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
      className={cn("text-center max-w-20", inputVariants({ size, className }))}
      {...props}
    />
  );
}

function NumberFieldIncrement({
  size,
  variant,
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Increment> &
  React.ComponentProps<typeof Button>) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="numberfield-increment"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function NumberFieldDecrement({
  size,
  variant,
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitive.Decrement> &
  React.ComponentProps<typeof Button>) {
  return (
    <NumberFieldPrimitive.Decrement
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="numberfield-decrement"
      {...props}
    />
  );
}

export {
  NumberField,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
};
