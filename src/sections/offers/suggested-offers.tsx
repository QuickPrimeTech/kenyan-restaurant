"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Offer } from "@/types/offers";
import { OfferCard } from "./offer-card";
import { Button } from "@/components/ui/button";

export function SuggestedOffers({
  offers,
  currentOfferId,
}: {
  offers: Offer[];
  currentOfferId: string;
}) {
  const filteredOffers = offers.filter((offer) => offer.id !== currentOfferId);

  if (filteredOffers.length === 0) return null;

  return (
    <section className="section">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            More Offers You&apos;ll Love
          </h2>
          <p className="mt-1 text-muted-foreground">
            Discover more great deals at our restaurant
          </p>
        </div>
        <Link
          href="/offers"
          className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:flex"
        >
          View all offers
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {filteredOffers.map((offer) => (
            <CarouselItem
              key={offer.id}
              className="pl-4 sm:basis-1/2 lg:basis-1/4"
            >
              <Link href={`/offers/${offer.slug}`}>
                <OfferCard offer={offer} minimalist />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center">
        <Button asChild className="mt-12 max-sm:w-full">
          <Link href="/offers">
            View all offers
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
