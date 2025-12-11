import { MenuItem } from "@/types/menu";
import {
  PopularItems,
  PopularItemsContent,
  PopularItemsHeader,
  PopularItemsScrollButtons,
} from "@/sections/menu/popular-items";
import { MenuItemCard } from "../menu-item-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type RelatedDishesProps = {
  menuItems: MenuItem[];
  isFallback?: boolean;
};
export function RelatedDishes({ menuItems, isFallback }: RelatedDishesProps) {
  return menuItems.length > 0 ? (
    <PopularItems className="mt-12">
      <PopularItemsHeader className="flex-col items-start md:flex-row md:items-center">
        <h2 className="text-xl font-bold text-foreground">{`Other ${
          isFallback ? "Popular" : menuItems[0].category
        } dishes you might like`}</h2>
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
              item={item}
              variant={"popular"}
              orientation={"square"}
            />
          </Link>
        ))}
      </PopularItemsContent>
    </PopularItems>
  ) : (
    <div>There were no suggestions</div>
  );
}
