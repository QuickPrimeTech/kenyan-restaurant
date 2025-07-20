"use client";

import { useState } from "react";
import { menuItems } from "@/data/menu";
import { SearchBar } from "@/components/search-bar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";

const categories = [...new Set(menuItems.map((item) => item.category))];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Filter menu items based on selected category
  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section className="mt-10 bg-white">
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
      <div className="section-x mt-12">
        <div className="flex items-center justify-between">
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory("")}
              className="text-sm text-primary hover:underline"
            >
              ← Back to all items
            </button>
          )}
          <h2 className="text-lg font-bold text-muted-foreground">
            {selectedCategory || "All Items"}(
            <span className="text-sm text-gray-600">
              {filteredMenuItems.length} item
              {filteredMenuItems.length !== 1 ? "s" : ""}
            </span>
            )
          </h2>
        </div>
      </div>

      {/* Filtered Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-x mt-8">
        {filteredMenuItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found in this category.
            </p>
          </div>
        ) : (
          filteredMenuItems.map((item) => (
            <Card
              key={item.id}
              id={`menu-item-${item.id}`}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full py-0 pb-3"
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
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    {item.category}
                  </span>
                </div>
                <Button className="mt-4 w-full" variant="default" size="lg">
                  <ShoppingBag />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
