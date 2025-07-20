"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { MenuItem } from "@/types/menu";

interface SearchBarProps {
  menuItems: MenuItem[];
  categories: string[];
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

export function SearchBar({
  menuItems,
  categories,
  onCategorySelect,
  selectedCategory,
}: SearchBarProps) {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Touch tracking for mobile scroll vs tap detection
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );

  const filteredItems = menuItems.filter((item) =>
    `${item.name} ${item.description} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        if (search === "" && !isDesktop) {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [search, isDesktop]);

  const handleItemSelect = (item: MenuItem) => {
    setSearch(item.name);
    setShowSuggestions(false);

    const target = document.getElementById(`menu-item-${item.id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Handle touch start - record initial position and time
  const handleTouchStart = (item: MenuItem, e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  // Handle touch end - determine if it was a tap or scroll
  const handleTouchEnd = (item: MenuItem, e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Consider it a tap if:
    // - Touch duration is less than 300ms AND
    // - Movement is less than 10px in any direction
    const isTap = deltaTime < 300 && deltaX < 10 && deltaY < 10;

    if (isTap) {
      e.preventDefault();
      handleItemSelect(item);
    }

    touchStartRef.current = null;
  };

  return (
    <div className="sticky top-4 z-40 bg-background/80 backdrop-blur-sm border rounded-lg p-2 shadow-sm">
      <div className="relative flex items-center gap-3" ref={containerRef}>
        <div className="relative flex items-center">
          {!isDesktop && (
            <>
              <div
                className={`flex items-center justify-center transition-all duration-300 ${
                  isSearchExpanded
                    ? "w-8 h-8 absolute left-1 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    : "w-8 h-8 cursor-pointer hover:bg-muted rounded-md"
                }`}
                onClick={() => {
                  setIsSearchExpanded(true);
                  setTimeout(() => inputRef.current?.focus(), 100);
                }}
              >
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isSearchExpanded ? "w-64" : "w-0"
                }`}
              >
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search menu..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className={`h-8 pl-9 pr-3 border-0 bg-transparent focus-visible:ring-0 text-sm ${
                    isSearchExpanded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {isSearchExpanded && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchExpanded(false);
                    setSearch("");
                    setShowSuggestions(false);
                  }}
                  className="ml-1 h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </>
          )}

          {isDesktop && (
            <div className="flex items-center relative">
              <div className="flex items-center justify-center w-8 h-8 absolute left-1 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="h-9 pl-9 pr-4 w-80 lg:w-96 border bg-background/50 focus-visible:ring-1 text-sm"
              />
            </div>
          )}
        </div>

        <div
          className={`flex items-center transition-all duration-300 overflow-hidden ${
            !isDesktop && isSearchExpanded
              ? "w-0 opacity-0 pointer-events-none"
              : "flex-1 opacity-100"
          }`}
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 flex-1">
            <Button
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect?.("")}
              className="whitespace-nowrap flex-shrink-0 h-7 text-xs px-3"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategorySelect?.(category)}
                className="whitespace-nowrap flex-shrink-0 h-7 text-xs px-3"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {search && showSuggestions && (isSearchExpanded || isDesktop) && (
        <div className="absolute left-2 right-2 top-full mt-2 bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-3 text-muted-foreground text-sm text-center">
              No results found
            </div>
          ) : (
            <div className="py-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-muted transition-colors active:bg-muted/50"
                  // Desktop: Use click event
                  onClick={isDesktop ? () => handleItemSelect(item) : undefined}
                  // Mobile: Use touch events with scroll detection
                  onTouchStart={
                    !isDesktop ? (e) => handleTouchStart(item, e) : undefined
                  }
                  onTouchEnd={
                    !isDesktop ? (e) => handleTouchEnd(item, e) : undefined
                  }
                  // Keyboard accessibility
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleItemSelect(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  style={{
                    // Allow scrolling on mobile
                    touchAction: isDesktop ? "auto" : "pan-y",
                  }}
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/placeholder.svg?height=48&width=48&text=${encodeURIComponent(
                          item.name.charAt(0)
                        )}`;
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-medium text-primary">
                        {item.price}
                      </p>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
