import { MenuItem } from "@/types/menu";
import { ChoicesForm } from "../choices-form";
import { ImageWithFallback } from "@/components/ui/image";

export function MenuDetail({ menuItem }: { menuItem: MenuItem }) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
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
          <ChoicesForm choices={menuItem.choices} />
        </div>
      </div>
    </section>
  );
}
