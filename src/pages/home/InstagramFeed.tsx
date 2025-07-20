"use client";

import { useState, useEffect } from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function InstagramSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, instagramPosts.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="section bg-grey-bg">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl font-bold mb-4">
          Follow Us on Instagram
        </h2>
        <p className="text-lg mb-6">
          Stay connected with our latest dishes, events, and ocean views
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {instagramPosts.map((post) => (
              <div
                key={post.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <Card className="overflow-hidden transition-colors duration-300 group">
                  <CardHeader className="px-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        fill
                        src={post.image || "/placeholder.svg"}
                        alt={`Instagram post ${post.id}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
              </div>
            ))}
          </div>
        </div>

        {maxIndex > 0 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {maxIndex > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <Button asChild className="w-auto">
          <Link
            href="https://www.instagram.com/quickprimetech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-4 w-4 mr-2" />
            Follow Us on Instagram
          </Link>
        </Button>
      </div>
    </section>
  );
}
