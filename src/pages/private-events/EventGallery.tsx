"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function EventGallery() {
  const [filter, setFilter] = useState("all");

  const galleryImages = [
    {
      id: 1,
      category: "weddings",
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1750655735/origin-cruise-galapagos-restaurant_tx8pxx.webp",
      title: "Beach Wedding Reception",
    },
    {
      id: 2,
      category: "corporate",
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1750662294/SEY_885_original_ecrxni.jpg",
      title: "Corporate Dinner",
    },
    {
      id: 3,
      category: "celebrations",
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1750673645/cfa9719a_icomfs.jpg",
      title: "Anniversary Celebration",
    },
    {
      id: 4,
      category: "weddings",
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1750662213/blue-hill-seychelles-events-meeting4-682d04b4747125d681cc667bac3d6b92_err67t.jpg",
      title: "Intimate Wedding Ceremony",
    },
    {
      id: 5,
      category: "corporate",
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1750657126/Culinary_20Lifestyle_20Nick_20Punta_20Cana_2012_cvmjo3.webp",
      title: "Business Lunch",
    },
    {
      id: 6,
      category: "celebrations",
      image:
        "https://res.cloudinary.com/dhlyei79o/image/upload/v1750622768/Old-Lisbon_ko8yfm.jpg",
      title: "Birthday Party",
    },
  ];

  const filters = [
    { id: "all", name: "All Events" },
    { id: "weddings", name: "Weddings" },
    { id: "corporate", name: "Corporate" },
    { id: "celebrations", name: "Celebrations" },
  ];

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Event Gallery</h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            See how we&apos;ve brought our clients&apos; visions to life in our
            beautiful coastal setting
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterOption) => (
            <Button
              size={"lg"}
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-6 py-3 font-medium transition-all duration-300`}
            >
              {filterOption.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <Image
                src={image.image || "/placeholder.svg"}
                alt={image.title}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="font-semibold text-lg">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
