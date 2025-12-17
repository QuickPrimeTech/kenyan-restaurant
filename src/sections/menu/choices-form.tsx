"use client";
import { Check, MinusIcon, PlusIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ReactNode, useEffect, useMemo } from "react";
import { MenuChoice } from "@/types/menu";
import {
  ChoicesFormProvider,
  useChoicesForm,
} from "@/contexts/choices-form-context";
import { cn } from "@/lib/utils";
import { createItemSchema } from "@/schemas/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateTotalPrice, getSelectionDescription } from "@/helpers/menu";
import { CartOptions, RawCartOptions } from "@/types/cart";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { ZodObject } from "zod";

type ChoicesFormProps = {
  choices: MenuChoice[];
  defaultQuantity?: number;
  onAdd?: (data: RawCartOptions, totalPrice: number) => void;
  defaultValues?: Partial<CartOptions>;
  children?: ReactNode;
  basePrice: number;
  setDirty?: (open: boolean) => void;
} & React.ComponentProps<"form">;

export function ChoicesForm({
  choices,
  defaultQuantity = 1,
  onAdd,
  defaultValues,
  children,
  basePrice,
  setDirty,
  className,
  ...props
}: ChoicesFormProps) {
  const choicesSchema = useMemo(
    () => createItemSchema(choices, defaultQuantity),
    [choices]
  );

  const form = useForm({
    resolver: zodResolver(choicesSchema),
    defaultValues: {
      quantity: defaultValues?.quantity ?? defaultQuantity,
      specialInstructions: defaultValues?.specialInstructions ?? "",
      ...defaultValues?.choices,
    },
    reValidateMode: "onChange",
  });

  const { dirtyFields } = form.formState;

  // Fix: Only consider form dirty if there are actual dirty fields
  const isActuallyDirty = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
    setDirty?.(isActuallyDirty);
  }, [isActuallyDirty]);

  const watchedValues = form.watch();
  const totalPrice = calculateTotalPrice(watchedValues, choices, basePrice);

  return (
    <ChoicesFormProvider
      value={{
        form,
        choicesSchema,
        choices,
        basePrice,
        totalPrice,
        defaultValues,
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            onAdd?.(data as RawCartOptions, totalPrice);
            form.reset();
          })}
          className={cn("space-y-6", className)}
          {...props}
        >
          {children}
        </form>
      </Form>
    </ChoicesFormProvider>
  );
}

