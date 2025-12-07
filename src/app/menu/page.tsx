import api from "@/lib/api-client";
import MenuContent from "@/sections/menu/menu-content";
import { ApiResponse } from "@/types/api";
import { MenuItem } from "@/types/menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Menu | Delicious Meals, Drinks & Specials",
  description:
    "Explore our full restaurant menu. Discover delicious meals, drinks, desserts, and chef specials made fresh every day.",
  openGraph: {
    title: "Ziwa Restaurant Menu",
    description:
      "Browse our full selection of meals, drinks, and chef-crafted specials.",
    url: "https://ziwa-nu.vercel.app/menu",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/quick-prime-tech/image/upload/v1764935940/ziwa-restaurant/eldoret/offers/axjmqjxgo4aebbylsbn1.jpg", // optional — replace with your real menu OG image
        width: 1200,
        height: 630,
        alt: "Restaurant Menu Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Menu",
    description: "Explore our delicious meals, drinks, and daily specials.",
    images: ["https://yourdomain.com/og/menu-banner.jpg"],
  },
  alternates: {
    canonical: "https://yourdomain.com/menu",
  },
};

export default async function MenuPage() {
  const { data: menuItems } = await api.get<ApiResponse<MenuItem[]>>(
    "/menu-items"
  );

  return <MenuContent menuItems={menuItems} />;
}
