import Link from "next/link";
import { ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Paragraph } from "@/components/ui/typography";
import type { MenuItem } from "@/types/menu";
import {
  PopularItems,
  PopularItemsContent,
  PopularItemsHeader,
  PopularItemsScrollButtons,
} from "../menu/popular-items";
import { MenuItemCard } from "../menu/menu-item-card";

export default function MenuHighlights({
  menuItems,
}: {
  menuItems: MenuItem[];
}) {
  return (
    <PopularItems className="section">
      <PopularItemsHeader className="flex-col gap-4 items-start md:flex-row md:items-center">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Popular Dishes
          </h2>
          <Paragraph className="text-muted-foreground max-w-2xl mx-auto font-medium [&:not(:first-child)]:mt-0">
            Discover our chef&apos;s featured selections — vibrant, ocean-fresh,
            and beautifully plated.
          </Paragraph>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"ghost"} asChild>
            <Link href={"/menu"}>
              View All
              <ArrowRight />
            </Link>
          </Button>
          <PopularItemsScrollButtons />
        </div>
      </PopularItemsHeader>

      <PopularItemsContent>
        {menuItems.map((item) => (
          <Link href={`/menu?selected-item=${item.slug}`} key={item.id}>
            <MenuItemCard
              menuItem={item}
              variant={"popular"}
              orientation={"square"}
            />
          </Link>
        ))}
      </PopularItemsContent>
      {/* Footer CTA */}
      <div className="flex mt-12 justify-center">
        <Button size="lg" asChild>
          <Link href="/menu">
            <Utensils />
            View Full Menu
          </Link>
        </Button>
      </div>
    </PopularItems>
  );
}
