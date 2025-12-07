"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ShoppingBag,
  X,
  Sun,
  Moon,
  ChevronDown,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Sheet,
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
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useCart } from "@/hooks/use-cart";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { items } = useCart();

  // Get cart item count
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Primary navigation links (main revenue drivers)
  const primaryLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/offers", label: "Special Offers" },
    { href: "/gift-cards", label: "Gift Cards" },
    { href: "/catering", label: "Catering" },
    { href: "/reservations", label: "Reservations" },
  ];

  // Secondary links (less frequent but important)
  const secondaryLinks = [
    { href: "/about", label: "About Us" },
    { href: "/private-events", label: "Private Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
  ];

  const isHome = pathname === "/";

  // Framer Motion animations
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const sheetContentVariants = {
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
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

  return (
    <motion.nav
      className={navbarClasses}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
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

            {/* Spacer */}
            <div className="w-8" />

            {/* Theme Toggle */}
            {mounted && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className={cn(
                    isHome && !isScrolled ? "text-white hover:text-white" : ""
                  )}
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </motion.div>
            )}

            {/* Cart with Badge */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
                    >
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </motion.span>
                  )}
                </Link>
              </Button>
            </motion.div>

            {/* Account */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/account">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Order Now Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="ml-2">
                <Link href="/menu/order">Order Now</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Cart Badge for Mobile */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                    {isOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </Button>
                </motion.div>
              </SheetTrigger>
              <AnimatePresence>
                <SheetContent
                  side="right"
                  className="w-[85vw] sm:w-[400px] p-0 flex flex-col overflow-hidden"
                  onInteractOutside={(e) => e.preventDefault()}
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
                      <div className="flex items-center justify-between">
                        <SheetTitle className="text-lg font-semibold">
                          Menu
                        </SheetTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsOpen(false)}
                          aria-label="Close menu"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
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
                              <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                  pathname === link.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground hover:bg-accent"
                                )}
                              >
                                {link.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {/* Secondary Links */}
                        <div className="space-y-1 mb-6">
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            More
                          </h3>
                          {secondaryLinks.map((link) => (
                            <motion.div
                              key={link.href}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                  pathname === link.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                              >
                                {link.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {/* Accessibility Section */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Accessibility
                          </h3>

                          {/* Theme Switcher */}
                          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors">
                            <span className="text-sm font-medium">Theme</span>
                            {mounted && (
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant={
                                    theme === "light" ? "default" : "outline"
                                  }
                                  size="sm"
                                  onClick={() => setTheme("light")}
                                  className="h-8 px-3 text-xs"
                                >
                                  <Sun className="h-3 w-3 mr-1" />
                                  Light
                                </Button>
                                <Button
                                  variant={
                                    theme === "dark" ? "default" : "outline"
                                  }
                                  size="sm"
                                  onClick={() => setTheme("dark")}
                                  className="h-8 px-3 text-xs"
                                >
                                  <Moon className="h-3 w-3 mr-1" />
                                  Dark
                                </Button>
                              </div>
                            )}
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
                        <Button
                          variant="outline"
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/account">
                            <User className="mr-2 h-4 w-4" />
                            Account
                          </Link>
                        </Button>
                        <Button asChild onClick={() => setIsOpen(false)}>
                          <Link href="/menu/order">Order Now</Link>
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
    </motion.nav>
  );
}
