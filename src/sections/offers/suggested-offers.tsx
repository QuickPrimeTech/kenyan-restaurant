"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Offer {
  id: string;
  title: string;
  description: string;
  image_url: string;
  start_time: string;
  end_time: string;
  is_recurring: boolean;
  days_of_week?: string[];
  public_id: string;
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  const hour = Number.parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

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
    <section className="border-t border-border pt-12">
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
              <Link href={`/offers/${offer.public_id}`}>
                <Card className="group h-full overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={offer.image_url || "/placeholder.svg"}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {offer.is_recurring && offer.days_of_week && (
                      <Badge className="absolute left-3 top-3 bg-background/90 text-foreground backdrop-blur-sm">
                        {offer.days_of_week.length === 7
                          ? "Daily"
                          : offer.days_of_week.length === 2 &&
                            offer.days_of_week.includes("Saturday")
                          ? "Weekends"
                          : offer.days_of_week.length === 5
                          ? "Weekdays"
                          : `${offer.days_of_week.length} days/week`}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {offer.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {offer.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {formatTime(offer.start_time)} -{" "}
                        {formatTime(offer.end_time)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>

      <Link
        href="/offers"
        className="mt-6 flex items-center justify-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:hidden"
      >
        View all offers
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
