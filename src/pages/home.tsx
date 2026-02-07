import { useChromeRuntimeGetCollections } from "@/api/hooks/queries";
import CollectionList from "@/components/collection-list";
import QuickAdd from "@/components/quick-add";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "lucide-react";

const Home = () => {
  const { data, isLoading } = useChromeRuntimeGetCollections();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          {isLoading && !data && (
            <div className="w-full h-full flex flex-col gap-1 items-center justify-center pb-3 text-muted-foreground">
              <Loader strokeWidth={1} size={32} className="animate-spin" />
              <p className="text-xs text-center">Loading...</p>
            </div>
          )}

          {!isLoading && data && (
            <div className="flex flex-col gap-2 p-1.5 px-1.5 pt-2 pb-0">
              <QuickAdd user={data.user} />

              <div className="w-full h-full flex flex-col gap-1 pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="font-medium text-xs text-muted-foreground">
                    Collections
                  </p>
                </div>

                <ScrollArea className="h-64 rounded-[8px] **:data-[slot=scroll-area-scrollbar]:hidden">
                  <CollectionList collections={data.collections} />
                </ScrollArea>
              </div>

              <div className="w-full">
                <Button className="w-full" size="lg">
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
