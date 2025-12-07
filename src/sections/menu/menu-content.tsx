"use client";
import { useState, useRef, useMemo } from "react";
import { useCart } from "@/hooks/use-cart";
import { CategoryTabs } from "@/sections/menu/category-tabs";
import { FeaturedItems } from "@/sections/menu/featured-items";
import { CartSidebar } from "@/sections/menu/cart-sidebar";
import { ItemDetail } from "@/sections/menu/item-detail";
import { MobileCartButton } from "@/sections/menu/mobile-cart-button";
import { CheckoutModal } from "@/sections/menu/checkout-modal";
import { Header } from "./header";
import { MenuItem } from "@/types/menu";
import { MenuSection } from "./menu-section";

type MenuContentProps = {
  menuItems: MenuItem[];
  selectedItem?: string;
};

export default function MenuContent({
  menuItems,
  selectedItem,
}: MenuContentProps) {
  const [activeCategory, setActiveCategory] = useState("Featured Items");
  const [activeItem, setActiveItem] = useState<MenuItem | null>(
    selectedItem
      ? menuItems.find((item) => item.slug === selectedItem) || null
      : null
  );
  const [isModalOpen, setIsModalOpen] = useState(selectedItem ? true : false);
  const [orderMode, setOrderMode] = useState<"delivery" | "pickup">("delivery");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { items } = useCart();

  // Get unique categories from menu items
  const categories = useMemo(() => {
    const cats = new Set<string>();
    menuItems.forEach((item) => {
      if (item.category) {
        cats.add(item.category);
      }
    });
    return ["Featured Items", ...Array.from(cats).sort()];
  }, [menuItems]);

  // Get featured/popular items
  const featuredItems = useMemo(() => {
    return menuItems.filter((item) => item.is_popular && item.is_available);
  }, [menuItems]);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return menuItems;

    const query = searchQuery.toLowerCase();
    return menuItems.filter(
      (item) =>
        item.is_available &&
        (item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query))
    );
  }, [searchQuery, menuItems]);

  // Group filtered items by category
  const groupedMenuItems = useMemo(() => {
    const grouped: Record<string, MenuItem[]> = {};

    filteredItems.forEach((item) => {
      if (item.is_available) {
        const category = item.category || "Other";
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(item);
      }
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
      <Header
        orderMode={orderMode}
        onOrderModeChange={setOrderMode}
        onCheckout={() => setCheckoutOpen(true)}
      />

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
          <div className="flex-1 section-x overflow-hidden">
            {/* Featured Items Carousel - only show when not searching */}
            {!searchQuery && featuredItems.length > 0 && (
              <div
                ref={(el) => {
                  sectionRefs.current["Featured Items"] = el;
                }}
              >
                <FeaturedItems
                  items={featuredItems}
                  onItemClick={handleItemClick}
                />
              </div>
            )}

            {/* Menu Sections */}
            {Object.entries(groupedMenuItems).map(([category, items]) => (
              <MenuSection
                key={category}
                ref={(el) => {
                  sectionRefs.current[category] = el;
                }}
                title={category}
                items={items}
                onItemClick={handleItemClick}
              />
            ))}

            {/* No results message */}
            {searchQuery && Object.keys(groupedMenuItems).length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg font-medium text-foreground">
                  No items found
                </p>
                <p className="text-muted-foreground mt-1">
                  Try searching for "{searchQuery}" with a different term
                </p>
              </div>
            )}

            {/* No items at all */}
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

          {/* Cart Sidebar - Fixed on right */}
          {items.length > 0 && (
            <div className="hidden lg:block w-[340px] shrink-0">
              <CartSidebar
                orderMode={orderMode}
                onCheckout={() => setCheckoutOpen(true)}
              />
            </div>
          )}
        </div>
      </main>

      <MobileCartButton onCheckout={() => setCheckoutOpen(true)} />

      <ItemDetail
        item={activeItem}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        orderMode={orderMode}
      />
    </div>
  );
}
