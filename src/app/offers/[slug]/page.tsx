import api from "@/lib/api-client";
import { OfferDetail } from "@/sections/offers/offer-detail";
import { SuggestedOffers } from "@/sections/offers/suggested-offers";

export default async function OfferPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: offer } = await api.get(`/offers/slug/${slug}`);
  const { data: offers } = await api.get("/offers");

  const filteredOffers = offers
    .filter((o: any) => o.id !== offer.id)
    .slice(0, 6);

  return (
    <div className="container mx-auto section mt-8">
      <OfferDetail offer={offer} />
      <SuggestedOffers offers={filteredOffers} currentOfferId={offer.id} />
    </div>
  );
}
