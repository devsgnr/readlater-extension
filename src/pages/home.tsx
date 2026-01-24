import { FolderSymlink } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1.5 font-expose text-muted-foreground">
          <FolderSymlink size={16} />
          <p className="text-sm font-semibold">Save to</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
