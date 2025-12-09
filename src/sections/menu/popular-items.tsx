"use client";
import { useRef, useState, useEffect } from "react";
import type { MenuItem } from "@/types/menu";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MenuItemCard } from "./menu-item-card";
import { cn } from "@/lib/utils";

interface FeaturedItemsProps {
  items: MenuItem[];
  showTitle?: boolean;
  setActiveItem: (menuItem: MenuItem) => void;
}

export function PopularItems({
  items,
  showTitle = true,
  setActiveItem,
}: FeaturedItemsProps) {
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
    <section id="popular-items">
      {/* Header with arrows */}
      <div
        className={cn(
          "flex items-center justify-between mb-4",
          !showTitle && "justify-end"
        )}
      >
        {showTitle && (
          <h2 className="text-[22px] font-bold text-foreground">
            Popular Dishes
          </h2>
        )}

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
      <ScrollArea ref={rootRef} className="-mx-4 md:-mx-6 lg:-mx-8">
        <div className="flex gap-4 pb-4 pl-4 pr-6 md:pl-6 lg:pl-8">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              orientation="square"
              variant="popular"
              onClick={() => {
                setActiveItem(item);
              }}
            />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
