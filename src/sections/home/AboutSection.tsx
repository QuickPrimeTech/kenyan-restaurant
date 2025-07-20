// app/components/about-section.tsx

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { H2, Paragraph } from "@/components/ui/typography";

export default function AboutSection() {
  return (
    <section
      className="section bg-background py-16"
      aria-labelledby="about-ziwa-heading"
      aria-label="About Ziwa La Ladha section"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center container">
        <div>
          <H2 id="about-ziwa-heading" className="mb-6">
            Welcome to Ziwa Seaside Restaurant
          </H2>
          <Paragraph className="text-muted-foreground text-lg leading-relaxed mb-6">
            Nestled at the heart of Old Town, Mombasa&apos;s bustling food
            scene, Ziwa Restaurant brings you the rich coastal flavors of Kenya
            — from coconut-laced curries to freshly grilled seafood infused with
            Swahili spices. Our chefs blend tradition and creativity to serve
            soulful meals that honor both land and sea.
          </Paragraph>
          <Button asChild size="lg">
            <Link href="/about" aria-label="Learn more about Ziwa La Ladha">
              Learn More
            </Link>
          </Button>
        </div>

        <div className="relative w-full aspect-3/2">
          <Image
            fill
            src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1753001420/imgi_92_Restaurant-18-scaled_aes5ba.jpg"
            alt="Chef preparing coastal Kenyan seafood at Ziwa La Ladha"
            className="rounded-lg shadow-2xl object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
