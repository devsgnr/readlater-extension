import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, MonitorIcon, ChevronDown } from "lucide-react";
import { useTheme } from "./theme-provider";

const ThemeSelection = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col items-start">
        <p className="text-sm font-semibold font-expose">Theme</p>
        <p className="text-xs font-sans text-muted-foreground">
          Readlater Extension Theme
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            size="sm"
            variant="outline"
            className="capitalize h-6 text-xs font-semibold pr-1!"
          >
            {theme}
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-xs"
            onClick={() => setTheme("system")}
          >
            <MonitorIcon size={15} />
            System
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs"
            onClick={() => setTheme("dark")}
          >
            <MoonIcon size={15} />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs"
            onClick={() => setTheme("light")}
          >
            <SunIcon size={15} />
            Light
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSelection;
