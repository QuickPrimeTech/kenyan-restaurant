import api from "@/lib/api-client";
import { OfferDetail } from "@/sections/offers/offer-detail";
import { SuggestedOffers } from "@/sections/offers/suggested-offers";
import { ApiResponse } from "@/types/api";
import { Offer } from "@/types/offers";
import { truncate } from "@/utils/text-formatters";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Fetch the offer by slug
    const { data: offer } = await api.get<{ data: Offer }>(
      `/offers/slug/${slug}`
    );
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
  } catch {
    return {
      title: "Offer Not Found",
      description: "This offer does not exist or is no longer available.",
    };
  }
}

export async function generateStaticParams() {
  const { data: offers } = await api.get<ApiResponse<Offer[]>>("/offers");

  return offers.map((offer) => ({
    slug: offer.slug,
  }));
}

export default async function OfferPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let offer: Offer;
  try {
    const res = await api.get<ApiResponse<Offer>>(`/offers/slug/${slug}`);
    offer = res.data;
  } catch {
    // If the API returns 404, render Next.js 404 page
    return notFound();
  }
  const { data: offers } = await api.get<ApiResponse<Offer[]>>("/offers");

  const filteredOffers = offers
    .filter((o: Offer) => o.id !== offer.id)
    .slice(0, 6);

  return (
    <div className="section mt-8">
      <OfferDetail offer={offer} />
      <SuggestedOffers offers={filteredOffers} currentOfferId={offer.id} />
    </div>
  );
}
