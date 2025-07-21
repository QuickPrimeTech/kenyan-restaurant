"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About Us" },
    { href: "/private-events", label: "Private Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isHome = pathname === "/";
  const navbarClasses = cn(
    "fixed top-0 w-full section-x z-50 transition-all duration-300",
    isHome
      ? isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border text-foreground"
        : "bg-transparent text-white border-b"
      : "bg-background/95 backdrop-blur-md shadow-sm border-b border-border text-foreground"
  );
  return (
    <nav className={navbarClasses}>
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary">
            <Image
              fill
              src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1750685108/Flux_Dev_A_minimalistic_logo_for_a_coastal_restaurant_featurin_0_yyrx6o.jpg"
              alt="Coastal Breeze Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-serif text-xl font-bold text-primary">
            Ziwa Restaurant
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-primary transition-colors font-medium",
                pathname === link.href && "text-primary",
                isHome && !isScrolled ? "text-white" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Button className="text-sm" variant="outline" asChild>
            <Link href="/reservations">Reserve Table</Link>
          </Button>
          <Button variant="default" className="text-sm" asChild>
            <Link href="/menu">
              <ShoppingBag /> Order Now
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Sheet */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  isHome && !isScrolled ? "text-white" : "text-foreground",
                  "focus-visible:ring-0"
                )}
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-3/4 md:w-1/2 lg:1/4 flex flex-col gap-2 pt-10 section-x section-y rounded-l-2xl"
            >
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm py-2 px-3 rounded-sm hover:bg-accent font-medium hover:text-primary transition-colors",
                      pathname === link.href && "text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button className="text-sm" variant="outline" asChild>
                  <Link href="/reservations">Reserve Table</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="default" className="text-sm" asChild>
                  <Link href="/menu">
                    <ShoppingBag /> Order Now
                  </Link>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
