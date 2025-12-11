import { MenuItem } from "@/types/menu";
import { PopularItems } from "@/sections/menu/popular-items";

type RelatedDishesProps = {
  menuItems: MenuItem[];
  isFallback?: boolean;
};
export function RelatedDishes({ menuItems, isFallback }: RelatedDishesProps) {
  return menuItems.length > 0 ? (
    <PopularItems
      items={menuItems}
      className="mt-12"
      title={`Other ${
        isFallback ? "Popular" : menuItems[0].category
      } dishes you might like`}
    />
  ) : (
    <div>There were no suggestions</div>
  );
}
