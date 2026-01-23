import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CircleAlert } from "lucide-react";

type EmptySearchStateProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};
export const EmptySearchState = ({
  searchQuery,
  setSearchQuery,
}: EmptySearchStateProps) => {
  return (
    <Empty className="border border-dashed max-w-3xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleAlert />
        </EmptyMedia>
        <EmptyTitle> No items found</EmptyTitle>
        <EmptyDescription>
          Try searching for &quot;{searchQuery}&quot; with a different term.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" onClick={() => setSearchQuery("")}>
          Clear Search
        </Button>
      </EmptyContent>
    </Empty>
  );
};
