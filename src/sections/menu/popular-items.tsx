"use client";
import { useRef, useState, useEffect } from "react";
import type { MenuItem } from "@/types/menu";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { MenuItemCard } from "./menu-item-card";

interface FeaturedItemsProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export function PopularItems({ items, onItemClick }: FeaturedItemsProps) {
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
          Popular Dishes
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
              <MenuItemCard
                key={item.id}
                item={item}
                orientation="square"
                variant="popular"
                onClick={() => onItemClick(item)}
                onAdd={() =>
                  console.log("about to add popular item --->", item)
                }
              />
            </Link>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
