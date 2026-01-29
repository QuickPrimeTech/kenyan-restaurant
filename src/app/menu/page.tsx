import api from "@/lib/api-client";
import MenuContent from "@/sections/menu/menu-content";
import { ApiResponse } from "@/types/api";
import { MenuItem } from "@/types/menu";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Our Menu`,
  description:
    "Checkout our delicious dishes and order from us straight through your phone.",
};

export default async function MenuPage() {
  const { data: menuItems } = await api.get<ApiResponse<MenuItem[]>>(
    "/menu-items?is_available=true",
  );

  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <MenuContent menuItems={menuItems} />
    </Suspense>
  );
}
