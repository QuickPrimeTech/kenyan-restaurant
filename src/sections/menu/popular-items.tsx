"use client";
import {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  ComponentProps,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Context for sharing scroll state and controls
type PopularItemsContextType = {
  scroll: (direction: "left" | "right") => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

const PopularItemsContext = createContext<PopularItemsContextType | undefined>(
  undefined
);

const usePopularItems = () => {
  const context = useContext(PopularItemsContext);
  if (!context) {
    throw new Error(
      "usePopularItems must be used within a PopularItems component"
    );
  }
  return context;
};

// Main container component
interface PopularItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollAmount?: number;
}

const PopularItems = ({
  children,
  className,
  scrollAmount = 320,
  ...props
}: PopularItemsProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (!rootRef.current) return;

    const viewport = rootRef.current.querySelector(
      "[data-slot='scroll-area-viewport']"
    ) as HTMLDivElement | null;

    if (!viewport) return;

    viewportRef.current = viewport;

    const handleScroll = () => {
      const el = viewportRef.current;
      if (!el) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    handleScroll();
    viewport.addEventListener("scroll", handleScroll);

    return () => viewport.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = viewportRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <PopularItemsContext.Provider
      value={{ scroll, canScrollLeft, canScrollRight }}
    >
      <section
        ref={rootRef}
        id="popular-items"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </section>
    </PopularItemsContext.Provider>
  );
};

// Header component
interface PopularItemsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const PopularItemsHeader = ({
  children,
  className,
  ...props
}: PopularItemsHeaderProps) => {
  return (
    <div
      className={cn("flex items-center justify-between mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const PopularItemsContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <ScrollArea className="-mx-4 md:-mx-6 lg:-mx-8">
      <div
        className={cn("flex gap-4 pb-4 pl-4 pr-6 md:pl-6 lg:pl-8", className)}
        {...props}
      >
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

// Scroll buttons component
interface PopularItemsScrollButtonsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
}

const PopularItemsScrollButtons = ({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: PopularItemsScrollButtonsProps) => {
  const { scroll, canScrollLeft, canScrollRight } = usePopularItems();

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Button
        variant={variant}
        size={size}
        className="rounded-full"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="scroll previous carousel"
        title="scroll previous"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Button
        variant={variant}
        size={size}
        className="rounded-full"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="scroll next carousel"
        title="scroll next"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Export all components
export {
  PopularItems,
  PopularItemsHeader,
  PopularItemsContent,
  PopularItemsScrollButtons,
  usePopularItems,
};
