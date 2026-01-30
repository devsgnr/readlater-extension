import { useGetCollections } from "@/api/hooks/queries";
import QuickAdd from "@/components/quick-add";
import { FolderSymlink, Loader } from "lucide-react";

const Home = () => {
  const { data, isLoading } = useGetCollections();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 p-3 pb-0 font-expose text-muted-foreground">
          <FolderSymlink size={16} />
          <p className="text-sm font-semibold">Save to</p>
        </div>

        <div className="flex flex-col">
          {isLoading && !data && (
            <div className="w-full h-full flex flex-col gap-1 items-center justify-center pb-3 text-muted-foreground">
              <Loader strokeWidth={1} size={32} className="animate-spin" />
              <p className="text-xs text-center">Loading...</p>
            </div>
          )}

          {!isLoading && data?.data.result.data && (
            <div className="flex flex-col gap-1 p-1.5">
              <QuickAdd user={data.data.result.data.user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
