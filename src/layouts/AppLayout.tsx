// Components
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ExtAppClient } from "@/api";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      chrome.storage.local.get("READLATER_TOKEN", (result) => {
        if (!result["READLATER_TOKEN"]) navigate("/auth");
      });
    };

    fetchToken();
  }, []);

  return (
    <QueryClientProvider client={ExtAppClient}>
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
};

export default AppLayout;
