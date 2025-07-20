"use client";

import { useState } from "react";
import { menuItems } from "@/data/menu";
import { SearchBar } from "@/components/search-bar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingBag, Star, Plus } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

const categories = [...new Set(menuItems.map((item) => item.category))];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { addItem, items } = useCart();

  // Filter menu items based on selected category
  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    addItem(item);
    // You could add a toast notification here
    console.log(`Added ${item.name} to cart!`);
  };

  // Get quantity of item in cart
  const getItemQuantity = (itemId: string) => {
    const cartItem = items.find((item) => String(item.id) === itemId);
    return cartItem?.quantity || 0;
  };

  return (
    <section className="mt-10 bg-white pb-20">
      {/* Sticky Search */}
      <div className="w-full sticky top-16 z-20 bg-white shadow-md py-2 section-x">
        <SearchBar
          menuItems={menuItems}
          categories={categories}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Category Info */}
      <div className="section-x mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            {selectedCategory || "All Items"}
          </h2>
          <span className="text-sm text-gray-600">
            {filteredMenuItems.length} item
            {filteredMenuItems.length !== 1 ? "s" : ""}
          </span>
        </div>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory("")}
            className="text-sm text-primary hover:underline mt-2"
          >
            ← Back to all items
          </button>
        )}
      </div>

      {/* Filtered Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 section-x">
        {filteredMenuItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found in this category.
            </p>
          </div>
        ) : (
          filteredMenuItems.map((item) => {
            const quantityInCart = getItemQuantity(String(item.id));

            return (
              <Card
                key={item.id}
                id={`menu-item-${item.id}`}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full py-0 pb-3 relative"
              >
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {item.popular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">
                      {item.rating}
                    </span>
                  </div>

                  {/* Quick Add Button - Top Right Corner */}
                  <Button
                    size="sm"
                    className="absolute bottom-4 right-4 rounded-full h-10 w-10 p-0 shadow-lg"
                    onClick={() => handleAddToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between gap-4 items-start mb-3">
                    <h3 className="font-serif text-xl font-bold text-gray-900 flex-1">
                      {item.name}
                    </h3>
                    <span className="text-xl font-bold text-primary whitespace-nowrap">
                      Ksh {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      {item.category}
                    </span>
                    {quantityInCart > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        {quantityInCart} in cart
                      </span>
                    )}
                  </div>

                  {/* Main Add to Cart Button */}
                  <Button
                    className="w-full"
                    variant="default"
                    size="lg"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                    {quantityInCart > 0 && (
                      <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                        +{quantityInCart}
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Instructions for cart */}
      <div className="section mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            How to use the cart:
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>1. Click &apos;Add to Cart&apos; on any menu item</p>
            <p>2. The cart icon will appear at the bottom left corner</p>
            <p>3. Click the cart icon to see a quick preview</p>
            <p>
              4. Click &apos;Checkout&apos; to see the full cart and adjust
              quantities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
