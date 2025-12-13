import { Offer } from "@/types/offers";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate, formatTime, getDayNames } from "@/utils/time-formatters";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type OfferCardProps = {
  offer: Offer;
  minimalist?: boolean;
};

export function OfferCard({ offer, minimalist = false }: OfferCardProps) {
  return (
    <Card key={offer.id} className="py-0 group overflow-hidden">
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
          {!minimalist && (
            <Badge className="absolute top-4 left-4 backdrop-blur-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              From {formatTime(offer.start_time)} - {formatTime(offer.end_time)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <CardTitle
          className={cn(
            "text-xl md:text-2xl font-bold transition-transform mb-2 group-hover:-translate-y-1",
            minimalist && "text-lg md:text-xl"
          )}
        >
          {offer.title}
        </CardTitle>
        {!minimalist && (
          <>
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

            <Button size="sm" variant="outline" asChild>
              <Link href={`/offers/${offer.slug}`}>
                View Details
                <ArrowRight />
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
