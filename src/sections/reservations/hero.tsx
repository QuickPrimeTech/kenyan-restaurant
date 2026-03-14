// @/sections/reservations/hero.tsx

import { ImageWithFallback } from "@/components/ui/image";

export const HeroSection = () => (
  <section className="relative aspect-3/1 overflow-hidden">
    <ImageWithFallback
      src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1773074102/imgi_184_outdoor-restaurant-at-the-beach-table-setting-at-tropical-beach-restaurant-led-light-candles-and-wooden-tables-chairs-under-beautiful-sunset-sky-sea-view-luxury-hotel-or-reso_qfbmap.jpg"
      fill
      alt="Image of ziwa restaurant table that is to be reserved"
      className="object-cover"
    />
    <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/40 to-black/30" />
    <div className="relative z-10 h-full flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-white mb-6">
          Reserve Your Table
        </h1>
        <p className="text-xl text-white/70 font-chivo max-w-3xl mx-auto">
          Secure your seat at Li&apos;s Chinese Restaurant for an unforgettable
          dining experience
        </p>
      </div>
    </div>
  </section>
);
