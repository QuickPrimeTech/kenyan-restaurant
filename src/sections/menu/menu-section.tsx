"use client";

import { forwardRef } from "react";
import type { MenuItem } from "@/types/menu";
import { MenuItemCard } from "@/sections/menu/menu-item-card";

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export const MenuSection = forwardRef<HTMLDivElement, MenuSectionProps>(
  ({ title, items, onItemClick }, ref) => {
    return (
      <div ref={ref} className="pt-8 first:pt-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
            />
          ))}
        </div>
      </div>
    );
  }
);

MenuSection.displayName = "MenuSection";
