"use client";
import { ShareButton } from "@/components/ui/share-button";
import { MenuItem } from "@/types/menu";
import { toast } from "sonner";

type ShareMenuButtonProps = {
  item: MenuItem;
};
export function ShareMenuButton({
  item,
  ...props
}: ShareMenuButtonProps & React.ComponentProps<typeof ShareButton>) {
  return (
    <ShareButton
      variant={"outline"}
      shareData={{
        title: item.name,
        text: `Check out this dish: ${item.name} - ${item.description}`,
        url: `https://ziwa-nu.vercel.app/menu/${item.slug}`,
      }}
      onShareSuccess={() => {
        toast.success("Menu item shared successfully!");
      }}
      type="button"
      onShareError={(error) => {
        // Only show error if it's not a user cancellation
        if (error.name !== "AbortError") {
          toast.error("Failed to share menu item");
        }
      }}
      onCopyFallback={() => {
        toast.success("Menu item link copied to clipboard!");
      }}
      {...props}
    />
  );
}
