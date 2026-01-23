import { MenuItem } from "@/types/menu";
import {
  PopularItems,
  PopularItemsContent,
  PopularItemsHeader,
  PopularItemsScrollButtons,
} from "@/sections/menu/popular-items";
import { MenuItemCard } from "../menu-item-card";
import Link from "next/link";

type RelatedDishesProps = {
  menuItems: MenuItem[];
  isFallback?: boolean;
};
export function RelatedDishes({ menuItems, isFallback }: RelatedDishesProps) {
  return (
    <div className="section-x mt-12">
      {menuItems.length > 0 && (
        <PopularItems>
          <PopularItemsHeader className="flex-col gap-3 items-start md:flex-row md:items-center">
            <h2 className="text-xl font-bold text-foreground">{`Other ${
              isFallback ? "Popular" : menuItems[0].category
            } you might like`}</h2>
            <PopularItemsScrollButtons />
          </PopularItemsHeader>

          <PopularItemsContent>
            {menuItems.map((item) => (
              <Link href={`/menu/${item.slug}`} key={item.id}>
                <MenuItemCard
                  menuItem={item}
                  variant={"popular"}
                  orientation={"square"}
                />
              </Link>
            ))}
          </PopularItemsContent>
        </PopularItems>
      )}
    </div>
  );
}
