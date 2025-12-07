"use client";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { Button } from "@ui/button";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    if (searchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchExpanded]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSearchClose = () => {
    setSearchExpanded(false);
    onSearchChange("");
  };

  return (
    <div className="sticky top-16 z-40 py-3 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="relative section-x flex items-center gap-2">
        {/* Left Arrow */}
        {canScrollLeft && !searchExpanded && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full h-8 w-8"
            onClick={() => scroll("left")}
          >
            <ArrowLeft />
          </Button>
        )}

        {/* Search Icon Button / Expanded Search */}
        <div
          className={cn(
            "flex items-center transition-all duration-300 ease-out",
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
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-secondary hover:bg-secondary/80"
              onClick={() => setSearchExpanded(true)}
              title="Search menu items"
            >
              <Search className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Tabs - hide when search is expanded */}
        {!searchExpanded && (
          <div
            ref={scrollRef}
            className="flex gap-1 overflow-x-auto scrollbar-hide flex-1"
            onScroll={checkScroll}
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => onCategoryClick(category)}
                variant={activeCategory === category ? "default" : "secondary"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Right Arrow */}
        {canScrollRight && !searchExpanded && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full h-8 w-8"
            onClick={() => scroll("right")}
          >
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}
