"use client";
import { useState, useRef, useMemo } from "react";
import { useCart } from "@/hooks/use-cart";
import { CategoryTabs } from "@/sections/menu/category-tabs";
import { MenuSection } from "@/sections/menu/menu-section";
import { FeaturedItems } from "@/sections/menu/featured-items";
import { CartSidebar } from "@/sections/menu/cart-sidebar";
import { ItemDetail } from "@/sections/menu/item-detail";
import { MobileCartButton } from "@/sections/menu/mobile-cart-button";
import { CheckoutModal } from "@/sections/menu/checkout-modal";
import { menuData } from "@/lib/menu-data";
import { Header } from "./header";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  calories?: number;
  popular?: boolean;
};

export default function MenuContent() {
  const [activeCategory, setActiveCategory] = useState("Featured Items");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderMode, setOrderMode] = useState<"delivery" | "pickup">("delivery");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { items } = useCart();

  const categories = Object.keys(menuData);

  const featuredItems = useMemo(() => {
    const allItems: MenuItem[] = [];
    Object.values(menuData).forEach((items) => {
      items.forEach((item) => {
        if (item.popular) {
          allItems.push(item);
        }
      });
    });
    return allItems;
  }, []);

  const filteredMenuData = useMemo(() => {
    if (!searchQuery.trim()) return menuData;
    const query = searchQuery.toLowerCase();
    const filtered: typeof menuData = {};
    Object.entries(menuData).forEach(([category, items]) => {
      const matchingItems = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
      if (matchingItems.length > 0) {
        filtered[category] = matchingItems;
      }
    });
    return filtered;
  }, [searchQuery]);

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
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
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
            {!searchQuery && (
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
            {Object.keys(filteredMenuData).map((category) => (
              <MenuSection
                key={category}
                ref={(el) => {
                  sectionRefs.current[category] = el;
                }}
                title={category}
                items={filteredMenuData[category]}
                onItemClick={handleItemClick}
              />
            ))}

            {/* No results message */}
            {searchQuery && Object.keys(filteredMenuData).length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg font-medium text-foreground">
                  No items found
                </p>
                <p className="text-muted-foreground mt-1">
                  Try a different search term
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
        item={selectedItem}
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
