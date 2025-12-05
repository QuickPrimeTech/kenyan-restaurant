"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

// Helper to clean up time string (14:00:00 -> 14:00)
const formatTime = (timeStr: string) => {
  // timeStr is expected as "14:00:00"
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 -> 12 and 13–23 -> 1–11

  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

// Helper to convert day numbers to day names
const getDayNames = (day: string[]) => {
  const dayMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  return day.map((d) => dayMap[Number(d) as keyof typeof dayMap]).join(", ");
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr); // parses "2025-12-01"
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const OffersSection = ({ offers }: { offers: Offer[] }) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Today's Special Offers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive time-limited deals and recurring weekly
            specials that you don't want to miss out.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => {
            return (
              <Card
                key={offer.id}
                className="py-0 group overflow-hidden border hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="px-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={offer.image_url}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      // Use LQIP if available in DB
                      placeholder={offer.lqip ? "blur" : "empty"}
                      blurDataURL={offer.lqip || undefined}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Top Left: Time Window */}
                    <Badge className="absolute top-4 left-4 backdrop-blur-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      From {formatTime(offer.start_time)} -{" "}
                      {formatTime(offer.end_time)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pb-6">
                  <CardTitle className="text-2xl font-bold transition-transform mb-2 group-hover:-translate-y-1">
                    {offer.title}
                  </CardTitle>

                  <CardDescription className="line-clamp-2 mb-4">
                    {offer.description}
                  </CardDescription>
                  {/* Bottom Left: Days of Week */}
                  {offer.is_recurring && (
                    <p className="text-muted-foreground text-sm font-medium mb-6">
                      Offer available on {getDayNames(offer.days_of_week ?? [])}
                    </p>
                  )}
                  {!offer.is_recurring && (
                    <p className="text-muted-foreground text-sm font-medium mb-6">
                      Offer active from {formatDate(offer.start_date ?? "")} to{" "}
                      {formatDate(offer.end_date ?? "")}
                    </p>
                  )}

                  <Button size="sm" variant="outline">
                    View Details
                    <ArrowRight />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button size="lg" variant="secondary">
            View All Offers <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};
