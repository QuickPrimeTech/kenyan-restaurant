"use client";

import type React from "react";
import type { MenuItem } from "@/types/menu";
import { Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  };

  return (
    <div
      onClick={onClick}
      className="flex gap-4 py-4 shadow-sm cursor-pointer rounded-xl hover:bg-secondary/30  px-4 transition-colors"
    >
      {/* Content - left side */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-[16px] font-medium text-foreground leading-snug mb-1">
          {item.name}
        </h3>
        <p className="text-[14px] text-muted-foreground leading-snug line-clamp-2 mb-2">
          {item.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[15px] text-foreground">
            Ksh {item.price.toFixed(2)}
          </span>
          {item.calories && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-[14px] text-muted-foreground">
                {item.calories} Cal.
              </span>
            </>
          )}
        </div>
      </div>

      {/* Image - right side with + button */}
      <div className="relative w-[140px] h-[140px] sm:w-[156px] sm:h-[156px] shrink-0">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Uber Eats plus button - bottom right corner outside image */}
        <Button
          onClick={handleQuickAdd}
          size={"icon-lg"}
          variant={"outline"}
          className="absolute -bottom-2 -right-2 rounded-full shadow-lghover:scale-105 transition-transform border border-border"
        >
          <Plus className="text-black" strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
}
