"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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

  return (
    <nav
      className={cn(
        "fixed top-0 w-full section-x z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border text-foreground"
          : "bg-transparent text-white border-b"
      )}
    >
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary">
            <Image
              width={64}
              height={64}
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
                !isScrolled ? "text-white" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/reserve" passHref>
            <Button variant="default" className="text-sm">
              Reserve Table
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Sheet */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  isScrolled ? "text-foreground" : "text-white",
                  "focus-visible:ring-0"
                )}
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-3/4 md:w-1/2 lg:1/4 flex flex-col gap-4 pt-10 section-x section-y"
            >
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium hover:text-primary transition-colors",
                      pathname === link.href && "text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link href="/reserve">
                  <Button className="w-full mt-4">Reserve Table</Button>
                </Link>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
