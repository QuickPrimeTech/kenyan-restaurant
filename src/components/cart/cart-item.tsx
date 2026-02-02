"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/contexts/cart-provider";
import { CartItem as CartItemType } from "@/types/cart";
import { ItemDetail } from "@/sections/menu/item-detail-dialog";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@ui/image";

type CartItemProps = {
  cartItem: CartItemType;
  size?: "small" | "big";
};

export function CartItem({ cartItem, size = "big" }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const changeQty = (qty: number) =>
    qty <= 0
      ? setConfirmDelete(true)
      : updateQuantity(cartItem.cartItemId, qty);
  const deleteItem = () => {
    removeFromCart(String(cartItem.cartItemId));
    setConfirmDelete(false);
  };

  return (
    <>
      <div
        className={cn(
          "w-full flex flex-col gap-3 p-4 rounded-lg bg-card hover:cursor-pointer",
          size === "small" && "p-1.5 border",
        )}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "relative size-16 bg-muted rounded-md overflow-hidden flex-shrink-0",
              size === "small" && "size-10 rounded-xs",
            )}
          >
            <ImageWithFallback
              src={cartItem.image_url}
              alt={cartItem.name}
              placeholder={cartItem.menuItem.lqip ? "blur" : "empty"}
              blurDataURL={cartItem.menuItem.lqip || undefined}
              iconProps={{ className: "size-3.5" }}
              textProps={{ className: "hidden" }}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className={cn(
                "font-semibold text-foreground truncate",
                size === "small" && "text-sm",
              )}
            >
              {cartItem.name}
            </h4>
            <div className="flex gap-2 mt-1 items-center">
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  size === "small" && "text-xs",
                )}
              >
                {cartItem.quantity} * Ksh {cartItem.price / cartItem.quantity}
              </p>
              <p
                className={cn(
                  "font-bold text-primary",
                  size === "small" && "text-xs text-foreground font-normal",
                )}
              >
                : Ksh {cartItem.price}
              </p>
            </div>
          </div>
        </div>
        {size === "big" && (
          <div className="flex gap-4 justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  changeQty(cartItem.quantity - 1);
                }}
              >
                <Minus />
              </Button>
              <span className="text-center text-sm font-semibold">
                {cartItem.quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  changeQty(cartItem.quantity + 1);
                }}
              >
                <Plus />
              </Button>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
            >
              <Trash2 />
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="bg-card border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" /> Remove Item from cart?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to remove <strong>{cartItem.name}</strong>{" "}
              from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-muted hover:bg-accent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteItem}
              className="bg-destructive hover:bg-destructive/80"
            >
              Yes, Remove Item
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {cartItem.menuItem && (
        <ItemDetail
          item={cartItem.menuItem}
          open={open}
          onOpenChange={setOpen}
          defaultValues={cartItem}
        />
      )}
    </>
  );
}
