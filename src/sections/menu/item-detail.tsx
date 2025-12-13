"use client";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { MenuItem } from "@/types/menu";
import { ImageWithFallback } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChoicesContent, ChoicesForm, QuantitySelector } from "./choices-form";
import { AddToCartButton } from "./add-cart-button";
import { ShareMenuButton } from "./common/share-menu-button";
import { useAddToCartHandler } from "@/helpers/menu";
import { CartOptions } from "@/types/cart";
import { useState } from "react";
import { CloseAlert } from "./common/close-alert";

interface ItemDetailProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: Partial<CartOptions>;
}

export function ItemDetail({
  item,
  open,
  onOpenChange,
  defaultValues,
}: ItemDetailProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [alertDialogOpen, onAlertDialogChange] = useState<boolean>(false);
  const { onAdd } = useAddToCartHandler();

  const handleChange = (open: boolean) => {
    if (open) {
      onOpenChange(open);
      return;
    }
    if (!open && isDirty) {
      onAlertDialogChange(() => true);
      return;
    }

    onOpenChange(open);
  };

  if (!item) return null;

  const footerButtons = (
    <div className="flex gap-2 mt-4">
      <ShareMenuButton item={item} />
      <Button variant={"secondary"} asChild>
        <Link href={`/menu/${item.slug}`}>See Details</Link>
      </Button>
    </div>
  );

  // Bottom Bar: Quantity + Add
  const BottomBar = () => {
    return (
      <div className="px-4 py-3 border-t">
        <div className="flex items-center gap-3">
          <QuantitySelector />
          <AddToCartButton />
        </div>
      </div>
    );
  };

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
      </div>
      <ChoicesContent />
      {footerButtons}
    </div>
  );

  return (
    <>
      <CloseAlert
        open={alertDialogOpen}
        onOpenChange={onAlertDialogChange}
        handleConfirmClose={() => {
          setIsDirty(false);
          onOpenChange(false);
        }}
      />
      ;
      {isDesktop ? (
        <Dialog open={open} onOpenChange={handleChange}>
          <DialogContent className="max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl flex flex-col max-h-[90vh]">
            <ChoicesForm
              choices={item.choices}
              basePrice={item.price}
              onAdd={(raw, totalPrice) => {
                onAdd(raw, totalPrice, item);
                onOpenChange(false);
              }}
              setDirty={setIsDirty}
              defaultValues={defaultValues}
            >
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
                <div className="max-h-[calc(90vh-320px-100px)]">{content}</div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>

              {/* Bottom Bar */}
              <BottomBar />
            </ChoicesForm>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={handleChange}>
          <DrawerContent>
            <ChoicesForm
              choices={item.choices}
              basePrice={item.price}
              defaultValues={defaultValues}
              onAdd={(raw, totalPrice) => onAdd(raw, totalPrice, item)}
              className="h-[95vh] flex flex-col overflow-hidden"
            >
              <ScrollArea className="flex-1 h-0 max-h-[calc(95vh-66px-54px)]">
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
              <BottomBar />
            </ChoicesForm>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
