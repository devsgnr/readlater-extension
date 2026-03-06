import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import type { User } from "@/types";
import { ProfileImage } from "./image";
import { Button } from "./ui/button";

interface Props {
  user: User;
  isPending: boolean;
  onSave: () => void;
}

const QuickAdd = ({ user, isPending, onSave }: Props) => {
  return (
    <Item variant="default" className="h-fit p-1! gap-2" asChild>
      <Button
        variant="ghost"
        className="h-fit text-left items-start cursor-pointer p-1!"
        onClick={onSave}
        disabled={isPending}
      >
        <ItemMedia className="translate-y-0! overflow-hidden rounded-[6px]">
          <ProfileImage className="size-10" src={user?.image} alt={user?.name} />
        </ItemMedia>
        <ItemContent className="gap-0.5">
          <ItemTitle className="font-tasa font-semibold text-sm">Profile</ItemTitle>
          <ItemDescription className="text-xs font-medium text-muted-foreground">
            Click here to quickly add and sort later
          </ItemDescription>
        </ItemContent>
      </Button>
    </Item>
  );
};

export default QuickAdd;
