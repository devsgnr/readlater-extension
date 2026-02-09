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
import { useChromeRuntimeCreateBookmark } from "@/api/hooks/mutations";
import { usePayloadContext } from "@/hooks";

interface Props {
  user: User;
}

const QuickAdd = ({ user }: Props) => {
  const { payload } = usePayloadContext();

  const { mutate, isPending } = useChromeRuntimeCreateBookmark();

  const handleQuickAdd = () => {
    if (!payload) return;

    mutate(payload, {
      onSuccess: () => {
        console.log("Success");
        chrome.storage.local.remove("READLATER_PAYLOAD");
        window.postMessage({ type: "CLOSE_UI" }, "*");
      },
    });
  };

  return (
    <Item variant="default" className="h-fit p-1! gap-2" asChild>
      <Button
        variant="ghost"
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
          <ItemTitle className="font-expose font-medium text-sm">
            Profile
          </ItemTitle>
          <ItemDescription className="text-xs font-sans text-muted-foreground">
            Quickly add to your profile
          </ItemDescription>
        </ItemContent>
      </Button>
    </Item>
  );
};

export default QuickAdd;
