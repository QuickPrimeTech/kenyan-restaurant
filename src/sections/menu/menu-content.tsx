"use client";
import { useState, useMemo, useEffect } from "react";
import { CategoryTabs } from "@/sections/menu/category-tabs";
import {
  PopularItems,
  PopularItemsContent,
  PopularItemsHeader,
  PopularItemsScrollButtons,
} from "@/sections/menu/popular-items";
import { ItemDetail } from "@/sections/menu/item-detail";
import { MenuItem } from "@/types/menu";
import { MenuSection } from "./menu-section";
import { useSearchParams } from "next/navigation";
import { MenuItemCard } from "./menu-item-card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CircleAlert, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSectionTracker } from "@/hooks/use-section-tracker";
import Link from "next/link";

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

        <div className="flex">
          {/* Menu Content */}
          <div className="flex-1 section-x mt-25 overflow-hidden">
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
              <Empty className="border border-dashed max-w-3xl">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <CircleAlert />
                  </EmptyMedia>
                  <EmptyTitle> No items found</EmptyTitle>
                  <EmptyDescription>
                    Try searching for &quot;{searchQuery}&quot; with a different
                    term.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button size="sm" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </EmptyContent>
              </Empty>
            )}

            {!searchQuery && Object.keys(groupedMenuItems).length === 0 && (
              <Empty className="border border-dashed max-w-3xl mx-auto">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <CircleAlert />
                  </EmptyMedia>
                  <EmptyTitle> No menu items found</EmptyTitle>
                  <EmptyDescription>
                    Please check your internet or come later when we've added
                    menu items
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex flex-row justify-center">
                  <Button size="sm" variant={"outline"} asChild>
                    <Link href={"/"}>Go back home</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={"/offers"}>
                      <Gift />
                      Checkout Our Offers
                    </Link>
                  </Button>
                </EmptyContent>
              </Empty>
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
