"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Leaf, GlassWater } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function MenuHighlights() {
  const highlightedDishes = [
    {
      id: 1,
      name: "Grilled Mahi-Mahi",
      description:
        "Fresh Pacific mahi-mahi with coconut rice, grilled pineapple, and cilantro-lime sauce",
      price: 32.0,
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1748901618/samples/food/pot-mussels.jpg",
      dietary: ["gluten-free"],
      featured: true,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Lobster Thermidor",
      description:
        "Maine lobster tail with creamy cognac sauce, gruyere cheese, and herb-crusted potatoes",
      price: 48.0,
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1748901618/samples/food/fish-vegetables.jpg",
      dietary: [],
      featured: true,
      rating: 5.0,
    },
    {
      id: 3,
      name: "Seafood Paella",
      description:
        "Traditional Spanish paella with prawns, mussels, calamari, and saffron-infused bomba rice",
      price: 36.0,
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1748901617/samples/food/dessert.jpg",
      dietary: ["dairy-free"],
      featured: true,
      rating: 4.8,
    },
  ];

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case "gluten-free":
        return <GlassWater className="h-3 w-3" />;
      case "dairy-free":
        return <Leaf className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <section className="section font-roboto bg-[#fcfafa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 font-bold">Menu Highlights</h2>
          <p className="text-lg max-w-2xl mx-auto font-semibold">
            Discover our chef&apos;s featured selections, crafted with the
            finest ingredients from the sea
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightedDishes.map((dish) => (
            <Card key={dish.id} className="overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  fill
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  // sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />

                {dish.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge>Chef&apos;s Choice</Badge>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <Badge variant="outline">
                    <Star className="h-3 w-3 mr-1" />
                    {dish.rating}
                  </Badge>
                </div>

                <div className="absolute bottom-3 right-3">
                  <div className="px-3 py-1 rounded-full">${dish.price}</div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{dish.name}</h3>

                  <p className="text-sm leading-relaxed line-clamp-3">
                    {dish.description}
                  </p>

                  {dish.dietary && dish.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {dish.dietary.map((diet, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          <span className="flex items-center gap-1">
                            {getDietaryIcon(diet)}
                            <span className="capitalize">
                              {diet.replace("-", " ")}
                            </span>
                          </span>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="mb-4">
            Explore our complete selection of ocean-fresh dishes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="px-6 py-3 rounded-lg">
                View Full Menu
              </Button>
            </Link>
            <Link href="/reservations">
              <Button size="lg" className="px-6 py-3 rounded-lg">
                Make Reservation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
