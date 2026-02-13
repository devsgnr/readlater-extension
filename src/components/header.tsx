import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const HeaderTitle = () => {
    return cn({ Readlater: pathname == "/", "New Collection": pathname === "/create" });
  };

  return (
    <div className="flex items-center justify-center border-b border-secondary py-2 px-3 pr-2">
      <div className="flex items-center gap-2">
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => navigate(-1)}
          className={cn("size-5 rounded-sm cursor-pointer", {
            hidden: pathname === "/" || pathname === "/auth",
          })}
        >
          <ChevronLeft size={14} />
        </Button>
        <p className="text-base font-semibold font-tasa tracking-normal">{HeaderTitle()}</p>
      </div>
    </div>
  );
};

export default Header;
