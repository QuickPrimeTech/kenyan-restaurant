import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background image using Next.js Image component */}
      <Image
        src="https://res.cloudinary.com/dhlyei79o/image/upload/v1748901626/cld-sample-4.jpg"
        alt="Background"
        fill
        className="object-cover "
        priority
      />{" "}
      <div className="absolute h-full w-full bg-white/60"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
          Bahari
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light">
          Where Ocean Meets Culinary Excellence
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/menu">Explore Our Menu</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/reservations">Reserve Your Table</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
