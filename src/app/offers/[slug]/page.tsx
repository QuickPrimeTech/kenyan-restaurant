import api from "@/lib/api-client";
import { OfferDetail } from "@/sections/offers/offer-detail";
import { SuggestedOffers } from "@/sections/offers/suggested-offers";
import { Metadata } from "next";

// Helper to truncate text for metadata
const truncate = (str: string, length = 160) =>
  str.length > length ? str.slice(0, length - 3) + "..." : str;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  // Fetch the offer by slug
  const { data: offer } = await api.get(`/offers/slug/${slug}`);

  if (!offer) {
    return {
      title: "Offer Not Found",
      description: "This offer does not exist or is no longer available.",
    };
  }

  return {
    title: `${offer.title} | Special Offer`,
    description: truncate(offer.description, 160),
    openGraph: {
      title: `${offer.title} | Special Offer`,
      description: truncate(offer.description, 160),
      url: `https://ziwa-nu.vercel.app/offers/${offer.slug}`,
      type: "website",
      images: [
        {
          url: offer.image_url,
          width: 1200,
          height: 630,
          alt: offer.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${offer.title} | Special Offer`,
      description: truncate(offer.description, 160),
      images: [offer.image_url],
    },
  };
}

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
