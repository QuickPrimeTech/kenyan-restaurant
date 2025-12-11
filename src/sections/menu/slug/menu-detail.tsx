"use client";
import { ChoicesContent, ChoicesForm, QuantitySelector } from "../choices-form";
import { ImageWithFallback } from "@/components/ui/image";
import { toast } from "sonner";
import { AddToCartButton } from "../add-cart-button";
import { MenuItem } from "@/types/menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CartItem, RawCartOptions } from "@/types/cart";
import { useCart } from "@/contexts/cart-provider";

export function MenuDetail({ menuItem }: { menuItem: MenuItem }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { addToCart } = useCart();

  const onAdd = (choicesOptions: RawCartOptions, price: number) => {
    const { quantity, specialInstructions, ...choices } = choicesOptions;
    console.log(choicesOptions);
    const cartItem: CartItem = {
      cartItemId: crypto.randomUUID(),
      id: menuItem.id,
      name: menuItem.name,
      image_url: menuItem.image_url,
      choices,
      quantity,
      specialInstructions: specialInstructions,
      price,
    };

    addToCart(cartItem);
    console.log("choices ------>", choices);
    toast.success("Item added to cart successfully");
  };
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
            <div className="font-semibold text-foreground">
              Ksh {menuItem.price.toFixed(2)}
            </div>
          </div>
          <ChoicesForm
            basePrice={menuItem.price}
            onAdd={onAdd}
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
