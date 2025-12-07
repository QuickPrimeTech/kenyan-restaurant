"use client";
import Image from "next/image";
import { Clock, Calendar, MapPin, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Offer } from "@/types/offers";
import { formatDate, formatTime, getDayNames } from "@/utils/time-formatters";
import { ShareButton } from "@/components/ui/share-button";
import { toast } from "sonner";

export function OfferDetail({ offer }: { offer: Offer }) {
  return (
    <section>
      {/* Back Navigation */}
      <Button asChild variant="link" className="mb-8">
        <Link href="/offers">
          <ArrowLeft className="h-4 w-4" />
          Back to all offers
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={offer.image_url}
            placeholder={offer.lqip ? "blur" : "empty"}
            blurDataURL={offer.lqip || undefined}
            alt={offer.title}
            fill
            className="object-cover"
            priority
          />

          <Badge className="absolute left-4 top-4">
            {offer.is_recurring ? "Recurring Offer" : "Limited Time Offer"}
          </Badge>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
                {offer.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {offer.description}
              </p>
            </div>

            {/* Time & Schedule Info */}
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Available Time</p>
                  <p className="text-muted-foreground">
                    {formatTime(offer.start_time)} -{" "}
                    {formatTime(offer.end_time)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    {offer.is_recurring
                      ? "Available Days"
                      : "Only Available From"}
                  </p>
                  {offer.is_recurring && offer.days_of_week ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {offer.days_of_week.map((day) => (
                        <Badge
                          key={day}
                          variant="secondary"
                          className="text-xs"
                        >
                          {getDayNames([day])}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {formatDate(offer.start_date ?? "")} –{" "}
                        {formatDate(offer.end_date ?? "")}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-muted-foreground">Main Branch</p>
                </div>
              </div>
            </div>

            <ShareButton
              size="lg"
              className="w-full"
              shareData={{
                title: offer.title,
                text: `Check out this offer: ${offer.title} - ${offer.description}`,
              }}
              copyMessage={() => "Offer link copied to clipboard!"}
              onShareSuccess={() => {
                toast.success("Offer shared successfully!");
              }}
              onShareError={(error) => {
                // Only show error if it's not a user cancellation
                if (error.name !== "AbortError") {
                  toast.error("Failed to share offer");
                }
              }}
              onCopyFallback={() => {
                toast.success("Offer link copied to clipboard!");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
