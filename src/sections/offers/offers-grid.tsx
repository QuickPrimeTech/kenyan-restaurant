import { Offer } from "@/types/offers";
import { OfferCard } from "./offer-card";

export function OffersGrid({ offers }: { offers: Offer[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.slice(0, 3).map((offer) => {
        return <OfferCard key={offer.id} offer={offer} />;
      })}
    </div>
  );
}
