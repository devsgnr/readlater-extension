import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Folder } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";

const CollectionsListEmptyState = memo(() => {
  return (
    <Empty className="border border-primary/10 border-dashed rounded-3xl p-3! gap-3!">
      <EmptyHeader className="gap-1!">
        <EmptyMedia variant="icon">
          <Folder size={16} className="size-4!" />
        </EmptyMedia>
        <EmptyTitle className="text-sm font-tasa_orbiter font-medium">
          No collections yet
        </EmptyTitle>
        <EmptyDescription className="font-normal text-xs! leading-tight!">
          You don't have any collections yet. Create one to organize your texts.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to="/create">
          <Button variant="outline" size="sm" className="h-7 cursor-pointer">
            Create Collection
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
});

export default CollectionsListEmptyState;
