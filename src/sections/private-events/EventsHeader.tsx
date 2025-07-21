// components/EventsHeader.tsx

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventsHeader() {
  return (
    <section className="relative min-h-120 mt-16 section">
      {/* Background image */}
      <Image
        src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1753134060/imgi_119_beach-fbl-mid2_cop2gx.jpg"
        alt="Private event setup"
        fill
        className="object-cover object-center absolute inset-0"
      />
      {/* Optional light overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Centered content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-background text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-bold  mb-6">
          Celebrate Life&apos;s Special Moments
        </h1>
        <p className="text-xl  leading-relaxed mb-8 max-w-2xl">
          From intimate anniversary dinners to grand wedding receptions, our
          private dining spaces and dedicated events team create unforgettable
          experiences tailored to your vision.
        </p>
        <Button size="lg" asChild>
          <Link href="#event-contact">Plan Your Event</Link>
        </Button>
      </div>
    </section>
  );
}
