import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { User } from "@/types";
import { ProfileImage } from "./image";
import { Button } from "./ui/button";

interface Props {
  user: User;
}

const QuickAdd = ({ user }: Props) => {
  return (
    <Item variant="outline" className="h-fit p-1! gap-2" asChild>
      <Button
        variant="outline"
        className="h-fit text-left items-start cursor-pointer p-1!"
      >
        <ItemMedia className="translate-y-0! overflow-hidden rounded-[6px]">
          <ProfileImage
            className="size-10"
            src={user?.image}
            alt={user?.name}
          />
        </ItemMedia>
        <ItemContent className="gap-0.5">
          <ItemTitle className="font-expose font-bold text-sm">
            Quick Add
          </ItemTitle>
          <ItemDescription className="text-xs font-sans text-muted-foreground">
            Add your bookmark to your profile
          </ItemDescription>
        </ItemContent>
      </Button>
    </Item>
  );
};

export default QuickAdd;
