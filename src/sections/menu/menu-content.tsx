"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { CategoryTabs } from "@/sections/menu/category-tabs";
import { PopularItems } from "@/sections/menu/popular-items";
import { ItemDetail } from "@/sections/menu/item-detail";
import { MenuItem } from "@/types/menu";
import { MenuSection } from "./menu-section";
import { useSearchParams } from "next/navigation";

type MenuContentProps = {
  menuItems: MenuItem[];
};

export default function MenuContent({ menuItems }: MenuContentProps) {
  const searchParams = useSearchParams();

  // Read ?selected-item=slug
  const selectedItem = searchParams.get("selected-item") || null;
  const [activeCategory, setActiveCategory] = useState("Featured Items");
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(selectedItem ? true : false);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Get featured/popular items
  const popularItems = useMemo(() => {
    console.log(menuItems);
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
        item.category.toLowerCase().includes(query)
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
    setActiveCategory(category);
    setSearchQuery(""); // Clear search when clicking category
    console.log("Clicked category ====>", category);
    const section = sectionRefs.current[category];
    if (section) {
      const headerOffset = 140;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen mb-16">
      <main className="container mx-auto">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex">
          {/* Menu Content */}
          <div className="flex-1 section-x mt-25 overflow-hidden">
            {!searchQuery && (
              <PopularItems
                ref={(el) => {
                  sectionRefs.current["Popular Dishes"] = el;
                }}
                setActiveItem={handleItemClick}
                items={popularItems}
              />
            )}

            {/* Menu Sections */}
            {Object.entries(groupedMenuItems).map(([category, items]) => (
              <MenuSection
                key={category}
                ref={(el) => {
                  sectionRefs.current[category] = el;
                }}
                onClick={handleItemClick}
                title={category}
                items={items}
              />
            ))}

            {/* No results message */}
            {searchQuery && Object.keys(groupedMenuItems).length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg font-medium text-foreground">
                  No items found
                </p>
                <p className="text-muted-foreground mt-1">
                  Try searching for &quot;{searchQuery}&quot; with a different
                  term
                </p>
              </div>
            )}

            {!searchQuery && Object.keys(groupedMenuItems).length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg font-medium text-foreground">
                  No menu items available
                </p>
                <p className="text-muted-foreground mt-1">
                  Check back soon for our delicious offerings
                </p>
              </div>
            )}
          </div>
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
