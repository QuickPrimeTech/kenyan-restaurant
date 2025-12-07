import { MenuItem } from "@/types/menu";
import { ChoicesForm } from "../choices-form";

export function MenuDetail({ menuItem }: { menuItem: MenuItem }) {
  return (
    <section className="section">
      <h1 className="text-3xl font-bold mb-4">{menuItem.name}</h1>
      <p className="text-muted-foreground mb-6">{menuItem.description}</p>
      <div className="font-semibold text-foreground">
        Ksh {menuItem.price.toFixed(2)}
      </div>
      <ChoicesForm choices={menuItem.choices} />
    </section>
  );
}
