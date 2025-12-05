"use client";

import Image from "next/image";
import { Clock, Calendar, MapPin, Share2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Offer {
  id: string;
  title: string;
  description: string;
  image_url: string;
  start_time: string;
  end_time: string;
  is_recurring: boolean;
  start_date?: string;
  end_date?: string;
  days_of_week?: string[];
  branch_id: string;
  public_id: string;
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  const hour = Number.parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function OfferDetail({ offer }: { offer: Offer }) {
  async function handleShare() {
    const shareData = {
      title: offer.title,
      text: `Check out this offer: ${offer.title} - ${offer.description}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled or share failed - fallback to clipboard
        if ((error as Error).name !== "AbortError") {
          await copyToClipboard();
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      await copyToClipboard();
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch {
      alert("Failed to copy link");
    }
  }

  return (
    <div className="mb-16">
      {/* Back Navigation */}
      <Link
        href="/offers"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all offers
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={offer.image_url || "/placeholder.svg"}
            alt={offer.title}
            fill
            className="object-cover"
            priority
          />
          {offer.is_recurring && (
            <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
              Recurring Offer
            </Badge>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
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

              {offer.is_recurring && offer.days_of_week && (
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">
                      Available Days
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {offer.days_of_week.map((day) => (
                        <Badge
                          key={day}
                          variant="secondary"
                          className="text-xs"
                        >
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-muted-foreground">Main Branch</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
