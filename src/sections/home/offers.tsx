import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Offer } from "@/types/offers";
import { OfferCard } from "@/sections/offers/offer-card";

export const OffersSection = ({ offers }: { offers: Offer[] }) => {
  return (
    <section className="section bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Today&apos;s Special Offers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive time-limited deals and recurring weekly
            specials that you don&apos;t want to miss out.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.slice(0, 3).map((offer) => {
            return <OfferCard key={offer.id} offer={offer} />;
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/offers">
              View All Offers <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
