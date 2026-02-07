// Components
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ExtAppClient } from "@/api";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    chrome.storage.local.get("READLATER_TOKEN", (result) => {
      if (!result["READLATER_TOKEN"]) {
        navigate("/auth", { replace: true });
      }
    });
  }, [navigate]);

  return (
    <QueryClientProvider client={ExtAppClient}>
      <div className="w-full bg-background text-foreground rounded-[8px]">
        <Header />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
};

export default AppLayout;
