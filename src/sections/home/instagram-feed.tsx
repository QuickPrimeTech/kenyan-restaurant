"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { H2, Paragraph } from "@/components/ui/typography";

const instagramPosts = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750622768/top-view-of-modern-elegant-black-plate-with-juicy-appetizing-piece-of-cheese-with-sprig-of-rosemary-on-white-background-concept-of-delicious-food-with-good-compos_lirwl7.jpg",
    caption: "Fresh catch of the day! 🐟 #BahariRestaurant #FreshSeafood",
    likes: 234,
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750622769/P1250603ed-1024x683_k1q1yr.jpg",
    caption: "Sunset dining at its finest 🌅 #OceanView #BahariExperience",
    likes: 189,
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750622770/1000_F_263905408_6UUFBmYozpjnvATkiABaJSOlWf2jcFYY_iboyas.jpg",
    caption: "Our signature seafood platter 🦞 #BahariSpecial #Seafood",
    likes: 312,
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750622767/SG231006_STM_GRP_E_B_Food_Photography_Blog_Assets_Oct_2023_1920x500_top_banner1__1_-768x500_khsf9u.jpg",
    caption: "Behind the scenes with our chef 👨‍🍳 #BehindTheScenes #ChefLife",
    likes: 156,
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750622777/homemade-cupcakes_mgidyu.jpg",
    caption: "Perfect evening for outdoor dining 🌊 #AlFresco #OceanBreeze",
    likes: 278,
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750622777/pexels-photo-16936004_li3fa4.jpg",
    caption:
      "Celebrating another successful event! 🎉 #PrivateEvents #Celebration",
    likes: 201,
  },
];

export default function InstagramSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section
      className="section bg-grey-bg"
      id="follow-us"
      aria-labelledby="follow-us-header"
    >
      <div className="text-center mb-12">
        <H2 className="mb-4" id="follow-us-header">
          Follow Us on Instagram
        </H2>
        <Paragraph>
          Stay connected with our latest dishes, events, and ocean views
        </Paragraph>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {instagramPosts.map((post) => (
            <CarouselItem
              key={post.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="overflow-hidden transition-colors duration-300 group py-0 pb-3">
                <CardHeader className="px-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      fill
                      src={post.image}
                      alt={`Instagram post ${post.id}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/50 text-white">
                      <div className="text-center p-4">
                        <Instagram className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">
                          {post.likes} likes
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardFooter className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.caption}
                  </p>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>

      <div className="text-center mt-12">
        <Button asChild className="w-auto">
          <Link
            href="https://www.instagram.com/quickprimetech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-4 w-4" />
            Follow Us
          </Link>
        </Button>
      </div>
    </section>
  );
}
