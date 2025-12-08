"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ShoppingBag,
  Sun,
  Moon,
  ChevronDown,
  User,
  Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { site } from "@/config/site-config";
import { ModeToggle } from "@/components/mode-toggle";

// Constants for reusable values
const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

const LINK_VARIANTS: Variants = {
  hover: { scale: 1.05, transition: SPRING_TRANSITION },
  tap: { scale: 0.95 },
};

const SHEET_CONTENT_VARIANTS: Variants = {
  closed: { x: "100%", opacity: 0 },
  open: { x: 0, opacity: 1, transition: SPRING_TRANSITION },
};

// Primary navigation links (main revenue drivers)
const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Special Offers" },
  { href: "/reservations", label: "Reservations" },
];

// Secondary links (less frequent but important)
const SECONDARY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/private-events", label: "Private Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

// Theme options for consistent usage
const THEME_OPTIONS = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Laptop, label: "System" },
];

// Text size options
const TEXT_SIZE_OPTIONS = [
  { size: "14px", label: "A", className: "text-xs" },
  { size: "16px", label: "A", className: "text-xs font-medium" },
  { size: "18px", label: "A", className: "text-xs font-bold" },
];

// Reusable components
const MotionDiv = ({
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => (
  <motion.div
    variants={LINK_VARIANTS}
    whileHover="hover"
    whileTap="tap"
    {...props}
  >
    {children}
  </motion.div>
);

const MobileNavLink = ({
  link,
  pathname,
}: {
  link: { href: string; label: string };
  pathname: string;
}) => (
  <motion.div whileTap={{ scale: 0.98 }}>
    <SheetClose asChild>
      <Link
        href={link.href}
        className={cn(
          "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
          pathname === link.href
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-accent"
        )}
      >
        {link.label}
      </Link>
    </SheetClose>
  </motion.div>
);

const DesktopNavLink = ({
  link,
  pathname,
  isHome,
  isScrolled,
}: {
  link: { href: string; label: string };
  pathname: string;
  isHome: boolean;
  isScrolled: boolean;
}) => (
  <MotionDiv key={link.href}>
    <Link
      href={link.href}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
        pathname === link.href
          ? "bg-primary/10 text-primary"
          : isHome && !isScrolled
          ? "text-white hover:text-white hover:bg-white/10"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      {link.label}
    </Link>
  </MotionDiv>
);

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        return (
          <Button
            key={option.value}
            variant={theme === option.value ? "default" : "outline"}
            size="icon"
            onClick={() => setTheme(option.value)}
            className="h-8 px-3 text-xs"
            aria-label={`Switch to ${option.label} theme`}
          >
            <Icon className="size-4" />
          </Button>
        );
      })}
    </div>
  );
};

const TextSizeSwitcher = () => (
  <div className="flex items-center space-x-2">
    {TEXT_SIZE_OPTIONS.map((option) => (
      <Button
        key={option.size}
        variant="outline"
        size="sm"
        onClick={() => (document.documentElement.style.fontSize = option.size)}
        className={cn("h-8 w-8 p-0", option.className)}
        aria-label={`Change text size to ${option.size}`}
      >
        {option.label}
      </Button>
    ))}
  </div>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = cn(
    "fixed top-0 w-full z-50 transition-all duration-300",
    isHome
      ? isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border text-foreground"
        : "bg-transparent text-white border-b border-transparent"
      : "bg-background/95 backdrop-blur-md shadow-sm border-b border-border text-foreground",
    "supports-[backdrop-filter]:bg-background/80"
  );

  const getTextColor = (defaultColor = "text-foreground") =>
    isHome && !isScrolled ? "text-white" : defaultColor;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <MotionDiv>
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                <Image
                  fill
                  src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1750685108/Flux_Dev_A_minimalistic_logo_for_a_coastal_restaurant_featurin_0_yyrx6o.jpg"
                  alt="Ziwa Restaurant Logo"
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <span className="font-serif text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Ziwa Restaurant
              </span>
            </Link>
          </MotionDiv>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Primary Links */}
            <div className="flex items-center space-x-1 mr-4">
              {PRIMARY_LINKS.map((link) => (
                <DesktopNavLink
                  key={link.href}
                  link={link}
                  pathname={pathname}
                  isHome={isHome}
                  isScrolled={isScrolled}
                />
              ))}
            </div>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MotionDiv>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-sm font-medium",
                      getTextColor("text-muted-foreground")
                    )}
                  >
                    More
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </MotionDiv>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {SECONDARY_LINKS.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="mr-8">
              <Link href="/menu">
                <ShoppingBag className="mr-2 size-4" />
                Order Now
              </Link>
            </Button>

            {/* Theme Toggle */}
            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <MotionDiv>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("focus-visible:ring-0", getTextColor())}
                    aria-label="Open menu"
                  >
                    <Menu className="size-6" />
                  </Button>
                </MotionDiv>
              </SheetTrigger>
              <AnimatePresence>
                <SheetContent
                  side="right"
                  className="w-3/4 md:w-1/2 p-0 flex flex-col overflow-hidden"
                >
                  <motion.div
                    className="h-full flex flex-col"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={SHEET_CONTENT_VARIANTS}
                  >
                    {/* Sheet Header */}
                    <SheetHeader className="px-6 py-4 border-b">
                      <SheetTitle className="text-lg font-bold">
                        {site.restaurantName}
                      </SheetTitle>
                    </SheetHeader>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                      <div className="px-6 py-4">
                        {/* Primary Links */}
                        <div className="space-y-1 mb-6">
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Main Menu
                          </h3>
                          {PRIMARY_LINKS.map((link) => (
                            <MobileNavLink
                              key={link.href}
                              link={link}
                              pathname={pathname}
                            />
                          ))}
                        </div>

                        {/* Secondary Links */}
                        <Collapsible>
                          <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-accent active:scale-[0.99] data-[state=open]:bg-accent/60">
                            <span>More</span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-300 data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {SECONDARY_LINKS.map((link) => (
                              <MobileNavLink
                                key={link.href}
                                link={link}
                                pathname={pathname}
                              />
                            ))}
                          </CollapsibleContent>
                        </Collapsible>

                        {/* Accessibility Section */}
                        <div className="space-y-4 border-t pt-6 mt-4">
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Accessibility
                          </h3>

                          {/* Theme Switcher */}
                          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors">
                            <span className="text-sm font-medium">Theme</span>
                            <ThemeSwitcher />
                          </div>

                          {/* Font Size */}
                          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors">
                            <span className="text-sm font-medium">
                              Text Size
                            </span>
                            <TextSizeSwitcher />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="border-t p-4 bg-background/95 backdrop-blur">
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" asChild size="sm">
                          <Link href="/reservations">
                            <User />
                            Reservations
                          </Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href="/MenuSection">
                            <ShoppingBag />
                            Order Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </SheetContent>
              </AnimatePresence>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
