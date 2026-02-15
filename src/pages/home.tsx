import { useChromeRuntimeCreateBookmark } from "@/api/hooks/mutations";
import { useChromeRuntimeGetCollections } from "@/api/hooks/queries";
import CollectionsListEmptyState from "@/components/collection-empty-state";
import CollectionList from "@/components/collection-list";
import QuickAdd from "@/components/quick-add";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePayloadContext } from "@/hooks";
import { cn } from "@/lib/utils";
import { Loader, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { payload } = usePayloadContext();
  const { data, isLoading } = useChromeRuntimeGetCollections();
  const { mutate, isPending } = useChromeRuntimeCreateBookmark();

  const handleSave = () => {
    if (!payload) return;

    mutate(payload, {
      onSuccess: () => {
        (window as any).__READLATER_PAYLOAD__ = undefined;
        window.postMessage({ type: "CLOSE_UI" }, "*");
      },
    });
  };

  const Collections = payload?.collections;
  const isEmpty = !Collections || Collections?.length === 0;

  return (
    <div className="flex flex-col py-2">
      {isLoading && !data && (
        <div className="w-full h-full flex flex-col gap-1 items-center justify-center py-1.5 text-muted-foreground">
          <Loader strokeWidth={2} size={32} className="animate-spin" />
          <p className="text-xs text-center">Loading...</p>
        </div>
      )}

      {!isLoading && data && (
        <div className="w-full flex flex-col gap-3 px-2 pb-0">
          <QuickAdd user={data.user} />

          <div className="w-full h-full flex flex-col gap-1.5">
            <div className="flex w-full items-center justify-between text-xs text-muted-foreground!">
              <p className="font-medium">Collections</p>

              <Button
                size="sm"
                variant="ghost"
                className="h-fit py-0.5 px-1 pl-0.5 text-xs items-center cursor-pointer text-muted-foreground!"
                onClick={() => navigate("/create")}
              >
                <Plus size={11} />
                <span>New</span>
              </Button>
            </div>

            {!isLoading && data.collections.length > 0 && (
              <ScrollArea
                className={cn("h-full rounded-[8px] **:data-[slot=scroll-area-scrollbar]:hidden", {
                  "h-64": data.collections.length >= 4,
                })}
              >
                <CollectionList collections={data.collections} />
              </ScrollArea>
            )}

            {!isLoading && data.collections.length === 0 && <CollectionsListEmptyState />}
          </div>

          <Button
            type="button"
            className="rounded-4xl"
            size="lg"
            disabled={isEmpty || isPending}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
