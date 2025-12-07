"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Minus, Plus } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ImageWithFallback } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { ChoicesForm } from "./choices-form";

interface ItemDetailProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemDetail({ item, open, onOpenChange }: ItemDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const isDesktop = useMediaQuery("(min-width: 768px)");

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

      setQuantity(1);
    }
  }, [open, item]);

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

  const totalPrice = calculateTotalPrice({ quantity });
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
        <div className="font-semibold text-foreground">
          Ksh {item.price.toFixed(2)}
        </div>
        <ChoicesForm choices={item.choices} />
      </div>
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
              setQuantity((prev) => prev - 1);
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
            }}
            aria-label={`Increase quantity of ${item.name}`}
          >
            <Plus />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <Button
          type="button"
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
