"use client";

import { useRef, useState, useEffect } from "react";
import type { MenuItem } from "@/types/menu";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

interface FeaturedItemsProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export function FeaturedItems({ items, onItemClick }: FeaturedItemsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Find the Radix viewport
  useEffect(() => {
    if (!rootRef.current) return;

    const viewport = rootRef.current.querySelector(
      "[data-slot='scroll-area-viewport']"
    ) as HTMLDivElement | null;

    if (!viewport) return;

    viewportRef.current = viewport;

    const update = () => {
      const el = viewportRef.current;
      if (!el) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    update();
    viewport.addEventListener("scroll", update);

    return () => viewport.removeEventListener("scroll", update);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = viewportRef.current;
    if (!el) return;

    const scrollAmount = 320;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-20 py-4">
      {/* Header with arrows */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-bold text-foreground">
          Featured Items
        </h2>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ArrowLeft />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Scroll Area */}
      <ScrollArea ref={rootRef} className="-mx-4 px-4">
        <div className="flex gap-4 pb-4 w-max">
          {items.map((item) => (
            <Link href={`/menu?selected-item=${item.slug}`} key={item.id}>
              <div className="flex-shrink-0 w-40 md:w-50 cursor-pointer group">
                <div className="relative w-full aspect-square mb-2 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    fill
                    src={item.image_url}
                    placeholder={item.lqip ? "blur" : "empty"}
                    blurDataURL={item.lqip || undefined}
                    alt={item.name}
                    className="object-cover"
                  />

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemClick(item);
                    }}
                    size="icon"
                    variant="outline"
                    className="absolute bottom-2 right-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Plus className="text-foreground" strokeWidth={3.5} />
                  </Button>
                </div>

                <h3 className="md:text-lg font-medium text-foreground leading-tight line-clamp-2 mb-0.5">
                  {item.name}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground">
                  Ksh {item.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
