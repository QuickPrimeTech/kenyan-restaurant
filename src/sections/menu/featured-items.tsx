"use client";
import type React from "react";
import { useRef, useState, useEffect } from "react";
import type { MenuItem } from "@/types/menu";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

interface FeaturedItemsProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export function FeaturedItems({ items, onItemClick }: FeaturedItemsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  };

  return (
    <div className="py-4">
      {/* Header with arrows */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[22px] font-bold text-foreground">
          Featured Items
        </h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => scroll("left")}
            size={"icon-sm"}
            className="rounded-full"
            disabled={!canScrollLeft}
          >
            <ArrowLeft />
          </Button>
          <Button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            size={"icon-sm"}
            className="rounded-full"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4"
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="flex-shrink-0 w-[150px] cursor-pointer group"
          >
            {/* Square image container */}
            <div className="relative w-[150px] h-[150px] mb-2">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover rounded-xl"
              />
              {/* Plus button - Uber Eats style */}
              <button
                onClick={(e) => handleQuickAdd(e, item)}
                className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Plus className="size-5 text-black" strokeWidth={2.5} />
              </button>
            </div>
            {/* Item info */}
            <h3 className="text-[15px] font-medium text-foreground leading-tight line-clamp-2 mb-0.5">
              {item.name}
            </h3>
            <p className="text-[15px] text-foreground">
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
