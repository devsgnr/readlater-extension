import { ArrowLeft, Settings, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b border-secondary py-2 px-3 pr-2">
      <div className="flex items-center gap-2">
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => navigate(-1)}
          className={cn("size-5 rounded-sm cursor-pointer", {
            hidden: pathname === "/" || pathname === "/auth",
          })}
        >
          <ArrowLeft size={13} />
        </Button>
        <p className="text-[15px]! font-semibold font-expose tracking-normal">
          Readlater
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          size="icon-sm"
          variant="ghost"
          className="size-6"
          onClick={() => navigate("/settings")}
        >
          <Settings size={16} />
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          className="size-6 hover:text-destructive"
          onClick={() => window.close()}
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
