"use client";
import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Command, CommandInput, CommandEmpty } from "@/components/ui/command";

export default function MenuGridSearch() {
  const menuItems = [
    {
      id: 1,
      name: "Grilled Pacific Salmon",
      category: "seafood",
      price: "$32",
      description:
        "Wild-caught salmon with lemon herb butter, seasonal vegetables, and quinoa pilaf",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749649602/Better-than-Takeout-Butter-Chicken-2_gsc0jl.jpg",
      rating: 4.9,
      popular: true,
    },
    {
      id: 2,
      name: "Lobster Thermidor",
      category: "seafood",
      price: "$48",
      description:
        "Fresh Maine lobster in creamy cognac sauce, gratinéed to perfection",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749649054/Indian-Samosas-sq_qbbzse.jpg",
      rating: 4.8,
      popular: true,
    },
    {
      id: 3,
      name: "Seafood Paella",
      category: "main",
      price: "$38",
      description:
        "Traditional Spanish rice with mussels, clams, shrimp, and saffron",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749649547/paneer-tikka_od5jp7.jpg",
      rating: 4.7,
      popular: false,
    },
    {
      id: 4,
      name: "Pan-Seared Halibut",
      category: "seafood",
      price: "$36",
      description:
        "Alaskan halibut with roasted tomato coulis and Mediterranean vegetables",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749649679/slow-cooker-lamb-rogan-josh-featured-c_hqwlcl.jpg",
      rating: 4.9,
      popular: false,
    },
    {
      id: 5,
      name: "Coastal Cioppino",
      category: "main",
      price: "$34",
      description:
        "San Francisco-style seafood stew with dungeness crab, prawns, and fresh fish",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749649844/Vegan-Dal-Makhani-Square-2_cltyup.jpg",
      rating: 4.8,
      popular: true,
    },
    {
      id: 6,
      name: "Oysters Rockefeller",
      category: "starters",
      price: "$18",
      description:
        "Fresh oysters baked with spinach, herbs, and parmesan cheese",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749649927/indonesian_biryani_17351_16x9_iwhvdr.jpg",
      rating: 4.6,
      popular: false,
    },
  ];

  const [search, setSearch] = useState("");

  const filteredItems = menuItems.filter((item) =>
    `${item.name} ${item.description} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="section bg-white">
      <div className="container">
        <Command className="mb-4">
          <CommandInput
            placeholder="Search menu items..."
            onValueChange={setSearch}
            className="border-2 border-black"
          />
          {filteredItems.length === 0 && (
            <CommandEmpty>No menu items found.</CommandEmpty>
          )}
        </Command>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full"
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
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-blue-600">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
