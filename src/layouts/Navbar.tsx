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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Primary navigation links (main revenue drivers)
  const primaryLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/offers", label: "Special Offers" },
    { href: "/reservations", label: "Reservations" },
  ];

  // Secondary links (less frequent but important)
  const secondaryLinks = [
    { href: "/about", label: "About Us" },
    { href: "/private-events", label: "Private Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isHome = pathname === "/";

  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  };

  const linkVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: springTransition,
    },
    tap: {
      scale: 0.95,
    },
  };

  const sheetContentVariants: Variants = {
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: springTransition,
    },
  };

  const navbarClasses = cn(
    "fixed top-0 w-full z-50 transition-all duration-300",
    isHome
      ? isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border text-foreground"
        : "bg-transparent text-white border-b border-transparent"
      : "bg-background/95 backdrop-blur-md shadow-sm border-b border-border text-foreground",
    "supports-[backdrop-filter]:bg-background/80"
  );

  const linkClasses = (link: { href: string }) =>
    cn(
      "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
      pathname === link.href
        ? "bg-primary/10 text-primary"
        : "text-foreground hover:bg-accent"
    );

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3"
          >
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
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Primary Links */}
            <div className="flex items-center space-x-1 mr-4">
              {primaryLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
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
                </motion.div>
              ))}
            </div>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-sm font-medium",
                      isHome && !isScrolled
                        ? "text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    More
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {secondaryLinks.map((link) => (
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
                <ShoppingBag />
                Order Now
              </Link>
            </Button>
            {/* Theme Toggle */}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "focus-visible:ring-0",
                      isHome && !isScrolled ? "text-white" : "text-foreground"
                    )}
                    aria-label="Open menu"
                  >
                    <Menu className="size-6" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <AnimatePresence>
                <SheetContent
                  side="right"
                  className="w-[85vw] sm:w-[400px] p-0 flex flex-col overflow-hidden"
                >
                  <motion.div
                    className="h-full flex flex-col"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sheetContentVariants}
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
                          {primaryLinks.map((link) => (
                            <motion.div
                              key={link.href}
                              whileTap={{ scale: 0.98 }}
                            >
                              <SheetClose asChild>
                                <Link
                                  href={link.href}
                                  className={linkClasses(link)}
                                >
                                  {link.label}
                                </Link>
                              </SheetClose>
                            </motion.div>
                          ))}
                        </div>

                        {/* Secondary Links */}
                        <Collapsible>
                          <CollapsibleTrigger
                            className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium 
             transition-all hover:bg-accent active:scale-[0.99] 
             data-[state=open]:bg-accent/60"
                          >
                            <span>More</span>

                            <ChevronDown
                              className="h-4 w-4 transition-transform duration-300 
               data-[state=open]:rotate-180"
                            />
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            {secondaryLinks.map((link) => (
                              <motion.div
                                key={link.href}
                                whileTap={{ scale: 0.98 }}
                              >
                                <SheetClose asChild>
                                  <Link
                                    href={link.href}
                                    className={linkClasses(link)}
                                  >
                                    {link.label}
                                  </Link>
                                </SheetClose>
                              </motion.div>
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
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={
                                  theme === "light" ? "default" : "outline"
                                }
                                size="icon"
                                onClick={() => setTheme("light")}
                                className="h-8 px-3 text-xs"
                              >
                                <Sun />
                              </Button>
                              <Button
                                variant={
                                  theme === "dark" ? "default" : "outline"
                                }
                                size="icon"
                                onClick={() => setTheme("dark")}
                                className="h-8 px-3 text-xs"
                              >
                                <Moon />
                              </Button>
                              <Button
                                variant={
                                  theme === "system" ? "default" : "outline"
                                }
                                size="icon"
                                onClick={() => setTheme("system")}
                              >
                                <Laptop />
                                {/* System */}
                              </Button>
                            </div>
                          </div>

                          {/* Font Size */}
                          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors">
                            <span className="text-sm font-medium">
                              Text Size
                            </span>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  (document.documentElement.style.fontSize =
                                    "14px")
                                }
                                className="h-8 w-8 p-0 text-xs"
                              >
                                A
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  (document.documentElement.style.fontSize =
                                    "16px")
                                }
                                className="h-8 w-8 p-0 text-xs font-medium"
                              >
                                A
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  (document.documentElement.style.fontSize =
                                    "18px")
                                }
                                className="h-8 w-8 p-0 text-xs font-bold"
                              >
                                A
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="border-t p-4 bg-background/95 backdrop-blur">
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" asChild>
                          <Link href="/reservations">
                            <User className="mr-2" />
                            Reservations
                          </Link>
                        </Button>
                        <Button asChild>
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
