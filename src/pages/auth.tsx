import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Auth = () => {
  useEffect(() => {
    setTimeout(() => {
      chrome.runtime.sendMessage({
        action: "OPEN_AUTH_TAB",
        url: `${import.meta.env.VITE_BASE_URL}/authorize`,
      });

      window.postMessage({ type: "CLOSE_UI" }, "*");
    }, 1000);
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 p-3">
      <div className="w-full flex flex-col items-center gap-1.5">
        <Loader2 className="animate-spin" size={16} />
        <p className="text-sm font-tasa font-semibold">Loading...</p>
        <p className="text-xs font-semibold text-muted-foreground tracking-tight">
          Authenticating Readlater Saver
        </p>
      </div>
    </div>
  );
};

export default Auth;
