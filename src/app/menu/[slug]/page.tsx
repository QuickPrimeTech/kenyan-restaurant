import api from "@/lib/api-client";
import { Header } from "@/sections/menu/slug/header";
import { MenuDetail } from "@/sections/menu/slug/menu-detail";
import { RelatedDishes } from "@/sections/menu/slug/related-dishes";
import { ApiResponse } from "@/types/api";
import { MenuItem } from "@/types/menu";
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
    const { data: menuItem } = await api.get<ApiResponse<MenuItem>>(
      `/menu-items/slug/${slug}`,
    );
    return {
      title: `${menuItem.name}`,
      description: truncate(menuItem.description, 160),
      openGraph: {
        title: `${menuItem.name} | Special Offer`,
        description: truncate(menuItem.description, 160),
        url: `https://ziwa-nu.vercel.app/menu/${menuItem.slug}`,
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

export async function generateStaticParams() {
  const { data: menuItems } = await api.get<ApiResponse<MenuItem[]>>(
    "/menu-items?is_available=true",
  );

  return menuItems.map((offer) => ({
    slug: offer.slug,
  }));
}

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let menuItem;
  let relatedMenuItems;
  let isFallback = false;
  try {
    const { data } = await api.get<ApiResponse<MenuItem>>(
      `/menu-items/slug/${slug}`,
    );
    const { data: relatedItems } = await api.get<ApiResponse<MenuItem[]>>(
      `/menu-items?category=${encodeURIComponent(data.category)}&exclude=${
        data.id
      }`,
    );
    relatedMenuItems = relatedItems;
    // Fallback to popular items if no related items
    if (!relatedMenuItems || relatedMenuItems.length === 0) {
      const { data: popularItems } = await api.get<ApiResponse<MenuItem[]>>(
        `/menu-items?is_available=true&popular=true&limit=6&exclude=${data.id}`,
      );
      relatedMenuItems = popularItems;
      isFallback = true;
    }
    menuItem = data;
  } catch {
    // If the API returns 404, render Next.js 404 page
    return notFound();
  }

  return (
    <div className="mx-auto py-8 md:py-16 mt-8">
      <div className="relative">
        <Header menuItem={menuItem} />
        <MenuDetail menuItem={menuItem} />
      </div>
      <RelatedDishes menuItems={relatedMenuItems} isFallback={isFallback} />
    </div>
  );
}
