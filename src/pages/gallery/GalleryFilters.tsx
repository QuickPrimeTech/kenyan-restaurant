"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

type GalleryFiltersProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

function GalleryFilters({
  activeFilter,
  setActiveFilter,
}: GalleryFiltersProps) {
  const filters = [
    { id: "all", name: "All Photos" },
    { id: "food", name: "Food" },
    { id: "interior", name: "Interior" },
    { id: "events", name: "Events" },
    { id: "views", name: "Ocean Views" },
  ];

  return (
    <section className="py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3  font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-blue-400 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

type GalleryGridProps = {
  filteredImages: {
    id: number;
    category: string;
    src: string;
    title: string;
  }[];
};

function GalleryGrid({ filteredImages }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % filteredImages.length);
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );

  return (
    <>
      <section className="section">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={32} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft size={48} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight size={48} />
          </button>
          <div className="max-w-4xl max-h-[80vh] mx-4">
            <Image
              src={filteredImages[currentImage].src}
              alt={filteredImages[currentImage].title}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            <p className="text-white text-center mt-4 text-lg">
              {filteredImages[currentImage].title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <>
      <GalleryFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <GalleryGrid filteredImages={filteredImages} />
    </>
  );
}
