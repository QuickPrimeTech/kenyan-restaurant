"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/hooks/use-cart";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Minus, Plus, X } from "lucide-react";
import type { MenuItem } from "@/types/menu";

interface ItemDetailProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemDetail({ item, open, onOpenChange }: ItemDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { addItem } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setSpecialInstructions("");
    }
  }, [open]);

  if (!item) return null;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      special: specialInstructions,
    });
    onOpenChange(false);
  };

  const scrollableContent = (
    <div className="p-5">
      <h2 className="text-[22px] md:text-[24px] font-bold text-foreground mb-2">
        {item.name}
      </h2>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-[16px] text-foreground">
          ${item.price.toFixed(2)}
        </span>
        {item.calories && (
          <>
            <span className="text-muted-foreground">•</span>
            <span className="text-[15px] text-muted-foreground">
              {item.calories} Cal.
            </span>
          </>
        )}
      </div>

      <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
        {item.description}
      </p>

      <div className="mb-6">
        <h3 className="text-[16px] font-medium text-foreground mb-3">
          Nutritional Information
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary rounded-xl p-3">
            <p className="text-[13px] text-muted-foreground">Calories</p>
            <p className="text-[15px] font-medium">
              {item.calories || 450} Cal
            </p>
          </div>
          <div className="bg-secondary rounded-xl p-3">
            <p className="text-[13px] text-muted-foreground">Protein</p>
            <p className="text-[15px] font-medium">22g</p>
          </div>
          <div className="bg-secondary rounded-xl p-3">
            <p className="text-[13px] text-muted-foreground">Carbs</p>
            <p className="text-[15px] font-medium">45g</p>
          </div>
          <div className="bg-secondary rounded-xl p-3">
            <p className="text-[13px] text-muted-foreground">Fat</p>
            <p className="text-[15px] font-medium">18g</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-[16px] font-medium text-foreground mb-2">
          Allergen Information
        </h3>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          Contains: Wheat, Soy, Milk. May contain traces of nuts and sesame.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-[16px] font-medium text-foreground mb-2">
          Ingredients
        </h3>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          Premium beef patty, lettuce, tomato, onion, pickles, special sauce,
          sesame seed bun.
        </p>
      </div>

      {/* Special Instructions */}
      <div className="mb-6">
        <h3 className="text-[16px] font-medium text-foreground mb-2">
          Special instructions
        </h3>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="Add a note (extra sauce, no onions, etc.)"
          className="w-full h-20 p-3 bg-secondary rounded-xl text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-foreground placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );

  // Fixed Bottom - Quantity and Add Button
  const bottomBar = (
    <div className="p-5 border-t border-border bg-background shrink-0">
      <div className="flex items-center gap-3">
        {/* Quantity selector */}
        <div className="flex items-center bg-secondary rounded-full">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary/80 disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium text-[16px]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary/80"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to order button */}
        <button
          onClick={handleAddToCart}
          className="flex-1 h-12 bg-foreground text-background rounded-full font-medium text-[16px] hover:bg-foreground/90 transition-colors"
        >
          Add to order • ${(item.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );

  // Desktop: Dialog
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[480px] p-0 gap-0 overflow-hidden rounded-2xl flex flex-col max-h-[90vh]">
          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute left-4 top-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>

          {/* Image - Fixed height */}
          <div className="relative h-[280px] bg-muted shrink-0">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <ScrollArea
            className="flex-1 overflow-hidden"
            style={{ maxHeight: "calc(90vh - 280px - 82px)" }}
          >
            {scrollableContent}
          </ScrollArea>

          {bottomBar}
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile: Drawer
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh] flex flex-col overflow-hidden">
        {/* Drawer handle */}
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-3" />

        {/* Image - Fixed height */}
        <div className="relative h-[200px] bg-muted shrink-0">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <ScrollArea
          className="flex-1 overflow-hidden"
          style={{ maxHeight: "calc(95vh - 200px - 82px - 30px)" }}
        >
          {scrollableContent}
        </ScrollArea>

        {bottomBar}
      </DrawerContent>
    </Drawer>
  );
}
