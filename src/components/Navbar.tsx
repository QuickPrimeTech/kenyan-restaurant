"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      className={`fixed top-0 w-full section-x  z-50 transition-all duration-300 border-b border-white/20  ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg text-foreground"
          : "bg-transparent text-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-ocean-500 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                width={64}
                height={64}
                src="https://res.cloudinary.com/dhlyei79o/image/upload/v1750685108/Flux_Dev_A_minimalistic_logo_for_a_coastal_restaurant_featurin_0_yyrx6o.jpg"
                alt="Coastal Breeze Logo"
                className="object-cover rounded-full bg-black/60s"
              />
            </div>

            <span className="font-serif text-xl font-bold text-ocean-900">
              Coastal Breeze
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-ocean-800 hover:text-ocean-600 transition-colors font-medium ${
                  pathname === link.href ? "text-blue-500" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/reserve" passHref>
              <Button>Reserve Table</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-ocean-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 text-ocean-800 hover:text-ocean-600 transition-colors ${
                    pathname === link.href ? "text-blue-500" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/reserve" passHref>
                <Button>Reserve Table</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
