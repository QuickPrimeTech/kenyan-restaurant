import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function AboutTeaser() {
  return (
    <section className="section bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-serif text-4xl font-bold mb-6">
            Our Ocean Story
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            At Bahari, we celebrate the bounty of the sea with fresh,
            sustainably-sourced ingredients and innovative coastal cuisine. Our
            passion for oceanic flavors and commitment to culinary excellence
            creates an unforgettable dining experience where every dish tells a
            story of the sea.
          </p>
          <Button asChild size="lg">
            <Link href="/about">Discover Our Story</Link>
          </Button>
        </div>
        <div className="relative w-full aspect-video">
          <Image
            fill
            src="https://res.cloudinary.com/dhlyei79o/image/upload/v1750622766/elegant-gourmet-presentation-stockcake_tsixz6.jpg"
            alt="Chef preparing fresh seafood"
            className="rounded-lg shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
