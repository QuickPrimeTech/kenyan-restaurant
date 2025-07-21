"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const images = [
  {
    id: 1,
    category: "food",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750625413/chargrilled-tuna-beans-and-potatoes-with-summer-herb-dressing-20738-1_rj3tmi.jpg",
    title: "Grilled Pacific Salmon",
  },
  {
    id: 2,
    category: "interior",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750625320/9_4_11zon-2048x1365-1_1_g99sqg.webp",
    title: "Main Dining Room",
  },
  {
    id: 3,
    category: "views",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750625229/6_3_11zon-min-2048x1365-1_qlnnp9.webp",
    title: "Sunset Ocean View",
  },
  {
    id: 4,
    category: "events",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750625055/octopus-curry_ynoaz6.jpg",
    title: "Wedding Reception",
  },
  {
    id: 5,
    category: "food",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750624866/piri-piri-snapper-scaled_e4ilnw.jpg",
    title: "Lobster Thermidor",
  },
  {
    id: 6,
    category: "interior",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750620816/the-wedding-photographer-seychelles-laurent-levy-mahe-studio-digifot-A-720x720_qbiitb.jpg",
    title: "Private Dining Room",
  },
  {
    id: 7,
    category: "views",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750266050/455289058_1500707817206510_6889315058520713282_n_i0pzf6.jpg",
    title: "Beachside Terrace",
  },
  {
    id: 8,
    category: "events",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1750251810/P1010148_rvgfg2.jpg",
    title: "Corporate Event",
  },
  {
    id: 9,
    category: "food",
    src: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749847942/crumble-2024x1518_yxs0ca.jpg",
    title: "Seafood Paella",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "interior", label: "Interior" },
  { id: "events", label: "Events" },
  { id: "views", label: "Ocean Views" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <>
      {/* Filter Bar */}
      <section className="py-6 border-b sticky top-16 z-10 bg-background">
        <div className="container">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 px-4">
              {filters.map((f) => (
                <Button
                  key={f.id}
                  variant={filter === f.id ? "default" : "outline"}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* Image Grid */}
      <section className="section">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((img, i) => (
            <Dialog
              key={img.id}
              onOpenChange={(open) => !open && setLightboxIndex(null)}
            >
              <DialogTrigger asChild>
                <div
                  onClick={() => setLightboxIndex(i)}
                  className="relative group aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-lg font-medium">
                      {img.title}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-6xl w-[95vw] max-h-[80vh] p-0 border-0">
                <div className="relative w-full h-full overflow-hidden">
                  <Carousel
                    opts={{
                      startIndex: lightboxIndex ?? 0,
                      loop: true,
                    }}
                    className="w-full h-full"
                  >
                    <CarouselContent className="h-full">
                      {filteredImages.map((img) => (
                        <CarouselItem
                          key={img.id}
                          className="w-full flex flex-col justify-center items-center pl-6 pr-2 pt-12 pb-6 h-full"
                        >
                          <div className="relative w-full aspect-3/2 max-h-[600px] overflow-hidden rounded-lg flex items-center justify-center">
                            <Image
                              src={img.src || "/placeholder.svg"}
                              alt={img.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 70vw"
                            />
                          </div>
                          <p className="text-center mt-4 text-base md:text-lg text-muted-foreground px-4">
                            {img.title}
                          </p>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                  </Carousel>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>
    </>
  );
}
