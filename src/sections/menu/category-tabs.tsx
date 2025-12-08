"use client";
import { useRef, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@ui/button";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryClick,
  searchQuery,
  onSearchChange,
}: CategoryTabsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Find the Radix viewport and set up scroll listener
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
    window.addEventListener("resize", update);

    return () => {
      viewport.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (searchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchExpanded]);

  useEffect(() => {
    if (!viewportRef.current) return;

    const viewport = viewportRef.current;
    const buttons = Array.from(viewport.querySelectorAll("button"));

    const activeBtn = buttons.find(
      (btn) => btn.textContent?.trim() === activeCategory
    );

    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  const scroll = (direction: "left" | "right") => {
    const el = viewportRef.current;
    if (!el) return;

    const scrollAmount = 200;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleSearchClose = () => {
    setSearchExpanded(false);
    onSearchChange("");
  };

  return (
    <div className="sticky top-16 lg:top-20 z-40 py-3 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="relative section-x flex items-center gap-2">
        {/* Search Icon Button / Expanded Search */}
        <div
          className={cn(
            "flex items-center transition-all duration-300 ease-out max-w-lg",
            searchExpanded ? "flex-1" : "flex-none"
          )}
        >
          {searchExpanded ? (
            <InputGroup>
              <InputGroupInput
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search menu items..."
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align={"inline-end"}>
                <InputGroupButton asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon-sm"}
                    className="absolute right-3 p-1 hover:bg-background rounded-full"
                    onClick={handleSearchClose}
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          ) : (
            <Button
              variant="secondary"
              size="icon-lg"
              onClick={() => setSearchExpanded(true)}
              title="Search menu items"
            >
              <Search />
            </Button>
          )}
        </div>

        {/* Tabs - hide when search is expanded */}
        {!searchExpanded && (
          <div className="relative flex flex-1">
            <ScrollArea ref={rootRef} className="w-0 flex-1">
              <div className="flex gap-1 pb-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => onCategoryClick(category)}
                    variant={
                      activeCategory === category ? "default" : "secondary"
                    }
                    className="rounded-full whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Gradient overlays */}
            {canScrollRight && (
              <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background via-background/80 to-transparent" />
            )}
            {canScrollLeft && (
              <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
