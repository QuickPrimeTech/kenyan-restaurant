"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Minus, Plus } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ImageWithFallback } from "@/components/ui/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

interface ItemDetailProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Create Zod schema based on menu item choices
const createItemSchema = (item: MenuItem | null) => {
  const schema: any = {
    quantity: z.number().min(1).default(1),
    specialInstructions: z.string().default(""),
  };

  if (item?.choices) {
    item.choices.forEach((choice) => {
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

export function ItemDetail({ item, open, onOpenChange }: ItemDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Initialize form with schema based on item
  const form = useForm({
    resolver: zodResolver(createItemSchema(item)),
    defaultValues: {
      quantity: 1,
      specialInstructions: "",
    },
  });

  // Reset form when item changes
  useEffect(() => {
    if (open && item) {
      const defaultValues: any = {
        quantity: 1,
        specialInstructions: "",
      };

      // Set default values for choices
      if (item.choices) {
        item.choices.forEach((choice) => {
          const choiceId = choice.id || choice.title;
          defaultValues[choiceId] = choice.maxSelectable === 1 ? "" : [];
        });
      }

      form.reset(defaultValues);
      setQuantity(1);
    }
  }, [open, item, form]);

  if (!item) return null;

  // Calculate total price
  const calculateTotalPrice = (formData: any) => {
    let additionalPrice = 0;

    if (item.choices) {
      item.choices.forEach((choice) => {
        const choiceId = choice.id || choice.title;
        const selected = formData[choiceId] || [];

        if (Array.isArray(selected)) {
          selected.forEach((selectedLabel: string) => {
            const option = choice.options.find(
              (opt) => opt.label === selectedLabel
            );
            if (option?.price) {
              additionalPrice += option.price;
            }
          });
        } else if (selected) {
          const option = choice.options.find((opt) => opt.label === selected);
          if (option?.price) {
            additionalPrice += option.price;
          }
        }
      });
    }

    return (item.price + additionalPrice) * formData.quantity;
  };

  const onSubmit = (formData: any) => {
    // Prepare choices object
    const choices: Record<string, string | string[]> = {};

    if (item.choices) {
      item.choices.forEach((choice) => {
        const choiceId = choice.id || choice.title;
        const value = formData[choiceId];

        if (value && (Array.isArray(value) ? value.length > 0 : value !== "")) {
          choices[choiceId] = value;
        }
      });
    }

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: formData.quantity,
      image: item.image_url,
      special: formData.specialInstructions,
      choices,
    });

    onOpenChange(false);
  };

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

  const totalPrice = calculateTotalPrice(form.getValues());

  const content = (
    <div className="px-6 py-5 space-y-6">
      {/* Title & Price */}
      <div className="space-y-2">
        <DialogTitle className="text-2xl font-bold text-foreground leading-tight">
          {item.name}
        </DialogTitle>
        <DialogDescription className="text-base text-muted-foreground leading-relaxed">
          {item.description}
        </DialogDescription>
        <div className="text-xl font-semibold text-foreground">
          Ksh {item.price.toFixed(2)}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Dynamic Choices */}
          {item.choices && item.choices.length > 0 && (
            <div className="space-y-6">
              {item.choices.map((choice) => {
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
                                            newValue.length >
                                              choice.maxSelectable
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
    </div>
  );

  // Bottom Bar: Quantity + Add
  const bottomBar = (
    <div className="px-4 py-3 lg:p-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shrink-0">
      <div className="flex items-center gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center rounded-lg border border-border bg-background">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              const currentQty = form.getValues().quantity;
              const newQty = Math.max(1, currentQty - 1);
              setQuantity(newQty);
              form.setValue("quantity", newQty);
            }}
            disabled={quantity <= 1}
            aria-label={`Decrease quantity of ${item.name}`}
          >
            <Minus />
          </Button>
          <span className="w-12 text-center font-semibold text-base">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              const newQty = quantity + 1;
              setQuantity(newQty);
              form.setValue("quantity", newQty);
            }}
            aria-label={`Increase quantity of ${item.name}`}
          >
            <Plus />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          size={"lg"}
          className="flex-1 lg:h-12 lg:text-base lg:font-semibold"
        >
          <Plus />
          Add to order • Ksh {totalPrice.toFixed(2)}
        </Button>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl flex flex-col max-h-[90vh]">
          <ScrollArea className="flex-1">
            {/* Image */}
            <div className="relative h-[320px] bg-muted shrink-0">
              <ImageWithFallback
                fill
                src={item.image_url}
                placeholder={item.lqip ? "blur" : "empty"}
                blurDataURL={item.lqip || undefined}
                alt={item.name}
                className="object-cover"
                sizes="(max-width: 540px) 100vw, 540px"
                priority
              />
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(90vh-320px-80px)]">{content}</div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>

          {/* Bottom Bar */}
          {bottomBar}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[95vh] flex flex-col overflow-hidden">
        {/* Image */}
        <ScrollArea className="h-0 flex-1 max-h-[calc(95vh-66px-54px)]">
          <div className="relative h-[280px] bg-muted shrink-0">
            <ImageWithFallback
              fill
              src={item.image_url}
              placeholder={item.lqip ? "blur" : "empty"}
              blurDataURL={item.lqip || undefined}
              alt={item.name}
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {content}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        {/* Bottom Bar */}
        {bottomBar}
      </DrawerContent>
    </Drawer>
  );
}
