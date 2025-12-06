"use client";

import * as React from "react";
import type { MenuItem } from "@/types/menu";
import { Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  const { addItem } = useCart();
  const [imgError, setImgError] = React.useState(false);

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
      className="flex gap-4 shadow-sm cursor-pointer rounded-xl hover:bg-secondary/30 transition-colors"
    >
      {/* Content */}
      <div className="flex-1 min-w-0 py-4 flex flex-col justify-center pl-4">
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

      {/* Image + button */}
      <div className="relative aspect-square w-40 shrink-0">
        {!imgError ? (
          <Image
            fill
            src={item.image}
            alt={item.name}
            className="object-cover rounded-xl"
            onError={() => setImgError(true)} // 👈 fallback triggered
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center rounded-r-xl text-sm text-muted-foreground">
            No Image
          </div>
        )}

        <Button
          onClick={handleQuickAdd}
          size="icon-lg"
          variant="outline"
          className="absolute bottom-2 cursor-pointer right-2 shadow-lg hover:scale-105 transition-transform border border-border"
        >
          <Plus className="text-black" strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
}
