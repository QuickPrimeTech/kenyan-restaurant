"use client";

import Link from "next/link";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { H2, Paragraph } from "@/components/ui/typography";
import type { MenuItem } from "@/types/menu";
import { PopularItems } from "../menu/popular-items";
import { useRouter } from "next/navigation";

export default function MenuHighlights({
  menuItems,
}: {
  menuItems: MenuItem[];
}) {
  const router = useRouter();

  const setActiveItem = (item: MenuItem) => {
    router.push(`/menu?selected-item=${item.slug}`, { scroll: false });
  };

  return (
    <section className="section">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <H2 className="text-foreground">Menu Highlights</H2>
          <Paragraph className="text-muted-foreground max-w-2xl mx-auto font-medium">
            Discover our chef&apos;s featured selections — vibrant, ocean-fresh,
            and beautifully plated.
          </Paragraph>
        </div>

        <PopularItems
          items={menuItems}
          showTitle={false}
          setActiveItem={setActiveItem}
        />

        {/* Footer CTA */}
        <div className="flex mt-12 justify-center">
          <Button size="lg" asChild>
            <Link href="/menu">
              <Utensils />
              View Full Menu
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
