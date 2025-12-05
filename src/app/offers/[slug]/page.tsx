import api from "@/lib/api-client";
import { OfferDetail } from "@/sections/offers/offer-detail";
import { SuggestedOffers } from "@/sections/offers/suggested-offers";

// Mock data - replace with actual data fetching
const mockOffer = {
  id: "1",
  title: "Happy Hour Special",
  description:
    "Enjoy 50% off all appetizers and drinks during our happy hour. Perfect for unwinding after work with friends and colleagues. Our expert mixologists have crafted special cocktails just for this occasion.",
  image_url: "/restaurant-appetizers-and-cocktails-happy-hour.jpg",
  start_time: "16:00",
  end_time: "19:00",
  is_recurring: true,
  days_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  branch_id: "branch-1",
  public_id: "happy-hour-special",
};

const mockSuggestedOffers = [
  {
    id: "2",
    title: "Weekend Brunch",
    description: "Unlimited mimosas with any brunch entrée",
    image_url: "/brunch-with-mimosas-restaurant.jpg",
    start_time: "10:00",
    end_time: "14:00",
    is_recurring: true,
    days_of_week: ["Saturday", "Sunday"],
    public_id: "weekend-brunch",
  },
  {
    id: "3",
    title: "Date Night Deal",
    description: "3-course dinner for two with wine pairing",
    image_url: "/romantic-dinner-for-two-restaurant.jpg",
    start_time: "18:00",
    end_time: "22:00",
    is_recurring: true,
    days_of_week: ["Friday", "Saturday"],
    public_id: "date-night",
  },
  {
    id: "4",
    title: "Lunch Express",
    description: "Quick lunch combo under 30 minutes",
    image_url: "/quick-lunch-meal-restaurant.jpg",
    start_time: "11:30",
    end_time: "14:30",
    is_recurring: true,
    days_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    public_id: "lunch-express",
  },
  {
    id: "5",
    title: "Family Sunday",
    description: "Kids eat free with adult entrée purchase",
    image_url: "/family-dining-restaurant-kids.jpg",
    start_time: "12:00",
    end_time: "20:00",
    is_recurring: true,
    days_of_week: ["Sunday"],
    public_id: "family-sunday",
  },
];

export default async function OfferPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: offer } = await api.get(`/offers/slug/${slug}`);
  console.log("offer ============>", offer);
  // In real app, fetch offer by id
  console.log("Fetching offer:", slug);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <OfferDetail offer={mockOffer} />
        <SuggestedOffers
          offers={mockSuggestedOffers}
          currentOfferId={mockOffer.id}
        />
      </div>
    </main>
  );
}
