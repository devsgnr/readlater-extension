import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import type { User } from "@/types";
import { ProfileImage } from "./image";

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  return (
    <Item variant="default" className="h-fit p-0! gap-2 rounded-2xl">
      <ItemMedia className="translate-y-0! overflow-hidden rounded-[8px]">
        <ProfileImage className="size-10" src={user?.image} alt={user?.name} />
      </ItemMedia>
      <ItemContent className="gap-px">
        <ItemTitle className="font-tasa font-semibold text-sm">{user?.name}</ItemTitle>
        <ItemDescription className="text-xs font-medium text-muted-foreground">
          @{user?.username}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default Profile;
