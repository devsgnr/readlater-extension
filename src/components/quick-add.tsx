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
import { useCreateBookmark } from "@/api/hooks/mutations";
import { usePayloadContext } from "@/hooks";

interface Props {
  user: User;
}

const QuickAdd = ({ user }: Props) => {
  const { payload } = usePayloadContext();

  const { mutate, isPending } = useCreateBookmark();

  const handleQuickAdd = () => {
    if (!payload) return;

    mutate(payload, {
      onSuccess: () => {
        console.log("Success");
        chrome.storage.session.remove("READLATER_PAYLOAD");
      },
    });
  };

  return (
    <Item variant="outline" className="h-fit p-1! gap-2" asChild>
      <Button
        variant="outline"
        className="h-fit text-left items-start cursor-pointer p-1!"
        onClick={() => handleQuickAdd()}
        disabled={isPending}
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
