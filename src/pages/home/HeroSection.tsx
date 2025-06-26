"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import clsx from "clsx";

const images = [
  "https://res.cloudinary.com/dhlyei79o/image/upload/v1750622777/pexels-photo-16936004_li3fa4.jpg",
  "https://res.cloudinary.com/dhlyei79o/image/upload/v1750701595/684176a824d3292883204061_Waterfront_Dining-_Best_Restaurants_with_a_View_in_South_Florida_yzegnw.jpg",
  "https://res.cloudinary.com/dhlyei79o/image/upload/v1750622770/1000_F_263905408_6UUFBmYozpjnvATkiABaJSOlWf2jcFYY_iboyas.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fading Images */}
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`Background ${i}`}
          fill
          className={clsx(
            "object-cover transition-opacity duration-1000 absolute inset-0",
            {
              "opacity-0": i !== current,
              "opacity-100": i === current,
            }
          )}
          priority={i === 0}
        />
      ))}

      {/* Overlay */}
      <div className="absolute h-full w-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 text-background ">
        <h1 className=" font-roboto text-5xl md:text-7xl font-bold mb-6">
          Bahari
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light">
          Where Ocean Meets Culinary Excellence
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/menu">Explore Our Menu</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-foreground"
          >
            <Link href="/reservations">Reserve Your Table</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
