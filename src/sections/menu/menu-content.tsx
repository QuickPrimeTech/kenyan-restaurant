"use client";
import { useState, useMemo, useEffect } from "react";
import { CategoryTabs } from "@/sections/menu/category-tabs";
import {
  PopularItems,
  PopularItemsContent,
  PopularItemsHeader,
  PopularItemsScrollButtons,
} from "@/sections/menu/popular-items";
import { ItemDetail } from "@/sections/menu/item-detail-dialog";
import { MenuItem } from "@/types/menu";
import { MenuSection } from "./menu-section";
import { useSearchParams } from "next/navigation";
import { MenuItemCard } from "./menu-item-card";
import { useSectionTracker } from "@/hooks/use-section-tracker";
import { EmptySearchState } from "./states/empty-search-state";
import { EmptyMenuState } from "./states/empty-menu-state";
import { PickupSelector } from "./pickup-selector";

type MenuContentProps = {
  menuItems: MenuItem[];
};

export default function MenuContent({ menuItems }: MenuContentProps) {
  const searchParams = useSearchParams();
  // In your component
  const { activeSection, registerSection, scrollToSection } =
    useSectionTracker("Popular Dishes");

  // Read ?selected-item=slug
  const selectedItem = searchParams.get("selected-item") || null;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(selectedItem ? true : false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get featured/popular items
  const popularItems = useMemo(() => {
    return menuItems.filter((item) => item.is_popular);
  }, [menuItems]);

  // Get unique categories from menu items
  const categories = useMemo(() => {
    const cats = new Set<string>();
    menuItems.forEach((item) => {
      if (item.category) {
        cats.add(item.category);
      }
    });
    return ["Popular Dishes", ...cats];
  }, [menuItems]);

  useEffect(() => {
    const slug = searchParams.get("selected-item");

    if (!slug) {
      setActiveItem(null);
      setIsModalOpen(false);
      return;
    }

    const found = menuItems.find((i) => i.slug === slug) || null;

    setActiveItem(found);
    setIsModalOpen(!!found);
  }, [searchParams, menuItems]);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return menuItems;

    const query = searchQuery.toLowerCase();
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }, [searchQuery, menuItems]);

  // Group filtered items by category
  const groupedMenuItems = useMemo(() => {
    const grouped: Record<string, MenuItem[]> = {};

    filteredItems.forEach((item) => {
      const category = item.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });

    // Sort items within each category by name
    Object.keys(grouped).forEach((category) => {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }, [filteredItems]);

  const handleCategoryClick = (category: string) => {
    setSearchQuery(""); // Clear search when clicking category
    scrollToSection(category, 140); // 140px offset for header
  };

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="mb-16">
      <main className="container mx-auto">
        <CategoryTabs
          categories={categories}
          activeCategory={activeSection}
          onCategoryClick={handleCategoryClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Menu Content */}
        <div className="section-x mt-25 overflow-hidden">
          <PickupSelector />
          {!searchQuery && (
            <div ref={(el) => registerSection("Popular Dishes", el)}>
              <PopularItems>
                <PopularItemsHeader>
                  <h2 className="text-xl font-bold text-foreground">
                    Popular Dishes
                  </h2>
                  <PopularItemsScrollButtons />
                </PopularItemsHeader>

                <PopularItemsContent>
                  {popularItems.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      menuItem={item}
                      variant={"popular"}
                      orientation={"square"}
                    />
                  ))}
                </PopularItemsContent>
              </PopularItems>
            </div>
          )}

          {/* Menu Sections */}
          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <MenuSection
              key={category}
              ref={(el) => {
                registerSection(category, el);
              }}
              onClick={handleItemClick}
              title={category}
              items={items}
            />
          ))}

          {/* No results message */}
          {searchQuery && Object.keys(groupedMenuItems).length === 0 && (
            <EmptySearchState
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {!searchQuery && Object.keys(groupedMenuItems).length === 0 && (
            <EmptyMenuState />
          )}
        </div>
      </main>

      <ItemDetail
        item={activeItem}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
