import React, { forwardRef } from "react";
import type { MenuItem } from "@/types/menu";
import { MenuItemCard } from "@/sections/menu/menu-item-card";

type MenuSectionProps = {
  title: string;
  items: MenuItem[];
  onClick: (item: MenuItem) => void;
};

export const MenuSection = forwardRef<
  HTMLDivElement,
  MenuSectionProps & Omit<React.ComponentProps<"div">, "onClick">
>(({ title, items, onClick, ...props }, ref) => {
  return (
    <div ref={ref} className="pt-8 first:pt-4">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            menuItem={item}
            orientation="horizontal"
            variant="regular"
            onClick={() => onClick(item)}
            {...props}
          />
        ))}
      </div>
    </div>
  );
});

MenuSection.displayName = "MenuSection";
