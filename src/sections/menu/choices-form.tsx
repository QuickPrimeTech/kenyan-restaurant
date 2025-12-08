"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ReactNode } from "react";
import { MenuChoice, MenuItem } from "@/types/menu";
import {
  ChoicesFormProvider,
  useChoicesForm,
} from "@/contexts/choices-form-context";
import { cn } from "@/lib/utils";

type ChoicesFormProps = {
  choices: MenuChoice[];
  defaultQuantity?: number;
  onAdd?: (data: MenuItem) => void;
  children?: ReactNode;
  basePrice: number;
};

export function ChoicesForm({
  choices,
  defaultQuantity = 1,
  onAdd,
  children,
  basePrice,
  className,
  ...props
}: ChoicesFormProps & React.ComponentProps<"form">) {
  const createItemSchema = (choices: MenuItem["choices"] | null) => {
    const schema: any = {
      quantity: z.number().min(1).default(defaultQuantity),
      specialInstructions: z.string().default(""),
    };

    if (choices) {
      choices.forEach((choice) => {
        const choiceId = choice.id || choice.title;

        if (choice.maxSelectable === 1) {
          schema[choiceId] = choice.required
            ? z.string({ message: `${choice.title} is required` })
            : z.string().optional();
        } else {
          let validation = z.array(z.string());

          if (choice.maxSelectable) {
            validation = validation.max(choice.maxSelectable, {
              message: `Select at most ${choice.maxSelectable}`,
            });
          }

          schema[choiceId] = choice.required
            ? validation.nonempty({ message: `${choice.title} is required` })
            : validation.optional();
        }
      });
    }

    return z.object(schema);
  };

  const form = useForm({
    resolver: zodResolver(createItemSchema(choices)),
    defaultValues: {
      quantity: defaultQuantity,
      specialInstructions: "",
    },
  });

  const calculateTotalPrice = (formData: any) => {
    let additional = 0;

    choices?.forEach((choice) => {
      const choiceId = choice.id || choice.title;
      const selected = formData[choiceId];

      if (Array.isArray(selected)) {
        selected.forEach((label) => {
          const opt = choice.options.find((o) => o.label === label);
          if (opt?.price) additional += opt.price;
        });
      } else if (selected) {
        const opt = choice.options.find((o) => o.label === selected);
        if (opt?.price) additional += opt.price;
      }
    });

    return (basePrice + additional) * (formData.quantity || 1);
  };

  const watchedValues = form.watch();
  const totalPrice = calculateTotalPrice(watchedValues);

  return (
    <ChoicesFormProvider
      value={{
        form,
        choices,
        basePrice,
        totalPrice,
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onAdd?.(data as MenuItem))}
          className={cn("space-y-6", className)}
          {...props}
        >
          {children}
        </form>
      </Form>
    </ChoicesFormProvider>
  );
}

export function ChoicesContent() {
  const { form, choices } = useChoicesForm();

  const getSelectionText = (choice: any) => {
    const maxSelect = choice.maxSelectable;
    const minSelect = choice.minSelectable || 0;

    if (maxSelect === 1) return choice.required ? "Required" : "Optional";
    if (minSelect > 0 && maxSelect) return `Select ${minSelect}-${maxSelect}`;
    if (maxSelect) return `Select up to ${maxSelect}`;
    if (minSelect > 0) return `Select at least ${minSelect}`;
    return "Optional";
  };

  return (
    <div className="space-y-4">
      {/* Choices */}
      {choices.map((choice) => {
        const choiceId = choice.id || choice.title;
        const isSingle = choice.maxSelectable === 1;

        return (
          <FormField
            key={choiceId}
            control={form.control}
            name={choiceId}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex items-start justify-between">
                  <FormLabel className="text-base font-semibold">
                    {choice.title}
                    {choice.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </FormLabel>

                  <Badge variant="outline">{getSelectionText(choice)}</Badge>
                </div>

                {isSingle ? (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      {choice.options.map((option) => (
                        <div
                          key={option.label}
                          className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50"
                        >
                          <RadioGroupItem
                            value={option.label}
                            id={`${choiceId}-${option.label}`}
                          />

                          <Label
                            htmlFor={`${choiceId}-${option.label}`}
                            className="flex-1 flex justify-between cursor-pointer"
                          >
                            <span className="text-sm font-medium">
                              {option.label}
                            </span>

                            {option.price > 0 && (
                              <span className="text-sm text-muted-foreground">
                                +Ksh {option.price.toFixed(2)}
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <FormControl>
                    <div className="space-y-2">
                      {choice.options.map((option) => {
                        const selected = Array.isArray(field.value)
                          ? field.value.includes(option.label)
                          : false;

                        const maxReached =
                          choice.maxSelectable &&
                          Array.isArray(field.value) &&
                          field.value.length >= choice.maxSelectable;

                        const isDisabled = !selected && !!maxReached;

                        return (
                          <div
                            key={option.label}
                            className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors ${
                              isDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer hover:bg-accent/50"
                            } ${selected ? "bg-accent/30 border-primary" : ""}`}
                          >
                            <Checkbox
                              id={`${choiceId}-${option.label}`}
                              checked={selected}
                              disabled={isDisabled}
                              onCheckedChange={(checked) => {
                                const current = Array.isArray(field.value)
                                  ? field.value
                                  : [];

                                let next = checked
                                  ? [...current, option.label]
                                  : current.filter((v) => v !== option.label);

                                field.onChange(next);
                              }}
                            />

                            <Label
                              htmlFor={`${choiceId}-${option.label}`}
                              className={`flex-1 flex justify-between ${
                                isDisabled
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              <span className="text-sm font-medium">
                                {option.label}
                              </span>
                              {option.price > 0 && (
                                <span className="text-sm text-muted-foreground">
                                  +Ksh {option.price.toFixed(2)}
                                </span>
                              )}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}

      {/* Special Instructions */}
      <FormField
        control={form.control}
        name="specialInstructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Special Instructions
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
        <div className="flex items-center rounded-lg border border-border bg-background">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => field.onChange(Math.max(1, field.value - 1))}
            disabled={field.value <= 1}
            aria-label="Decrease quantity"
          >
            <Minus />
          </Button>
          <span className="w-12 text-center font-semibold text-base">
            {field.value}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => field.onChange(field.value + 1)}
            aria-label="Increase quantity"
          >
            <Plus />
          </Button>
        </div>
      )}
    />
  );
}
