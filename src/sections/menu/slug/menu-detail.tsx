"use client";
import { ChoicesContent, ChoicesForm, QuantitySelector } from "../choices-form";
import { ImageWithFallback } from "@/components/ui/image";
import { AddToCartButton } from "@/sections/menu/add-cart-button";
import { MenuItem } from "@/types/menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { useAddToCartHandler } from "@/helpers/menu";

export function MenuDetail({ menuItem }: { menuItem: MenuItem }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { onAdd } = useAddToCartHandler();

  return (
    <section>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative md:sticky md:top-22 aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          <ImageWithFallback
            src={menuItem.image_url}
            placeholder={menuItem.lqip ? "blur" : "empty"}
            blurDataURL={menuItem.lqip || undefined}
            alt={menuItem.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">
              {menuItem.name}
            </h1>
            <p className="text-muted-foreground mb-2">{menuItem.description}</p>
            <div className="flex justify-between gap-4">
              <div className="font-semibold text-foreground">
                Ksh {menuItem.price.toFixed(2)}
              </div>
              <Badge variant={"secondary"} size="lg">
                {menuItem.category}
              </Badge>
            </div>
          </div>
          <ChoicesForm
            basePrice={menuItem.price}
            onAdd={(raw, totalPrice) => onAdd(raw, totalPrice, menuItem)}
            choices={menuItem.choices}
          >
            <ChoicesContent />
            <div className="flex gap-2 md:gap-3">
              <QuantitySelector />
              <AddToCartButton size={isDesktop ? "lg" : "default"} />
            </div>
          </ChoicesForm>
        </div>
      </div>
    </section>
  );
}
