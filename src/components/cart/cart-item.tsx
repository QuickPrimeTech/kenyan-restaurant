"use client";

import { useState } from "react";
import Image from "next/image";
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

type CartItemProps = { cartItem: CartItemType };

export function CartItem({ cartItem }: CartItemProps) {
  const { updateCartItem, removeFromCart } = useCart();
  const [confirm, setConfirm] = useState(false);

  const changeQty = (qty: number) => (qty <= 0 ? setConfirm(true) : 0);
  const deleteItem = () => {
    removeFromCart(String(cartItem.cartItemId));
    setConfirm(false);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5 p-4 border rounded-lg bg-card border-border">
        <div className="flex items-center gap-4">
          {cartItem.image_url && (
            <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={cartItem.image_url}
                alt={cartItem.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">
              {cartItem.name}
            </h4>
            <div className="flex gap-2 mt-1 items-center">
              <p className="text-sm text-muted-foreground">
                {cartItem.quantity} * Ksh {cartItem.price / cartItem.quantity}
              </p>
              <p className="font-bold text-primary">Ksh {cartItem.price}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeQty(cartItem.quantity - 1)}
            >
              <Minus />
            </Button>
            <span className="text-center text-sm font-semibold">
              {cartItem.quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeQty(cartItem.quantity + 1)}
            >
              <Plus />
            </Button>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirm(true)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent className="bg-card border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" /> Remove Item?
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
    </>
  );
}
