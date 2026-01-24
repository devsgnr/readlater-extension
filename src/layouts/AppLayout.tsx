// Components
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useEffect } from "react";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      chrome.storage.local.get("readlaterToken", (result) => {
        if (!result["readlaterToken"]) navigate("/auth");
      });
    };

    fetchToken();
  }, []);

  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
