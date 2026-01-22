import { ArrowLeft, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b border-secondary py-2 px-3">
      <div className="flex items-center gap-2">
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => navigate(-1)}
          className={cn("size-5 rounded-sm cursor-pointer", {
            hidden: pathname === "/",
          })}
        >
          <ArrowLeft size={13} />
        </Button>
        <p className="text-[15px]! font-semibold font-expose tracking-normal">
          Readlater
        </p>
      </div>

      <div className="flex items-center">
        <Link to="/settings">
          <Settings size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
