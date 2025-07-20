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
      name: "Nyama Choma Deluxe",
      description:
        "Tender goat meat slow-roasted over charcoal, served with kachumbari and smoky mukimo.",
      price: 26.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000150/imgi_145_Asset4_f24mf2.png",
      dietary: ["gluten-free"],
      featured: true,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Ugali na Tilapia",
      description:
        "Pan-fried tilapia fillet served alongside creamy plantain stew with fresh coriander and garlic.",
      price: 24.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000027/imgi_119_img_2708_uwhwot.webp",
      dietary: ["dairy-free"],
      featured: true,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Githeri Royale",
      description:
        "A refined take on the classic Kikuyu dish—slow-simmered maize and beans with caramelized onions, bell peppers, and coconut cream.",
      price: 19.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000019/imgi_153_potageconti_4eb416b1-978x705_ldrcpa.jpg",
      dietary: ["vegan", "gluten-free"],
      featured: true,
      rating: 4.6,
    },
    {
      id: 4,
      name: "Chapati Wraps with Minced Beef",
      description:
        "Golden flaky chapatis rolled with spicy minced beef, served with tangy tomato chutney.",
      price: 22.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000359/imgi_167_14KOMOLAFE-rex2-rolex-zkfc-mediumSquareAt3X_mijmie.jpg",
      dietary: [],
      featured: true,
      rating: 4.5,
    },
    {
      id: 5,
      name: "Sukumawiki & Spiced Chicken",
      description:
        "Garlic sautéed sukumawiki paired with turmeric-spiced roast chicken and a side of ugali fingers.",
      price: 25.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000504/Sukumawiki_Spiced_Chicken_slzfas.jpg",
      dietary: ["gluten-free"],
      featured: true,
      rating: 4.9,
    },
    {
      id: 6,
      name: "Ndengu Coconut Curry",
      description:
        "Green grams slow-cooked in spiced coconut milk with ginger, served over soft brown rice.",
      price: 21.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000608/imgi_135_maxresdefault_yg2d8m.webp",
      dietary: ["vegan"],
      featured: true,
      rating: 4.7,
    },
    {
      id: 7,
      name: "Ugali Mix",
      description:
        "quality ugali flower cooked and mixed together with spiced meat and sukumawiki",
      price: 21.0,
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000086/imgi_113_30-foods-you-should-eat-in-kenya_yvt5zq.jpg",
      dietary: ["gluten-free", "popular"],
      featured: true,
      rating: 4.7,
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

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Footer CTA */}
        <div className="text-center mt-8">
          <Paragraph className="text-muted-foreground mb-4">
            Explore our complete selection of ocean-inspired dishes
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-6 py-3 rounded-lg" asChild>
              <Link href="/reservations">Make Reservation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-6 py-3 rounded-lg"
              asChild
            >
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
