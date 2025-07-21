import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DynamicImage } from "@/components/dynamic-image";
import { Calendar, ShoppingBag } from "lucide-react";

const images = [
  "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750622777/pexels-photo-16936004_li3fa4.jpg", // seafood dish
  "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750701595/684176a824d3292883204061_Waterfront_Dining-_Best_Restaurants_with_a_View_in_South_Florida_yzegnw.jpg", // waterfront view
  "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750622770/1000_F_263905408_6UUFBmYozpjnvATkiABaJSOlWf2jcFYY_iboyas.jpg", // fresh catch
];

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Welcome section of Bahari, a modern seafood restaurant"
    >
      {/* Background Image Carousel */}
      <DynamicImage images={images} />

      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl sm:mx-auto md:mx-0 px-4 text-white text-center sm:text-left">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
          Bahari &ndash; A Taste of the Ocean
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-light">
          Dive into the flavours of the coast — fresh catch, bold spices, and
          oceanfront dining inspired by Kenya&apos;s rich maritime heritage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Button asChild size="lg">
            <Link href="/menu">
              <ShoppingBag /> Order Now
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/reservation">
              <Calendar /> Book a Table
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
