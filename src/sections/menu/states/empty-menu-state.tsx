import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CircleAlert, Gift } from "lucide-react";
import Link from "next/link";
export const EmptyMenuState = () => {
  return (
    <Empty className="border border-dashed max-w-3xl mx-auto">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleAlert />
        </EmptyMedia>
        <EmptyTitle> No menu items found</EmptyTitle>
        <EmptyDescription>
          Please check your internet or come later when we've added menu items
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex flex-row justify-center">
        <Button size="sm" variant={"outline"} asChild>
          <Link href={"/"}>Go back home</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={"/offers"}>
            <Gift />
            Checkout Our Offers
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};
