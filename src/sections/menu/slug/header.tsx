import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShareMenuButton } from "../common/share-menu-button";
import { MenuItem } from "@/types/menu";

export function Header({ menuItem }: { menuItem: MenuItem }) {
  return (
    <div className="absolute md:relative z-10 top-3 section-x flex items-center justify-between gap-4 mb-8 w-full">
      <Button
        asChild
        variant="link"
        size={"sm"}
        className="bg-background text-foreground md:text-primary"
      >
        <Link href={"/menu"}>
          <ArrowLeft />
          <span className="hidden md:inline">Back to</span> Menu
        </Link>
      </Button>
      <ShareMenuButton size={"sm"} item={menuItem} />
    </div>
  );
}
