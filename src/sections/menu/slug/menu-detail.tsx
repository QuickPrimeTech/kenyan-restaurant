"use client";
import { ChoicesContent, ChoicesForm, QuantitySelector } from "../choices-form";
import { AddToCartButton } from "@/sections/menu/add-cart-button";
import { MenuItem } from "@/types/menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { countItems, useHandleCart } from "@/helpers/menu";
import { useCart } from "@/contexts/cart-provider";
import { ImageWithFallback } from "@/components/ui/image";
import { OrderWarning } from "@/sections/menu/order-warning";

export function MenuDetail({ menuItem }: { menuItem: MenuItem }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { cartItems } = useCart();
  const { onAdd } = useHandleCart();
  const cartItemsCount = countItems(cartItems, menuItem);

  return (
    <section className="md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative md:sticky md:top-22 aspect-[4/3] overflow-hidden md:rounded-2xl bg-muted border">
          <ImageWithFallback
            src={menuItem.image_url}
            placeholder={menuItem.lqip ? "blur" : "empty"}
            blurDataURL={menuItem.lqip || undefined}
            alt={menuItem.name}
            sizes="(max-width:768px) 10vw, 50vw"
            fill
            className="object-cover"
            priority
          />
          {cartItemsCount > 0 && (
            <Badge
              variant={"secondary"}
              size={"lg"}
              className="absolute max-sm:bottom-4 md:top-4 right-4"
            >
              {cartItemsCount} in cart
            </Badge>
          )}
        </div>
        <div className="relative rounded-2xl py-8 md:pt-4 md:py-0 section-x bg-background -mt-4 z-20 md:mt-0">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">
              {menuItem.name}
            </h1>
            <p className="text-muted-foreground mb-2">{menuItem.description}</p>
            <div className="flex justify-between items-center gap-4">
              <div className="font-semibold text-foreground">
                Ksh {menuItem.price.toFixed(2)}
              </div>
              <Badge variant={"secondary"} size="lg">
                {menuItem.category}
              </Badge>
            </div>
            <OrderWarning className={"mt-4"} menuItem={menuItem} />
          </div>
          <ChoicesForm
            basePrice={menuItem.price}
            onAdd={(values, totalPrice) => onAdd(values, totalPrice, menuItem)}
            choices={menuItem.choices}
          >
            <ChoicesContent />
            <div className="flex gap-2 md:gap-3">
              <QuantitySelector />
              <AddToCartButton
                size={isDesktop ? "lg" : "default"}
                menuItem={menuItem}
              />
            </div>
          </ChoicesForm>
        </div>
      </div>
    </section>
  );
}
