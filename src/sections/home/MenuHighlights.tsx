"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Leaf, GlassWater } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { H2, Paragraph, Large } from "@/components/ui/typography";

export default function MenuHighlights() {
  const highlightedDishes = [
    {
      id: 1,
      name: "Grilled Mahi-Mahi",
      description:
        "Fresh Pacific mahi-mahi with coconut rice, grilled pineapple, and cilantro-lime sauce.",
      price: 32.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1748901618/samples/food/pot-mussels.jpg",
      dietary: ["gluten-free"],
      featured: true,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Lobster Thermidor",
      description:
        "Maine lobster tail with creamy cognac sauce, gruyere cheese, and herb-crusted potatoes.",
      price: 48.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1748901618/samples/food/fish-vegetables.jpg",
      dietary: [],
      featured: true,
      rating: 5.0,
    },
    {
      id: 3,
      name: "Seafood Paella",
      description:
        "Traditional Spanish paella with prawns, mussels, calamari, and saffron-infused bomba rice.",
      price: 36.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1748901617/samples/food/dessert.jpg",
      dietary: ["dairy-free"],
      featured: true,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Grilled Pork",
      description:
        "Charcoal-grilled pork chops served with mango slaw and tamarind glaze.",
      price: 28.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1748901618/samples/food/pot-mussels.jpg",
      dietary: ["gluten-free"],
      featured: true,
      rating: 4.9,
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
    <section className="bg-background py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <H2 className="text-foreground">Menu Highlights</H2>
          <Paragraph className="text-muted-foreground max-w-2xl mx-auto font-medium">
            Discover our chef&apos;s featured selections — vibrant, ocean-fresh,
            and beautifully plated.
          </Paragraph>
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {highlightedDishes.map((dish) => (
              <CarouselItem
                key={dish.id}
                className="pl-4 basis-full sm:basis-1/1 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="overflow-hidden h-full py-0 pb-3 flex flex-col border-muted bg-white">
                  <div className="relative aspect-[4/3]">
                    <Image
                      fill
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    {dish.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge>Chef&apos;s Choice</Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-background">
                        <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                        {dish.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-background px-3 py-1 rounded-full text-sm font-semibold text-foreground">
                      ${dish.price}
                    </div>
                  </div>

                  <CardContent className="p-6 grow">
                    <div className="space-y-3">
                      <Large className="text-foreground">{dish.name}</Large>
                      <Paragraph className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {dish.description}
                      </Paragraph>
                      {dish.dietary.length > 0 && (
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
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex justify-center gap-6">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <Paragraph className="text-muted-foreground mb-4">
            Explore our complete selection of ocean-inspired dishes
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="px-6 py-3 rounded-lg">
                View Full Menu
              </Button>
            </Link>
            <Link href="/reservations">
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-3 rounded-lg"
              >
                Make Reservation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
