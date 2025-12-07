"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { MenuItem } from "@/types/menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export function ChoicesForm({ choices }: { choices: MenuItem["choices"] }) {
  const getSelectionText = (choice: any) => {
    const maxSelect = choice.maxSelectable;
    const minSelect = choice.minSelectable || 0;

    if (maxSelect === 1) {
      return choice.required ? "Required" : "Optional";
    }

    if (minSelect > 0 && maxSelect) {
      return `Select ${minSelect}-${maxSelect}`;
    }

    if (maxSelect) {
      return `Select up to ${maxSelect}`;
    }

    if (minSelect > 0) {
      return `Select at least ${minSelect}`;
    }

    return "Optional";
  };

  // Create Zod schema based on menu item choices
  const createItemSchema = (choices: MenuItem["choices"] | null) => {
    const schema: any = {
      quantity: z.number().min(1).default(1),
      specialInstructions: z.string().default(""),
    };

    if (choices) {
      choices.forEach((choice) => {
        const choiceId = choice.id || choice.title;

        if (choice.maxSelectable === 1) {
          // Single choice (radio)
          schema[choiceId] = choice.required
            ? z.string({ message: `${choice.title} is required` })
            : z.string().optional();
        } else {
          // Multiple choice (checkbox)
          const validation = z.array(z.string());

          if (choice.maxSelectable) {
            validation.max(choice.maxSelectable, {
              message: `Select at most ${choice.maxSelectable} ${
                choice.maxSelectable === 1 ? "option" : "options"
              }`,
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

  // Initialize form with schema based on item
  const form = useForm({
    resolver: zodResolver(createItemSchema(choices)),
    defaultValues: {
      quantity: 1,
      specialInstructions: "",
    },
  });

  const onSubmit = (formData: any) => {
    // Prepare choices object
    const choices: Record<string, string | string[]> = {};
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Dynamic Choices */}
        {choices && choices.length > 0 && (
          <div className="space-y-6">
            {choices.map((choice) => {
              const choiceId = choice.id || choice.title;
              const isSingleSelect = choice.maxSelectable === 1;

              return (
                <FormField
                  key={choiceId}
                  control={form.control}
                  name={choiceId}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex justify-between gap-4">
                          <FormLabel className="text-base font-semibold">
                            {choice.title}
                            {choice.required && (
                              <span className="text-destructive ml-1">*</span>
                            )}
                          </FormLabel>
                          <Badge variant={"outline"}>
                            {getSelectionText(choice)}
                          </Badge>
                        </div>
                        {!isSingleSelect && choice.maxSelectable && (
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md shrink-0">
                            {Array.isArray(field.value)
                              ? field.value.length
                              : 0}
                            /{choice.maxSelectable}
                          </span>
                        )}
                      </div>

                      {isSingleSelect ? (
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-2"
                          >
                            {choice.options.map((option) => (
                              <div
                                key={option.label}
                                className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                              >
                                <RadioGroupItem
                                  value={option.label}
                                  id={`${choiceId}-${option.label}`}
                                />
                                <Label
                                  htmlFor={`${choiceId}-${option.label}`}
                                  className="flex-1 flex items-center justify-between cursor-pointer"
                                >
                                  <span className="text-sm font-medium">
                                    {option.label}
                                  </span>
                                  {option.price && option.price > 0 && (
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
                              const isChecked = Array.isArray(field.value)
                                ? field.value.includes(option.label)
                                : false;
                              const maxReached =
                                choice.maxSelectable &&
                                Array.isArray(field.value) &&
                                field.value.length >= choice.maxSelectable;
                              const isDisabled = !isChecked && !!maxReached;

                              return (
                                <div
                                  key={option.label}
                                  className={`flex items-center space-x-3 rounded-lg border border-border p-4 transition-colors ${
                                    isDisabled
                                      ? "opacity-50 cursor-not-allowed"
                                      : "hover:bg-accent/50 cursor-pointer"
                                  } ${
                                    isChecked
                                      ? "bg-accent/30 border-primary"
                                      : ""
                                  }`}
                                >
                                  <Checkbox
                                    id={`${choiceId}-${option.label}`}
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onCheckedChange={(checked) => {
                                      const currentValue = Array.isArray(
                                        field.value
                                      )
                                        ? field.value
                                        : [];
                                      let newValue: string[];

                                      if (checked) {
                                        newValue = [
                                          ...currentValue,
                                          option.label,
                                        ];
                                        if (
                                          choice.maxSelectable &&
                                          newValue.length > choice.maxSelectable
                                        ) {
                                          newValue = newValue.slice(
                                            -choice.maxSelectable
                                          );
                                        }
                                      } else {
                                        newValue = currentValue.filter(
                                          (v) => v !== option.label
                                        );
                                      }

                                      field.onChange(newValue);
                                    }}
                                  />
                                  <Label
                                    htmlFor={`${choiceId}-${option.label}`}
                                    className={`flex-1 flex items-center justify-between ${
                                      isDisabled
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                    }`}
                                  >
                                    <span className="text-sm font-medium">
                                      {option.label}
                                    </span>
                                    {option.price && option.price > 0 && (
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
          </div>
        )}

        {/* Special Instructions */}
        <FormField
          control={form.control}
          name="specialInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Special instructions
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Add a note (e.g., extra sauce, no onions, etc.)"
                  className="min-h-[100px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
