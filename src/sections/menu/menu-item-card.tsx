"use client";
import type { MenuItem } from "@/types/menu";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image";

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: () => void;
}

export function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <div
      onClick={onAdd}
      className="bg-card flex gap-4 shadow-sm cursor-pointer rounded-sm overflow-hidden"
    >
      {/* Content */}
      <div className="flex-1 min-w-0 py-4 flex flex-col justify-center pl-4">
        <h3 className="text-[16px] font-medium text-foreground leading-snug mb-1">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-snug line-clamp-2 mb-2">
          {item.description}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[15px] text-foreground">
            Ksh {item.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Image + button */}
      <div className="relative aspect-square w-40 shrink-0">
        <ImageWithFallback
          fill
          src={item.image_url}
          placeholder={item.lqip ? "blur" : "empty"}
          blurDataURL={item.lqip || undefined}
          alt={item.name}
          className="object-cover"
        />

        <Button
          onClick={onAdd}
          size="icon-lg"
          variant="outline"
          title={`Add ${item.name} to cart`}
          className="absolute bottom-2 cursor-pointer right-2 shadow-lg hover:scale-105 transition-transform"
        >
          <Plus className="text-foreground" strokeWidth={3.5} />
        </Button>
      </div>
    </div>
  );
}
