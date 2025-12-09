import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShareMenuButton } from "../common/share-menu-button";
import { MenuItem } from "@/types/menu";

export function Header({ menuItem }: { menuItem: MenuItem }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-8">
      <Button asChild variant="link">
        <Link href={"/menu"}>
          <ArrowLeft />
          Back to Menu
        </Link>
      </Button>
      <ShareMenuButton size={"sm"} item={menuItem} />
    </div>
  );
}
