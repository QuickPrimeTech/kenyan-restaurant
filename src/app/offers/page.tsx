import api from "@/lib/api-client";
import { OffersGrid } from "@/sections/offers/offers-grid";

// force static, no auto revalidation (only on-demand ISR)
export const dynamic = "force-static";
export const revalidate = false;

export const metadata = {
  title: "All Offers | Ziwa Restaurant Deals",
  description:
    "Browse all available offers and special deals at Ziwa Restaurant.",
};

export default async function OffersPage() {
  const { data: offers } = await api.get("/offers");
  return (
    <div className="section mt-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          All Offers
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discover our latest deals and promotions
        </p>
      </header>
      <OffersGrid offers={offers} />
    </div>
  );
}
