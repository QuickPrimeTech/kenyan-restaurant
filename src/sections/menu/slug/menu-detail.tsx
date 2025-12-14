"use client";
import { ChoicesContent, ChoicesForm, QuantitySelector } from "../choices-form";
import { ImageWithFallback } from "@/components/ui/image";
import { AddToCartButton } from "@/sections/menu/add-cart-button";
import { MenuItem } from "@/types/menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import {
  countItems,
  getCartItemsById,
  useHandleCart
} from "@/helpers/menu";
import { useCart } from "@/contexts/cart-provider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { EditCartCard } from "../edit-cart-card";

export function MenuDetail({ menuItem }: { menuItem: MenuItem }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { cartItems } = useCart();
  const { onAdd } = useHandleCart();
  const cartItemsCount = countItems(cartItems, menuItem);
  const menuCartItems = getCartItemsById(cartItems, menuItem.id);
  return (
    <section>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative md:sticky md:top-22 aspect-[4/3] overflow-hidden rounded-2xl bg-muted border">
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
          {cartItemsCount > 1 && (
            <Badge
              variant={"secondary"}
              size={"lg"}
              className="absolute top-4 right-4"
            >
              {cartItemsCount} in cart
            </Badge>
          )}
          {cartItemsCount > 0 && (
            <Carousel className="px-4 absolute bottom-3 w-full">
              <CarouselContent>
                {menuCartItems.map((item) => (
                  <CarouselItem
                    key={item.cartItemId}
                    className="basis-1/2 lg:basis-1/3"
                  >
                    <EditCartCard cartItem={item} menuItem={menuItem} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {menuCartItems.length > 3 && (
                <>
                  <CarouselNext />
                  <CarouselPrevious />
                </>
              )}
            </Carousel>
          )}
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
