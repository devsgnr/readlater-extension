import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex items-center gap-1.5">
        <div className="flex flex-col items-center gap-1.5">
          <Loader2 className="animate-spin" size={16} />
          <p className="text-sm font-expose">Loading...</p>
          <p className="text-xs font-semibold text-muted-foreground">
            Making things are ready for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
