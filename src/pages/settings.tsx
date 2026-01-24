import { SettingsIcon } from "lucide-react";
import ThemeSelection from "@/components/theme-selection";

const Settings = () => {
  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <SettingsIcon size={16} />
        <p className="text-sm font-semibold font-expose">Settings</p>
      </div>

      <div className="flex flex-col gap-4">
        <ThemeSelection />
      </div>
    </div>
  );
};

export default Settings;
