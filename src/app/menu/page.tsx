import api from "@/lib/api-client";
import MenuContent from "@/sections/menu/menu-content";
import { ApiResponse } from "@/types/api";
import { MenuItem } from "@/types/menu";
import { truncate } from "@/utils/text-formatters";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ "selected-item"?: string }>;
}): Promise<Metadata> {
  const slug = (await searchParams)["selected-item"];

  try {
    // Fetch the menu item by slug
    const { data: menuItem } = await api.get<ApiResponse<MenuItem>>(
      `/menu-items/slug/${slug}`
    );

    return {
      title: `${menuItem.name}`,
      description: truncate(menuItem.description, 160),
      openGraph: {
        title: `${menuItem.name} | Special Offer`,
        description: truncate(menuItem.description, 160),
        url: `https://ziwa-nu.vercel.app/menu?selected-item=${menuItem.slug}`,
        type: "website",
        images: [
          {
            url: menuItem.image_url || "",
            width: 1200,
            height: 630,
            alt: menuItem.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${menuItem.name}`,
        description: truncate(menuItem.description, 160),
        images: [menuItem.image_url || ""],
      },
    };
  } catch {
    return {
      title: "Menu Item Not Found",
      description:
        "This menu item or dish does not exist or is no longer available.",
    };
  }
}

export default async function MenuPage() {
  const { data: menuItems } = await api.get<ApiResponse<MenuItem[]>>(
    "/menu-items"
  );

  return <MenuContent menuItems={menuItems} />;
}
