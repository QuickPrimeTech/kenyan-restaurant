// components/EventsHeader.tsx

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function EventsHeader() {
  return (
    <section className="relative min-h-screen pt-24 pb-16">
      {/* Background image */}
      <Image
        src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1749718090/images_16_klyzmt.jpg"
        alt="Private event setup"
        fill
        className="object-cover object-center absolute inset-0 z-0"
      />
      {/* Optional light overlay */}
      <div className="absolute inset-0 bg-foreground/40 z-0"></div>

      {/* Centered content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-background text-center">
        <div className="inline-block px-4 py-2 text-sm font-medium mb-4">
          Private Events
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold  mb-6">
          Celebrate Life&apos;s Special Moments
        </h1>
        <p className="text-xl  leading-relaxed mb-8 max-w-2xl">
          From intimate anniversary dinners to grand wedding receptions, our
          private dining spaces and dedicated events team create unforgettable
          experiences tailored to your vision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className=" px-8 py-4">
            Plan Your Event
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-foreground px-8 py-4"
          >
            View Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