// Choice Item Component for better organization
const ChoiceItem = ({ choice }: { choice: MenuChoice }) => {
  const { form, choicesSchema } = useChoicesForm();
  const choiceId = choice.id;
  const isSingle = choice.maxSelectable === 1 && choice.required;

  // 1. Watch the value for realtime updates
  const fieldValue = form.watch(choiceId);

  // 2. Validate SILENTLY against Zod
  // We extract the specific schema for this field from the main object
  const isValid = useMemo(() => {
    if (!choicesSchema || !(choicesSchema instanceof ZodObject)) return false;

    // Get the specific schema for this field (e.g., choiceId "sauce")
    const fieldSchema = choicesSchema.shape[choiceId];

    if (!fieldSchema) return true; // Safety fallback

    // safeParse runs the validation but DOES NOT update form state or trigger errors
    const result = fieldSchema.safeParse(fieldValue);

    return result.success;
  }, [choicesSchema, choiceId, fieldValue]);

  return (
    <FormField
      key={choiceId}
      control={form.control}
      name={choiceId}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <div className="space-y-2">
            <div className="flex gap-3 items-center justify-between">
              <FormLabel className="text-base font-semibold">
                {choice.title}
                {choice.required && <span className="text-destructive">*</span>}
              </FormLabel>
              <Badge variant={!isValid ? "outline" : "success"} size={"lg"}>
                {isValid && choice.required && <Check />}
                {choice.required ? "Required" : "Optional"}
              </Badge>
            </div>
            <FormDescription>{getSelectionDescription(choice)}</FormDescription>
          </div>

          {isSingle ? (
            <SingleChoiceOptions choice={choice} field={field} />
          ) : (
            <MultipleChoiceOptions choice={choice} field={field} />
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Single Choice Options Component
const SingleChoiceOptions = ({
  choice,
  field,
}: {
  choice: MenuChoice;
  field: any;
}) => {
  const choiceId = choice.id;
  // console.log(
  //   `SingleChoiceOptions render - choiceId: ${choiceId}, field.value:`,
  //   field.value
  // );
  return (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        value={field.value ?? ""}
        className="space-y-2"
      >
        {choice.options.map((option) => (
          <div
            key={`${option.label}-${option.price} `}
            className="flex items-center rounded-lg border pl-4 hover:bg-accent/50 overflow-hidden"
          >
            <RadioGroupItem
              value={option.label}
              id={`${choiceId}-${option.label}`}
            />
            <OptionLabel
              label={option.label}
              price={option.price}
              htmlFor={`${choiceId}-${option.label}`}
            />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

// Multiple Choice Options Component
const MultipleChoiceOptions = ({
  choice,
  field,
}: {
  choice: MenuChoice;
  field: any;
}) => {
  const choiceId = choice.id;
  const selectedValues = Array.isArray(field.value) ? field.value : [];
  const maxReached =
    choice.maxSelectable && selectedValues.length >= choice.maxSelectable;

  return (
    <FormControl>
      <div className="space-y-2">
        {choice.options.map((option) => {
          const isSelected = selectedValues.includes(option.label);
          const isDisabled = !isSelected && !!maxReached;

          return (
            <div
              key={option.label}
              className={cn(
                "flex items-center pl-4 rounded-lg border transition-colors",
                isDisabled && "opacity-80 cursor-not-allowed",
                !isDisabled && "cursor-pointer hover:bg-accent/50",
                isSelected && "bg-accent/30"
              )}
              title={
                isDisabled
                  ? `You are only allowed to select up to ${
                      choice.maxSelectable
                    } ${choice.title}${
                      (choice.maxSelectable || choice.options.length) > 1 && "s"
                    }`
                  : ``
              }
            >
              <Checkbox
                id={`${choiceId}-${option.label}`}
                checked={isSelected}
                disabled={isDisabled}
                onCheckedChange={(checked) => {
                  const current = selectedValues;
                  const next = checked
                    ? [...current, option.label]
                    : current.filter((v: any) => v !== option.label);
                  field.onChange(next);
                }}
              />
              <OptionLabel
                label={option.label}
                price={option.price}
                htmlFor={`${choiceId}-${option.label}`}
                disabled={isDisabled}
              />
            </div>
          );
        })}
      </div>
    </FormControl>
  );
};

// Reusable Option Label Component
const OptionLabel = ({
  label,
  price,
  htmlFor,
  disabled = false,
}: {
  label: string;
  price: number;
  htmlFor: string;
  disabled?: boolean;
}) => (
  <Label
    htmlFor={htmlFor}
    className={cn(
      "flex-1 flex justify-between p-4",
      disabled ? "cursor-not-allowed" : "cursor-pointer"
    )}
  >
    <span className="text-sm font-medium">{label}</span>
    {price > 0 && (
      <span className="text-sm text-muted-foreground">
        +Ksh {price.toFixed(2)}
      </span>
    )}
  </Label>
);

export function ChoicesContent() {
  const { choices } = useChoicesForm();

  return (
    <div className="space-y-4">
      {/* Choices */}
      {choices.map((choice) => (
        <ChoiceItem key={choice.id} choice={choice} />
      ))}

      {/* Special Instructions */}
      <FormField
        control={useChoicesForm().form.control}
        name="specialInstructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Special Instructions
              <span className="text-sm text-muted-foreground">(optional)</span>
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="min-h-[100px] resize-none"
                placeholder="Add a note (e.g., extra sauce, no onions, etc.)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function QuantitySelector() {
  const { form } = useChoicesForm();

  return (
    <FormField
      control={form.control}
      name="quantity"
      render={({ field }) => (
        <NumberField>
          <NumberFieldGroup>
            <NumberFieldDecrement
              type="button"
              size="icon-lg"
              onClick={() => field.onChange(Math.max(1, field.value - 1))}
              disabled={field.value <= 1}
              aria-label="Decrease quantity"
              variant={"ghost"}
            >
              <MinusIcon />
            </NumberFieldDecrement>
            <NumberFieldInput {...field} />
            <NumberFieldIncrement
              type="button"
              variant={"ghost"}
              size="icon-lg"
              onClick={() => field.onChange(field.value + 1)}
              aria-label="Increase quantity"
            >
              <PlusIcon />
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberField>
      )}
    />
  );
}
